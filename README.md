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

![image](https://github.com/RayOffiah/asciidoctor-grammkit/blob/main/test-file.png?raw=true)

(If the image link is broken, try clicking on it.)

Behind the scenes, `asciidoctor-grammkit` uses the most excellent [Grammkit](https://github.com/dundalek/GrammKit) to do all the grunt work, which means the extension can parse `ebnf`, `pegjs`, and `ohm` formats to produce the diagrams.
