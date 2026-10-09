import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryEvent',
  title: 'Gallery Events (ইভেন্ট গ্যালারি)',
  type: 'document',
  groups: [
    { name: 'info', title: 'ইভেন্ট তথ্য (Event Info)' },
    { name: 'media', title: 'ফটো ও ভিডিও (Photos & Videos)' },
  ],
  fields: [
    // --- Group: Event Info ---
    defineField({
      name: 'event_id',
      title: 'Event Slug / ID',
      type: 'slug',
      group: 'info',
      description: 'Unique URL-friendly identifier (e.g. "iftar-reunion-2026"). Click Generate to auto-create from title.',
      options: {
        source: 'title_en',
        maxLength: 80,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Display Order / Position',
      type: 'number',
      group: 'info',
      description: 'Lower numbers appear first (when dates are the same). Leave blank for automatic ordering by date.',
    }),
    defineField({
      name: 'title_en',
      title: 'Event Title (English)',
      type: 'string',
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_bn',
      title: 'ইভেন্ট শিরোনাম (বাংলা)',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      group: 'info',
      description: 'Used for sorting — latest events appear first on the gallery page.',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date_formatted_en',
      title: 'Formatted Date (English)',
      type: 'string',
      group: 'info',
      description: 'Display format e.g. "March 2026". If blank, auto-generated from date.',
    }),
    defineField({
      name: 'date_formatted_bn',
      title: 'তারিখ (বাংলা ফরম্যাট)',
      type: 'string',
      group: 'info',
      description: 'যেমন: "মার্চ ২০২৬"',
    }),
    defineField({
      name: 'category',
      title: 'Category / ক্যাটেগরি',
      type: 'string',
      group: 'info',
      options: {
        list: [
          { title: 'Events (অনুষ্ঠান)', value: 'events' },
          { title: 'Sports (খেলাধুলা)', value: 'sports' },
          { title: 'Tours (ভ্রমণ)', value: 'tours' },
          { title: 'Memories (দৈনন্দিন স্মৃতি)', value: 'memories' },
        ],
        layout: 'radio',
      },
      initialValue: 'events',
    }),
    defineField({
      name: 'description_en',
      title: 'Event Description (English)',
      type: 'text',
      rows: 3,
      group: 'info',
    }),
    defineField({
      name: 'description_bn',
      title: 'ইভেন্ট বিবরণ (বাংলা)',
      type: 'text',
      rows: 3,
      group: 'info',
    }),

    // --- Group: Photos & Videos ---
    defineField({
      name: 'photos',
      title: 'Event Photos (ইভেন্ট ফটোসমূহ)',
      type: 'array',
      group: 'media',
      description: 'Drag to reorder. First photo is used as the event cover on the home page.',
      of: [
        {
          type: 'object',
          name: 'eventPhoto',
          title: 'Photo',
          fields: [
            defineField({
              name: 'photo',
              title: 'Photo / ফটো',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption_en',
              title: 'Caption (English)',
              type: 'string',
            }),
            defineField({
              name: 'caption_bn',
              title: 'ক্যাপশন (বাংলা)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'caption_en',
              subtitle: 'caption_bn',
              media: 'photo',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Photo',
                subtitle: subtitle || '',
                media: (media && typeof media === 'object' && media.asset) ? media : undefined,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'videos',
      title: 'Event Videos (ইভেন্ট ভিডিও)',
      type: 'array',
      group: 'media',
      description: 'YouTube or other embed URLs for event videos.',
      of: [
        {
          type: 'object',
          name: 'eventVideo',
          title: 'Video',
          fields: [
            defineField({
              name: 'url',
              title: 'Video Embed URL',
              type: 'url',
              description: 'YouTube embed URL e.g. https://www.youtube.com/embed/VIDEO_ID',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title_en',
              title: 'Video Title (English)',
              type: 'string',
            }),
            defineField({
              name: 'title_bn',
              title: 'ভিডিও শিরোনাম (বাংলা)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'title_en',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Event Date (Newest First)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Position',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title_en',
      subtitle: 'date',
      media: 'photos.0.photo',
      category: 'category',
    },
    prepare({ title, subtitle, media, category }) {
      const catLabel = {
        events: '🎉 Event',
        sports: '⚽ Sports',
        tours: '🏞️ Tour',
        memories: '📸 Memories',
      }
      return {
        title: title || 'Gallery Event',
        subtitle: `${catLabel[category] || category || ''} ${subtitle ? '· ' + subtitle : ''}`,
        media: (media && typeof media === 'object' && media.asset) ? media : undefined,
      }
    },
  },
})
