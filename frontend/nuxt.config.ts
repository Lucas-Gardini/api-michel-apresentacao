// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	devServer: { port: 80 },
	modules: ["@nuxt/ui", "@formkit/auto-animate"],
	css: ["assets/css/main.scss"],
});
