import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'room',
  title: 'Rooms (রুমসমূহ)',
  type: 'document',
  fields: [
    defineField({
      name: 'room_no',
      title: 'Room Number (রুম নম্বর)',
      type: 'string',
      description: 'শুধুমাত্র রুম নম্বর লিখুন (যেমন: 127)। টাইটেল স্বয়ংক্রিয়ভাবে "Room 127" ও "রুম ১২৭" তৈরি হবে।',
      placeholder: 'e.g. 127',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capacity',
      title: 'Total Seats (মোট সিট সংখ্যা)',
      type: 'number',
      initialValue: 2,
      description: 'ডিফল্ট হিসেবে ২ সিট থাকবে। প্রয়োজনে পরিবর্তন করা যাবে।',
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'title_en',
      title: 'Room Title EN (অপশনাল — খালি রাখলে স্বয়ংক্রিয় "Room [No]" হবে)',
      type: 'string',
      placeholder: 'Auto: Room 127',
    }),
    defineField({
      name: 'title_bn',
      title: 'রুম শিরোনাম বাংলা (অপশনাল — খালি রাখলে স্বয়ংক্রিয় "রুম [নম্বর]" হবে)',
      type: 'string',
      placeholder: 'স্বয়ংক্রিয়: রুম ১২৭',
    }),
    defineField({
      name: 'description_en',
      title: 'Description EN (রুম বিবরণ)',
      type: 'text',
      rows: 3,
      initialValue: 'Comfortable living space with individual study desks, secure personal storage, natural ventilation, and quiet academic atmosphere.',
    }),
    defineField({
      name: 'description_bn',
      title: 'বিবরণ বাংলা',
      type: 'text',
      rows: 3,
      initialValue: 'শান্ত ও মনোরম পরিবেশ, পড়ার টেবিল, ব্যক্তিগত লকার এবং পর্যাপ্ত আলো-বাতাসসমৃদ্ধ আদর্শ ছাত্রাবাস কক্ষ।',
    }),
    defineField({
      name: 'photos',
      title: 'Room Photos (রুমের ছবিসমূহ)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'assigned_students',
      title: 'Assigned Students (এই রুমের শিক্ষার্থীগণ)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'student' }] }],
      description: 'রুমের শিক্ষার্থী সরাসরি এখান থেকেও সিলেক্ট করতে পারেন অথবা স্টুডেন্ট প্রোফাইল থেকেও রুম সিলেক্ট করতে পারেন — দুটোই রিয়েল-টাইমে কানেক্টেড!',
    }),
  ],
  preview: {
    select: {
      title: 'room_no',
      subtitle: 'capacity',
      media: 'photos.0',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ? `Room ${title} (রুম ${title})` : 'Untitled Room',
        subtitle: subtitle ? `Capacity: ${subtitle} Seats` : 'Capacity: 2 Seats',
        media: (media && typeof media === 'object' && media.asset) ? media : undefined,
      }
    },
  },
})
