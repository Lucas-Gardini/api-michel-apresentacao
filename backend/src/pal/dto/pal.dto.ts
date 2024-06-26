import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import * as CV from "class-validator";

export class PalDto implements Prisma.PalCreateInput {
	@ApiProperty()
	@CV.IsOptional()
	@CV.IsString()
	name: string;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsString()
	palNumber: string;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsString()
	element: string;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsNumber()
	heal: number;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsNumber()
	atk: number;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsNumber()
	def: number;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsNumber()
	craft: number;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsString()
	companionSkill: string;

	@ApiProperty()
	@CV.IsOptional()
	createdAt?: string | Date;

	@ApiProperty()
	@CV.IsOptional()
	updatedAt?: string | Date;

	@ApiProperty()
	@CV.IsOptional()
	region?: Prisma.RegionCreateNestedOneWithoutPalInput;

	@ApiProperty()
	@CV.IsOptional()
	aptitudeWork?: Prisma.AptitudeWorkCreateNestedManyWithoutPalInput;
}

export class UpdatePalDto implements Prisma.PalUpdateInput {
	@ApiProperty()
	@CV.IsOptional()
	@CV.IsString()
	name?: string;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsString()
	element?: string;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsNumber()
	heal?: number;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsNumber()
	atk?: number;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsNumber()
	def?: number;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsNumber()
	craft?: number;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsString()
	companionSkill?: string;

	@ApiProperty()
	@CV.IsOptional()
	createdAt?: string | Date;

	@ApiProperty()
	@CV.IsOptional()
	updatedAt?: string | Date;

	@ApiProperty()
	@CV.IsOptional()
	region?: Prisma.RegionCreateNestedOneWithoutPalInput;

	@ApiProperty()
	@CV.IsOptional()
	aptitudeWork?: Prisma.AptitudeWorkCreateNestedManyWithoutPalInput;
}
