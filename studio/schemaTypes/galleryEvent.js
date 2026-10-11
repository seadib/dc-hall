import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryEvent',
  title: 'Gallery Events (ইভেন্ট গ্যালারি)',
  type: 'document',
  groups: [
    { name: 'info', title: 'ইভেন্ট তথ্য (Event Info)' },
    { name: 'media', title: 'ফটো ও ভিডিও (Photos & Videos)' },
  ],
  fields: [
    // ═══════════════════════════════════════════
    // Event Info
    // ═══════════════════════════════════════════
    defineField({
      name: 'event_id',
      title: 'Event Slug / ID',
      type: 'slug',
      group: 'info',
      description: 'Unique URL-friendly identifier (e.g. "iftar-reunion-2026"). Click Generate to auto-create from title.',
      options: {
        source: 'title_en',
        maxLength: 80,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Display Order / Position (প্রদর্শন ক্রম)',
      type: 'number',
      group: 'info',
      description: 'কম নম্বর আগে দেখাবে (যখন তারিখ একই থাকে)। তারিখ অনুযায়ী স্বয়ংক্রিয় ক্রমের জন্য খালি রাখুন।',
    }),
    defineField({
      name: 'title_en',
      title: 'Event Title (English)',
      type: 'string',
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_bn',
      title: 'ইভেন্ট শিরোনাম (বাংলা)',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'date',
      title: 'Event Date / ইভেন্ট তারিখ',
      type: 'date',
      group: 'info',
      description: 'ইভেন্টের তারিখ সিলেক্ট করুন — ওয়েবসাইটে এই তারিখ দেখাবে এবং সর্টিং এ ব্যবহৃত হবে।',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date_formatted_en',
      title: 'Custom Date Text (English) — Optional',
      type: 'string',
      group: 'info',
      description: 'Custom display text e.g. "March 2026". If blank, auto-generated from date above.',
    }),
    defineField({
      name: 'date_formatted_bn',
      title: 'কাস্টম তারিখ টেক্সট (বাংলা) — ঐচ্ছিক',
      type: 'string',
      group: 'info',
      description: 'যেমন: "মার্চ ২০২৬"। খালি রাখলে উপরের তারিখ থেকে স্বয়ংক্রিয়ভাবে তৈরি হবে।',
    }),
    defineField({
      name: 'batches',
      title: 'Batch / ব্যাচ',
      type: 'array',
      group: 'info',
      description: 'কোন ব্যাচের ইভেন্ট সেটি সিলেক্ট করুন। ২+ ব্যাচ একসাথে সিলেক্ট করা যায় (যেমন: ২ ব্যাচ মিলে ট্যুরে গেলে)।',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'HSC-27', value: 'HSC-27' },
          { title: 'HSC-28', value: 'HSC-28' },
          { title: 'HSC-29', value: 'HSC-29' },
          { title: 'HSC-30', value: 'HSC-30' },
          { title: 'HSC-31', value: 'HSC-31' },
          { title: 'HSC-32', value: 'HSC-32' },
          { title: 'HSC-33', value: 'HSC-33' },
          { title: 'All Batches (সকল ব্যাচ)', value: 'all' },
        ],
      },
    }),
    defineField({
      name: 'description_en',
      title: 'Event Description (English)',
      type: 'text',
      rows: 3,
      group: 'info',
    }),
    defineField({
      name: 'description_bn',
      title: 'ইভেন্ট বিবরণ (বাংলা)',
      type: 'text',
      rows: 3,
      group: 'info',
    }),
    defineField({
      name: 'location_name',
      title: 'Location Name / স্থানের নাম',
      type: 'string',
      group: 'info',
      description: 'ইভেন্টের স্থান যেমন: "International Hall, Dhaka College"',
      placeholder: 'International Hall, Dhaka College',
    }),
    defineField({
      name: 'location_map_url',
      title: 'Google Maps URL / গুগল ম্যাপ লিংক',
      type: 'url',
      group: 'info',
      description: 'Google Maps থেকে যেকোনো লিংক দিন — সাধারণ লিংক স্বয়ংক্রিয়ভাবে embed এ রূপান্তর হবে। যেমন: https://maps.google.com/... বা embed URL',
    }),

    // ═══════════════════════════════════════════
    // Photos & Videos
    // ═══════════════════════════════════════════
    defineField({
      name: 'photos',
      title: 'Event Photos (ইভেন্ট ফটোসমূহ)',
      type: 'array',
      group: 'media',
      description: '📸 একসাথে অনেক ফটো ড্র্যাগ করে আপলোড করুন। ড্র্যাগ করে ক্রম পরিবর্তন করুন। প্রথম ফটোটি ইভেন্ট কভার হিসেবে ব্যবহৃত হবে। প্রতিটি ফটোতে ক্লিক করে ক্যাপশন যোগ করুন।',
      of: [
        {
          type: 'object',
          name: 'eventPhoto',
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
              name: 'caption_en',
              title: 'Caption (English)',
              type: 'string',
            }),
            defineField({
              name: 'caption_bn',
              title: 'ক্যাপশন (বাংলা)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'caption_en',
              subtitle: 'caption_bn',
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
    defineField({
      name: 'videos',
      title: 'Event Videos (ইভেন্ট ভিডিও)',
      type: 'array',
      group: 'media',
      description: '🎬 YouTube, Google Drive, Mega.nz লিংক বা সরাসরি ভিডিও আপলোড করুন। সাধারণ লিংক দিলে স্বয়ংক্রিয়ভাবে embed হবে।',
      of: [
        {
          type: 'object',
          name: 'eventVideo',
          title: 'Video',
          fields: [
            defineField({
              name: 'url',
              title: 'Video URL (যেকোনো লিংক দিন)',
              type: 'url',
              description: 'YouTube / Google Drive / Mega.nz — সাধারণ বা embed লিংক দিন।\n• YouTube: https://youtu.be/VIDEO_ID বা https://youtube.com/watch?v=VIDEO_ID\n• Drive: https://drive.google.com/file/d/FILE_ID/view\n• Mega: https://mega.nz/file/FILE_ID#KEY',
            }),
            defineField({
              name: 'video_file',
              title: 'Or Upload Video / সরাসরি ভিডিও আপলোড',
              type: 'file',
              description: 'সরাসরি ভিডিও ফাইল আপলোড করুন (MP4, WebM)। URL দিলে এটি খালি রাখুন।',
              options: { accept: 'video/mp4,video/webm,video/ogg' },
            }),
            defineField({
              name: 'title_en',
              title: 'Video Title (English)',
              type: 'string',
            }),
            defineField({
              name: 'title_bn',
              title: 'ভিডিও শিরোনাম (বাংলা)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'title_en',
              subtitle: 'url',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Video',
                subtitle: subtitle || 'Uploaded file',
              }
            },
          },
        },
      ],
    }),

    // Keep category hidden for backward compatibility with existing data
    defineField({
      name: 'category',
      title: 'Legacy Category (hidden)',
      type: 'string',
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Event Date (Newest First)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Position',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title_en',
      subtitle: 'date',
      media: 'photos.0.photo',
      batches: 'batches',
    },
    prepare({ title, subtitle, media, batches }) {
      const batchLabel = batches && batches.length ? batches.join(', ') : ''
      return {
        title: title || 'Gallery Event',
        subtitle: `${batchLabel ? batchLabel + ' · ' : ''}${subtitle || ''}`,
        media: (media && typeof media === 'object' && media.asset) ? media : undefined,
      }
    },
  },
})
