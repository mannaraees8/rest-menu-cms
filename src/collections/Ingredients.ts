import { CollectionConfig } from 'payload'
import { beforeChangeLanguageHook, setCreatedBy, setModifiedBy } from './hooks/hooks'
import seoFields from './fields/seoFields'

const Ingredients: CollectionConfig = {
  slug: 'ingredients',
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
      name: 'image',
      type: 'upload',
      label: 'Ingredient Image',
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

export default Ingredients
