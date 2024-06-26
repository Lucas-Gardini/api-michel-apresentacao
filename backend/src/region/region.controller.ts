import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	InternalServerErrorException,
} from "@nestjs/common";
import { RegionService } from "./region.service";
import { ApiTags } from "@nestjs/swagger";
import { RegionDto, UpdateRegionDto } from "./dto/region.dto";
import { Roles } from "src/auth/acl/roles.decorator";

@ApiTags("Regiões")
@Controller("region")
export class RegionController {
	constructor(private readonly regionService: RegionService) {}

	@Roles("ADMIN")
	@Post()
	async create(@Body() createRegionDto: RegionDto) {
		const res = await this.regionService.create(createRegionDto);

		if (res.status === "success") return res.data;
		throw new InternalServerErrorException(res.error);
	}

	@Get()
	async findAll() {
		return this.regionService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return this.regionService.findOne(id);
	}

	@Roles("ADMIN")
	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updateRegionDto: UpdateRegionDto,
	) {
		const res = await this.regionService.update(id, updateRegionDto);

		if (res.status === "success") return res.data;
		throw new InternalServerErrorException(res.error);
	}

	@Roles("ADMIN")
	@Delete(":id")
	async remove(@Param("id") id: string) {
		return this.regionService.remove(id);
	}
}
