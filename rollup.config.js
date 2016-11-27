//import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import buble from 'rollup-plugin-buble'

export default {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'riotFormat',
    moduleId: 'riot-format',
    dest: 'dist/riot-format.js',
    exports: 'named',
    sourceMap: true,
    plugins:[
        resolve({
            jsnext: true,
            main: true
        }),
        buble({
            modules: true
        })
    ]
}