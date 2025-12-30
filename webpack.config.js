/**
 * Configuración Webpack — Clarity 3D Viewer
 * Basada en liferay-sample-custom-element-4
 */

const path = require("path");
const webpack = require("webpack");

const DEVELOPMENT = process.env.NODE_ENV === "development";
const WEBPACK_SERVE = !!process.env.WEBPACK_SERVE;

module.exports = {
	devServer: {
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
		port: 3000,
		static: [
			{
				directory: path.join(__dirname, "public"), // Para index.html
			},
			{
				directory: path.join(__dirname, "build"), // Para index.js generado
			}
		],
		historyApiFallback: true,
		open: true,
		hot: true,
	},

	devtool: DEVELOPMENT ? "source-map" : false,

	entry: {
		index: "./assets/index.js",
	},

	experiments: {
		outputModule: true,
	},

	mode: DEVELOPMENT ? "development" : "production",

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},

	resolve: {
		extensions: [".js", ".jsx"],
	},

	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},

	optimization: {
		minimize: !DEVELOPMENT,
	},

	output: {
		clean: true,
		environment: {
			dynamicImport: true,
			module: true,
		},

		// Salida sin hash: Liferay suele apuntar a un nombre fijo (index.js).
		filename: "[name].js",

		library: { type: "module" },

		path: path.resolve("build", "static"),

		// Rutas relativas para evitar problemas al embeber en portal / context path.
		publicPath: "",
	},

	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1, // seguimos con 1 archivo JS único
		}),
	],
};
