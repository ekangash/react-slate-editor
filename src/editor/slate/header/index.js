import React, {useState} from 'react';
import propTypes from 'prop-types';

/** Import components from library */
import {Editable, Slate, withReact} from "slate-react";
import {createEditor} from "slate";

/** Import custom components */
/** Import resources */

const defaultValue = [{ type: 'paragraph', children: [{ text: 'Header'}]}];

/**
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const EditorSlateHeader = ({name, placeholder, onChange, registered, errors, value, className}) => {
    const [editor] = useState(() => withReact(createEditor()));

    console.log('value', value)

    return (
        <div className={` ${className}`}>
            <Slate
                editor={editor}
                value={value ?? defaultValue}
                onChange={onChange}
                contentEditable={false}
            >
                <Editable />
            </Slate>
            <div>{errors?.[name] && <p className="text-red-400 text-xs">{errors?.[name]?.message}</p>}</div>
        </div>
    )
}

EditorSlateHeader.propTypes = {
    label: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    minRow: propTypes.number,
    registered: propTypes.object,
    className: propTypes.string,
    value: propTypes.string,
    placeholder: propTypes.string,
    errorsMessage: propTypes.string,
    readonly: propTypes.bool,
    disabled: propTypes.bool,
    onChange: propTypes.func,
};

EditorSlateHeader.defaultProps = {
    readonly: false,
    disabled: false,
    minRow: 1,
    type: 'text',
    className: '',
    placeholder: '',
    value: defaultValue,
    onChange: () => {}
}


export default EditorSlateHeader;