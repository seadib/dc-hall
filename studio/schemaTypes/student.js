import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'student',
  title: 'Students (শিক্ষার্থী)',
  type: 'document',
  fields: [
    defineField({
      name: 'position',
      title: 'Display Position / Serial (ক্রমিক)',
      type: 'number',
    }),
    defineField({
      name: 'student_id',
      title: 'Student ID (e.g. adib1)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name_en',
      title: 'Full Name (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name_bn',
      title: 'Full Name (বাংলা)',
      type: 'string',
    }),
    defineField({
      name: 'room_no',
      title: 'Room Number (রুম নম্বর)',
      type: 'string',
    }),
    defineField({
      name: 'short_roll',
      title: 'College Roll (e.g. 5040)',
      type: 'string',
    }),
    defineField({
      name: 'full_roll',
      title: 'Full Roll / Board Roll',
      type: 'string',
    }),
    defineField({
      name: 'class_no',
      title: 'Class (একাদশ / দ্বাদশ)',
      type: 'string',
      initialValue: '11',
    }),
    defineField({
      name: 'group',
      title: 'Group (বিভাগ)',
      type: 'string',
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
      title: 'Section (শাখা)',
      type: 'string',
    }),
    defineField({
      name: 'practical_group',
      title: 'Practical Group (ব্যবহারিক গ্রুপ)',
      type: 'string',
    }),
    defineField({
      name: 'blood_group',
      title: 'Blood Group (রক্তের গ্রুপ)',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Student Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'father_phone',
      title: 'Guardian / Father Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'address_en',
      title: 'Address (District / Division)',
      type: 'string',
    }),
    defineField({
      name: 'address_bn',
      title: 'ঠিকানা (বাংলা)',
      type: 'string',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook Profile URL',
      type: 'url',
    }),
    defineField({
      name: 'messenger',
      title: 'Messenger Link',
      type: 'url',
    }),
    defineField({
      name: 'bio_en',
      title: 'Bio / Note (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bio_bn',
      title: 'বায়ো / পরিচয় (বাংলা)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'pdfs',
      title: 'Academic Result PDFs (পরীক্ষার ফলাফল)',
      type: 'object',
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
        media,
      }
    },
  },
})
