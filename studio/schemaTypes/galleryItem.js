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
      title: 'Gallery Photos (গ্যালারি ফটোসমূহ)',
      type: 'array',
      description: '📸 একসাথে অনেক ছবি ড্র্যাগ করে আপলোড করুন। পরে ড্র্যাগ করে ক্রম পরিবর্তন করুন। প্রতিটি ছবিতে ক্লিক করে নাম ও বিবরণ যোগ করতে পারবেন।',
      of: [
        {
          type: 'object',
          name: 'galleryPhoto',
          title: 'Photo',
          fields: [
            defineField({
              name: 'photo',
              title: 'Photo / ফটো',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title_en',
              title: 'Title / Name (English)',
              type: 'string',
            }),
            defineField({
              name: 'title_bn',
              title: 'শিরোনাম / নাম (বাংলা)',
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
          ],
          preview: {
            select: {
              title: 'title_en',
              subtitle: 'title_bn',
              media: 'photo',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Photo',
                subtitle: subtitle || '',
                media: (media && typeof media === 'object' && media.asset) ? media : undefined,
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
