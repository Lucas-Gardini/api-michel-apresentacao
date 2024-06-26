import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { AptitudeDto, UpdateAptitudeDto } from "./dto/aptitude.dto";

@Injectable()
export class AptitudeService {
	constructor(private readonly databaseService: DatabaseService) {}

	async create(createAptitudeDto: AptitudeDto) {
		try {
			const createAptitude =
				await this.databaseService.aptitudeWork.create({
					data: createAptitudeDto,
				});
			return {
				data: createAptitude,
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
		return this.databaseService.aptitudeWork.findMany();
	}

	async findAllByPalName(palName: string) {
		const res = await this.databaseService.aptitudeWork.findMany({
			where: {
				palName,
			},
		});

		if (res) {
			return res;
		} else {
			throw new NotFoundException("Aptidão não encontrada");
		}
	}

	async findAllByName(name: string) {
		const res = await this.databaseService.aptitudeWork.findMany({
			where: {
				name,
			},
		});

		if (res) {
			return res;
		} else {
			throw new NotFoundException("Aptidão não encontrada");
		}
	}

	async findOne(id: string) {
		const res = await this.databaseService.aptitudeWork.findUnique({
			where: {
				id,
			},
		});

		if (res) {
			return res;
		} else {
			throw new NotFoundException("Aptidão não encontrada");
		}
	}

	async update(id: string, updateAptitudeDto: UpdateAptitudeDto) {
		try {
			const updatedAptitude =
				await this.databaseService.aptitudeWork.update({
					where: {
						id,
					},
					data: updateAptitudeDto,
				});
			return {
				data: updatedAptitude,
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
		return this.databaseService.aptitudeWork.delete({
			where: {
				id,
			},
		});
	}
}
