import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hallInfo',
  title: 'Hall History & Super',
  type: 'document',
  fields: [
    defineField({
      name: 'hostel_title_en',
      title: 'Hostel Title EN',
      type: 'string',
    }),
    defineField({
      name: 'hostel_title_bn',
      title: 'Hostel Title BN',
      type: 'string',
    }),
    defineField({
      name: 'hall_super_name_en',
      title: 'Hall Super Name (English)',
      type: 'string',
    }),
    defineField({
      name: 'hall_super_name_bn',
      title: 'হল সুপার নাম (বাংলা)',
      type: 'string',
    }),
    defineField({
      name: 'hall_super_photo',
      title: 'Hall Super Photo',
      type: 'image',
    }),
    defineField({
      name: 'hall_super_bio_en',
      title: 'Hall Super Bio (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'hall_super_bio_bn',
      title: 'হল সুপার বাণী (বাংলা)',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'hostel_title_en',
      subtitle: 'hall_super_name_en',
      media: 'hall_super_photo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hall Information',
        subtitle: subtitle ? `Super: ${subtitle}` : '',
        media: (media && typeof media === 'object' && media.asset) ? media : undefined,
      }
    },
  },
})

