import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest"; // 🔥 Plugin do Jest

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    rules: {
      semi: ["error", "always"], // Forçar ponto e vírgula
      quotes: ["error", "double"], // Forçar aspas duplas
      indent: ["error", 2], // Indentação com 2 espaços
      "no-trailing-spaces": "error", // Remover espaços no fim da linha
    },
  },
  {
    files: ["**/__tests__/**/*.js", "**/*.test.js"], // Aplica regras do Jest apenas aos arquivos de teste
    plugins: { jest: pluginJest },
    languageOptions: { globals: globals.jest }, // Adiciona suporte aos globais do Jest
    rules: pluginJest.configs.recommended.rules, // Usa as regras recomendadas pelo Jest
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
];

export default config;
