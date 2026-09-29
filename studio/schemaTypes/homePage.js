import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'hero_eyebrow_en',
      title: 'Hero Eyebrow EN',
      type: 'string',
    }),
    defineField({
      name: 'hero_eyebrow_bn',
      title: 'Hero Eyebrow BN',
      type: 'string',
    }),
    defineField({
      name: 'hero_title_en',
      title: 'Hero Title EN',
      type: 'string',
    }),
    defineField({
      name: 'hero_title_bn',
      title: 'Hero Title BN',
      type: 'string',
    }),
    defineField({
      name: 'info_title_en',
      title: 'Info Title EN',
      type: 'string',
    }),
    defineField({
      name: 'info_title_bn',
      title: 'Info Title BN',
      type: 'string',
    }),
    defineField({
      name: 'history_text_en',
      title: 'History Text EN',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'history_text_bn',
      title: 'History Text BN',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'map_url',
      title: 'Google Map Embed URL',
      type: 'url',
    }),
  ],
})
