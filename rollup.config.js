//import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import buble from 'rollup-plugin-buble'

const version = require('./package.json').version

export default {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'riotFormat',
    moduleId: 'riot-format',
    dest: 'dist/riot-format.js',
    exports: 'named',
    sourceMap: true,
    banner: `/*riot-format: v${version}; https://github.com/Joylei/riot-format.git; License: MIT*/`,
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