import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import riot from 'rollup-plugin-riot';

export default {
    entry:  __dirname + '/app.js',
    format: 'cjs',
    dest: __dirname + '/bundle.js',
    sourceMap: false,
    external: ['riot'],
    plugins:[
        resolve({
            jsnext: true,
            main: true
        }),
        riot({ ext: 'html',
            include: __dirname + '/tags/**'
        }),
        commonjs(),
        babel()
    ]
};