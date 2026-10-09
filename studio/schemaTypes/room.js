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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity / Total Seats',
      type: 'number',
      initialValue: 4,
    }),
    defineField({
      name: 'title_en',
      title: 'Room Title EN',
      type: 'string',
    }),
    defineField({
      name: 'title_bn',
      title: 'রুম শিরোনাম (বাংলা)',
      type: 'string',
    }),
    defineField({
      name: 'description_en',
      title: 'Description (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description_bn',
      title: 'বিবরণ (বাংলা)',
      type: 'text',
      rows: 3,
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
      description: 'You can assign students directly here OR set Room Number inside the student profile — both work seamlessly!',
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
        title: `Room ${title}`,
        subtitle: subtitle ? `Capacity: ${subtitle} students` : '',
        media: (media && typeof media === 'object' && media.asset) ? media : undefined,
      }
    },
  },

})
