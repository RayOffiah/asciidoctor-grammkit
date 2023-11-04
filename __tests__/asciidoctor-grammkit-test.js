const asciidoctor = require('@asciidoctor/core')()
const registry = asciidoctor.Extensions.create()
require('../asciidoctor-grammkit')(registry)


test('Basic Test 1', () => {

    let input_document = ` 
[railroad]
----
start = left ("+" / "-") right
number = digits
----
`

    let converted_doc = asciidoctor.convert(input_document,{safe: 'safe', standalone: true,
        extension_registry: registry})

})
