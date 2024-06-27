import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserDto } from "src/user/dto/user.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private jwtService: JwtService,
	) {}
	async validateUser(
		userEmail: string | Record<string, unknown>,
		passwd: string,
	) {
		if (typeof userEmail !== "string") return userEmail;

		const user = await this.userService.findOneByEmail(userEmail);
		if (!user)
			throw new UnauthorizedException(
				"O email enviado não foi encontrado!",
			);

		const userPasswd = await bcrypt.compare(passwd, user.passwd);
		if (!userPasswd)
			throw new UnauthorizedException("A senha está incorreta!");

		const result = { ...user };
		delete result.passwd;

		return result;
	}

	async login(user: UserDto) {
		const validate = await this.validateUser(user.email, user.passwd);
		const payload = { ...validate };

		return {
			email: user.email,
			name: user.name,
			accessToken: this.jwtService.sign(payload, {
				secret: process.env.JWT_SECRET,
				expiresIn: process.env.EXPIRES_TIME,
			}),
			tokenExpiresIn: process.env.EXPIRES_TIME,
		};
	}

	async verifyExist(userEmail: string, userName: string) {
		const verifyEmail = await this.userService.findOneByEmail(userEmail);
		if (verifyEmail)
			throw new UnauthorizedException(
				"Esse email não pode ser utilizado!",
			);

		const verifyName = await this.userService.findOneByName(userName);
		if (verifyName)
			throw new UnauthorizedException("O nome escolhido já está em uso!");

		return null;
	}
}
