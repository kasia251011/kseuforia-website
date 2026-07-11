import type { CollectionConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished';
import { generatePreviewPath } from '../../utilities/generatePreviewPath';
import { revalidateDelete, revalidateSportSection } from './hooks/revalidateSportSection';

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';
import { slugField } from 'payload';

export const SportSections: CollectionConfig<'sport-sections'> = {
  slug: 'sport-sections',
  labels: {
    singular: 'Sekcja sportowa',
    plural: 'Sekcje sportowe',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    slug: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['name', 'slug'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'sport-sections',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'sport-sections',
        req,
      }),
    useAsTitle: 'name',
  },
  fields: [
    {
      label: 'Nazwa',
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'cardImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Zdjęcie w karcie',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Zdjęcie w nagłówku',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'ageCategory',
                  type: 'text',
                  label: 'Kategoria wiekowa',
                },
                {
                  name: 'trainings',
                  type: 'text',
                  label: 'Treningi',
                },
              ],
            },
            {
              name: 'signUp',
              type: 'textarea',
              label: 'Zapisy',
            },
            {
              name: 'description',
              label: 'Opis',
              type: 'textarea',
            },
            {
              type: 'group',
              name: 'coach',
              label: 'Trener',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Imię i nazwisko',
                },
                {
                  name: 'contact',
                  type: 'text',
                  label: 'Kontakt',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Zdjęcie',
                },
              ],
            },
          ],
          label: 'Informacje',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateSportSection],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
