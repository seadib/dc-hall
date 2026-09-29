import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Items (ফটো গ্যালারি)',
  type: 'document',
  fields: [
    defineField({
      name: 'position',
      title: 'Order / Position',
      type: 'number',
    }),
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'title_bn',
      title: 'শিরোনাম (বাংলা)',
      type: 'string',
    }),
    defineField({
      name: 'description_en',
      title: 'Description (English)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description_bn',
      title: 'বিবরণ (বাংলা)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title_en',
      subtitle: 'title_bn',
      media: 'photo',
    },
  },
})
