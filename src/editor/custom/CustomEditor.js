import React, {useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';

/** 0 Import HOCK function */
/** 1 Import components from depend library */
/** 2 Import icons */
/** 3 Import custom components */
/** 4 Import resources */
// import './editor-js.scss';
import EditorJs from "react-editor-js";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Header from "@editorjs/header"

const CustomEditor = ({ handleInstance}) => {
    const EDITOR_JS_TOOLS = {
        embed: Embed,
        header: Header,
        list: List,
        linkTool: LinkTool,
        quote: Quote,
        checklist: CheckList,
        delimiter: Delimiter,
        inlineCode: InlineCode,
        simpleImage: SimpleImage
    }

    // Editor.js This will show block editor in component
    // pass EDITOR_JS_TOOLS in tools props to configure tools with editor.js
    return (
        <EditorJs
            instanceRef={(instance) => handleInstance(instance)}
            tools={EDITOR_JS_TOOLS}
            data={{}}
            placeholder={`Write from here...`}
        />
    )
}

// Return the CustomEditor to use by other components.

export default CustomEditor
