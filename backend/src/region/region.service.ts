import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { RegionDto, UpdateRegionDto } from "./dto/region.dto";

@Injectable()
export class RegionService {
	constructor(private readonly databaseService: DatabaseService) {}

	async create(createRegionDto: RegionDto) {
		try {
			const createRegion = await this.databaseService.region.create({
				data: createRegionDto,
			});
			return {
				data: createRegion,
				status: "success",
			};
		} catch (error) {
			return {
				error: error,
				status: "error",
			};
		}
	}

	async findAll() {
		return this.databaseService.region.findMany();
	}

	async findOne(id: string) {
		const res = await this.databaseService.region.findUnique({
			where: {
				id,
			},
		});

		if (res) {
			return res;
		} else {
			throw new NotFoundException("Região não encontrada");
		}
	}

	async update(id: string, updateRegionDto: UpdateRegionDto) {
		try {
			const updateRegion = await this.databaseService.region.update({
				where: {
					id,
				},
				data: updateRegionDto,
			});
			return {
				data: updateRegion,
				status: "success",
			};
		} catch (error) {
			return {
				error: error,
				status: "error",
			};
		}
	}

	async remove(id: string) {
		return this.databaseService.region.delete({
			where: {
				id,
			},
		});
	}
}
