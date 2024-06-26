<template>
	<div class="about-container">
		<UCard>
			<template #header>
				<h1>Sobre a <span class="app-font">PalAPI</span></h1>
			</template>

			<p>
				A <strong><span class="app-font">PalAPI</span></strong> é uma API RESTful que fornece informações detalhadas sobre os Pals do
				Palworld. Inspirada pela PokeAPI, a PalAPI permite que desenvolvedores e fãs obtenham dados completos sobre os diversos Pals.
			</p>
			<p>Esta API foi desenvolvida por:</p>
			<ul>
				<li>Lucas Gardini Dias</li>
				<li>Gabriel Luiz de Oliveira</li>
				<li>Thiago Aio</li>
			</ul>

			<template #footer>
				<p>
					Nosso objetivo é fornecer uma ferramenta robusta e fácil de usar para todos os entusiastas do Palworld. Esperamos que você goste
					de explorar e utilizar a PalAPI!
				</p>
			</template>
		</UCard>
	</div>
</template>

<script>
export default {
	name: "AboutPage",
};
</script>

<style scoped>
.about-container {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
}

nuxt-card {
	max-width: 600px;
	padding: 20px;
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
	font-size: 24px;
	margin-bottom: 16px;
}

p {
	font-size: 16px;
	margin-bottom: 12px;
}

ul {
	list-style-type: disc;
	padding-left: 20px;
}

li {
	margin-bottom: 8px;
}
</style>
