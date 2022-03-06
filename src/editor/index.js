import React from 'react';
import propTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';

/** 0 Import HOCK function */
/** 1 Import components from depend library */
/** 2 Import icons */
/** 3 Import custom components */
/** 4 Import resources */
/** 5 Import API function */
import { createReactEditorJS } from 'react-editor-js';





/**
 * Компонент для
 *
 * @returns {JSX.Element} Сформированные DOM узлы.
 */
const Editor = ({onChange, onSave, data}) => {
    const [editorTools, setEditorTools] = useState();
    const ReactEditorJS = createReactEditorJS();
    const editorCore = useRef(null);

    useEffect(() => {
        (async () => {
            const tools = (await import('./constants')).EDITOR_JS_TOOLS;
            setEditorTools(tools)
        })();

    }, []);

    const handleInitialize = useCallback((instance) => {
        editorCore.current = instance
    }, [])


    const handleSave = useCallback(async () => {
        const savedData = await editorCore.current.save();
        onChange(savedData);
    }, [])


    let editorComponent = !editorTools ? (
        'Loading...'
    ) : (
        <ReactEditorJS
            value={data}
            onInitialize={handleInitialize}
            tools={editorTools}
            onChange={handleSave}
        />
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {editorComponent}
        </div>
    )
};

Editor.propTypes = {
    data: propTypes.object,
    onChange: propTypes.func.isRequired,
    className: propTypes.string,
}

Editor.defaultProps = {
    className: '',
    data: {},
}

export default Editor;