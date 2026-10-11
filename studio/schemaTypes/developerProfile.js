import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'developerProfile',
  title: 'Developer Profile',
  type: 'document',
  groups: [
    { name: 'sections_control', title: '① সেকশন কন্ট্রোল ও ক্রম (Section Visibility & Order)', default: true },
    { name: 'bio', title: '② পরিচিতি ও ছবি (Bio & Portrait)' },
    { name: 'panels', title: '③ তথ্য প্যানেলসমূহ (About, Contact & Focus)' },
    { name: 'skills_projects', title: '④ দক্ষতা ও প্রোজেক্ট (Skills & Projects)' },
    { name: 'contributors', title: '⑤ সহযোগীবৃন্দ (Contributors)' },
  ],
  fields: [
    // ═══════════════════════════════════════════
    // ① Developer Page Sections Controls
    // ═══════════════════════════════════════════
    defineField({
      name: 'sections_control',
      title: 'Developer Page Sections Visibility & Order (ড্র্যাগ করে সেকশন সাজান)',
      type: 'array',
      group: 'sections_control',
      description: '↕️ ড্র্যাগ করে ডেভেলপার পেজের সেকশনগুলোর ক্রম সাজান। যে সেকশনটি উপরে থাকবে ওয়েবসাইটে সেটি আগে দেখাবে।',
      of: [
        {
          type: 'object',
          name: 'devSectionItem',
          title: 'Section',
          fields: [
            defineField({
              name: 'section_id',
              title: 'Section (সেকশন নির্বাচন করুন)',
              type: 'string',
              options: {
                list: [
                  { title: '👤 Hero Bio & Portrait (হিরো পরিচিতি ও ছবি)', value: 'hero_bio' },
                  { title: '📋 Overview Panels (সম্পর্কে, যোগাযোগ ও উদ্দেশ্য)', value: 'overview_panels' },
                  { title: '💻 Featured Projects (উল্লেখযোগ্য প্রোজেক্টসমূহ)', value: 'featured_projects' },
                  { title: '⚡ Skills & Project Method (দক্ষতা ও কাজের ধাপ)', value: 'skills_timeline' },
                  { title: '🤝 Contributors (প্রোজেক্টের সহযোগীবৃন্দ)', value: 'contributors' },
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
                hero_bio: '👤 Hero Bio & Portrait (হিরো পরিচিতি)',
                overview_panels: '📋 Overview Panels (প্যানেলসমূহ)',
                featured_projects: '💻 Featured Projects (প্রোজেক্টসমূহ)',
                skills_timeline: '⚡ Skills & Timeline (দক্ষতা ও ধাপ)',
                contributors: '🤝 Contributors (সহযোগীবৃন্দ)',
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
        { _key: 'dsec1', section_id: 'hero_bio', enabled: true },
        { _key: 'dsec2', section_id: 'overview_panels', enabled: true },
        { _key: 'dsec3', section_id: 'featured_projects', enabled: true },
        { _key: 'dsec4', section_id: 'skills_timeline', enabled: true },
        { _key: 'dsec5', section_id: 'contributors', enabled: true },
      ],
    }),

    // ═══════════════════════════════════════════
    // ② Bio & Portrait
    // ═══════════════════════════════════════════
    defineField({
      name: 'eyebrow_en',
      title: 'Eyebrow Tag (English)',
      type: 'string',
      group: 'bio',
      placeholder: 'Aspiring Software Engineer',
    }),
    defineField({
      name: 'eyebrow_bn',
      title: 'আইব্রো ট্যাগ (বাংলা)',
      type: 'string',
      group: 'bio',
      placeholder: 'উচ্চাকাঙ্ক্ষী সফটওয়্যার প্রকৌশলী',
    }),
    defineField({
      name: 'name_en',
      title: 'Developer Name EN',
      type: 'string',
      group: 'bio',
      placeholder: 'Abdullah Al Adib',
    }),
    defineField({
      name: 'name_bn',
      title: 'নাম (বাংলা)',
      type: 'string',
      group: 'bio',
      placeholder: 'আবদুল্লাহ আল আদিব',
    }),
    defineField({
      name: 'lead_en',
      title: 'Lead Bio EN',
      type: 'text',
      rows: 3,
      group: 'bio',
    }),
    defineField({
      name: 'lead_bn',
      title: 'বায়ো (বাংলা)',
      type: 'text',
      rows: 3,
      group: 'bio',
    }),
    defineField({
      name: 'portfolio_link',
      title: 'Personal Portfolio Link',
      type: 'url',
      group: 'bio',
      placeholder: 'https://adi.pro.bd/',
    }),
    defineField({
      name: 'projects_link',
      title: 'View Projects Link',
      type: 'url',
      group: 'bio',
      placeholder: 'https://adi.pro.bd/#projects',
    }),
    defineField({
      name: 'portrait',
      title: 'Developer Portrait Image',
      type: 'image',
      group: 'bio',
    }),

    // ═══════════════════════════════════════════
    // ③ Overview Panels
    // ═══════════════════════════════════════════
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
      title: 'Focus / What I Do Title EN',
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
      title: 'Focus / What I Do Text EN',
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

    // ═══════════════════════════════════════════
    // ④ Skills & Projects
    // ═══════════════════════════════════════════
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
            { name: 'title', title: 'Project Title EN', type: 'string' },
            { name: 'title_bn', title: 'প্রোজেক্ট নাম বাংলা', type: 'string' },
            { name: 'url', title: 'Project URL', type: 'url' },
            { name: 'domain_display', title: 'Display URL / Label', type: 'string', placeholder: 'e.g. adi.pro.bd/courselink' },
            { name: 'desc_en', title: 'Description EN', type: 'text', rows: 2 },
            { name: 'desc_bn', title: 'বিবরণ বাংলা', type: 'text', rows: 2 },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'domain_display',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Project',
                subtitle: subtitle || '',
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // ⑤ Contributors
    // ═══════════════════════════════════════════
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
            { name: 'photo', title: 'Photo (ছবি)', type: 'image' },
          ],
          preview: {
            select: {
              title: 'name_en',
              subtitle: 'desc_en',
              media: 'photo',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Contributor',
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
