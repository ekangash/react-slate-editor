// Import React dependencies.
import React, {useCallback, useMemo, useState} from 'react'
// Import the Slate editor factory.
import {createEditor, Editor, Transforms, Text} from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

import './App.css';

const CustomEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem('content')) || [
            {
                type: 'paragraph',
                children: [{ text: 'A line of text in a paragraph.' }],
            },
        ]
    );

    // Define our own custom set of helpers.
    const CustomEditor = {
        isBoldMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: n => n.bold === true,
                universal: true,
            })

            return !!match
        },

        isCodeBlockActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: n => n.type === 'code',
            })

            return !!match
        },

        toggleBoldMark(editor) {
            const isActive = CustomEditor.isBoldMarkActive(editor)
            Transforms.setNodes(
                editor,
                { bold: isActive ? null : true },
                { match: n => Text.isText(n), split: true }
            )
        },

        toggleCodeBlock(editor) {
            const isActive = CustomEditor.isCodeBlockActive(editor)
            Transforms.setNodes(
                editor,
                { type: isActive ? null : 'code' },
                { match: n => Editor.isBlock(editor, n) }
            )
        },
    }

    // Define a serializing function that takes a value and returns a string.
    const serialize = value => {
        return (
            value
                // Return the string content of each paragraph in the value's children.
                .map(n => Node.string(n))
                // Join them all with line breaks denoting paragraphs.
                .join('\n')
        )
    }

    // Define a deserializing function that takes a string and returns a value.
    const deserialize = string => {
        // Return a value array of children derived by splitting the string.
        return string.split('\n').map(line => {
            return {
                children: [{ text: line }],
            }
        })
    }

    console.log('value', value)

    // Define a rendering function based on the element passed to `props`. We use
    // `useCallback` here to memoize the function for subsequent renders.
    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, []);

    // Define a leaf rendering function that is memoized with `useCallback`.
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, []);


    return (
        // Add the editable component inside the context.
        <Slate
            editor={editor}
            value={value}
            onChange={value => {
                setValue(value)

                const isAstChange = editor.operations.some(
                    op => 'set_selection' !== op.type
                )
                if (isAstChange) {
                    // Save the value to Local Storage.
                    const content = JSON.stringify(value)
                    localStorage.setItem('content', content)
                }
            }}
        >
            <div>
                <button
                    onMouseDown={event => {
                        event.preventDefault()
                        CustomEditor.toggleBoldMark(editor)
                    }}
                >
                    Bold
                </button>
                <button
                    onMouseDown={event => {
                        event.preventDefault()
                        CustomEditor.toggleCodeBlock(editor)
                    }}
                >
                    Code Block
                </button>
            </div>
            <Editable
                // Pass in the `renderLeaf` function.
                renderLeaf={renderLeaf}
                // Pass in the `renderElement` function.
                renderElement={renderElement}
                // Define a new handler which prints the key that was pressed.
                onKeyDown={event => {
                    if (!event.ctrlKey) {
                        return
                    }

                    switch (event.key) {
                        // When "`" is pressed, keep our existing code block logic.
                        case '`': {
                            event.preventDefault()
                            const [match] = Editor.nodes(editor, {
                                match: n => n.type === 'code',
                            })
                            Transforms.setNodes(
                                editor,
                                { type: match ? 'paragraph' : 'code' },
                                { match: n => Editor.isBlock(editor, n) }
                            )
                            break
                        }

                        // When "B" is pressed, bold the text in the selection.
                        case 'b': {
                            event.preventDefault()
                            Transforms.setNodes(
                                editor,
                                { bold: true },
                                // Apply it to text nodes, and split the text node up if the
                                // selection is overlapping only part of it.
                                { match: n => Text.isText(n), split: true }
                            )
                            break
                        }
                    }
                }}
            />
        </Slate>
    )
}

export default CustomEditor;

// Define a React component to render leaves with bold text.
const Leaf = props => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
        >
      {props.children}
    </span>
    )
}

// Define a React component renderer for our code blocks.
const CodeElement = props => {
    return (
        <pre {...props.attributes}>
          <code>{props.children}</code>
        </pre>
    )
}

const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
}