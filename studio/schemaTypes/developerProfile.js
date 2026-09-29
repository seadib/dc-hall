import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'developerProfile',
  title: 'Developer Profile',
  type: 'document',
  groups: [
    { name: 'bio', title: 'পরিচিতি ও ছবি (Bio & Portrait)' },
    { name: 'panels', title: 'তথ্য প্যানেলসমূহ (About, Contact & Focus)' },
    { name: 'skills_projects', title: 'দক্ষতা ও প্রোজেক্ট (Skills & Projects)' },
    { name: 'contributors', title: 'সহযোগীবৃন্দ (Contributors)' },
  ],
  fields: [
    // --- Group: Bio ---
    defineField({
      name: 'name_en',
      title: 'Developer Name EN',
      type: 'string',
      group: 'bio',
    }),
    defineField({
      name: 'name_bn',
      title: 'নাম (বাংলা)',
      type: 'string',
      group: 'bio',
    }),
    defineField({
      name: 'lead_en',
      title: 'Lead Bio EN',
      type: 'text',
      rows: 2,
      group: 'bio',
    }),
    defineField({
      name: 'lead_bn',
      title: 'বায়ো (বাংলা)',
      type: 'text',
      rows: 2,
      group: 'bio',
    }),
    defineField({
      name: 'portrait',
      title: 'Developer Portrait Image',
      type: 'image',
      group: 'bio',
    }),

    // --- Group: Panels ---
    defineField({
      name: 'about_title_en',
      title: 'About Title EN',
      type: 'string',
      group: 'panels',
    }),
    defineField({
      name: 'about_title_bn',
      title: 'সম্পর্কে শিরোনাম বাংলা',
      type: 'string',
      group: 'panels',
    }),
    defineField({
      name: 'about_text_en',
      title: 'About Text EN',
      type: 'text',
      rows: 4,
      group: 'panels',
    }),
    defineField({
      name: 'about_text_bn',
      title: 'সম্পর্কে বিবরণ বাংলা',
      type: 'text',
      rows: 4,
      group: 'panels',
    }),
    defineField({
      name: 'contact_title_en',
      title: 'Contact Title EN',
      type: 'string',
      group: 'panels',
    }),
    defineField({
      name: 'contact_title_bn',
      title: 'যোগাযোগ শিরোনাম বাংলা',
      type: 'string',
      group: 'panels',
    }),
    defineField({
      name: 'contact_text_en',
      title: 'Contact Text EN',
      type: 'text',
      rows: 4,
      group: 'panels',
    }),
    defineField({
      name: 'contact_text_bn',
      title: 'যোগাযোগ বিবরণ বাংলা',
      type: 'text',
      rows: 4,
      group: 'panels',
    }),
    defineField({
      name: 'focus_title_en',
      title: 'Focus Title EN',
      type: 'string',
      group: 'panels',
    }),
    defineField({
      name: 'focus_title_bn',
      title: 'উদ্দেশ্য শিরোনাম বাংলা',
      type: 'string',
      group: 'panels',
    }),
    defineField({
      name: 'focus_text_en',
      title: 'Focus Text EN',
      type: 'text',
      rows: 4,
      group: 'panels',
    }),
    defineField({
      name: 'focus_text_bn',
      title: 'উদ্দেশ্য বিবরণ বাংলা',
      type: 'text',
      rows: 4,
      group: 'panels',
    }),

    // --- Group: Skills & Projects ---
    defineField({
      name: 'skills',
      title: 'Key Skills (মূল দক্ষতাসমূহ)',
      type: 'array',
      group: 'skills_projects',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'skill', title: 'Skill Name', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Featured Projects (উল্লেখযোগ্য প্রোজেক্টসমূহ)',
      type: 'array',
      group: 'skills_projects',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Project Title', type: 'string' },
            { name: 'desc_en', title: 'Description EN', type: 'text', rows: 2 },
            { name: 'desc_bn', title: 'বিবরণ বাংলা', type: 'text', rows: 2 },
            { name: 'url', title: 'Project URL', type: 'url' },
          ],
        },
      ],
    }),

    // --- Group: Contributors ---
    defineField({
      name: 'contributors',
      title: 'Contributors (প্রোজেক্ট সহযোগীবৃন্দ)',
      type: 'array',
      group: 'contributors',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name_en', title: 'Contributor Name EN', type: 'string' },
            { name: 'name_bn', title: 'নাম বাংলা', type: 'string' },
            { name: 'desc_en', title: 'Role Description EN', type: 'text', rows: 2 },
            { name: 'desc_bn', title: 'ভূমিকা বিবরণ বাংলা', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name_en',
      subtitle: 'lead_en',
      media: 'portrait',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Developer Profile',
        subtitle: subtitle || 'Developer',
        media: (media && typeof media === 'object' && media.asset) ? media : undefined,
      }
    },
  },
})
