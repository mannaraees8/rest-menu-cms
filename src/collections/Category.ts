import { CollectionConfig } from 'payload'
import { setCreatedBy, setModifiedBy } from './hooks/hooks'
import { saniTizeText } from './hooks/helper'
import seoFields from './fields/seoFields'
import { HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Name',
      type: 'text',
      required: true,
      index: true, // Index the title for fast search
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      editor: lexicalEditor({
        //@ts-ignore
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature(), // Key for built-in features
        ],
      }),
    },
    {
      name: 'image', // required
      type: 'upload', // required
      label: 'Category Image',
      required: false,
      relationTo: 'media',
    },
    {
      name: 'isActive', // required
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
      access: {
        read: () => true,
      },
      label: 'Active',
      defaultValue: true,
      index: true, // Index isActive for faster filtering by active/inactive
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Created By',
      hooks: {
        beforeChange: [setCreatedBy],
      },
      access: {
        read: ({ req: { user } }) => (user ? true : false),
      },
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      index: true, // Index createdBy for fast retrieval of user who created the category
    },
    {
      name: 'modifiedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Modified By',
      hooks: {
        beforeChange: [setModifiedBy],
      },
      access: {
        read: ({ req: { user } }) => (user ? true : false),
      },
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      index: true, // Index modifiedBy for fast retrieval of user who modified the category
    },
    ...seoFields,
  ],
  access: {
    read: () => true,
  },
}

export default Categories
