require('@asciidoctor/core')
const grammkit = require('grammkit')


module.exports = function (registry) {

    const grammkit = require('grammkit')
    const parse = require('pegjs/lib/parser').parse

    registry.block(function () {

        const self = this
        self.named('grammkit')
        self.onContext('listing')

        self.process(function (parent, reader) {

            let lines = reader.getLines()

            let grammar = ''
            lines.forEach(line => {

                grammar += line
                grammar += '\n'

            })

            let diagram_block = ''
            diagram_block += `<link rel='stylesheet' href='./app.css'>`
            diagram_block += `<link rel='stylesheet' href='./diagram.css'>`

            let grammar_rules = parse(grammar)

            // Each rule parsed gets a separate diagram, so pick them up and add them
            // to the block, one at a time.
            grammar_rules.rules.forEach(rule => {

                let diagram_image = grammkit.diagram(rule)
                diagram_block += `<div class="grammar-diagram-spacing">`

                diagram_block += `<span class=grammar-diagram-title>`
                diagram_block += `<h3 id=${rule.name}>${rule.name}</h3>`
                diagram_block += `</span>`

                diagram_block += diagram_image

                diagram_block += `<div>`
                diagram_block += `</div>`

                diagram_block += `</div>`
            })


            return self.createPassBlock(parent, diagram_block)

        })

    })
}