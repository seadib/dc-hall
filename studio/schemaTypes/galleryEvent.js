import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryEvent',
  title: 'Gallery Events (ইভেন্ট গ্যালারি)',
  type: 'document',
  groups: [
    { name: 'media', title: 'ফটো ও ভিডিও (Photos & Videos)', default: true },
    { name: 'info', title: 'ইভেন্ট তথ্য (Event Info)' },
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
      name: 'locations',
      title: 'Event Locations / একাধিক স্থান যোগ করুন',
      type: 'array',
      group: 'info',
      description: 'ইভেন্টে একাধিক স্থান/স্পট থাকলে এখানে এক এক করে যোগ করুন (যেমন: "Rajshahi College", "Padma Garden", "Ruet")। ওয়েবসাইটে প্রতিটিতে আলাদা লিংক থাকবে যা ক্লিক করলে গুগল ম্যাপে সেই স্থানটি সরাসরি সার্চ হবে।',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'location_name',
      title: 'Single Location Name (অথবা একটি স্থান লিখুন)',
      type: 'string',
      group: 'info',
      description: 'যদি মাত্র একটি স্থান থাকে তবে এখানে লিখুন (উপরে একাধিক দিলে এটি খালি রাখতে পারেন)।',
      placeholder: 'Rajshahi',
    }),
    defineField({
      name: 'location_map_url',
      title: 'Google Maps URL (ঐচ্ছিক)',
      type: 'url',
      group: 'info',
      hidden: true,
      description: 'Optional legacy map URL.',
    }),

    // ═══════════════════════════════════════════
    // Photos & Videos
    // ═══════════════════════════════════════════
    defineField({
      name: 'media_order',
      title: 'Media Display Order (প্রদর্শন ক্রম)',
      type: 'string',
      group: 'media',
      description: 'ইভেন্ট পেজে কোনটি আগে দেখাবে: ছবি নাকি ভিডিও?',
      options: {
        list: [
          { title: 'Photos First, then Videos (আগে ফটো, পরে ভিডিও)', value: 'photos_first' },
          { title: 'Videos First, then Photos (আগে ভিডিও, পরে ফটো)', value: 'videos_first' },
        ],
        layout: 'radio',
      },
      initialValue: 'photos_first',
    }),
    defineField({
      name: 'photos',
      title: 'Event Photos (ইভেন্ট ফটোসমূহ — একসাথে ড্র্যাগ ও ড্রপ)',
      type: 'array',
      group: 'media',
      description: '📸 একসাথে যত ইচ্ছা ছবি ড্র্যাগ করে এখানে ছেড়ে দিন (Bulk Drag & Drop)। ড্র্যাগ করে ক্রম পরিবর্তন করুন। প্রথম ছবিটি কভার ফটো হিসেবে কাজ করবে। ছবিতে ক্লিক করে ক্যাপশন দিন।',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption_en',
              title: 'Caption (English)',
              type: 'string',
            },
            {
              name: 'caption_bn',
              title: 'ক্যাপশন (বাংলা)',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'caption_en',
              subtitle: 'caption_bn',
              media: 'asset',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Event Photo',
                subtitle: subtitle || '',
                media,
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
      media: 'photos.0',
      batches: 'batches',
    },
    prepare({ title, subtitle, media, batches }) {
      const batchLabel = batches && batches.length ? batches.join(', ') : ''
      const thumb = media?.asset ? media : (media?.photo?.asset ? media.photo : (media?.photo || media))
      return {
        title: title || 'Gallery Event',
        subtitle: `${batchLabel ? batchLabel + ' · ' : ''}${subtitle || ''}`,
        media: (thumb && typeof thumb === 'object') ? thumb : undefined,
      }
    },
  },
})
