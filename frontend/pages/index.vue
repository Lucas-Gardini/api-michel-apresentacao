<script setup lang="ts">
const config = useRuntimeConfig();
const toast = useToast();

console.log(config);

const formActive = ref(false);
const solicitarAcessoForm = ref({
	email: "",
	whatsapp: "",
});

async function enviarSolicitacao() {
	// Valida email válido
	if (!solicitarAcessoForm.value.email.includes("@")) {
		toast.add({
			title: "Email inválido",
			description: "Por favor, insira um email válido.",
			color: "red",
		});
		return;
	}

	try {
		const response = await api.post("/solicitar-acesso", solicitarAcessoForm.value);
		toast.add({
			title: "Solicitação enviada",
			description: response.data ?? "Sua solicitação foi enviada com sucesso. Aguarde o email de confirmação.",
			color: "green",
		});
	} catch (error) {
		console.error(error);
		toast.add({
			title: "Erro",
			description: "Email possivelmente já solicitado/cadastrado. Tente novamente.",
			color: "red",
		});
	}
}
</script>

<template>
	<UContainer class="flex flex-col h-screen">
		<div class="top-0 left-0 fixed bg-app h-screen w-screen z-[-1]"></div>

		<div class="flex flex-col items-center justify-center my-auto mt-52">
			<h1 class="text-6xl font-bold">Bem vindo(a) à <span class="app-font">PalAPI</span></h1>
			<p class="text-xl mt-4 mb-10">A API RESTful de <span class="app-font">Palworld</span></p>
		</div>

		<div class="flex flex-col items-center justify-center h-screen gap-5">
			<div v-if="!formActive">
				<h1 class="text-2xl font-bold text-center mb-5">Tente agora!</h1>

				<UButton @click="formActive = !formActive" class="text-2xl font-bold text-white"> Solicitar Acesso </UButton>
			</div>
			<div class="flex flex-col justify-center min-w-[400px]" v-else>
				<h1>Insira seu email</h1>
				<UInput
					v-model="solicitarAcessoForm.email"
					type="email"
					icon="i-heroicons-envelope"
					size="sm"
					color="white"
					:trailing="false"
					placeholder="exemplo@email.com"
					class="mb-5"
				/>

				<h1>Insira seu WhatsApp</h1>
				<UInput
					v-model="solicitarAcessoForm.whatsapp"
					type="text"
					icon="i-heroicons-phone"
					size="sm"
					color="white"
					:trailing="false"
					placeholder="(99) 99999-9999"
				/>

				<UButton
					@click="enviarSolicitacao"
					class="text-2xl font-bold text-white mt-5 text-center justify-center"
					:ui="{ rounded: 'rounded-full' }"
				>
					Enviar
				</UButton>
			</div>
		</div>
	</UContainer>
</template>
