import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings & Privacy',
  type: 'document',
  fields: [
    defineField({
      name: 'site_title_en',
      title: 'Website Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'site_title_bn',
      title: 'ওয়েবসাইট শিরোনাম (বাংলা)',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Header Logo',
      type: 'image',
    }),
    defineField({
      name: 'hero_image',
      title: 'Hero Banner Background Image',
      type: 'image',
    }),
    defineField({
      name: 'notice_pdf',
      title: 'Notice Board PDF Document',
      type: 'file',
    }),
    defineField({
      name: 'password',
      title: 'Global Visibility Password',
      type: 'string',
    }),
    defineField({
      name: 'global_visibility',
      title: 'Global Visibility Toggle (ON = Publicly Unlocked)',
      type: 'boolean',
    }),
    defineField({
      name: 'locked_fields',
      title: 'Custom Locked Fields Options',
      type: 'object',
      fields: [
        { name: 'lock_phone', title: 'Lock Student Phone Number', type: 'boolean' },
        { name: 'lock_father_phone', title: 'Lock Guardian Phone', type: 'boolean' },
        { name: 'lock_email', title: 'Lock Email', type: 'boolean' },
        { name: 'lock_address', title: 'Lock Address', type: 'boolean' },
        { name: 'lock_socials', title: 'Lock Social Links (FB/Messenger)', type: 'boolean' },
        { name: 'lock_results', title: 'Lock Academic Results PDFs', type: 'boolean' },
      ],
    }),
  ],
})
