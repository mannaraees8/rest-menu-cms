import { CollectionConfig } from 'payload'
import { setCreatedBy, setModifiedBy } from './hooks/hooks'
import seoFields from './fields/seoFields'

const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'customerName',
  },
  fields: [
    {
      name: 'menuItem',
      label: 'Menu Item',
      type: 'relationship',
      required: true,
      index: true,
      relationTo: 'menuItems',
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
  hooks: {
    beforeChange: [
      async (args) => {
        console.log(args)
        return args
      },
    ],
  },
}

export default Reviews
