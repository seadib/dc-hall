import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hallInfo',
  title: 'Hall History & Super',
  type: 'document',
  groups: [
    { name: 'sections_control', title: '① সেকশন কন্ট্রোল ও ক্রম (Section Visibility & Order)', default: true },
    { name: 'hostel', title: '② হল ইতিহাস ও পরিচিতি (Hostel & History)' },
    { name: 'super', title: '③ হল সুপার তথ্য ও বাণী (Hall Super)' },
    { name: 'helpdesk', title: '④ অফিস ও হেল্পডেস্ক (Office & Helpdesk)' },
    { name: 'success', title: '⑤ ভর্তি সাফল্য চার্ট (Admission Success)' },
    { name: 'alumni', title: '⑥ প্রাক্তন কৃতি শিক্ষার্থী (Alumni Profiles)' },
  ],
  fields: [
    // ═══════════════════════════════════════════
    // ① Hall Info Sections Controls
    // ═══════════════════════════════════════════
    defineField({
      name: 'sections_control',
      title: 'Hall Info Page Sections Visibility & Order (হল ইনফো পেজ সেকশনসমূহ অন/অফ ও ক্রম)',
      type: 'object',
      group: 'sections_control',
      description: 'হল ইনফো পেজে কোন কোন সেকশন দেখাবেন এবং কোনটির ক্রমিক আগে/পরে আসবে তা এখান থেকে নিয়ন্ত্রণ করুন।',
      fields: [
        {
          name: 'history_nearby',
          title: 'History & Nearby Places (ইতিহাস ও আশেপাশের স্থান)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রম)', type: 'number', initialValue: 1 },
          ],
        },
        {
          name: 'campus_photos',
          title: 'Campus Photos (ক্যাম্পাস ফটো গ্যালারি)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রম)', type: 'number', initialValue: 2 },
          ],
        },
        {
          name: 'hall_super',
          title: 'Hall Super Profile & Message (হল সুপার বাণী ও প্রোফাইল)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রম)', type: 'number', initialValue: 3 },
          ],
        },
        {
          name: 'helpdesk',
          title: 'Office & Consultation Helpdesk (অফিস সময় ও হেল্পডেস্ক)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রম)', type: 'number', initialValue: 4 },
          ],
        },
        {
          name: 'alumni',
          title: 'Notable Alumni Profiles (প্রাক্তন কৃতি শিক্ষার্থী)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রম)', type: 'number', initialValue: 5 },
          ],
        },
        {
          name: 'success_chart',
          title: 'Admission Success Chart (ভর্তি সাফল্য চার্ট)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রম)', type: 'number', initialValue: 6 },
          ],
        },
        {
          name: 'location_map',
          title: 'Location & Map (অবস্থান ও লাইভ ম্যাপ)',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Show Section', type: 'boolean', initialValue: true },
            { name: 'order', title: 'Order (ক্রম)', type: 'number', initialValue: 7 },
          ],
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // ② Hostel & History
    // ═══════════════════════════════════════════
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
      name: 'campus_photos',
      title: 'Campus Photo Gallery (ক্যাম্পাসের ছবিসমূহ)',
      type: 'array',
      group: 'hostel',
      description: 'হল ও হোস্টেলের সুন্দর ছবিসমূহ এখানে যুক্ত করুন',
      of: [
        {
          type: 'image',
          fields: [
            { name: 'caption_en', title: 'Caption EN', type: 'string' },
            { name: 'caption_bn', title: 'ক্যাপশন বাংলা', type: 'string' },
          ],
        },
      ],
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

    // ═══════════════════════════════════════════
    // ③ Hall Super
    // ═══════════════════════════════════════════
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
      name: 'hall_super_designation_en',
      title: 'Designation / Post EN',
      type: 'string',
      group: 'super',
      placeholder: 'Provost · International Hall, Dhaka College',
    }),
    defineField({
      name: 'hall_super_designation_bn',
      title: 'পদবী (বাংলা)',
      type: 'string',
      group: 'super',
      placeholder: 'প্রভোস্ট · আন্তর্জাতিক ছাত্রাবাস, ঢাকা কলেজ',
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
      name: 'hall_super_phone',
      title: 'Hall Super Phone Number (সরাসরি কল নম্বর)',
      type: 'string',
      group: 'super',
      placeholder: '+8801711000000',
    }),
    defineField({
      name: 'hall_super_whatsapp',
      title: 'Hall Super WhatsApp Link / Number (হোয়াটসঅ্যাপ)',
      type: 'string',
      group: 'super',
      placeholder: 'https://wa.me/8801711000000 or +8801711000000',
    }),
    defineField({
      name: 'hall_super_facebook',
      title: 'Hall Super Facebook Profile Link',
      type: 'url',
      group: 'super',
      placeholder: 'https://www.facebook.com/...',
    }),
    defineField({
      name: 'hall_super_email',
      title: 'Hall Super Email Address',
      type: 'string',
      group: 'super',
      placeholder: 'hallsuper@dhakacollege.edu.bd',
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

    // ═══════════════════════════════════════════
    // ④ Office & Helpdesk
    // ═══════════════════════════════════════════
    defineField({
      name: 'office_room',
      title: 'Office Location / Room (অফিস রুমের অবস্থান)',
      type: 'string',
      group: 'helpdesk',
      placeholder: 'Provost Office, Ground Floor, International Hall, Dhaka College',
    }),
    defineField({
      name: 'visiting_hours',
      title: 'Visiting / Consultation Hours (সাক্ষাতের সময়সূচি)',
      type: 'string',
      group: 'helpdesk',
      placeholder: 'Saturday – Thursday: 5:00 PM – 8:00 PM',
    }),
    defineField({
      name: 'emergency_contact_text',
      title: 'Emergency Contact Info (জরুরি যোগাযোগ বিবরণ)',
      type: 'text',
      rows: 2,
      group: 'helpdesk',
      placeholder: 'For urgent residential matters or medical emergencies, contact hall office or duty student council.',
    }),

    // ═══════════════════════════════════════════
    // ⑤ Admission Success
    // ═══════════════════════════════════════════
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

    // ═══════════════════════════════════════════
    // ⑥ Alumni Profiles (Simplified to 5 essential fields)
    // ═══════════════════════════════════════════
    defineField({
      name: 'alumni_profiles',
      title: 'Famous Alumni Profiles (কৃতি প্রাক্তন শিক্ষার্থী)',
      type: 'array',
      group: 'alumni',
      description: 'প্রাক্তন কৃতি শিক্ষার্থীদের নাম, বায়ো, বিস্তারিত এবং ছবি যোগ করুন',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name_en', title: '1. Name (English)', type: 'string' },
            { name: 'name_bn', title: '1. নাম (বাংলা)', type: 'string' },
            { name: 'short_bio_en', title: '2. Short Bio / Designation (English)', type: 'string', description: 'e.g. BUET CSE 2023 / Software Engineer' },
            { name: 'short_bio_bn', title: '2. সংক্ষিপ্ত বায়ো / পদবী (বাংলা)', type: 'string', description: 'যেমন: বুয়েট সিএসই ২০২৩ / সফটওয়্যার ইঞ্জিনিয়ার' },
            { name: 'details_en', title: '3. Details / Achievement (English)', type: 'text', rows: 3 },
            { name: 'details_bn', title: '3. বিস্তারিত অর্জন / বিবরণ (বাংলা)', type: 'text', rows: 3 },
            { name: 'photo', title: '4. Photo (ছবি)', type: 'image' },
            // Fallback backward-compatible fields:
            { name: 'department_en', title: 'Department (Optional)', type: 'string', hidden: true },
            { name: 'pass_year', title: 'Passing Year (Optional)', type: 'string', hidden: true },
            { name: 'achievement_en', title: 'Achievement EN (Optional)', type: 'string', hidden: true },
            { name: 'biography_en', title: 'Biography EN (Optional)', type: 'text', hidden: true },
            { name: 'biography_bn', title: 'Biography BN (Optional)', type: 'text', hidden: true },
          ],
          preview: {
            select: {
              title: 'name_en',
              subtitle: 'short_bio_en',
              media: 'photo',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Alumni Member',
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
