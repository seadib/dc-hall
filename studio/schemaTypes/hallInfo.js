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
      title: 'Hall Info Page Sections Visibility & Order (ড্র্যাগ করে সেকশন সাজান)',
      type: 'array',
      group: 'sections_control',
      description: '↕️ ড্র্যাগ করে সেকশনগুলোর ক্রম সাজান। যে সেকশনটি উপরে থাকবে ওয়েবসাইটে সেটি আগে দেখাবে।',
      of: [
        {
          type: 'object',
          name: 'sectionItem',
          title: 'Section',
          fields: [
            defineField({
              name: 'section_id',
              title: 'Section (সেকশন নির্বাচন করুন)',
              type: 'string',
              options: {
                list: [
                  { title: '🏛️ History & Nearby Places (ইতিহাস ও আশেপাশের স্থান)', value: 'history_nearby' },
                  { title: '📸 Campus Photos (ক্যাম্পাস ফটো গ্যালারি)', value: 'campus_photos' },
                  { title: '👨‍🏫 Hall Super Profile & Message (হল সুপার বাণী ও প্রোফাইল)', value: 'hall_super' },
                  { title: '⏰ Office & Helpdesk (অফিস সময় ও হেল্পডেস্ক)', value: 'helpdesk' },
                  { title: '🎓 Notable Alumni Profiles (প্রাক্তন কৃতি শিক্ষার্থী)', value: 'alumni' },
                  { title: '📊 Admission Success Chart (ভর্তি সাফল্য চার্ট)', value: 'success_chart' },
                  { title: '📍 Location & Map (অবস্থান ও লাইভ ম্যাপ)', value: 'location_map' },
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
                history_nearby: '🏛️ History & Nearby Places (ইতিহাস)',
                campus_photos: '📸 Campus Photos (ক্যাম্পাস ফটো গ্যালারি)',
                hall_super: '👨‍🏫 Hall Super Profile & Message (হল সুপার বাণী)',
                helpdesk: '⏰ Office & Helpdesk (অফিস ও হেল্পডেস্ক)',
                alumni: '🎓 Notable Alumni Profiles (প্রাক্তন কৃতি শিক্ষার্থী)',
                success_chart: '📊 Admission Success Chart (ভর্তি সাফল্য)',
                location_map: '📍 Location & Map (অবস্থান ও লাইভ ম্যাপ)',
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
        { _key: 'sec1', section_id: 'history_nearby', enabled: true },
        { _key: 'sec2', section_id: 'campus_photos', enabled: true },
        { _key: 'sec3', section_id: 'hall_super', enabled: true },
        { _key: 'sec4', section_id: 'helpdesk', enabled: true },
        { _key: 'sec5', section_id: 'alumni', enabled: true },
        { _key: 'sec6', section_id: 'success_chart', enabled: true },
        { _key: 'sec7', section_id: 'location_map', enabled: true },
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
      title: 'Main Historic Hostel Photo (মূল হোস্টেল ছবি)',
      type: 'image',
      group: 'hostel',
      description: 'হল ইনফো পেজের মূল ছবি। হটস্পট ক্রপিং সমর্থিত।',
      options: { hotspot: true },
    }),
    defineField({
      name: 'home_page_photo',
      title: 'Home Page Hall Photo (হোম পেজ হল ছবি) — ঐচ্ছিক',
      type: 'image',
      group: 'hostel',
      description: 'হোম পেজের হল ইনফো সেকশনে আলাদা ছবি দেখাতে চাইলে এখানে আপলোড করুন। খালি রাখলে উপরের "মূল হোস্টেল ছবি" ব্যবহার হবে।',
      options: { hotspot: true },
    }),
    defineField({
      name: 'campus_photos',
      title: 'Campus Photo Gallery (ক্যাম্পাসের ছবিসমূহ)',
      type: 'array',
      group: 'hostel',
      description: '📸 একসাথে অনেক ছবি ড্র্যাগ করে আপলোড করুন। ড্র্যাগ করে ক্রম পরিবর্তন করুন। প্রতিটি ছবিতে ক্লিক করে ক্যাপশন যোগ করুন।',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
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
