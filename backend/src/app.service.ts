import { Injectable } from "@nestjs/common";
import { HttpResponse, IServiceResponse } from "semantic-response";
import { UserService } from "./user/user.service";
import axios from "axios";

@Injectable()
export class AppService {
	constructor(private userService: UserService) {}

	getMessage(): IServiceResponse<string> {
		return HttpResponse.ok("Calmae Paizão!");
	}

	private generateRandomPassword(): string {
		const length = 8;
		const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let retVal = "";
		for (let i = 0, n = charset.length; i < length; ++i) {
			retVal += charset.charAt(Math.floor(Math.random() * n));
		}
		return retVal;
	}

	async solicitarAcesso(email: string, whatsapp: string): Promise<IServiceResponse<string>> {
		whatsapp = whatsapp.replace(/\D/g, "");

		const password = this.generateRandomPassword();

		if (await this.userService.findOneByEmail(email)) {
			return HttpResponse.conflict({ message: "Email já cadastrado" });
		}

		await this.userService.create({
			email,
			passwd: password,
			name: email.split("@")[0],
		});

		const result = await axios.post(
			process.env.WHATSAPI_URL,
			{
				phone: [!whatsapp.startsWith("55") ? `55${whatsapp}` : whatsapp],
				message: `Olá ${email}! Seu acesso a PalAPI foi liberado! Sua senha de acesso é: ${password}`,
			},
			{
				headers: {
					"x-api-key": "[REDACTED]",
				},
			}
		);

		console.log(result.data);

		return HttpResponse.ok(`Solicitação de acesso para ${email} efetuada com sucesso!`);
	}
}
