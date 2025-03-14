// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    devServer: {
        host: "0.0.0.0",
        port: 5173,
    },
    css: [
        "~/assets/css/main.css",
        "~/node_modules/bootstrap/dist/css/bootstrap.min.css"
    ],
    modules: ["@nuxtjs/eslint-module"],
});
