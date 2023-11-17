let {generate_diagram, generate_diagram_from_text} = require('../asciidoctor-grammkit')
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

test('Just the diagram', () =>{

    let input_document = ` 
start = left ("+" / "-") right
number = digits
`
    let diagram = generate_diagram_from_text(input_document, {})
    console.log(diagram)
})
