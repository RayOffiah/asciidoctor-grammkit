const asciidoctor = require('@asciidoctor/core')()
const registry = asciidoctor.Extensions.create()
require('../asciidoctor-grammkit')(registry)


test('Basic file test', () => {

    asciidoctor.convertFile('./test.adoc', {
        safe: 'safe',
        standalone: true,
        extension_registry: registry

    })

})

test('Prolog file test', () => {

    asciidoctor.convertFile('./prolog.adoc', {
        safe: 'safe',
        standalone: true,
        extension_registry: registry

    })
})



