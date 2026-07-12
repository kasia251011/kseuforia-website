import type { Field } from 'payload';

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      label: 'Typ',
      type: 'select',
      defaultValue: 'lowImpact',
      options: [
        {
          label: 'Brak',
          value: 'none',
        },
        {
          label: 'Wysoki priorytet',
          value: 'highImpact',
        },
        {
          label: 'Średni priorytet',
          value: 'mediumImpact',
        },
        {
          label: 'Niski priorytet',
          value: 'lowImpact',
        },
        {
          label: 'Landing Page',
          value: 'landingPage',
        },
      ],
      required: true,
    },
    {
      name: 'media',
      label: 'Zdjęcie w tle',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'landingPage'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      label: 'Tekst nad nagłówkiem',
      name: 'aboveHeader',
      type: 'text',
      required: true,
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'lowImpact'].includes(type),
      },
    },
    {
      label: 'Nagłówek',
      name: 'header',
      type: 'text',
      required: true,
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'lowImpact'].includes(type),
      },
    },
    {
      name: 'subheader',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            // HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'landingPage'].includes(type),
      },
      label: false,
    },
  ],
  label: false,
};
