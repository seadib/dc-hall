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
      name: 'default_caption',
      title: 'Default Photo Caption / ডিফল্ট ফটো ক্যাপশন (ঐচ্ছিক)',
      type: 'string',
      description: '📸 এই গ্যালারির সকল ছবির জন্য সাধারণ ক্যাপশন। কোনো ছবির নির্দিষ্ট ক্যাপশন না থাকলে এই ক্যাপশনটি স্বয়ংক্রিয়ভাবে ওয়েবসাইটে ও মডালে দেখাবে। খালি রাখলে শিরোনাম (Heading) ক্যাপশন হিসেবে কাজ করবে।',
      placeholder: 'যেমন: Daily Hall Life, Campus Adda, Hostel Moments...',
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
              title: 'Caption / ক্যাপশন (ঐচ্ছিক — খালি রাখলে উপরের ডিফল্ট ক্যাপশন বা শিরোনাম দেখাবে)',
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
      caption: 'default_caption',
      photos: 'photos',
      media: 'photos.0',
    },
    prepare({ title, caption, photos, media }) {
      const count = Array.isArray(photos) ? photos.length : 0
      const sub = caption ? `${count} photos • Default: "${caption}"` : `${count} photos`
      return {
        title: title || 'Gallery',
        subtitle: sub,
        media: media,
      }
    },
  },
})
