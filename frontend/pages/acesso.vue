<script setup lang="ts">
import type { FormError } from "#ui/types";

const toast = useToast();

const state = reactive({
	email: "",
	password: undefined,
	loggedIn: false,
	palsearch: undefined,
});

const pal = ref({
	id: 0,
	regionId: 0,
	palNumber: 0,
	name: "",
	element: "",
	heal: 0,
	atk: 0,
	def: 0,
	craft: "",
	companionSkill: "",
	createdAt: "",
	updatedAt: "",
});

const validate = (state: any): FormError[] => {
	const errors = [];
	if (!state.email) errors.push({ path: "email", message: "Campo obrigatório" });
	if (!state.password) errors.push({ path: "password", message: "Campo obrigatório" });
	return errors;
};

async function login() {
	const errors = validate(state);
	if (errors.length) return;

	try {
		const response = await api.post("/auth/login", {
			email: state.email,
			passwd: state.password,
		});

		const token = response.data.accessToken;
		const expiresIn = response.data.tokenExpiresIn; // Formato -> 00h

		const now = new Date();
		const expires = new Date(now.getTime() + expiresIn.split("h")[0] * 60 * 60 * 1000);

		localStorage.setItem("token", token);
		localStorage.setItem("expires", expires.toString());
		localStorage.setItem("email", state.email!);

		state.loggedIn = true;
	} catch (error) {
		console.error(error);
	}
}

async function buscar() {
	try {
		const response = await api.get(`/pal/${state.palsearch}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});

		pal.value = response.data;
	} catch (error) {
		toast.add({
			title: "Erro",
			description: "Pal não encontrado.",
			color: "red",
		});
		console.error(error);
	}
}

async function logout() {
	localStorage.removeItem("token");
	localStorage.removeItem("expires");
	localStorage.removeItem("email");

	state.loggedIn = false;
}

function getPalImage() {
	return String(pal.value.palNumber).padStart(3, "0");
}

function getMapping() {
	const result = (dbMapping as any)[pal.value.element];
	console.log(result);
	return result;
}

onMounted(() => {
	const token = localStorage.getItem("token");
	const expires = localStorage.getItem("expires");
	const email = localStorage.getItem("email");

	if (token && expires) {
		const now = new Date();
		const expiresDate = new Date(expires);

		if (now < expiresDate) {
			state.loggedIn = true;
		}

		state.email = email!;
	}
});
</script>

<template>
	<UContainer class="mt-5">
		<div v-if="!state.loggedIn">
			<UCard>
				<template #header>
					<h1>Acessar a <span class="app-font">PalAPI</span></h1>
				</template>

				<UForm :validate="validate" :state="state" class="space-y-4" @submit="login">
					<UFormGroup label="Email" name="email">
						<UInput v-model="state.email" />
					</UFormGroup>

					<UFormGroup label="Senha" name="password">
						<UInput v-model="state.password" type="password" />
					</UFormGroup>
				</UForm>

				<template #footer>
					<UButton color="primary" @click="login"> Entrar </UButton>
				</template>
			</UCard>
		</div>
		<div v-else>
			<UCard>
				<template #header>
					<h1 class="app-font">PalAPI - {{ state.email }}</h1>
				</template>

				<UFormGroup label="Buscar Pal" name="palsearch">
					<UInput v-model="state.palsearch" @keydown.enter="buscar" />
				</UFormGroup>

				<div v-if="pal.id" class="w-full py-6" style="width: 100%">
					<div class="flex items-center my-2 gap-2 mb-7">
						<UAvatar :src="`/paldeck/${getPalImage()}.png`" alt="Pal" size="3xl" />
						<h1 class="text-6xl app-font">{{ pal.name }}</h1>
					</div>

					<ul class="space-y-2">
						<li><strong>ID:</strong> {{ pal.id }}</li>
						<li><strong>Nome:</strong> {{ pal.name }}</li>
						<!-- <li><strong>Região ID:</strong> {{ pal.regionId }}</li> -->
						<li><strong>Número do Pal:</strong> {{ pal.palNumber }}</li>
						<li class="flex flex-row gap-2 items-center">
							<strong>Elemento:</strong>
							<img v-for="element of getMapping()" :src="`/elements/${element}.png`" alt="Elemento" class="w-6 h-6 mt-1" />
						</li>
						<li><strong>Heal:</strong> {{ pal.heal }}</li>
						<li><strong>ATK:</strong> {{ pal.atk }}</li>
						<li><strong>DEF:</strong> {{ pal.def }}</li>
						<li><strong>Craft:</strong> {{ pal.craft }}</li>
						<li><strong>Habilidade de Companheiro:</strong> {{ pal.companionSkill }}</li>
						<li><strong>Criado em:</strong> {{ new Date(pal.createdAt).toLocaleString() }}</li>
						<li><strong>Atualizado em:</strong> {{ new Date(pal.updatedAt).toLocaleString() }}</li>
					</ul>
				</div>

				<template #footer>
					<div class="flex gap-5 w-full justify-between">
						<UButton color="primary" @click="buscar"> Buscar </UButton>

						<!-- Logout -->
						<UButton color="red" @click="logout"> Sair </UButton>
					</div>
				</template>
			</UCard>
		</div>
	</UContainer>
</template>
