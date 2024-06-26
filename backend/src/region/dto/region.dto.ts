import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import * as CV from "class-validator";

export class RegionDto implements Prisma.RegionCreateInput {
	@ApiProperty()
	@CV.IsNotEmpty()
	@CV.IsNumber()
	lat: number;

	@ApiProperty()
	@CV.IsNotEmpty()
	@CV.IsNumber()
	long: number;

	@ApiProperty()
	@CV.IsNotEmpty()
	@CV.IsString()
	name: string;

	@ApiProperty()
	@CV.IsOptional()
	pal?: Prisma.PalCreateNestedManyWithoutRegionInput;
}

export class UpdateRegionDto implements Prisma.RegionUpdateInput {
	@ApiProperty()
	@CV.IsOptional()
	@CV.IsNumber()
	lat?: number;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsNumber()
	long?: number;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsString()
	name?: string;

	@ApiProperty()
	@CV.IsOptional()
	pal?: Prisma.PalCreateNestedManyWithoutRegionInput;
}
