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
import { PalService } from "./pal.service";
import { ApiTags } from "@nestjs/swagger";
import { PalDto, UpdatePalDto } from "./dto/pal.dto";
import { Roles } from "src/auth/acl/roles.decorator";

@ApiTags("Pals")
@Controller("pal")
export class PalController {
	constructor(private readonly palService: PalService) {}

	@Roles("ADMIN")
	@Post()
	async create(@Body() createPalDto: PalDto) {
		const res = await this.palService.create(createPalDto);

		if (res.status === "success") return res.data;
		throw new InternalServerErrorException(res.error);
	}

	@Get()
	async findAll() {
		return this.palService.findAll();
	}

	@Get(":name")
	async findOne(@Param("name") name: string) {
		return this.palService.findOne(name);
	}

	@Roles("ADMIN")
	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updatePersonagemDto: UpdatePalDto,
	) {
		const res = await this.palService.update(id, updatePersonagemDto);

		if (res.status === "success") return res.data;
		throw new InternalServerErrorException(res.error);
	}

	@Roles("ADMIN")
	@Delete(":id")
	async remove(@Param("id") id: string) {
		return this.palService.remove(id);
	}
}
