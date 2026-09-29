import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'student',
  title: 'Students (শিক্ষার্থী)',
  type: 'document',
  groups: [
    { name: 'basic', title: 'মৌলিক তথ্য (Basic Info)' },
    { name: 'academic', title: 'একাডেমিক ও রুম (Academic & Room)' },
    { name: 'contact', title: 'যোগাযোগ ও সোশ্যাল (Contact & Social)' },
    { name: 'bio_media', title: 'ছবি ও বায়ো (Photo & Bio)' },
    { name: 'results', title: 'ফলাফল PDF (Academic Results)' },
  ],
  fields: [
    // --- Group: Basic Info ---
    defineField({
      name: 'position',
      title: 'Display Position / Serial (ক্রমিক)',
      type: 'number',
      group: 'basic',
    }),
    defineField({
      name: 'student_id',
      title: 'Student ID (Slug, e.g. adib1)',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
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
    }),

    // --- Group: Academic & Room ---
    defineField({
      name: 'room_no',
      title: 'Room Number (রুম নম্বর)',
      type: 'string',
      group: 'academic',
    }),
    defineField({
      name: 'short_roll',
      title: 'College Roll (e.g. 5040)',
      type: 'string',
      group: 'academic',
    }),
    defineField({
      name: 'full_roll',
      title: 'Full Roll / Board Roll',
      type: 'string',
      group: 'academic',
    }),
    defineField({
      name: 'class_no',
      title: 'Class (একাদশ / দ্বাদশ)',
      type: 'string',
      group: 'academic',
      initialValue: '11',
    }),
    defineField({
      name: 'group',
      title: 'Group (বিভাগ)',
      type: 'string',
      group: 'academic',
      options: {
        list: [
          { title: 'Science (বিজ্ঞান)', value: 'science' },
          { title: 'Arts / Humanities (মানবিক)', value: 'arts' },
          { title: 'Commerce / Business (ব্যবসায় শিক্ষা)', value: 'commerce' },
        ],
      },
    }),
    defineField({
      name: 'section',
      title: 'College Section (A, B, C, D, E)',
      type: 'string',
      group: 'academic',
    }),
    defineField({
      name: 'practical_group',
      title: 'Practical Group (ব্যবহারিক গ্রুপ)',
      type: 'string',
      group: 'academic',
    }),

    // --- Group: Contact & Social ---
    defineField({
      name: 'phone',
      title: 'Student Phone Number',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'father_phone',
      title: 'Guardian / Father Phone Number',
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
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook Profile URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'messenger',
      title: 'Messenger Link / Username',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'blood_group',
      title: 'Blood Group (রক্তের গ্রুপ)',
      type: 'string',
      group: 'contact',
      options: {
        list: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      },
    }),

    // --- Group: Photo & Bio ---
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      group: 'bio_media',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio_en',
      title: 'Bio / Note (English)',
      type: 'text',
      rows: 3,
      group: 'bio_media',
    }),
    defineField({
      name: 'bio_bn',
      title: 'বায়ো / পরিচয় (বাংলা)',
      type: 'text',
      rows: 3,
      group: 'bio_media',
    }),

    // --- Group: Academic Results PDFs ---
    defineField({
      name: 'pdfs',
      title: 'Academic Result PDFs (পরীক্ষার ফলাফল)',
      type: 'object',
      group: 'results',
      fields: [
        { name: 'ct1', title: 'CT-1 Result PDF', type: 'file' },
        { name: 'ct2', title: 'CT-2 Result PDF', type: 'file' },
        { name: 'hy', title: 'Half Yearly Result PDF', type: 'file' },
        { name: 'ct3', title: 'CT-3 Result PDF', type: 'file' },
        { name: 'yearly', title: 'Yearly Final Result PDF', type: 'file' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name_en',
      subtitle: 'room_no',
      media: 'photo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Unnamed Student',
        subtitle: subtitle ? `Room: ${subtitle}` : '',
        media: (media && typeof media === 'object' && media.asset) ? media : undefined,
      }
    },
  },
})
