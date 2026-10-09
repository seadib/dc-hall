import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page Content',
  type: 'document',
  groups: [
    { name: 'hero', title: 'হিরো সেকশন (Hero Section)' },
    { name: 'history_info', title: 'ইতিহাস ও হল তথ্য (History & Info)' },
    { name: 'stats_location', title: 'সাফল্য ও অবস্থান (Stats & Location)' },
  ],
  fields: [
    // --- Group: Hero ---
    defineField({
      name: 'hero_eyebrow_en',
      title: 'Hero Eyebrow (English)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'hero_eyebrow_bn',
      title: 'হিরো আইব্রো (বাংলা)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'hero_title_en',
      title: 'Hero Main Title (English)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'hero_title_bn',
      title: 'হিরো প্রধান শিরোনাম (বাংলা)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'hero_phrases',
      title: 'Rotating Hero Phrases (অ্যানিমেটেড রোটেটিং বাক্যসমূহ)',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'en', title: 'English Phrase', type: 'string' },
            { name: 'bn', title: 'বাংলা বাক্য', type: 'string' },
          ],
        },
      ],
    }),

    // --- Group: History & Info ---
    defineField({
      name: 'info_title_en',
      title: 'Info Section Title EN',
      type: 'string',
      group: 'history_info',
    }),
    defineField({
      name: 'info_title_bn',
      title: 'হল তথ্য শিরোনাম বাংলা',
      type: 'string',
      group: 'history_info',
    }),
    defineField({
      name: 'info_lead_en',
      title: 'Info Lead Subtitle EN',
      type: 'text',
      rows: 2,
      group: 'history_info',
    }),
    defineField({
      name: 'info_lead_bn',
      title: 'হল তথ্য সাবটাইটেল বাংলা',
      type: 'text',
      rows: 2,
      group: 'history_info',
    }),
    defineField({
      name: 'history_text_en',
      title: 'History Intro Text EN',
      type: 'text',
      rows: 4,
      group: 'history_info',
    }),
    defineField({
      name: 'history_text_bn',
      title: 'ইতিহাস পরিচিতি টেক্সট বাংলা',
      type: 'text',
      rows: 4,
      group: 'history_info',
    }),

    // --- Group: Stats & Location ---
    defineField({
      name: 'famous_text_en',
      title: 'Famous Alumni Intro EN',
      type: 'text',
      rows: 2,
      group: 'stats_location',
    }),
    defineField({
      name: 'famous_text_bn',
      title: 'প্রাক্তন কৃতি পরিচিতি বাংলা',
      type: 'text',
      rows: 2,
      group: 'stats_location',
    }),
    defineField({
      name: 'success_text_en',
      title: 'Admission Success Preview Text EN',
      type: 'text',
      rows: 2,
      group: 'stats_location',
    }),
    defineField({
      name: 'success_text_bn',
      title: 'ভর্তি সাফল্য প্রিভিউ টেক্সট বাংলা',
      type: 'text',
      rows: 2,
      group: 'stats_location',
    }),
    defineField({
      name: 'location_title_en',
      title: 'Location Title EN',
      type: 'string',
      group: 'stats_location',
    }),
    defineField({
      name: 'location_title_bn',
      title: 'অবস্থান শিরোনাম বাংলা',
      type: 'string',
      group: 'stats_location',
    }),
    defineField({
      name: 'location_text_en',
      title: 'Location Description EN',
      type: 'text',
      rows: 2,
      group: 'stats_location',
    }),
    defineField({
      name: 'location_text_bn',
      title: 'অবস্থান বিবরণ বাংলা',
      type: 'text',
      rows: 2,
      group: 'stats_location',
    }),
    defineField({
      name: 'map_url',
      title: 'Google Map Embed URL',
      type: 'url',
      group: 'stats_location',
    }),

    // --- Group: Results Preview ---
    defineField({
      name: 'results_eyebrow_en',
      title: 'Results Eyebrow EN',
      type: 'string',
      group: 'stats_location',
      description: 'e.g. "Academic Performance"',
    }),
    defineField({
      name: 'results_eyebrow_bn',
      title: 'ফলাফল আইব্রো বাংলা',
      type: 'string',
      group: 'stats_location',
    }),
    defineField({
      name: 'results_title_en',
      title: 'Results Section Title EN',
      type: 'string',
      group: 'stats_location',
    }),
    defineField({
      name: 'results_title_bn',
      title: 'ফলাফল সেকশন শিরোনাম বাংলা',
      type: 'string',
      group: 'stats_location',
    }),
    defineField({
      name: 'results_lead_en',
      title: 'Results Lead Text EN',
      type: 'text',
      rows: 2,
      group: 'stats_location',
    }),
    defineField({
      name: 'results_lead_bn',
      title: 'ফলাফল সাবটাইটেল বাংলা',
      type: 'text',
      rows: 2,
      group: 'stats_location',
    }),

    // --- Gallery Preview ---
    defineField({
      name: 'gallery_eyebrow_en',
      title: 'Gallery Eyebrow EN',
      type: 'string',
      group: 'stats_location',
      description: 'e.g. "Moments & Memories"',
    }),
    defineField({
      name: 'gallery_eyebrow_bn',
      title: 'গ্যালারি আইব্রো বাংলা',
      type: 'string',
      group: 'stats_location',
    }),
    defineField({
      name: 'gallery_title_en',
      title: 'Gallery Section Title EN',
      type: 'string',
      group: 'stats_location',
    }),
    defineField({
      name: 'gallery_title_bn',
      title: 'গ্যালারি সেকশন শিরোনাম বাংলা',
      type: 'string',
      group: 'stats_location',
    }),
  ],
  preview: {
    select: {
      title: 'hero_title_en',
      subtitle: 'hero_eyebrow_en',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Home Page Content',
        subtitle: subtitle || 'Homepage Sections',
      }
    },
  },
})
