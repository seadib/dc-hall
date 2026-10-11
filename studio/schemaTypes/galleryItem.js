import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Items (ফটো গ্যালারি)',
  type: 'document',
  description: '📸 হলের দৈনন্দিন ফটো গ্যালারি — একসাথে অনেক ফটো আপলোড, রিঅর্ডার ও ক্যাপশন দিন।',
  fields: [
    defineField({
      name: 'batch',
      title: 'Batch / ব্যাচ',
      type: 'string',
      options: {
        list: [
          { title: 'HSC-27 Gallery', value: 'HSC-27' },
          { title: 'HSC-28 Gallery', value: 'HSC-28' },
          { title: 'HSC-29 Gallery', value: 'HSC-29' },
          { title: 'HSC-30 Gallery', value: 'HSC-30' },
          { title: 'General / All Batches (সাধারণ গ্যালারি)', value: 'all' },
        ],
      },
      initialValue: 'HSC-27',
      description: 'এই কালেকশনটি কোন ব্যাচের ফটো গ্যালারি তা নির্বাচন করুন।',
    }),
    defineField({
      name: 'gallery_title',
      title: 'Gallery Collection Title (ঐচ্ছিক)',
      type: 'string',
      description: 'কালেকশনের কাস্টম নাম (খালি রাখলে ব্যাচের নাম দেখাবে)।',
    }),
    defineField({
      name: 'photos',
      title: 'Gallery Photos (গ্যালারি ফটোসমূহ — একসাথে ড্র্যাগ ও ড্রপ)',
      type: 'array',
      description: '📸 একসাথে যত ইচ্ছা ছবি ড্র্যাগ করে এখানে ছেড়ে দিন (Bulk Drag & Drop)। ড্র্যাগ করে ক্রম পরিবর্তন করুন। প্রতিটি ছবিতে ক্লিক করে নাম ও বিবরণ যোগ করতে পারবেন।',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'title_en',
              title: 'Title / Name (English)',
              type: 'string',
            },
            {
              name: 'title_bn',
              title: 'শিরোনাম / নাম (বাংলা)',
              type: 'string',
            },
            {
              name: 'description_en',
              title: 'Description (English)',
              type: 'text',
              rows: 2,
            },
            {
              name: 'description_bn',
              title: 'বিবরণ (বাংলা)',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'title_en',
              subtitle: 'title_bn',
              media: 'asset',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Gallery Photo',
                subtitle: subtitle || '',
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      batch: 'batch',
      title: 'gallery_title',
      photos: 'photos',
    },
    prepare({ batch, title, photos }) {
      const count = Array.isArray(photos) ? photos.length : 0
      const displayTitle = batch ? `${batch} Photo Gallery` : (title || 'Photo Gallery')
      return {
        title: displayTitle,
        subtitle: `${count} photos uploaded`,
      }
    },
  },
})
