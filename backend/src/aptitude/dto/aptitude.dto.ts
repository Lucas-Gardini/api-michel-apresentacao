import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import * as CV from "class-validator";

export class AptitudeDto implements Prisma.AptitudeWorkCreateInput {
	@ApiProperty()
	@CV.IsNotEmpty()
	@CV.IsString()
	name: string;

	@ApiProperty()
	@CV.IsNotEmpty()
	@CV.IsNumber()
	level: number;

	@ApiProperty()
	@CV.IsNotEmpty()
	pal: Prisma.PalUpdateOneRequiredWithoutAptitudeWorkNestedInput;
}

export class UpdateAptitudeDto implements Prisma.AptitudeWorkUpdateInput {
	@ApiProperty()
	@CV.IsOptional()
	@CV.IsString()
	name?: string;

	@ApiProperty()
	@CV.IsOptional()
	@CV.IsNumber()
	level?: number;

	@ApiProperty()
	@CV.IsOptional()
	pal?: Prisma.PalUpdateOneRequiredWithoutAptitudeWorkNestedInput;
}
