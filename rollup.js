import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: 'src/index.js',
	treeshake: true,
	output: {
		//file: 'dist/index.js',
		dir: 'dist',
		name: '@zerobytes/react-web-dynamic-tools',
		format: 'esm',
		sourcemap: true
	},
	external: [
		'@material-ui/core',
		'@material-ui/icons',
		'@zerobytes/object-model-js',
		'prop-types',
		'react',
		'react-dom',
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
