require('@asciidoctor/core')

module.exports = function (registry) {

    const transform = require('grammkit/lib/util').transform

    registry.block(function () {

        const self = this
        self.named('grammkit')
        self.onContext('listing')


        self.process(function (parent, reader, attrs) {

            let format = ''

            if (attrs.format) {

                if (attrs.format !== 'ebnf' &&
                    attrs.format !== 'pegjs'
                    && attrs.format !== 'ohm') {

                    throw "Invalid format specified"
                }
                else {
                    format = attrs.format
                }
            }
            else {
                format = 'auto'
            }

            let lines = reader.getLines()

            let grammar = ''
            lines.forEach(line => {

                grammar += line
                grammar += '\n'

            })

            let diagram_block = ''
            diagram_block += `<link rel='stylesheet' href='./diagram.css'>`

            let grammar_rules = transform(grammar, format)

            // Each rule parsed gets a separate diagram, so pick them up and add them
            // to the block, one at a time.

            for (let processedGrammar of grammar_rules.procesedGrammars) {

                for (let rule of processedGrammar.rules) {

                    diagram_block += `<div class="railroad-diagram-spacing">`

                    diagram_block += `<span class="railroad-diagram-title">`
                    diagram_block += `<h3 id=${rule.name}>${rule.name}</h3>`
                    diagram_block += `</span>`

                    diagram_block += rule.diagram


                    let expression = processedGrammar.references[rule.name]

                    if (expression) {

                        if (expression.references && expression.references.length > 0) {

                            diagram_block += `<div>`

                            diagram_block += `<span class="railroad-diagram-small-title">references: </span> `
                            for (let reference of expression.references) {

                                diagram_block += `<span class="railroad-diagram-small-title"><a href="#${reference}">${reference}</a></span> `
                            }

                            diagram_block += `</div>`

                        }

                        diagram_block += `<p/>`

                        if (expression.usedBy && expression.usedBy.length) {

                            diagram_block += `<div>`

                            diagram_block += `<span class="railroad-diagram-small-title">Used by: </span> `
                            for (let usedBy of expression.usedBy) {

                                diagram_block += `<span class="railroad-diagram-small-title"><a href="#${usedBy}">${usedBy}</a></span> `
                            }

                            diagram_block += `</div>`
                        }


                    }


                    diagram_block += `</div>`

                }

            }

            return self.createPassBlock(parent, diagram_block)

        })

    })
}