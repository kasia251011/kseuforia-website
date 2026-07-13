import type { Block } from 'payload';

import { link } from '@/fields/link';

export const SportSectionsBlock: Block = {
  slug: 'sportSectionsBlock',
  interfaceName: 'SportSectionsBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'header',
          type: 'text',
          label: 'Nagłówek',
          required: true,
        },
        {
          name: 'subheader',
          type: 'text',
          label: 'Podtytuł',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        readOnly: true,
      },
      defaultValue: 'sport-sections',
      label: 'Kolekcja do wyświetlenia',
      options: [
        {
          label: 'Sekcje sportowe',
          value: 'sport-sections',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        link({
          appearances: false,
          overrides: {
            label: 'Link - Zobacz wszystko',
          },
        }),
      ],
    },
  ],
  labels: {
    plural: 'Bloki: Sekcje sportowe',
    singular: 'Blok: Sekcje sportowe',
  },
};
