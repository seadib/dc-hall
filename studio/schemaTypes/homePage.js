import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page Content',
  type: 'document',
  groups: [
    { name: 'sections_control', title: '① সেকশন কন্ট্রোল ও ক্রম (Section Visibility & Order)', default: true },
    { name: 'hero', title: '② হিরো সেকশন (Hero Section)' },
    { name: 'history_info', title: '③ ইতিহাস ও হল তথ্য (History & Info)' },
    { name: 'stats_location', title: '④ সাফল্য ও অবস্থান (Stats & Location)' },
  ],
  fields: [
    // ═══════════════════════════════════════════
    // ① Homepage Sections Controls
    // ═══════════════════════════════════════════
    defineField({
      name: 'sections_control',
      title: 'Homepage Sections Visibility & Order (হোমপেজ সেকশনসমূহ অন/অফ ও ক্রম)',
      type: 'object',
      group: 'sections_control',
      description: 'হোমপেজে কোন কোন সেকশন দেখাবেন এবং কোন সেকশনটি আগে ও কোনটি পরে আসবে তা এখান থেকে সহজে নিয়ন্ত্রণ করুন।',
      fields: [
        {
          name: 'students_preview',
          title: 'Students Preview (শিক্ষার্থী প্রিভিউ)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section (প্রদর্শন করুন)', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রমিক নম্বর)', type: 'number', initialValue: 1 },
          ],
        },
        {
          name: 'roommates_preview',
          title: 'Roommate Preview (রুমমেট প্রিভিউ)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section (প্রদর্শন করুন)', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রমিক নম্বর)', type: 'number', initialValue: 2 },
          ],
        },
        {
          name: 'results_preview',
          title: 'Results Preview (একাডেমিক ফলাফল প্রিভিউ)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section (প্রদর্শন করুন)', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রমিক নম্বর)', type: 'number', initialValue: 3 },
          ],
        },
        {
          name: 'hall_super_preview',
          title: 'Hall Super Preview (হল সুপার পরিচিতি ও বার্তা)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section (প্রদর্শন করুন)', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রমিক নম্বর)', type: 'number', initialValue: 4 },
          ],
        },
        {
          name: 'hall_info_preview',
          title: 'Hall Info & History (হলের ইতিহাস ও পরিচিতি)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section (প্রদর্শন করুন)', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রমিক নম্বর)', type: 'number', initialValue: 5 },
          ],
        },
        {
          name: 'moments_preview',
          title: 'Moments & Memories (ক্যাম্পাস ফটো গ্যালারি)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section (প্রদর্শন করুন)', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রমিক নম্বর)', type: 'number', initialValue: 6 },
          ],
        },
        {
          name: 'resources_preview',
          title: 'Dhaka College Portals & Resources (অফিশিয়াল রিসোর্স)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section (প্রদর্শন করুন)', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রমিক নম্বর)', type: 'number', initialValue: 7 },
          ],
        },
        {
          name: 'location_preview',
          title: 'Location & Map (অবস্থান ও লাইভ ম্যাপ)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section (প্রদর্শন করুন)', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রমিক নম্বর)', type: 'number', initialValue: 8 },
          ],
        },
      ],
    }),

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
