/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/tw-elements/dist/js/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                surface: "#181818", // Fond sombre élégant
                "surface-dark": "#101010", // Fond encore plus foncé
                primary: "#00bcd4", // Bleu clair (effet moderne)
                "primary-accent-300": "#03a9f4", // Bleu plus intense au survol
            },
        },
    },
    plugins: [require("tw-elements/dist/plugin")],
};
