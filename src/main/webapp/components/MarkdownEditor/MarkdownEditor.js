import React, { useState, useEffect, useMemo } from "react";

import { Editor } from "@bytemd/react";
import breaks from "@bytemd/plugin-breaks";
import footnotes from "@bytemd/plugin-footnotes";
import frontmatter from "@bytemd/plugin-frontmatter";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
//import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import gemoji from "@bytemd/plugin-gemoji";

//import ja from "bytemd/lib/locales/ja.json";

import "github-markdown-css/github-markdown-light.css";
import "highlight.js/styles/vs.css";
import "katex/dist/katex.css";
import "bytemd/dist/index.min.css";
import "./MarkdownEditor.css";

const pluginNames = [
    "breaks",
    "gfm",
    "footnotes",
    "frontmatter",
    "gemoji",
    "highlight",
    "math",
    //"medium-zoom",
    "mermaid"
];

const pluginNamesEnable = pluginNames.reduce(
    (acc, p) => ((acc[p] = true), acc),
    {}
);

const MarkdownEditor = () => {
    const [value, setValue] = useState("");
    const [enabled, setEnabled] = useState(pluginNamesEnable);

    const plugins = useMemo(
        () =>
            [
                enabled.breaks && breaks(),
                enabled.footnotes && footnotes(),
                enabled.frontmatter && frontmatter(),
                enabled.gemoji && gemoji(),
                enabled.gfm && gfm(),
                enabled.highlight && highlight(),
                enabled.math && math(),
                //enabled.mdx && mdx(),
                //enabled["medium-zoom"] && mediumZoom(),
                enabled.mermaid && mermaid()
            ].filter((x) => x),
        [enabled]
    );

    const uploadDummy = (files) => {
        return Promise.all(
            files.map((file) => {
                console.log(file)
                return {
                    title : file.name,
                    url: "https://picsum.photos/id/1050/1600/900"
                };
            })
        );
    };

    useEffect(() => {
        import("../../assets/markdown/demo-markdown.md")
            .then((res) => {
                fetch(res.default)
                    .then((res) => res.text())
                    .then((res) => setValue(res))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <Editor
            value={value}
            plugins={plugins}
            //locale={ja}
            uploadImages={uploadDummy}
            onChange={(v) => {
                setValue(v);
            }}
        />
    );
};

export default MarkdownEditor;
