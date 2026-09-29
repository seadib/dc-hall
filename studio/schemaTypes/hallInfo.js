import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hallInfo',
  title: 'Hall History & Super',
  type: 'document',
  groups: [
    { name: 'hostel', title: 'হল ইতিহাস ও পরিচিতি (Hostel & History)' },
    { name: 'super', title: 'হল সুপার তথ্য ও বাণী (Hall Super)' },
    { name: 'success', title: 'ভর্তি সাফল্য চার্ট (Admission Success)' },
    { name: 'alumni', title: 'প্রাক্তন কৃতি শিক্ষার্থী (Alumni Profiles)' },
  ],
  fields: [
    // --- Group: Hostel & History ---
    defineField({
      name: 'hostel_title_en',
      title: 'Hostel Title (English)',
      type: 'string',
      group: 'hostel',
    }),
    defineField({
      name: 'hostel_title_bn',
      title: 'হোস্টেল শিরোনাম (বাংলা)',
      type: 'string',
      group: 'hostel',
    }),
    defineField({
      name: 'hostel_subtitle_en',
      title: 'Hostel Subtitle (English)',
      type: 'string',
      group: 'hostel',
    }),
    defineField({
      name: 'hostel_subtitle_bn',
      title: 'হোস্টেল সাবটাইটেল (বাংলা)',
      type: 'string',
      group: 'hostel',
    }),
    defineField({
      name: 'history_title_en',
      title: 'History Section Title (English)',
      type: 'string',
      group: 'hostel',
    }),
    defineField({
      name: 'history_title_bn',
      title: 'ইতিহাস সেকশন শিরোনাম (বাংলা)',
      type: 'string',
      group: 'hostel',
    }),
    defineField({
      name: 'history_text_en',
      title: 'History Details (English)',
      type: 'text',
      rows: 4,
      group: 'hostel',
    }),
    defineField({
      name: 'history_text_bn',
      title: 'ইতিহাস বিবরণ (বাংলা)',
      type: 'text',
      rows: 4,
      group: 'hostel',
    }),
    defineField({
      name: 'history_places',
      title: 'Nearby / Historic Places (আশেপাশের স্থানসমূহ)',
      type: 'array',
      group: 'hostel',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name_en', title: 'Place Name EN', type: 'string' },
            { name: 'name_bn', title: 'স্থানের নাম বাংলা', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'hall_photo',
      title: 'Main Historic Hostel Photo',
      type: 'image',
      group: 'hostel',
    }),
    defineField({
      name: 'location_title_en',
      title: 'Location Section Title EN',
      type: 'string',
      group: 'hostel',
    }),
    defineField({
      name: 'location_title_bn',
      title: 'অবস্থান শিরোনাম বাংলা',
      type: 'string',
      group: 'hostel',
    }),
    defineField({
      name: 'location_text_en',
      title: 'Location Text EN',
      type: 'text',
      rows: 2,
      group: 'hostel',
    }),
    defineField({
      name: 'location_text_bn',
      title: 'অবস্থান বিবরণ বাংলা',
      type: 'text',
      rows: 2,
      group: 'hostel',
    }),
    defineField({
      name: 'map_url',
      title: 'Google Map Embed URL',
      type: 'url',
      group: 'hostel',
    }),

    // --- Group: Hall Super ---
    defineField({
      name: 'hall_super_eyebrow_en',
      title: 'Eyebrow Tag (English)',
      type: 'string',
      group: 'super',
    }),
    defineField({
      name: 'hall_super_eyebrow_bn',
      title: 'আইব্রো ট্যাগ (বাংলা)',
      type: 'string',
      group: 'super',
    }),
    defineField({
      name: 'hall_super_name_en',
      title: 'Hall Super Name (English)',
      type: 'string',
      group: 'super',
    }),
    defineField({
      name: 'hall_super_name_bn',
      title: 'হল সুপার নাম (বাংলা)',
      type: 'string',
      group: 'super',
    }),
    defineField({
      name: 'hall_super_photo',
      title: 'Hall Super Official Portrait',
      type: 'image',
      group: 'super',
    }),
    defineField({
      name: 'hall_super_bio_en',
      title: 'Hall Super Message / Bio (English)',
      type: 'text',
      rows: 5,
      group: 'super',
    }),
    defineField({
      name: 'hall_super_bio_bn',
      title: 'হল সুপার বার্তা / বাণী (বাংলা)',
      type: 'text',
      rows: 5,
      group: 'super',
    }),
    defineField({
      name: 'hall_super_info_boxes',
      title: 'Key Information Highlights (গুরুত্বপূর্ণ হাইলাইটস)',
      type: 'array',
      group: 'super',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title_en', title: 'Box Title EN', type: 'string' },
            { name: 'title_bn', title: 'বক্স শিরোনাম বাংলা', type: 'string' },
            { name: 'text_en', title: 'Box Text EN', type: 'text', rows: 2 },
            { name: 'text_bn', title: 'বক্স টেক্সট বাংলা', type: 'text', rows: 2 },
          ],
        },
      ],
    }),

    // --- Group: Admission Success ---
    defineField({
      name: 'success_title_en',
      title: 'Success Section Title EN',
      type: 'string',
      group: 'success',
    }),
    defineField({
      name: 'success_title_bn',
      title: 'সাফল্য শিরোনাম বাংলা',
      type: 'string',
      group: 'success',
    }),
    defineField({
      name: 'success_text_en',
      title: 'Success Subtitle / Lead EN',
      type: 'text',
      rows: 2,
      group: 'success',
    }),
    defineField({
      name: 'success_text_bn',
      title: 'সাফল্য সাবটাইটেল বাংলা',
      type: 'text',
      rows: 2,
      group: 'success',
    }),
    defineField({
      name: 'success_chart',
      title: 'Admission Stats Bars (ভর্তি পরিসংখ্যান বার)',
      type: 'array',
      group: 'success',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Academic Year (e.g. 2026)', type: 'string' },
            { name: 'width', title: 'Bar Progress Percentage (10-100)', type: 'number' },
            { name: 'text_en', title: 'Details Text EN', type: 'string' },
            { name: 'text_bn', title: 'বিবরণ টেক্সট বাংলা', type: 'string' },
          ],
        },
      ],
    }),

    // --- Group: Alumni Profiles ---
    defineField({
      name: 'alumni_profiles',
      title: 'Famous Alumni Profiles (কৃতি প্রাক্তন শিক্ষার্থী)',
      type: 'array',
      group: 'alumni',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name_en', title: 'Alumni Name EN', type: 'string' },
            { name: 'name_bn', title: 'নাম বাংলা', type: 'string' },
            { name: 'department_en', title: 'Department EN', type: 'string' },
            { name: 'pass_year', title: 'HSC Passing Year', type: 'string' },
            { name: 'achievement_en', title: 'Key Achievement EN', type: 'string' },
            { name: 'biography_en', title: 'Biography EN', type: 'text', rows: 3 },
            { name: 'biography_bn', title: 'জীবনী বাংলা', type: 'text', rows: 3 },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hostel_title_en',
      subtitle: 'hall_super_name_en',
      media: 'hall_super_photo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hall History & Super',
        subtitle: subtitle ? `Super: ${subtitle}` : '',
        media: (media && typeof media === 'object' && media.asset) ? media : undefined,
      }
    },
  },
})
