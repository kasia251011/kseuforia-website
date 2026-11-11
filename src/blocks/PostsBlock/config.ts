import { link } from '@/fields/link';
import { Block } from 'payload';

export const PostsBlock: Block = {
  slug: 'postsBlock',
  interfaceName: 'PostsBlock',
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
      defaultValue: 'posts',
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
    plural: 'Bloki: Posty',
    singular: 'Blok: Posty',
  },
};
