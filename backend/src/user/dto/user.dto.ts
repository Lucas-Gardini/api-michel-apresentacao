import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import * as CV from "class-validator";

export class UserDto implements Prisma.UserCreateInput {
	@ApiProperty()
	@CV.IsNotEmpty()
	@CV.IsEmail()
	email: string;

	@ApiProperty()
	@CV.IsNotEmpty()
	@CV.IsString()
	name: string;

	@ApiProperty()
	@CV.IsNotEmpty()
	@CV.IsString()
	@CV.IsOptional()
	passwd: string;
}

export class UpdateUserDto implements Prisma.UserUpdateInput {
	@ApiProperty()
	@CV.IsOptional()
	@CV.IsEmail()
	email?: string;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsString()
	name?: string;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsString()
	passwd?: string;
}
