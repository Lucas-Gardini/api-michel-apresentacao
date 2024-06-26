import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { PalDto, UpdatePalDto } from "./dto/pal.dto";

@Injectable()
export class PalService {
	constructor(private readonly databaseService: DatabaseService) {}

	async create(createPalDto: PalDto) {
		try {
			const createPal = await this.databaseService.pal.create({
				data: createPalDto,
			});
			return {
				data: createPal,
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
		return this.databaseService.pal.findMany();
	}

	async findOne(name: string) {
		const startsWithNumber = !Number.isNaN(Number(name.charAt(0)));

		const where = startsWithNumber
			? { palNumber: name }
			: {
					name:
						name.toLowerCase().charAt(0).toUpperCase() +
						name.slice(1),
				};

		const res = await this.databaseService.pal.findUnique({
			where: where,
		});

		if (res) {
			return res;
		} else {
			throw new NotFoundException("Pal não encontrado");
		}
	}

	async update(id: string, updatePalDto: UpdatePalDto) {
		try {
			const updatePal = await this.databaseService.pal.update({
				where: {
					id,
				},
				data: updatePalDto,
			});
			return {
				data: updatePal,
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
		return this.databaseService.pal.delete({
			where: {
				id,
			},
		});
	}
}
