/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/no-default-export */
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
//import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import analyze from 'rollup-plugin-analyzer';
import pkg from './package.json' assert { type: 'json' };


const makeExternalPredicate = (externalArr) => {
    if (externalArr.length === 0) {
        return () => false;
    }
    const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
    return (id) => pattern.test(id);
};

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const externalForMui = (context, request, callback) => {
    if (/@mui.+/.test(request)) {
        const name = request.replace(/^.*[\\\/]/, '');
        return callback(null, `root MaterialUI.${name}`);
    }
    callback();
};

const umdGlobals = {
    // TODO: Add all the dependencies that must be exposed as globals here
    externalForMui,
    react: 'React',
    moment: 'moment',
};

/** @type {import('@rollup/plugin-terser').Options} */
const terserConfig = {
    output: { comments: false },
    compress: {
        keep_infinity: true,
        pure_getters: true,
        passes: 10,
    },
    ecma: 5,
    toplevel: false,
};

/** @type {import('rollup').RollupOptions} */
const confEsm = {
    input: 'src/index.ts',
    output: {
        dir: 'dist/esm',
        format: 'es',
        name: 'astrea-react-ds',
        indent: false,
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: 'inline',
        exports: 'named',
    },
    external: makeExternalPredicate([
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ]),
    plugins: [
        //     peerDepsExternal(),
        nodeResolve({ extensions, browser: true }),
        typescript({
            tsconfig: 'tsconfig.esm.json',
        }),
        commonjs({
            include: [/\/node_modules\//],
        }),
        babel({ extensions, include: ['dist/esm'], babelHelpers: 'bundled' }),
        terser(terserConfig),
        analyze(),
    ],
};


/** @type {import('rollup').RollupOptions} */
const confUmd = {
    input: 'src/index.ts',
    output: {
        file: 'dist/umd/index.min.js',
        format: 'umd',
        name: 'astrea-react-ds',
        indent: false,
        sourcemap: 'inline',
        globals: umdGlobals,
    },
    external: makeExternalPredicate([
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ]),
    plugins: [
        //     peerDepsExternal(),
        nodeResolve({ extensions, browser: true }),
        typescript({
            tsconfig: 'tsconfig.umd.json',
        }),
        commonjs({
            include: [/\/node_modules\//],
        }),
        babel({ extensions, include: ['dist/umd'], babelHelpers: 'bundled' }),
        terser(terserConfig),
        analyze(),
    ],
};
//export default [...createConfig('umd')];

export default [confEsm, /*confUmd*/];