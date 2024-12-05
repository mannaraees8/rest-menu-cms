import { CollectionConfig } from 'payload'
import { setCreatedBy, setModifiedBy } from './hooks/hooks'
import { saniTizeText } from './hooks/helper'
import seoFields from './fields/seoFields'

const MenuItems: CollectionConfig = {
  slug: 'menuItems',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      index: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Menu Item Image',
      relationTo: 'media',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
      access: {
        read: () => true,
      },
      index: true,
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

export default MenuItems
