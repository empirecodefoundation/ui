import type { Config } from "tailwindcss";

import svgToDataUri from "mini-svg-data-uri";

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  darkMode: "class", // Corrected from ["class"] to "class"

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'base': '1450px',    // Base design size
        'scale-1.1': '1595px', // 1450 * 1.1
        'scale-1.2': '1740px', // 1450 * 1.2
        'scale-1.3': '1885px', // 1450 * 1.3
        'scale-1.4': '2030px', // 1450 * 1.4
        'scale-1.5': '2175px', // 1450 * 1.5
        'scale-1.6': '2320px', // 1450 * 1.6
        'scale-1.7': '2465px', // 1450 * 1.7
        'scale-1.8': '2610px', // 1450 * 1.8
        'scale-1.9': '2755px', // 1450 * 1.9
        'scale-2.0': '2900px', // 1450 * 2.0
      },
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        minecart: ['var(--font-minecart-lcd)'],
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "scan-overlay": {
          "0%": { backgroundPosition: "0% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
        "glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        "digital-scan": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "scan-overlay": "scan-overlay 16s linear infinite",
        'glitch': 'glitch 1s infinite alternate-reverse',
        'digital-scan': 'digital-scan 3s linear infinite',
      },
      fontSize: {
        "heading-random": "calc(8vw + 8vh)",
      },
      lineHeight: {
        "heading-random": "calc(7vw + 7vh)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        'neon-blue': '#00aaff',
        'neon-purple': '#ff00ff',
        'cyber-yellow': '#ffd700',
        'digital-black': '#0c0c0c',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@codaworks/react-glow/tailwind"),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },

    function ({ addUtilities }: any) {
      const newUtilities = {
        ".clip-polygon": {
          "clip-path":
            "polygon(97.448% .734%, 99.706% 5.532%, 99.706% 5.532%, 99.752% 5.637%, 99.793% 5.747%, 99.83% 5.862%, 99.863% 5.981%, 99.89% 6.104%, 99.913% 6.23%, 99.931% 6.359%, 99.944% 6.491%, 99.952% 6.624%, 99.955% 6.758%, 99.955% 37.888%, 99.955% 37.888%, 99.95% 38.064%, 99.937% 38.238%, 99.914% 38.408%, 99.884% 38.572%, 99.846% 38.73%, 99.799% 38.881%, 99.745% 39.024%, 99.684% 39.158%, 99.616% 39.281%, 99.542% 39.394%, 97.566% 42.09%, 97.566% 42.09%, 97.485% 42.212%, 97.411% 42.347%, 97.344% 42.492%, 97.286% 42.648%, 97.235% 42.812%, 97.193% 42.985%, 97.16% 43.164%, 97.136% 43.348%, 97.122% 43.537%, 97.117% 43.73%, 97.117% 56.042%, 97.117% 56.042%, 97.12% 56.207%, 97.131% 56.369%, 97.149% 56.529%, 97.173% 56.685%, 97.204% 56.837%, 97.242% 56.984%, 97.286% 57.125%, 97.336% 57.26%, 97.392% 57.388%, 97.454% 57.507%, 99.644% 61.413%, 99.644% 61.413%, 99.701% 61.523%, 99.753% 61.64%, 99.799% 61.764%, 99.839% 61.893%, 99.874% 62.028%, 99.903% 62.168%, 99.925% 62.311%, 99.941% 62.458%, 99.951% 62.607%, 99.955% 62.759%, 99.955% 94.175%, 99.955% 94.175%, 99.951% 94.328%, 99.941% 94.48%, 99.924% 94.629%, 99.901% 94.774%, 99.871% 94.916%, 99.836% 95.052%, 99.794% 95.183%, 99.747% 95.308%, 99.694% 95.426%, 99.635% 95.536%, 97.44% 99.357%, 97.44% 99.357%, 97.381% 99.452%, 97.319% 99.538%, 97.254% 99.614%, 97.186% 99.682%, 97.115% 99.739%, 97.042% 99.786%, 96.967% 99.824%, 96.891% 99.851%, 96.814% 99.867%, 96.735% 99.873%, 55.872% 99.873%, 55.872% 99.873%, 55.769% 99.863%, 55.669% 99.835%, 55.571% 99.789%, 55.476% 99.727%, 55.385% 99.647%, 55.299% 99.552%, 55.219% 99.441%, 55.144% 99.316%, 55.076% 99.177%, 55.016% 99.025%, 54.526% 97.654%, 54.526% 97.654%, 54.46% 97.488%, 54.386% 97.337%, 54.305% 97.2%, 54.217% 97.08%, 54.123% 96.976%, 54.024% 96.889%, 53.921% 96.821%, 53.815% 96.771%, 53.705% 96.74%, 53.593% 96.73%, 46.357% 96.73%, 46.357% 96.73%, 46.231% 96.743%, 46.109% 96.781%, 45.99% 96.843%, 45.877% 96.929%, 45.77% 97.036%, 45.67% 97.164%, 45.578% 97.311%, 45.495% 97.478%, 45.421% 97.661%, 45.359% 97.861%, 45.094% 98.833%, 45.094% 98.833%, 45.037% 99.017%, 44.97% 99.186%, 44.893% 99.339%, 44.809% 99.474%, 44.717% 99.592%, 44.618% 99.69%, 44.514% 99.769%, 44.406% 99.826%, 44.293% 99.861%, 44.178% 99.873%, 38.784% 99.873%, 3.426% 99.873%, 3.426% 99.873%, 3.351% 99.867%, 3.276% 99.852%, 3.203% 99.828%, 3.131% 99.793%, 3.061% 99.749%, 2.993% 99.696%, 2.927% 99.634%, 2.863% 99.563%, 2.802% 99.484%, 2.744% 99.396%, .388% 95.539%, .388% 95.539%, .325% 95.428%, .269% 95.308%, .218% 95.181%, .173% 95.047%, .135% 94.906%, .103% 94.76%, .078% 94.61%, .06% 94.456%, .049% 94.298%, .046% 94.139%, .046% 62.794%, .046% 62.794%, .049% 62.637%, .06% 62.482%, .077% 62.33%, .102% 62.181%, .133% 62.037%, .17% 61.899%, .213% 61.766%, .262% 61.639%, .318% 61.52%, .378% 61.409%, 2.701% 57.515%, 2.701% 57.515%, 2.767% 57.394%, 2.827% 57.264%, 2.881% 57.126%, 2.928% 56.982%, 2.969% 56.83%, 3.003% 56.673%, 3.029% 56.512%, 3.048% 56.346%, 3.06% 56.177%, 3.064% 56.006%, 3.064% 43.766%, 3.064% 43.766%, 3.058% 43.567%, 3.043% 43.372%, 3.017% 43.182%, 2.982% 42.998%, 2.938% 42.822%, 2.884% 42.654%, 2.822% 42.496%, 2.752% 42.348%, 2.674% 42.213%, 2.588% 42.091%, .482% 39.39%, .482% 39.39%, .404% 39.278%, .332% 39.153%, .267% 39.018%, .21% 38.873%, .161% 38.719%, .121% 38.556%, .088% 38.388%, .065% 38.213%, .05% 38.034%, .046% 37.852%, .046% 6.793%, .046% 6.793%, .048% 6.652%, .057% 6.514%, .071% 6.377%, .091% 6.243%, .115% 6.112%, .145% 5.985%, .18% 5.862%, .221% 5.743%, .265% 5.631%, .315% 5.524%, 2.734% .692%, 2.734% .692%, 2.794% .58%, 2.859% .48%, 2.928% .389%, 3% .31%, 3.076% .242%, 3.155% .186%, 3.235% .142%, 3.318% .11%, 3.403% .09%, 3.488% .084%, 5.991% .084%, 15.856% .084%, 42.774% .084%, 42.774% .084%, 42.887% .095%, 42.998% .129%, 43.105% .184%, 43.208% .26%, 43.305% .356%, 43.396% .47%, 43.48% .601%, 43.556% .75%, 43.624% .914%, 43.682% 1.093%, 44.179% 2.84%, 44.179% 2.84%, 44.242% 3.035%, 44.315% 3.214%, 44.398% 3.375%, 44.49% 3.519%, 44.589% 3.643%, 44.695% 3.747%, 44.807% 3.829%, 44.923% 3.89%, 45.044% 3.927%, 45.167% 3.939%, 54.978% 3.939%, 54.978% 3.939%, 55.104% 3.926%, 55.227% 3.888%, 55.345% 3.825%, 55.459% 3.74%, 55.566% 3.632%, 55.667% 3.504%, 55.759% 3.355%, 55.842% 3.188%, 55.915% 3.004%, 55.978% 2.803%, 56.43% 1.127%, 56.43% 1.127%, 56.488% .942%, 56.555% .773%, 56.631% .62%, 56.716% .484%, 56.808% .366%, 56.907% .267%, 57.011% .188%, 57.12% .131%, 57.232% .096%, 57.348% .084%, 83.987% .084%, 94.144% .084%, 96.672% .084%, 96.672% .084%, 96.761% .091%, 96.849% .112%, 96.934% .146%, 97.018% .194%, 97.099% .254%, 97.176% .327%, 97.251% .412%, 97.321% .508%, 97.387% .616%, 97.448% .734%)",
        },
        ".clip-polygon-mobile": {
          "clip-path":
            "polygon(92.26% .538%, 99.35% 5.013%, 99.35% 5.013%, 99.435% 5.07%, 99.511% 5.13%, 99.58% 5.191%, 99.639% 5.254%, 99.69% 5.319%, 99.732% 5.385%, 99.765% 5.452%, 99.788% 5.521%, 99.802% 5.59%, 99.807% 5.659%, 99.807% 41.595%, 99.807% 41.595%, 99.799% 41.688%, 99.774% 41.779%, 99.732% 41.868%, 99.675% 41.955%, 99.603% 42.04%, 99.516% 42.121%, 99.414% 42.199%, 99.298% 42.273%, 99.168% 42.343%, 99.025% 42.408%, 93.903% 44.546%, 93.903% 44.546%, 93.737% 44.621%, 93.587% 44.702%, 93.452% 44.788%, 93.334% 44.879%, 93.232% 44.974%, 93.148% 45.072%, 93.082% 45.173%, 93.034% 45.277%, 93.005% 45.383%, 92.995% 45.49%, 92.995% 54.81%, 92.995% 54.81%, 93.007% 54.927%, 93.041% 55.043%, 93.099% 55.155%, 93.178% 55.265%, 93.277% 55.371%, 93.398% 55.472%, 93.537% 55.568%, 93.696% 55.657%, 93.873% 55.741%, 94.067% 55.817%, 98.884% 57.534%, 98.884% 57.534%, 99.052% 57.6%, 99.204% 57.672%, 99.34% 57.749%, 99.461% 57.832%, 99.564% 57.918%, 99.65% 58.009%, 99.718% 58.104%, 99.767% 58.201%, 99.797% 58.3%, 99.807% 58.401%, 99.807% 93.837%, 99.807% 93.837%, 99.803% 93.902%, 99.791% 93.966%, 99.77% 94.029%, 99.742% 94.092%, 99.706% 94.153%, 99.662% 94.214%, 99.611% 94.274%, 99.551% 94.332%, 99.485% 94.388%, 99.411% 94.443%, 92.247% 99.421%, 92.247% 99.421%, 92.106% 99.509%, 91.949% 99.59%, 91.776% 99.662%, 91.589% 99.726%, 91.39% 99.781%, 91.18% 99.827%, 90.962% 99.863%, 90.735% 99.89%, 90.503% 99.906%, 90.266% 99.911%, 69.228% 99.911%, 69.228% 99.911%, 68.993% 99.906%, 68.763% 99.89%, 68.539% 99.864%, 68.322% 99.829%, 68.115% 99.784%, 67.917% 99.73%, 67.732% 99.667%, 67.56% 99.596%, 67.402% 99.518%, 67.261% 99.431%, 61.978% 95.848%, 61.978% 95.848%, 61.814% 95.748%, 61.631% 95.656%, 61.431% 95.574%, 61.215% 95.501%, 60.986% 95.438%, 60.745% 95.386%, 60.493% 95.345%, 60.233% 95.315%, 59.965% 95.296%, 59.693% 95.29%, 49.871% 95.29%, 39.997% 95.29%, 39.997% 95.29%, 39.711% 95.297%, 39.432% 95.317%, 39.16% 95.35%, 38.899% 95.395%, 38.649% 95.452%, 38.413% 95.52%, 38.192% 95.599%, 37.989% 95.689%, 37.806% 95.788%, 37.643% 95.896%, 32.979% 99.39%, 32.979% 99.39%, 32.84% 99.483%, 32.682% 99.568%, 32.507% 99.645%, 32.317% 99.713%, 32.114% 99.772%, 31.899% 99.821%, 31.674% 99.86%, 31.44% 99.888%, 31.2% 99.905%, 30.954% 99.911%, 10.32% 99.911%, 10.32% 99.911%, 10.092% 99.906%, 9.867% 99.891%, 9.648% 99.866%, 9.436% 99.833%, 9.232% 99.79%, 9.038% 99.738%, 8.855% 99.678%, 8.684% 99.61%, 8.527% 99.535%, 8.385% 99.452%, .636% 94.452%, .636% 94.452%, .553% 94.395%, .479% 94.336%, .413% 94.275%, .355% 94.213%, .306% 94.149%, .266% 94.084%, .234% 94.018%, .211% 93.951%, .197% 93.883%, .193% 93.815%, .193% 58.395%, .193% 58.395%, .203% 58.294%, .232% 58.196%, .28% 58.1%, .347% 58.006%, .431% 57.916%, .533% 57.83%, .651% 57.748%, .785% 57.671%, .934% 57.599%, 1.098% 57.534%, 5.824% 55.817%, 5.824% 55.817%, 6.015% 55.74%, 6.189% 55.657%, 6.345% 55.568%, 6.482% 55.472%, 6.6% 55.372%, 6.698% 55.267%, 6.775% 55.159%, 6.831% 55.047%, 6.865% 54.933%, 6.877% 54.816%, 6.877% 45.483%, 6.877% 45.483%, 6.867% 45.377%, 6.839% 45.272%, 6.792% 45.17%, 6.727% 45.07%, 6.645% 44.972%, 6.545% 44.879%, 6.43% 44.789%, 6.298% 44.703%, 6.15% 44.622%, 5.988% 44.547%, .958% 42.407%, .958% 42.407%, .818% 42.343%, .691% 42.273%, .578% 42.2%, .478% 42.122%, .392% 42.042%, .322% 41.958%, .266% 41.872%, .226% 41.783%, .201% 41.693%, .193% 41.602%, .193% 5.683%, .193% 5.683%, .198% 5.609%, .214% 5.536%, .24% 5.464%, .277% 5.394%, .324% 5.324%, .38% 5.256%, .446% 5.19%, .522% 5.126%, .607% 5.064%, .702% 5.005%, 8.377% .507%, 8.377% .507%, 8.519% .431%, 8.675% .362%, 8.842% .3%, 9.02% .246%, 9.207% .199%, 9.403% .16%, 9.606% .129%, 9.815% .107%, 10.029% .093%, 10.246% .089%, 15.856% .089%, 30.974% .089%, 30.974% .089%, 31.217% .095%, 31.454% .111%, 31.686% .139%, 31.908% .177%, 32.122% .225%, 32.323% .282%, 32.512% .349%, 32.686% .424%, 32.844% .508%, 32.984% .6%, 37.641% 3.998%, 37.641% 3.998%, 37.804% 4.104%, 37.987% 4.201%, 38.19% 4.289%, 38.409% 4.366%, 38.643% 4.433%, 38.891% 4.489%, 39.15% 4.533%, 39.419% 4.565%, 39.695% 4.585%, 39.977% 4.591%, 59.713% 4.591%, 59.713% 4.591%, 59.982% 4.585%, 60.246% 4.567%, 60.503% 4.538%, 60.752% 4.498%, 60.991% 4.447%, 61.218% 4.386%, 61.433% 4.314%, 61.632% 4.234%, 61.815% 4.144%, 61.979% 4.046%, 67.257% .558%, 67.257% .558%, 67.399% .473%, 67.556% .396%, 67.728% .327%, 67.912% .266%, 68.108% .213%, 68.313% .169%, 68.528% .135%, 68.749% .109%, 68.976% .094%, 69.208% .089%, 83.986% .089%, 90.339% .089%, 90.339% .089%, 90.565% .094%, 90.788% .108%, 91.004% .133%, 91.214% .166%, 91.416% .208%, 91.609% .258%, 91.791% .317%, 91.961% .383%, 92.118% .457%, 92.26% .538%)",
        },
        ".clip-card": {
          "clip-path":
            "polygon(1.399% .158%,98.64% .158%,98.64% .158%,98.831% .169%,99.012% .201%,99.181% .252%,99.335% .32%,99.472% .403%,99.59% .501%,99.685% .61%,99.757% .73%,99.801% .859%,99.817% .994%,99.817% 99.01%,99.817% 99.01%,99.801% 99.146%,99.757% 99.275%,99.685% 99.395%,99.59% 99.504%,99.472% 99.601%,99.335% 99.685%,99.181% 99.753%,99.012% 99.804%,98.831% 99.835%,98.64% 99.846%,26.424% 99.846%,26.424% 99.846%,26.323% 99.843%,26.224% 99.834%,26.127% 99.819%,26.033% 99.799%,25.941% 99.773%,25.853% 99.741%,25.768% 99.705%,25.688% 99.663%,25.613% 99.616%,25.543% 99.565%,21.698% 96.482%,21.698% 96.482%,21.611% 96.418%,21.517% 96.36%,21.416% 96.307%,21.311% 96.262%,21.2% 96.222%,21.086% 96.19%,20.967% 96.164%,20.846% 96.145%,20.722% 96.134%,20.596% 96.13%,1.399% 96.13%,1.399% 96.13%,1.209% 96.119%,1.028% 96.087%,.859% 96.037%,.705% 95.969%,.567% 95.885%,.45% 95.788%,.354% 95.678%,.283% 95.558%,.238% 95.43%,.223% 95.294%,.223% .994%,.223% .994%,.238% .859%,.283% .73%,.354% .61%,.45% .501%,.567% .403%,.705% .32%,.859% .252%,1.028% .201%,1.209% .169%,1.399% .158%)",
        },
        ".clip-sound": {
          "clip-path":
            "polygon(2.019% 3.846%,98.286% 3.846%,98.286% 3.846%,98.395% 3.938%,98.495% 4.2%,98.582% 4.607%,98.656% 5.138%,98.714% 5.769%,98.756% 6.476%,98.778% 7.238%,98.78% 8.03%,98.759% 8.83%,98.714% 9.614%,94.003% 73.064%,94.003% 73.064%,93.658% 77.183%,93.264% 80.952%,92.825% 84.352%,92.345% 87.364%,91.828% 89.967%,91.28% 92.141%,90.704% 93.867%,90.106% 95.124%,89.489% 95.893%,88.857% 96.154%,11.765% 96.154%,11.765% 96.154%,11.151% 95.907%,10.55% 95.18%,9.966% 93.989%,9.404% 92.353%,8.867% 90.29%,8.359% 87.817%,7.885% 84.953%,7.448% 81.715%,7.054% 78.121%,6.705% 74.189%,1.598% 9.708%,1.598% 9.708%,1.55% 8.921%,1.526% 8.114%,1.526% 7.312%,1.547% 6.538%,1.587% 5.816%,1.645% 5.172%,1.719% 4.628%,1.807% 4.21%,1.908% 3.941%,2.019% 3.846%)",
        },
        ".clip-sound-mobile": {
          "clip-path":
            "polygon(2.815% 2.941%, 96.548% 2.941%, 96.548% 2.941%, 96.73% 3.02%, 96.893% 3.242%, 97.034% 3.586%, 97.151% 4.03%, 97.24% 4.555%, 97.298% 5.137%, 97.324% 5.756%, 97.313% 6.392%, 97.264% 7.022%, 97.173% 7.625%, 82.629% 82.673%, 82.629% 82.673%, 82.073% 85.273%, 81.46% 87.642%, 80.796% 89.769%, 80.085% 91.644%, 79.333% 93.258%, 78.545% 94.6%, 77.726% 95.661%, 76.881% 96.431%, 76.016% 96.9%, 75.134% 97.059%, 22.217% 97.059%, 22.217% 97.059%, 21.268% 96.875%, 20.339% 96.332%, 19.435% 95.443%, 18.563% 94.221%, 17.729% 92.679%, 16.941% 90.831%, 16.202% 88.688%, 15.521% 86.265%, 14.903% 83.574%, 14.355% 80.628%, 2.16% 7.454%, 2.16% 7.454%, 2.082% 6.852%, 2.044% 6.233%, 2.042% 5.616%, 2.073% 5.02%, 2.136% 4.463%, 2.226% 3.966%, 2.342% 3.546%, 2.481% 3.223%, 2.639% 3.015%, 2.815% 2.941%);",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
