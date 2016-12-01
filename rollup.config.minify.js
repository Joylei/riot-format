import uglify from 'rollup-plugin-uglify'
import config from './rollup.config'

const conf = Object.assign({}, config,{
    sourceMap: true,
    dest: 'dist/riot-format.min.js',
    plugins: [].concat(config.plugins).concat(uglify())
})

export default conf