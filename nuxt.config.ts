// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-03-15",
    imports: {
        dirs: ["composables/**/*", "enums/**/*", "models/**/*", "services/**/*"]
    },
    devtools: { enabled: true },
    devServer: {
        host: "0.0.0.0",
        port: 5173,
    },
    css: [
        "~/assets/css/main.css",
        "~/node_modules/bootstrap/dist/css/bootstrap.min.css",
        "~/node_modules/bootstrap-icons/font/bootstrap-icons.css"
    ],
    nitro: {
        routeRules: {
            "/api/**": { proxy: "http://localhost:5000/api/**" },
            "/images/**": { proxy: "http://localhost:5000/images/**" }
        }
    },
    runtimeConfig: {
        public: {
            backendApiUrl: "/api",
            backendImageUrl: "/images"
        },
        backendApiUrl: "http://localhost:5000/api",
        backendImageUrl: "http://localhost:5000/images"
    },
});