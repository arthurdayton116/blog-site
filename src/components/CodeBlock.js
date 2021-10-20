import React from "react";
import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";

const CustomCodeBlock = (props) => {
    // if any language selected or javascript by default

    const { className, copy, children } = props;

    const language =
        className?.split("-")[0] === "language"
            ? className.split("-")[1]
            : "javascript";

    const highlight =
        className?.split("-")[2] === "highlight"
            ? className.split("-")[3].replace('_','-')
            : "";

    return copy ? (
        <CopyBlock
            text={children}
            language={language}
            theme={dracula}
            wrapLines
            codeBlock
        />
    ) : (
        <CodeBlock highlight={highlight} text={children} language={language} theme={dracula} wrapLines />
    );
};


export default CustomCodeBlock;
