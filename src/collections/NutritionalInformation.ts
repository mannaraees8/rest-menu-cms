import { CollectionConfig } from 'payload'
import { beforeChangeLanguageHook, setCreatedBy, setModifiedBy } from './hooks/hooks'
import seoFields from './fields/seoFields'

const NutritionalInformation: CollectionConfig = {
  slug: 'nutritional-information',
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
      name: 'calories',
      label: 'Calories',
      type: 'number',
      required: true,
    },
    {
      name: 'fat',
      label: 'Fat (g)',
      type: 'number',
      required: true,
    },
    {
      name: 'carbohydrates',
      label: 'Carbohydrates (g)',
      type: 'number',
      required: true,
    },
    {
      name: 'protein',
      label: 'Protein (g)',
      type: 'number',
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

export default NutritionalInformation
