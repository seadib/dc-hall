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
    { name: 'footer', title: 'ফুটার ও কুইক লিংক (Footer & Quick Links)' },
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

    // ═══════════════════════════════════════════
    // ⑤ Footer & Quick Links
    // ═══════════════════════════════════════════
    defineField({
      name: 'footer_columns',
      title: 'Footer Columns & Links (ফুটার কলাম ও লিংক ব্যবস্থাপনা)',
      type: 'array',
      group: 'footer',
      description: '↕️ ড্র্যাগ করে কলামগুলোর ক্রম সাজান। নতুন কলাম যোগ করতে (+ Add item) ক্লিক করুন। প্রতিটি কলামে ইচ্ছামতো লিংক যোগ ও ড্র্যাগ করে সাজানো যাবে।',
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          title: 'Footer Column (কলাম)',
          fields: [
            defineField({
              name: 'title_en',
              title: 'Column Title EN (ইংরেজি শিরোনাম)',
              type: 'string',
              placeholder: 'e.g. Quick Links / Student / Hall',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title_bn',
              title: 'কলাম শিরোনাম বাংলা (ঐচ্ছিক)',
              type: 'string',
              placeholder: 'যেমন: কুইক লিংক / শিক্ষার্থী / হল',
            }),
            defineField({
              name: 'is_active',
              title: 'Show Column on Site (কলামটি সাইটে দেখাবেন?)',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'links',
              title: 'Column Links (এই কলামের লিংকসমূহ — ড্র্যাগ করে সাজান)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'columnLink',
                  title: 'Link',
                  fields: [
                    defineField({
                      name: 'title_en',
                      title: 'Link Title EN (ইংরেজি নাম)',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'title_bn',
                      title: 'লিংক নাম বাংলা (ঐচ্ছিক)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'url',
                      title: 'Target URL (যেমন: students.html বা https://...)',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'is_active',
                      title: 'Active (চালু?)',
                      type: 'boolean',
                      initialValue: true,
                    }),
                    defineField({
                      name: 'open_in_new_tab',
                      title: 'Open in new tab (নতুন ট্যাবে ওপেন হবে?)',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {
                      titleEn: 'title_en',
                      titleBn: 'title_bn',
                      url: 'url',
                      isActive: 'is_active',
                    },
                    prepare({ titleEn, titleBn, url, isActive }) {
                      const status = isActive !== false ? '🟢' : '⚪ বন্ধ'
                      const label = titleEn || titleBn || 'Link'
                      return {
                        title: `${status} ${label}`,
                        subtitle: url,
                      }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              titleEn: 'title_en',
              titleBn: 'title_bn',
              links: 'links',
              isActive: 'is_active',
            },
            prepare({ titleEn, titleBn, links, isActive }) {
              const count = Array.isArray(links) ? links.length : 0
              const status = isActive !== false ? '🟢 চালু' : '⚪ বন্ধ'
              const label = titleEn || titleBn || 'Column'
              return {
                title: `${label} (${count} links)`,
                subtitle: status,
              }
            },
          },
        },
      ],
      initialValue: [
        {
          _key: 'col1',
          title_en: 'Quick Links',
          title_bn: 'কুইক লিংক',
          is_active: true,
          links: [
            { _key: 'l1', title_en: 'Students Preview', title_bn: 'শিক্ষার্থী প্রিভিউ', url: 'index.html#students-preview', is_active: true },
            { _key: 'l2', title_en: 'Roommate Preview', title_bn: 'রুমমেট প্রিভিউ', url: 'index.html#roommates-preview', is_active: true },
            { _key: 'l3', title_en: 'Hall Super', title_bn: 'হল সুপার', url: 'index.html#hallsuper-preview', is_active: true },
            { _key: 'l4', title_en: 'Gallery', title_bn: 'গ্যালারি', url: 'index.html#gallery-preview', is_active: true },
            { _key: 'l5', title_en: 'College Resources', title_bn: 'কলেজ রিসোর্স', url: 'index.html#dc-resources', is_active: true },
            { _key: 'l6', title_en: 'Location', title_bn: 'অবস্থান', url: 'index.html#location', is_active: true },
          ],
        },
        {
          _key: 'col2',
          title_en: 'Student',
          title_bn: 'শিক্ষার্থী',
          is_active: true,
          links: [
            { _key: 'l7', title_en: 'Students', title_bn: 'সকল শিক্ষার্থী', url: 'students.html', is_active: true },
            { _key: 'l8', title_en: 'Roommates', title_bn: 'রুমমেট তালিকা', url: 'roommates.html', is_active: true },
            { _key: 'l9', title_en: 'Results', title_bn: 'একাডেমিক ফলাফল', url: 'results.html', is_active: true },
            { _key: 'l10', title_en: 'Profile / Login', title_bn: 'প্রোফাইল / লগইন', url: 'profile.html', is_active: true },
          ],
        },
        {
          _key: 'col3',
          title_en: 'Hall',
          title_bn: 'হল পরিচিতি',
          is_active: true,
          links: [
            { _key: 'l11', title_en: 'Hall Info', title_bn: 'হল তথ্য', url: 'hostel.html', is_active: true },
            { _key: 'l12', title_en: 'Hall Super', title_bn: 'হল সুপার বাণী', url: 'hostel.html#hallsuper', is_active: true },
            { _key: 'l13', title_en: 'Notable Alumni', title_bn: 'বিশিষ্ট প্রাক্তনী', url: 'hostel.html#famous', is_active: true },
            { _key: 'l14', title_en: 'Gallery', title_bn: 'ফটো গ্যালারি', url: 'gallery.html', is_active: true },
            { _key: 'l15', title_en: 'College Clubs', title_bn: 'কলেজ ক্লাবসমূহ', url: 'dc-clubs.html', is_active: true },
            { _key: 'l16', title_en: 'Social Links', title_bn: 'সোশ্যাল মিডিয়া', url: 'dc-social.html', is_active: true },
            { _key: 'l17', title_en: 'Developer', title_bn: 'ডেভেলপার প্রোফাইল', url: 'developer.html', is_active: true },
            { _key: 'l18', title_en: 'Admin Panel', title_bn: 'অ্যাডমিন প্যানেল', url: 'https://dchall.sanity.studio', is_active: true, open_in_new_tab: true },
          ],
        },
      ],
    }),
    defineField({
      name: 'quick_links',
      title: 'Legacy Quick Links (hidden)',
      type: 'array',
      group: 'footer',
      hidden: true,
      of: [{ type: 'object', fields: [{ name: 'title_en', type: 'string' }] }],
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
