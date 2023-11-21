module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:import/recommended",
		"plugin:@typescript-eslint/recommended",
		"plufin:import/typescript",
		"plugin:svelte/recommended",
		"prettier",
	],
	settings: {
		"import/resolver": {
			typescript: true,
			node: true,
		},
	},
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		extraFileExtensions: [".svelte"],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	overrides: [
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
			},
		},
	],
};
