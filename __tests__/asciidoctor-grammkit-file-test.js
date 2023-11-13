const asciidoctor = require('@asciidoctor/core')()
const registry = asciidoctor.Extensions.create()
require('../asciidoctor-grammkit')(registry)


test('Basic file test', () => {

    asciidoctor.convertFile('./test.adoc', {
        safe: 'unsafe',
        standalone: true,
        to_dir: '../',
        extension_registry: registry

    })

})

test('Prolog file test', () => {

    asciidoctor.convertFile('./prolog.adoc', {
        safe: 'unsafe',
        standalone: true,
        to_dir: '../',
        extension_registry: registry

    })

})

test('SQL file test', () => {

    asciidoctor.convertFile('./sql.adoc', {
        safe: 'unsafe',
        standalone: true,
        to_dir: '../',
        extension_registry: registry

    })

})


test('Bash file test', () => {

    asciidoctor.convertFile('./bash.adoc', {
        safe: 'unsafe',
        standalone: true,
        to_dir: '../',
        extension_registry: registry

    })

})

test('N1QL file test', () => {

    asciidoctor.convertFile('./n1ql.adoc', {
        safe: 'unsafe',
        standalone: true,
        to_dir: '../',
        extension_registry: registry

    })

})
