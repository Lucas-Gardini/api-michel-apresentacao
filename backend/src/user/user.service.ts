import { Injectable, NotFoundException } from "@nestjs/common";
import { Role } from "@prisma/client";
import { hash } from "bcrypt";
import { DatabaseService } from "src/database/database.service";
import { UpdateUserDto, UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
	constructor(private readonly databaseService: DatabaseService) {}

	async create(createUserDto: UserDto) {
		const passwd = await this.hashPassword(createUserDto.passwd);

		return this.databaseService.user.create({
			data: {
				...createUserDto,
				passwd,
				role: Role.USER,
			},
		});
	}

	async createAdmin(createUserDto: UserDto) {
		const passwd = await this.hashPassword(createUserDto.passwd);

		return this.databaseService.user.create({
			data: {
				...createUserDto,
				passwd,
				role: Role.ADMIN,
			},
		});
	}

	async hashPassword(password: string) {
		return hash(password, Number(process.env.SALT_ROUNDS));
	}

	async findAll() {
		return this.databaseService.user.findMany();
	}

	async findOneByEmail(email: string) {
		return this.databaseService.user.findUnique({
			where: {
				email,
			},
		});
	}

	async findOneByName(name: string) {
		return this.databaseService.user.findUnique({
			where: {
				name,
			},
		});
	}

	async findOneByEmailUser(email: string) {
		const res = await this.databaseService.user.findUnique({
			where: {
				email,
			},
		});

		if (res) {
			return { name: res.name, email: res.email };
		} else {
			throw new NotFoundException("Usuário não encontrado");
		}
	}

	async findOneByNameUser(name: string) {
		const res = await this.databaseService.user.findUnique({
			where: {
				name,
			},
		});

		if (res) {
			return { name: res.name, email: res.email };
		} else {
			throw new NotFoundException("Usuário não encontrado");
		}
	}

	async findOne(id: string) {
		return this.databaseService.user.findUnique({
			where: {
				id,
			},
		});
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		try {
			const updateUser = await this.databaseService.user.update({
				where: {
					id,
				},
				data: updateUserDto,
			});
			return {
				data: updateUser,
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
		return this.databaseService.user.delete({
			where: {
				id,
			},
		});
	}

	async getRoles(id: string) {
		const user = await this.databaseService.user.findUnique({
			where: {
				id,
			},
		});

		return user.role;
	}
}
