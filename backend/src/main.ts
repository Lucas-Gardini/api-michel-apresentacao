import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as chalk from "chalk";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("PalAPI")
		.setDescription("API de consulta de Pals")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	app.useGlobalPipes(new ValidationPipe());
	app.enableCors();

	await app.listen(3000);
	console.log(
		`\n${chalk.blue("[APPLICATION]")} Running on: ${await app.getUrl()}`,
	);
}
bootstrap();
