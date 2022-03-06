import React, {Fragment, useState} from 'react';
import dynamic from "next/dynamic";
import {connect} from "react-redux";

let CustomEditor = dynamic(() => import('./CustomEditor'), {
    ssr: false
});

const EditorCustom = () => {
    let [editorInstance, setEditorInstance] = useState({}) // to get the instance of editor.Js

    const handleInstance = (instance) => {
        setEditorInstance(instance)
    }

    const saveArticle = async (e) => {
        e.preventDefault()

        // get the editor.js content and save it to server
        const savedData = await editorInstance.save();

        const data = {
            description: JSON.stringify(savedData),
        }

        // Clear all the unused images from server
    }

    return (
        <Fragment>
            <button onClick={saveArticle}>Save</button>
            {CustomEditor && <CustomEditor handleInstance={handleInstance} />}
        </Fragment>
    );
}

export default connect(state => state)(EditorCustom);
