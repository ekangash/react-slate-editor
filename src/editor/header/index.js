import React from 'react';
import propTypes from 'prop-types';

/** Import components from library */
import TextareaAutosize from "@mui/material/TextareaAutosize";

/** Import custom components */
/** Import resources */

/**
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const EditorHeader = ({name, placeholder, minRow, registered, errors, value,className}) => (
    <div className={` ${className}`}>
        <TextareaAutosize
            {...registered}
            className={`text-2xl font-medium focus:outline-none overflow-hidden w-full resize-none`}
            minRows={minRow}
            placeholder={placeholder}
        />
        <div>{errors?.[name] && <p className="text-red-400 text-xs">{errors?.[name]?.message}</p>}</div>
    </div>
)

EditorHeader.propTypes = {
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

EditorHeader.defaultProps = {
    readonly: false,
    disabled: false,
    minRow: 1,
    value: '',
    type: 'text',
    className: '',
    placeholder: '',
    onChange: () => {}
}


export default EditorHeader;