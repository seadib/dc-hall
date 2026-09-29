import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings & Privacy',
  type: 'document',
  groups: [
    { name: 'general', title: 'সাধারণ সেটিংস (General)' },
    { name: 'hero', title: 'হিরো ব্যানার (Hero Banner)' },
    { name: 'privacy', title: 'গোপনীয়তা ও লক (Privacy & Locks)' },
    { name: 'dhaka_college', title: 'ঢাকা কলেজ অফিসিয়াল ও ক্লাব (DC Official & Clubs)' },
  ],
  fields: [
    // --- Group: General ---
    defineField({
      name: 'site_title_en',
      title: 'Website Title (English)',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'site_title_bn',
      title: 'ওয়েবসাইট শিরোনাম (বাংলা)',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Header Logo',
      type: 'image',
      group: 'general',
    }),
    defineField({
      name: 'hero_image',
      title: 'Hero Banner Background Image',
      type: 'image',
      group: 'general',
    }),
    defineField({
      name: 'notice_pdf',
      title: 'Notice Board PDF Document',
      type: 'file',
      group: 'general',
    }),

    // --- Group: Hero ---
    defineField({
      name: 'hero_title_en',
      title: 'Hero Title (English)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'hero_title_bn',
      title: 'হিরো শিরোনাম (বাংলা)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'hero_subtitle_en',
      title: 'Hero Subtitle (English)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'hero_subtitle_bn',
      title: 'হিরো সাবটাইটেল (বাংলা)',
      type: 'string',
      group: 'hero',
    }),

    // --- Group: Privacy ---
    defineField({
      name: 'password',
      title: 'Global Visibility Password',
      type: 'string',
      group: 'privacy',
    }),
    defineField({
      name: 'global_visibility',
      title: 'Global Visibility Toggle (ON = Publicly Unlocked)',
      type: 'boolean',
      group: 'privacy',
    }),
    defineField({
      name: 'locked_fields',
      title: 'Custom Locked Fields Options',
      type: 'object',
      group: 'privacy',
      fields: [
        { name: 'lock_phone', title: 'Lock Student Phone Number', type: 'boolean' },
        { name: 'lock_father_phone', title: 'Lock Guardian Phone', type: 'boolean' },
        { name: 'lock_email', title: 'Lock Email', type: 'boolean' },
        { name: 'lock_address', title: 'Lock Address', type: 'boolean' },
        { name: 'lock_socials', title: 'Lock Social Links (FB/Messenger)', type: 'boolean' },
        { name: 'lock_results', title: 'Lock Academic Results PDFs', type: 'boolean' },
      ],
    }),

    // --- Group: Dhaka College & Clubs ---
    defineField({
      name: 'dhaka_college',
      title: 'Dhaka College Official Resources & Clubs',
      type: 'object',
      group: 'dhaka_college',
      fields: [
        { name: 'official_site_title_en', title: 'Official Website Title EN', type: 'string' },
        { name: 'official_site_title_bn', title: 'অফিসিয়াল ওয়েবসাইট শিরোনাম বাংলা', type: 'string' },
        { name: 'official_site_url', title: 'Official Website URL', type: 'url' },
        { name: 'notice_title_en', title: 'Notice Title EN', type: 'string' },
        { name: 'notice_title_bn', title: 'নোটিশ শিরোনাম বাংলা', type: 'string' },
        { name: 'notice_url', title: 'Notice Board URL', type: 'url' },
        { name: 'result_admit_title_en', title: 'Result & Admit Title EN', type: 'string' },
        { name: 'result_admit_title_bn', title: 'রেজাল্ট ও এডমিট কার্ড শিরোনাম বাংলা', type: 'string' },
        { name: 'result_admit_url', title: 'Result & Admit Card URL', type: 'url' },
        {
          name: 'social_links',
          title: 'Official Social Pages & Groups',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title_en', title: 'Title EN', type: 'string' },
                { name: 'title_bn', title: 'শিরোনাম বাংলা', type: 'string' },
                { name: 'url', title: 'URL', type: 'url' },
                { name: 'is_group', title: 'Is Group (Checked = Group, Unchecked = Page)', type: 'boolean' },
              ],
            },
          ],
        },
        {
          name: 'clubs',
          title: 'Dhaka College Clubs (কলেজ ক্লাবসমূহ)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name_en', title: 'Club Name EN', type: 'string' },
                { name: 'name_bn', title: 'ক্লাবের নাম বাংলা', type: 'string' },
                { name: 'desc_en', title: 'Description EN', type: 'text', rows: 2 },
                { name: 'desc_bn', title: 'বিবরণ বাংলা', type: 'text', rows: 2 },
                { name: 'facebook_url', title: 'Club Facebook Page URL', type: 'url' },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'site_title_en',
      subtitle: 'site_title_bn',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Site Settings & Privacy',
        subtitle: subtitle || 'Global Configuration',
      }
    },
  },
})
