import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Items (ফটো গ্যালারি)',
  type: 'document',
  description: '📸 হলের ফটো গ্যালারি — শিরোনাম দিন এবং একসাথে অনেক ফটো আপলোড করুন।',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading / শিরোনাম',
      type: 'string',
      description: 'যেকোনো শিরোনাম দিন — যেমন: "HSC-27", "Sports", "Daily Hall Life", "Annual Prize Giving" ইত্যাদি। এই শিরোনাম ওয়েবসাইটের গ্যালারিতে দেখাবে।',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Display Order / প্রদর্শন ক্রম',
      type: 'number',
      description: 'কম নম্বর আগে দেখাবে। খালি রাখলে শিরোনাম অনুযায়ী সাজাবে।',
    }),
    defineField({
      name: 'photos',
      title: 'Photos / ফটোসমূহ (একসাথে ড্র্যাগ ও ড্রপ)',
      type: 'array',
      description: '📸 একসাথে যত ইচ্ছা ছবি ড্র্যাগ করে এখানে ছেড়ে দিন। প্রথম ছবিটি কভার হিসেবে দেখাবে।',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption / ক্যাপশন (ঐচ্ছিক)',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'asset',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Photo',
                media,
              }
            },
          },
        },
      ],
    }),
    // Keep old batch field hidden for backward compatibility
    defineField({
      name: 'batch',
      title: 'Legacy Batch (hidden)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'gallery_title',
      title: 'Legacy Title (hidden)',
      type: 'string',
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
    {
      title: 'Heading A-Z',
      name: 'headingAsc',
      by: [{ field: 'heading', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      photos: 'photos',
      media: 'photos.0',
    },
    prepare({ title, photos, media }) {
      const count = Array.isArray(photos) ? photos.length : 0
      return {
        title: title || 'Gallery',
        subtitle: `${count} photos`,
        media: media,
      }
    },
  },
})
