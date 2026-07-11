import type { Block } from 'payload';

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
  ],
  labels: {
    plural: 'Bloki: Sekcje sportowe',
    singular: 'Blok: Sekcje sportowe',
  },
};
