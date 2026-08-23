import { link } from '@/fields/link';
import type { Block } from 'payload';

export const AnnouncementsBlock: Block = {
  slug: 'announcementsBlock',
  interfaceName: 'AnnouncementsBlock',
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
      type: 'text',
      admin: {
        readOnly: true,
      },
      defaultValue: 'Ogłoszenia',
      label: 'Kolekcja do wyświetlenia',
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
    plural: 'Bloki: Ogłoszenia',
    singular: 'Blok: Ogłoszenia',
  },
};
