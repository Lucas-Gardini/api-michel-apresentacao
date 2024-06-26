<script setup lang="ts">
const links = [
	{
		label: "PalAPI",
		labelClass: "app-font",
	},
	{
		label: "Início",
		icon: "i-heroicons-home",
		to: "/",
	},
	{
		label: "Sobre",
		icon: "i-heroicons-information-circle",
		to: "/sobre",
	},
	{
		label: "Documentação API",
		icon: "i-heroicons-globe-alt",
		to: "http://localhost:3000" + "/api",
	},
	{
		label: "Área Restrita",
		icon: "i-heroicons-lock-closed",
		to: "/acesso",
	},
];

useHead({
	title: "PalAPI",
	meta: [{ name: "description", content: "A API RESTful de Palworld!" }],
});
</script>

<template>
	<div>
		<UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800 px-5" />

		<ClientOnly>
			<slot />
		</ClientOnly>
	</div>
</template>
