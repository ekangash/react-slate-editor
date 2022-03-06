import React, {useState} from 'react';
import propTypes from 'prop-types';

/** 0 Import HOCK function */
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor } from 'slate'

/** 1 Import components from depend library */
/** 2 Import icons */
/** 3 Import custom components */
/** 4 Import resources */
/** 5 Import API function */

const defaultValue = [{ type: 'paragraph', children: [{ text: 'Type of the paragraph'}]}];

/**
 * Компонент для
 *
 * @returns {JSX.Element} Сформированные DOM узлы.
 */
const EditorSlate = ({onChange, onSave, value}) => {
    const [editor] = useState(() => withReact(createEditor()));

    return (
        <Slate
            editor={editor}
            value={value ?? defaultValue}
            onChange={onChange}
            contentEditable={false}
        >
            <Editable />
        </Slate>
    )
};

EditorSlate.propTypes = {
    value: propTypes.any,
    onChange: propTypes.func,
    className: propTypes.string,
}

EditorSlate.defaultProps = {
    className: '',
    onChange: () => {},
    value: defaultValue,
}

export default EditorSlate;