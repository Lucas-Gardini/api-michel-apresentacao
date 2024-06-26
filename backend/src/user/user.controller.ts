import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	Delete,
	InternalServerErrorException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "./dto/user.dto";
import { Roles } from "src/auth/acl/roles.decorator";

@ApiTags("Usuários")
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Roles("ADMIN")
	@Get()
	async findAll() {
		return this.userService.findAll();
	}

	@Roles("ADMIN")
	@Get(":id")
	async findOne(@Param("id") id: string) {
		return this.userService.findOne(id);
	}

	@Get("email/:email")
	async findOneByEmailUser(@Param("email") email: string) {
		return this.userService.findOneByEmailUser(email);
	}

	@Get("name/:name")
	async findOneByNameUser(@Param("name") name: string) {
		return this.userService.findOneByNameUser(name);
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		const res = await this.userService.update(id, updateUserDto);

		if (res.status === "success") return res.data;
		throw new InternalServerErrorException(res.error);
	}

	@Roles("ADMIN")
	@Delete(":id")
	async remove(@Param("id") id: string) {
		return this.userService.remove(id);
	}
}
