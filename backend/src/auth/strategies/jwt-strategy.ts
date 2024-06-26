import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
	super({
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		ignoreExpiration: false,
		secretOrKey: `${process.env.JWT_SECRET}`,
	  });
	}
	async validate(userEmail: string, passwd: string) {
		const user = await this.authService.validateUser(userEmail, passwd);

		if (!user)
			throw new UnauthorizedException("O usuário não foi encontrado");

		return user;
	}
}
