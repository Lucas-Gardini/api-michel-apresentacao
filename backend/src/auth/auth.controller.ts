import {
	Body,
	Controller,
	InternalServerErrorException,
	Post
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpResponse } from "semantic-response";
import { UserDto } from "src/user/dto/user.dto";
import { UserService } from "src/user/user.service";
import { Public } from "src/utils/decorators/public";
import { Roles } from "./acl/roles.decorator";
import { AuthService } from "./auth.service";

@ApiTags("Autenticação")
@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private userService: UserService,
	) {}

	@Public()
	@Post("login")
	async login(@Body() userDto: UserDto) {
		return await this.authService.login(userDto);
	}

	@Public()
	@Post("register")
	async registerUser(@Body() createUserDto: UserDto) {
		await this.authService.verifyExist(
			createUserDto.email,
			createUserDto.name,
		);

		try {
			const result = await this.userService.create(createUserDto);

			return HttpResponse.ok(
				`Usuário ${result.name} criado com sucesso`,
			);
		} catch (err: any) {
			throw new InternalServerErrorException(
				"Erro ao tentar criar o usuário",
			);
		}
	}

	@Roles("ADMIN")
	@Post("registerAdmin")
	async registerUserAdmin(@Body() createUserDto: UserDto) {
		await this.authService.verifyExist(
			createUserDto.email,
			createUserDto.name,
		);

		try {
			const result = await this.userService.createAdmin(createUserDto);

			return HttpResponse.ok(
				`Usuário ${result.name} criado com sucesso`,
			);
		} catch (err: any) {
			throw new InternalServerErrorException(
				"Erro ao tentar criar o usuário",
			);
		}
	}
}
