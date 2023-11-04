require('@asciidoctor/core')
const grammkit = require('grammkit')


module.exports = function (registry) {

    const grammkit = require('grammkit')
    const parse = require('pegjs/lib/parser').parse

    registry.block(function () {

        const self = this
        self.named('grammkit')
        self.onContext('listing')

        function buildReferenceMap(grammar_rules) {

            let referencesMap = {}

            grammar_rules.rules.forEach(rule => {

                if (rule.expression.elements && rule.expression.elements.length > 0) {

                    rule.expression.elements.forEach(element => {

                        if (element.type === 'rule_ref') {

                            // See if we have an entry in the map for this reference.

                            found_referencee = referencesMap[element.name]

                            if (!found_referencee) {

                                referencesMap[element.name] = new Set()
                            }

                            // Now just drop in the owner of the record into the
                            // set.

                            referencesMap[element.name].add(rule.name)
                        }
                    })
                }

            })


            return referencesMap
        }

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

            const reference_map = buildReferenceMap(grammar_rules)

            grammar_rules.rules.forEach(rule => {

                let diagram_image = grammkit.diagram(rule)
                diagram_block += `<div class="grammar-diagram-spacing">`

                diagram_block += `<span class="grammar-diagram-title">`
                diagram_block += `<h3 id=${rule.name}>${rule.name}</h3>`
                diagram_block += `</span>`

                diagram_block += diagram_image

                if (rule.expression.elements && rule.expression.elements.length > 0) {

                    diagram_block += `<div>`
                    diagram_block += `<span class="grammar-diagram-subtitle">`
                    diagram_block += `uses: `

                    rule.expression.elements.forEach(element => {

                        if (element.type === 'rule_ref') {

                            diagram_block += `<a href="#${element.name}">${element.name}</a> `
                        }

                    })

                    diagram_block += `</span>`
                    diagram_block += `</div>`
                }

                referencee = reference_map[rule.name]

                if (referencee) {

                    diagram_block += `<div>`
                    diagram_block += `<span class="grammar-diagram-subtitle">`
                    diagram_block += `used by: `

                    // Don't ever use a set again!

                    for (let item of referencee) {

                        diagram_block += `<a href="#${item}">${item}</a> `
                    }

                    diagram_block += `</span>`
                    diagram_block += `</div>`
                }

                diagram_block += `</div>`
            })


            return self.createPassBlock(parent, diagram_block)

        })

    })
}