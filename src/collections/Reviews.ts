import { CollectionConfig } from 'payload'
import { beforeChangeLanguageHook, setCreatedBy, setModifiedBy } from './hooks/hooks'
import seoFields from './fields/seoFields'

const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'menuItem',
  },
  fields: [
    {
      name: 'menuItem',
      label: 'Menu Item',
      type: 'relationship',
      relationTo: 'menuItems',
      required: true,
      index: true,
    },
    {
      name: 'customerName',
      label: 'Customer Name',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'number',
      required: true,
    },
    {
      name: 'comment',
      label: 'Comment',
      type: 'richText',
    },
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      required: true,
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
        read: ({ req: { user } }) => !!user,
      },
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      index: true,
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
        read: ({ req: { user } }) => !!user,
      },
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      index: true,
    },
    ...seoFields,
  ],
  access: {
    read: () => true,
  },
}

export default Reviews
