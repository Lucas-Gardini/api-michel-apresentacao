import {
	Body,
	Controller,
	Delete,
	Get,
	InternalServerErrorException,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { AptitudeService } from "./aptitude.service";
import { ApiTags } from "@nestjs/swagger";
import { AptitudeDto, UpdateAptitudeDto } from "./dto/aptitude.dto";
import { Roles } from "src/auth/acl/roles.decorator";

@ApiTags("Aptidões")
@Controller("aptitude")
export class AptitudeController {
	constructor(private readonly aptitudeService: AptitudeService) {}

	@Roles("ADMIN")
	@Post()
	async create(@Body() createAptitudeDto: AptitudeDto) {
		const res = await this.aptitudeService.create(createAptitudeDto);

		if (res.status === "success") return res.data;
		throw new InternalServerErrorException(res.error);
	}

	@Get()
	async findAll() {
		return this.aptitudeService.findAll();
	}

	@Get("pal-name/:palName")
	async findAllByPalName(@Param("palName") palName: string) {
		return this.aptitudeService.findAllByPalName(palName);
	}

	@Get("name/:name")
	async findAllByName(@Param("name") name: string) {
		return this.aptitudeService.findAllByName(name);
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return this.aptitudeService.findOne(id);
	}

	@Roles("ADMIN")
	@Patch("update-pal/:id")
	async update(
		@Param("id") id: string,
		@Body() updateAptitudeDto: UpdateAptitudeDto,
	) {
		const res = await this.aptitudeService.update(id, updateAptitudeDto);

		if (res.status === "success") return res.data;
		throw new InternalServerErrorException(res.error);
	}

	@Roles("ADMIN")
	@Delete("delete-pal/:id")
	async remove(@Param("id") id: string) {
		return this.aptitudeService.remove(id);
	}
}
