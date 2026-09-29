import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'developerProfile',
  title: 'Developer Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name_en',
      title: 'Developer Name EN',
      type: 'string',
    }),
    defineField({
      name: 'name_bn',
      title: 'নাম (বাংলা)',
      type: 'string',
    }),
    defineField({
      name: 'lead_en',
      title: 'Lead Bio EN',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'lead_bn',
      title: 'বায়ো (বাংলা)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'portrait',
      title: 'Developer Portrait',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'name_en',
      subtitle: 'lead_en',
      media: 'portrait',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Developer Profile',
        subtitle: subtitle || 'Developer',
        media: (media && typeof media === 'object' && media.asset) ? media : undefined,
      }
    },
  },
})

