const fs = require('fs')
const path = require('path')
const ncc = require('@zeit/ncc')
const gzipsize = require('gzip-size')
const file = path.resolve(process.cwd(), './diff.js')
const dist = path.resolve(process.cwd(), './dist/index.js')

build()
fs.watchFile(file, () => {
  build()
})

function build () {
  ncc(file, {
    minify: true,
    sourceMap: false
  }).then(({ code }) => {
    fs.writeFileSync(dist, code)
    console.log(new Date().toLocaleString(), 'build success, ', `Gzip size: ${gzipsize.sync(code) / 10e2}kb`)
  }).catch(err => {
    console.error(err)
  })
}
