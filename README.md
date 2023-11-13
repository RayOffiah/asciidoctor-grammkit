# asciidoctor-grammkit

An Asciidoc extension for converting syntax grammars into RailRoad diagrams.

## Description

The extension reads a block containing an EBNF grammar, and converts the block into a railroad diagram.

```asciidoc

= Test file

[grammkit]
----
start = left ("+" / "-") right
number = digits
digits = "1" / "2" / "3"
left = "("
right = ")"
----
```


Behind the scenes, `asciidoctor-grammkit` uses the most excellent [Grammkit](https://github.com/dundalek/GrammKit) to do all the grunt work, which means the extension can parse `ebnf`, `pegjs`, and `ohm` formats to produce the diagrams.

The extension will produce a set of clickable references along with each diagram in the syntax tree; if you'd prefer to have the diagrams without references (though I'm not sure why you would) then add a `references` option to the `grammkit` tag.

```asciidoc

= Test file

[grammkit, references="false"]
----
start = left ("+" / "-") right
number = digits
digits = "1" / "2" / "3"
left = "("
right = ")"
----
```

You can also supply a `format` parameter to tag:

```asciidoc

= Test file

[grammkit, format="ebnf"]
----
start = left ("+" / "-") right
number = digits
digits = "1" / "2" / "3"
left = "("
right = ")"
----
```

Grammkit is pretty good at working out what sort of syntax language you're using (`ebnf`, `pegjs`, or `ohm`), but if you have a syntax error in your spec, then adding a format will give you error messages which you may find a bit more useful.

## Installation

The extension is set up on npmjs, so you can just install it with the following command line:

```shell
npm install asciidoctor-grammkit
```

## Installation on Antora

The extension works with the [Antora](https://antora.org) technical documentation framework. 
1. Install the extension in Antora's home directory. (This should a valid node installation).
    ```shell
    npm install asciidoctor-grammkit
    ```
1. Add the extension to the `extensions` section of to the Antora playbook
```yaml

  extensions:
    - ./lib/source-url-include-processor.js
    - ./lib/json-config-ui-block-macro.js
    - ./lib/inline-man-macro.js
    - ./lib/multirow-table-head-tree-processor.js
    - ./lib/swagger-ui-block-macro.js
    - ./lib/markdown-block.js
    - asciidoctor-kroki
    - asciidoctor-external-callout
    - asciidoctor-grammkit
```

## Styles!

The extension will generate the diagrams in SVG format, but without a stylesheet, they'r not going to much more than dark patches all over the web page. There's a stylesheet in the node package called `railroad.css`. You should put that wherever the HTML pages are being generated, or add them to your own stylesheet.
Alternatively, just copy them from below:

```css
svg.railroad-diagram {
  background-color: rgb(255,255 ,255);
}
svg.railroad-diagram path {
  stroke-width: 3;
  stroke: black;
  fill: none;
}
svg.railroad-diagram text {
  font: bold 14px monospace;
  text-anchor: middle;
  cursor: pointer;
}
svg.railroad-diagram text.label {
  text-anchor: start;
}
svg.railroad-diagram text.comment {
  font: italic 12px monospace;
}
svg.railroad-diagram rect {
  stroke-width: 3;
  stroke: black;
  fill: hsl(120,100%,90%);
}

```




