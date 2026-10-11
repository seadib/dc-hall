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
      title: 'Homepage Sections Visibility & Order (ড্র্যাগ করে সেকশন সাজান)',
      type: 'array',
      group: 'sections_control',
      description: '↕️ ড্র্যাগ করে হোমপেজের সেকশনগুলোর ক্রম সাজান। যে সেকশনটি উপরে থাকবে ওয়েবসাইটে সেটি আগে দেখাবে।',
      of: [
        {
          type: 'object',
          name: 'homeSectionItem',
          title: 'Section',
          fields: [
            defineField({
              name: 'section_id',
              title: 'Section (সেকশন নির্বাচন করুন)',
              type: 'string',
              options: {
                list: [
                  { title: '👨‍🎓 Students Preview (শিক্ষার্থী তালিকা প্রিভিউ)', value: 'students_preview' },
                  { title: '🛏️ Roommate Preview (রুমমেট প্রিভিউ)', value: 'roommates_preview' },
                  { title: '📊 Results Preview (একাডেমিক ফলাফল প্রিভিউ)', value: 'results_preview' },
                  { title: '👨‍🏫 Hall Super Preview (হল সুপার পরিচিতি ও বার্তা)', value: 'hall_super_preview' },
                  { title: '🏛️ Hall Info & History (হলের ইতিহাস ও পরিচিতি)', value: 'hall_info_preview' },
                  { title: '📸 Moments & Memories (ক্যাম্পাস ফটো গ্যালারি)', value: 'moments_preview' },
                  { title: '🌐 Portals & Resources (অফিশিয়াল রিসোর্স ও লিংক)', value: 'resources_preview' },
                  { title: '📍 Location & Map (অবস্থান ও লাইভ ম্যাপ)', value: 'location_preview' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'enabled',
              title: 'Show Section (ওয়েবসাইটে প্রদর্শন করবেন কি?)',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              section_id: 'section_id',
              enabled: 'enabled',
            },
            prepare({ section_id, enabled }) {
              const titles = {
                students_preview: '👨‍🎓 Students Preview (শিক্ষার্থী তালিকা)',
                roommates_preview: '🛏️ Roommate Preview (রুমমেট প্রিভিউ)',
                results_preview: '📊 Results Preview (একাডেমিক ফলাফল)',
                hall_super_preview: '👨‍🏫 Hall Super Preview (হল সুপার বার্তা)',
                hall_info_preview: '🏛️ Hall Info & History (হলের ইতিহাস)',
                moments_preview: '📸 Moments & Memories (ফটো গ্যালারি)',
                resources_preview: '🌐 Portals & Resources (রিসোর্স ও লিংক)',
                location_preview: '📍 Location & Map (অবস্থান ও লাইভ ম্যাপ)',
              }
              const isOff = enabled === false
              return {
                title: titles[section_id] || section_id || 'Section',
                subtitle: isOff ? '❌ বন্ধ (Hidden on site)' : '✅ চালু (Visible on site)',
              }
            },
          },
        },
      ],
      initialValue: [
        { _key: 'hsec1', section_id: 'students_preview', enabled: true },
        { _key: 'hsec2', section_id: 'roommates_preview', enabled: true },
        { _key: 'hsec3', section_id: 'results_preview', enabled: true },
        { _key: 'hsec4', section_id: 'hall_super_preview', enabled: true },
        { _key: 'hsec5', section_id: 'hall_info_preview', enabled: true },
        { _key: 'hsec6', section_id: 'moments_preview', enabled: true },
        { _key: 'hsec7', section_id: 'resources_preview', enabled: true },
        { _key: 'hsec8', section_id: 'location_preview', enabled: true },
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
