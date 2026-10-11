import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Items (ফটো গ্যালারি)',
  type: 'document',
  description: '📸 হলের দৈনন্দিন ফটো গ্যালারি — একসাথে অনেক ফটো আপলোড, রিঅর্ডার ও ক্যাপশন দিন।',
  fields: [
    defineField({
      name: 'gallery_title',
      title: 'Gallery Collection Title',
      type: 'string',
      initialValue: 'Main Photo Gallery',
      description: 'এই গ্যালারি কালেকশনের নাম (ওয়েবসাইটে দেখাবে না, শুধু অ্যাডমিনের জন্য)।',
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
      title: 'gallery_title',
      photos: 'photos',
    },
    prepare({ title, photos }) {
      const count = Array.isArray(photos) ? photos.length : 0
      return {
        title: title || 'Photo Gallery',
        subtitle: `${count} photos`,
      }
    },
  },
})
