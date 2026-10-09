import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'student',
  title: 'Students (শিক্ষার্থী)',
  type: 'document',
  groups: [
    { name: 'basic', title: '① নাম ও মৌলিক (Name & Basic)', default: true },
    { name: 'academic', title: '② একাডেমিক ও রুম (Academic & Room)' },
    { name: 'contact', title: '③ যোগাযোগ (Contact & Social)' },
    { name: 'bio_media', title: '④ ছবি ও বায়ো (Photo & Bio)' },
    { name: 'results_1st', title: '⑤ 1st Year ফলাফল (Class 11 Results)' },
    { name: 'results_2nd', title: '⑥ 2nd Year ফলাফল (Class 12 Results)' },
  ],
  fields: [
    // ═══════════════════════════════════════════
    // ① Name & Basic
    // ═══════════════════════════════════════════
    defineField({
      name: 'position',
      title: 'Serial / Position (ক্রমিক নম্বর)',
      type: 'number',
      group: 'basic',
      description: 'Student display order. Lower number = appears first.',
    }),
    defineField({
      name: 'name_en',
      title: 'Full Name (English)',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name_bn',
      title: 'সম্পূর্ণ নাম (বাংলা)',
      type: 'string',
      group: 'basic',
      description: 'খালি থাকলে ইংরেজি নাম দেখাবে।',
    }),
    defineField({
      name: 'dob',
      title: 'Date of Birth (জন্মতারিখ) — DD/MM',
      type: 'string',
      group: 'basic',
      description: 'Example: 04/10 means 4th October. No year needed.',
      placeholder: '04/10',
    }),
    defineField({
      name: 'blood_group',
      title: 'Blood Group (রক্তের গ্রুপ)',
      type: 'string',
      group: 'basic',
      options: {
        list: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'batch',
      title: 'Batch (ব্যাচ)',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'HSC-27 (2025-26 Batch)', value: 'HSC-27' },
          { title: 'HSC-28 (2026-27 Batch)', value: 'HSC-28' },
          { title: 'HSC-29 (2027-28 Batch)', value: 'HSC-29' },
          { title: 'HSC-30 (2028-29 Batch)', value: 'HSC-30' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'HSC-27',
      description: 'Class XII → HSC-27 etc. Replaces old "Class 11/12" field.',
    }),

    // ═══════════════════════════════════════════
    // ② Academic & Room
    // ═══════════════════════════════════════════
    defineField({
      name: 'room_no',
      title: 'Room Number (রুম নম্বর)',
      type: 'string',
      group: 'academic',
      description: 'e.g. 317. This links to room assignments automatically.',
    }),
    defineField({
      name: 'short_roll',
      title: 'Roll Number (ছোট রোল)',
      type: 'string',
      group: 'academic',
      description: 'Just the roll digits: 161, 9, 78, 1132 etc. Leading zeros optional — system handles it. Full roll auto-generates from batch + group + this roll.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Group (বিভাগ)',
      type: 'string',
      group: 'academic',
      options: {
        list: [
          { title: 'Science — বিজ্ঞান (01)', value: 'science' },
          { title: 'Business Studies — ব্যবসায় শিক্ষা (02)', value: 'commerce' },
          { title: 'Humanities — মানবিক (03)', value: 'arts' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      description: 'Science = 01, B.Studies = 02, Humanities = 03 (for full roll generation).',
    }),
    defineField({
      name: 'section',
      title: 'Section (সেকশন)',
      type: 'string',
      group: 'academic',
      options: {
        list: [
          { title: '—  None / নেই', value: '' },
          { title: 'A', value: 'A' },
          { title: 'B', value: 'B' },
          { title: 'C', value: 'C' },
          { title: 'D', value: 'D' },
          { title: 'E', value: 'E' },
          { title: 'F', value: 'F' },
          { title: 'G', value: 'G' },
          { title: 'H', value: 'H' },
          { title: 'I', value: 'I' },
          { title: 'J', value: 'J' },
        ],
        layout: 'dropdown',
      },
      description: 'A–J for Science. Humanities/B.Studies can leave empty (shows "-" on website).',
    }),
    defineField({
      name: 'practical_group',
      title: 'Practical Group (ব্যবহারিক গ্রুপ)',
      type: 'string',
      group: 'academic',
      options: {
        list: [
          { title: '— None / নেই', value: '' },
          { title: 'A1', value: 'A1' },
          { title: 'A2', value: 'A2' },
          { title: 'B1', value: 'B1' },
          { title: 'B2', value: 'B2' },
          { title: 'C1', value: 'C1' },
          { title: 'C2', value: 'C2' },
          { title: 'D1', value: 'D1' },
          { title: 'D2', value: 'D2' },
          { title: 'E1', value: 'E1' },
          { title: 'E2', value: 'E2' },
          { title: 'F1', value: 'F1' },
          { title: 'F2', value: 'F2' },
          { title: 'G1', value: 'G1' },
          { title: 'G2', value: 'G2' },
          { title: 'H1', value: 'H1' },
          { title: 'H2', value: 'H2' },
          { title: 'I1', value: 'I1' },
          { title: 'I2', value: 'I2' },
          { title: 'J1', value: 'J1' },
          { title: 'J2', value: 'J2' },
        ],
        layout: 'dropdown',
      },
      description: 'Section A → A1 or A2, Section B → B1 or B2, etc. Leave empty for Humanities/B.Studies.',
    }),

    // ═══════════════════════════════════════════
    // ③ Contact & Social
    // ═══════════════════════════════════════════
    defineField({
      name: 'phone',
      title: 'Student Phone Number (ফোন নম্বর)',
      type: 'string',
      group: 'contact',
      description: 'Main phone number.',
    }),
    defineField({
      name: 'phone_has_whatsapp',
      title: 'This phone has WhatsApp',
      type: 'boolean',
      group: 'contact',
      initialValue: true,
      description: 'Tick if this main number is also on WhatsApp.',
    }),
    defineField({
      name: 'phone_has_telegram',
      title: 'This phone has Telegram',
      type: 'boolean',
      group: 'contact',
      initialValue: false,
    }),
    defineField({
      name: 'whatsapp_alt',
      title: 'Separate WhatsApp Number (আলাদা হোয়াটসঅ্যাপ)',
      type: 'string',
      group: 'contact',
      description: 'Only fill if WhatsApp is on a DIFFERENT number than the main phone.',
    }),
    defineField({
      name: 'telegram_alt',
      title: 'Separate Telegram Number/Username',
      type: 'string',
      group: 'contact',
      description: 'Only fill if Telegram is on a different number or username.',
    }),
    defineField({
      name: 'father_phone',
      title: 'Guardian / Father Phone (অভিভাবক নম্বর)',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address_en',
      title: 'Address (English)',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address_bn',
      title: 'ঠিকানা (বাংলা)',
      type: 'string',
      group: 'contact',
      description: 'খালি থাকলে ইংরেজি ঠিকানা দেখাবে।',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook Profile URL or Username (ফেসবুক লিংক বা ইউজারনেম)',
      type: 'string',
      group: 'contact',
      description: 'ফেসবুক লিংক (যেমন: https://www.facebook.com/seadix) অথবা শুধু ইউজারনেম (যেমন: seadix) — যেকোনোটি লিখলেই ফেসবুক ও মেসেঞ্জার দুটোই তৈরি হবে।',
      placeholder: 'seadix বা https://facebook.com/seadix',
    }),

    // ═══════════════════════════════════════════
    // ④ Photo & Bio
    // ═══════════════════════════════════════════
    defineField({
      name: 'photo',
      title: 'Profile Photo (ছবি)',
      type: 'image',
      group: 'bio_media',
      options: { hotspot: true },
      description: 'Portrait 3:4 ratio recommended.',
    }),
    defineField({
      name: 'bio_en',
      title: 'About / Bio (English)',
      type: 'text',
      rows: 3,
      group: 'bio_media',
      description: 'Empty → default bio auto-shows on website.',
    }),
    defineField({
      name: 'bio_bn',
      title: 'পরিচয় / বায়ো (বাংলা)',
      type: 'text',
      rows: 3,
      group: 'bio_media',
      description: 'খালি থাকলে ইংরেজি বায়ো দেখাবে।',
    }),

    // ═══════════════════════════════════════════
    // ⑤ 1st Year Results (Class 11)
    // ═══════════════════════════════════════════
    defineField({
      name: 'results_1st_year',
      title: '1st Year Results — Class 11 (একাদশ শ্রেণি ফলাফল)',
      type: 'object',
      group: 'results_1st',
      description: 'Upload PDF or paste link for each exam.',
      fields: [
        { name: 'ct1_pdf', title: 'CT-1 Exam — PDF', type: 'file' },
        { name: 'ct1_link', title: 'CT-1 Exam — Link URL', type: 'url' },
        { name: 'ct2_pdf', title: 'CT-2 Exam — PDF', type: 'file' },
        { name: 'ct2_link', title: 'CT-2 Exam — Link URL', type: 'url' },
        { name: 'hy_pdf', title: 'Half Yearly — PDF', type: 'file' },
        { name: 'hy_link', title: 'Half Yearly — Link URL', type: 'url' },
        { name: 'ct3_pdf', title: 'CT-3 Exam — PDF', type: 'file' },
        { name: 'ct3_link', title: 'CT-3 Exam — Link URL', type: 'url' },
        { name: 'yearly_pdf', title: 'Yearly Final — PDF', type: 'file' },
        { name: 'yearly_link', title: 'Yearly Final — Link URL', type: 'url' },
      ],
    }),

    // ═══════════════════════════════════════════
    // ⑥ 2nd Year Results (Class 12)
    // ═══════════════════════════════════════════
    defineField({
      name: 'results_2nd_year',
      title: '2nd Year Results — Class 12 (দ্বাদশ শ্রেণি ফলাফল)',
      type: 'object',
      group: 'results_2nd',
      description: 'Upload PDF or paste link for each exam.',
      fields: [
        { name: 'ct1_pdf', title: 'CT-1 Exam — PDF', type: 'file' },
        { name: 'ct1_link', title: 'CT-1 Exam — Link URL', type: 'url' },
        { name: 'ct2_pdf', title: 'CT-2 Exam — PDF', type: 'file' },
        { name: 'ct2_link', title: 'CT-2 Exam — Link URL', type: 'url' },
        { name: 'ct3_pdf', title: 'CT-3 Exam — PDF', type: 'file' },
        { name: 'ct3_link', title: 'CT-3 Exam — Link URL', type: 'url' },
        { name: 'test_pdf', title: 'Test Exam — PDF', type: 'file' },
        { name: 'test_link', title: 'Test Exam — Link URL', type: 'url' },
      ],
    }),

    // Hidden auto-generated fields (kept for backward compatibility)
    defineField({
      name: 'student_id',
      title: 'Student ID (Auto)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'class_no',
      title: 'Class (Legacy)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'full_roll',
      title: 'Full Roll (Legacy)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL (Legacy)',
      type: 'url',
      hidden: true,
    }),
    defineField({
      name: 'messenger',
      title: 'Messenger (Legacy)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'pdfs',
      title: 'Legacy PDFs',
      type: 'object',
      hidden: true,
      fields: [
        { name: 'ct1', title: 'CT-1', type: 'file' },
        { name: 'ct2', title: 'CT-2', type: 'file' },
        { name: 'hy', title: 'HY', type: 'file' },
        { name: 'ct3', title: 'CT-3', type: 'file' },
        { name: 'yearly', title: 'Yearly', type: 'file' },
      ],
    }),
    defineField({
      name: 'custom_links',
      title: 'Legacy Custom Links',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'url', type: 'url' }] }],
      hidden: true,
    }),
    defineField({
      name: 'dob_bn',
      title: 'Legacy DOB BN',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'generated_pdf_names',
      title: 'Legacy Generated PDF Names',
      type: 'object',
      fields: [
        { name: 'ct1', type: 'string' },
        { name: 'ct2', type: 'string' },
        { name: 'hy', type: 'string' },
        { name: 'ct3', type: 'string' },
        { name: 'yearly', type: 'string' },
        { name: 'test', type: 'string' },
      ],
      hidden: true,
    }),
    defineField({
      name: 'group_bn',
      title: 'Legacy Group BN',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'group_en',
      title: 'Legacy Group EN',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'roommate_ids',
      title: 'Legacy Roommate IDs',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: true,
    }),
  ],

  orderings: [
    {
      title: 'Batch → Roll',
      name: 'batchRoll',
      by: [
        { field: 'batch', direction: 'desc' },
        { field: 'short_roll', direction: 'asc' },
      ],
    },
    {
      title: 'Position',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name_en', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'name_en',
      roll: 'short_roll',
      room: 'room_no',
      batch: 'batch',
      group: 'group',
      media: 'photo',
      class_no: 'class_no',
    },
    prepare({ title, roll, room, batch, group, media, class_no }) {
      const groupCode = group === 'science' ? 'Sci' : group === 'commerce' ? 'B.St' : group === 'arts' ? 'Hum' : '';
      const displayBatch = batch || (class_no === '12' ? 'HSC-27' : class_no === '11' ? 'HSC-28' : 'HSC-27');
      const parts = [displayBatch, groupCode, room ? `R${room}` : '', roll ? `Roll ${roll}` : ''].filter(Boolean);
      return {
        title: title || 'Unnamed Student',
        subtitle: parts.join(' · '),
        media: media,
      }
    },
  },
})
