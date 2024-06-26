import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { AppService } from "./app.service";
import { Public } from "./utils/decorators/public";

@ApiTags("Aplicação")
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Public()
	@Get()
	getHello(@Res() response: Response) {
		const returning = this.appService.getMessage();
		response.status(returning.status).send(returning.data);
	}

	@Public()
	@Post("solicitar-acesso")
	async solicitarAcesso(
		@Res() response: Response,
		@Body() body: { email: string; whatsapp: string },
	) {
		const returning = await this.appService.solicitarAcesso(
			body.email,
			body.whatsapp,
		);
		response.status(returning.status).send(returning.data);
	}
}
