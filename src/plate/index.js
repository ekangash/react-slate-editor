import React, {useState} from 'react'

import 'tippy.js/dist/tippy.css'


import {
    createPlateUI,
    HeadingToolbar,
    MentionCombobox,
    Plate,
    createAlignPlugin,
    createAutoformatPlugin,
    createBlockquotePlugin,
    createBoldPlugin,
    createCodeBlockPlugin,
    createCodePlugin,
    createExitBreakPlugin,
    createHeadingPlugin,
    createHighlightPlugin,
    createKbdPlugin,
    createImagePlugin,
    createItalicPlugin,
    createLinkPlugin,
    createListPlugin,
    createMediaEmbedPlugin,
    createNodeIdPlugin,
    createParagraphPlugin,
    createResetNodePlugin,
    createSelectOnBackspacePlugin,
    createSoftBreakPlugin,
    createDndPlugin,
    createStrikethroughPlugin,
    createSubscriptPlugin,
    createSuperscriptPlugin,
    createTablePlugin,
    createTodoListPlugin,
    createTrailingBlockPlugin,
    createUnderlinePlugin,
    createComboboxPlugin,
    createMentionPlugin,
    createIndentPlugin,
    createFontColorPlugin,
    createFontBackgroundColorPlugin,
    createDeserializeMdPlugin,
    createDeserializeCsvPlugin,
    createNormalizeTypesPlugin,
    createFontSizePlugin,
    createHorizontalRulePlugin,
    createPlugins,
    createDeserializeDocxPlugin,
    createJuicePlugin,
} from '@udecode/plate'


import {
    createExcalidrawPlugin,
    ELEMENT_EXCALIDRAW,
    ExcalidrawElement,
} from '@udecode/plate-ui-excalidraw'


import { MarkBallonToolbar, ToolbarButtons } from './components/Toolbars'
import { withStyledPlaceHolders } from './components/withStyledPlaceHolders'
import { withStyledDraggables } from './components/withStyledDraggables'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import { MENTIONABLES } from '/mentionables'
import { CONFIG } from './config'
import { VALUES } from './values/values'

// Migrate to v8 - Part 1: https://www.loom.com/share/71596199ad5a47c2b58cdebab26f4642
// Migrate to v8 - Part 2: https://www.loom.com/share/d85c89220ffa4fe2b6f934a6c6530689
// Migrate to v8 - Part 3: https://www.loom.com/share/c1bf20e18d8a42f8a55f8a28ab605148

const id = 'Examples/Playground'

let components = createPlateUI({
    [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
    // customize your components by plugin key
})
components = withStyledPlaceHolders(components)
components = withStyledDraggables(components)

const PlateConfig = () => {
    const plugins = createPlugins(
        [
            createParagraphPlugin(),
            createBlockquotePlugin(),
            createTodoListPlugin(),
            createHeadingPlugin(),
            createImagePlugin(),
            createHorizontalRulePlugin(),
            createLinkPlugin(),
            createListPlugin(),
            createTablePlugin(),
            createMediaEmbedPlugin(),
            createExcalidrawPlugin(),
            createCodeBlockPlugin(),
            createAlignPlugin(CONFIG.align),
            createBoldPlugin(),
            createCodePlugin(),
            createItalicPlugin(),
            createHighlightPlugin(),
            createUnderlinePlugin(),
            createStrikethroughPlugin(),
            createSubscriptPlugin(),
            createSuperscriptPlugin(),
            createFontColorPlugin(),
            createFontBackgroundColorPlugin(),
            createFontSizePlugin(),
            createKbdPlugin(),
            createNodeIdPlugin(),
            createDndPlugin(),
            createIndentPlugin(CONFIG.indent),
            createAutoformatPlugin(CONFIG.autoformat),
            createResetNodePlugin(CONFIG.resetBlockType),
            createSoftBreakPlugin(CONFIG.softBreak),
            createExitBreakPlugin(CONFIG.exitBreak),
            createNormalizeTypesPlugin(CONFIG.forceLayout),
            createTrailingBlockPlugin(CONFIG.trailingBlock),
            createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
            createComboboxPlugin(),
            createMentionPlugin(),
            createDeserializeMdPlugin(),
            createDeserializeCsvPlugin(),
            createDeserializeDocxPlugin(),
            createJuicePlugin(),
        ],
        {
            components,
        }
    )


    console.log('VALUES.playground', VALUES.playground);


    return (
        <div style={{maxWidth: '1200px', margin: '5rem auto'}}>
            <DndProvider backend={HTML5Backend}>
                <Plate
                    id={id}
                    editableProps={CONFIG.editableProps}
                    initialValue={VALUES.playground}
                    plugins={plugins}
                >
                    <HeadingToolbar>
                        <ToolbarButtons />
                        {/*<MarkBallonToolbar />*/}
                    </HeadingToolbar>

                    <MarkBallonToolbar />

                    {/*<MentionCombobox items={MENTIONABLES} />*/}
                </Plate>
            </DndProvider>
        </div>
    )
}

export default PlateConfig;
