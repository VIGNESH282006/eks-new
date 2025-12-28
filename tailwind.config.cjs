/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#082E6D", // Blue
                    red: "#C11336", // Red
                },
                neutral: "#222222",
                "base-content": "#0A0A0A",
                "base-300": "#F2F2F2",
            },
            fontFamily: {
                display: ['Outfit', 'sans-serif'],
                sans: ['Inter Tight', 'sans-serif'],
            },
            animation: {
                "fade-up": "fadeUp 0.5s ease-out forwards",
                "fade-in-down": "fadeInDown 0.8s ease-out forwards",
                "fade-in-up": "fadeInUp 0.8s ease-out forwards",
                "gradient": "gradientShift 3s ease infinite",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeInDown: {
                    "from": { opacity: "0", transform: "translateY(-20px)" },
                    "to": { opacity: "1", transform: "translateY(0)" },
                },
                fadeInUp: {
                    "from": { opacity: "0", transform: "translateY(30px)" },
                    "to": { opacity: "1", transform: "translateY(0)" },
                },
                gradientShift: {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
            },
        },
    },
    plugins: [],
}
