import {ELEMENT_H1, ELEMENT_H5, ELEMENT_PARAGRAPH, withPlaceholders} from '@udecode/plate'

export const withStyledPlaceHolders = (components) =>
  withPlaceholders(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: 'Type a paragraph',
      hideOnBlur: false,
    },
    {
      key: ELEMENT_H1,
      placeholder: 'Untitled',
      hideOnBlur: false,
    },
  ])
