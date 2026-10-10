import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings & Privacy',
  type: 'document',
  groups: [
    { name: 'general', title: 'সাধারণ সেটিংস (General)' },
    { name: 'hero', title: 'হিরো ব্যানার (Hero Banner)' },
    { name: 'privacy', title: 'গোপনীয়তা ও পাসওয়ার্ড (Privacy & Passwords)' },
    { name: 'dhaka_college', title: 'ঢাকা কলেজ অফিসিয়াল ও ক্লাব (DC Official & Clubs)' },
  ],
  fields: [
    // ═══════════════════════════════════════════
    // ① General
    // ═══════════════════════════════════════════
    defineField({
      name: 'site_title_en',
      title: 'Website Title (English)',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'site_title_bn',
      title: 'ওয়েবসাইট শিরোনাম (বাংলা)',
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

    // ═══════════════════════════════════════════
    // ② Hero
    // ═══════════════════════════════════════════
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

    // ═══════════════════════════════════════════
    // ③ Privacy & Passwords
    // ═══════════════════════════════════════════
    defineField({
      name: 'master_password',
      title: 'Master Admin Password (অ্যাডমিন মাস্টার পাসওয়ার্ড)',
      type: 'string',
      group: 'privacy',
      description: 'এই পাসওয়ার্ড দিয়ে লগইন করলে সমস্ত ব্যাচের সব লক করা তথ্য আনলক হবে। ডিফল্ট: 102103104',
      placeholder: '102103104',
    }),
    defineField({
      name: 'batch_passwords',
      title: 'Batch Specific Passwords (ব্যাচভিত্তিক গোপন পাসওয়ার্ড)',
      type: 'object',
      group: 'privacy',
      description: 'নির্দিষ্ট ব্যাচের শিক্ষার্থীরা এই পাসওয়ার্ড দিয়ে লগইন করলে শুধুমাত্র তাদের ব্যাচের সংরক্ষিত তথ্য দেখতে পারবে।',
      fields: [
        { name: 'hsc27', title: 'HSC 2027 Password', type: 'string', placeholder: 'dc27hall' },
        { name: 'hsc28', title: 'HSC 2028 Password', type: 'string', placeholder: 'dc28hall' },
        { name: 'hsc29', title: 'HSC 2029 Password', type: 'string', placeholder: 'dc29hall' },
        { name: 'hsc30', title: 'HSC 2030 Password', type: 'string', placeholder: 'dc30hall' },
      ],
    }),
    defineField({
      name: 'password',
      title: 'Global Legacy Visibility Password (অপশনাল ব্যাকআপ পাসওয়ার্ড)',
      type: 'string',
      group: 'privacy',
    }),
    defineField({
      name: 'global_visibility',
      title: 'Global Visibility (সবার জন্য উন্মুক্ত রাখবেন কি না)',
      type: 'boolean',
      group: 'privacy',
      description: 'ON থাকলে পাসওয়ার্ড ছাড়াই সাধারণ ভিজিটররা মৌলিক তথ্য দেখতে পারবে।',
      initialValue: true,
    }),
    defineField({
      name: 'locked_fields',
      title: 'General User Locked Fields (সাধারণ ব্যবহারকারীদের জন্য লক তথ্যসমূহ)',
      type: 'object',
      group: 'privacy',
      description: 'যে যে ফিল্ডগুলো সাধারণ ভিজিটরদের কাছে লক থাকবে (লগইন ছাড়া দেখা যাবে না)',
      fields: [
        { name: 'lock_phone', title: 'Lock Student Phone Number (শিক্ষার্থীর ফোন নম্বর লক)', type: 'boolean', initialValue: true },
        { name: 'lock_father_phone', title: 'Lock Guardian Phone (অভিভাবকের ফোন লক)', type: 'boolean', initialValue: true },
        { name: 'lock_email', title: 'Lock Email (ইমেইল ঠিকানা লক)', type: 'boolean', initialValue: true },
        { name: 'lock_address', title: 'Lock Address / Location (ঠিকানা লক)', type: 'boolean', initialValue: false },
        { name: 'lock_socials', title: 'Lock Social Links (ফেসবুক / সোশ্যাল লক)', type: 'boolean', initialValue: false },
        { name: 'lock_results', title: 'Lock Academic Results PDFs (মার্কস ও ফলাফল লক)', type: 'boolean', initialValue: true },
        { name: 'lock_room', title: 'Lock Room Allocation (রুম নম্বর ও সিট লক)', type: 'boolean', initialValue: false },
      ],
    }),

    // ═══════════════════════════════════════════
    // ④ Dhaka College & Clubs
    // ═══════════════════════════════════════════
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
