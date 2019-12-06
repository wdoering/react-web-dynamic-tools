import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: 'src/index.js',
	output: {
		//file: 'dist/index.js',
		dir: 'dist',
		name: '@zerobytes/react-web-dynamic-tools',
		format: 'esm'
	},
	external: [
		'@material-ui/core',
		'@material-ui/icons',
		'@zerobytes/object-model-js',
		'@zerobytes/seed-object-model',
		'prop-types',
		'react',
		'react-dom',
		'react-intl',
		'react-router-dom'
	],
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		commonjs({
			include: 'node_modules/**'
		})
	]
};
