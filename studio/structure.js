import {
  CogIcon,
  HomeIcon,
  CaseIcon,
  UsersIcon,
  PackageIcon,
  ImageIcon,
  CodeIcon,
} from '@sanity/icons'

export const structure = (S) =>
  S.list()
    .title('Hall Management Content')
    .items([
      // 1. Singletons (Direct Document Forms)
      S.listItem()
        .title('Site Settings & Privacy (সাইট সেটিংস)')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings & Privacy')
        ),
      S.listItem()
        .title('Home Page Content (হোম পেজ)')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page Content')
        ),
      S.listItem()
        .title('Hall History & Super (হল তথ্য ও সুপার বাণী)')
        .icon(CaseIcon)
        .child(
          S.document()
            .schemaType('hallInfo')
            .documentId('hallInfo')
            .title('Hall History & Super')
        ),
      S.listItem()
        .title('Developer Profile (ডেভেলপার প্রোফাইল)')
        .icon(CodeIcon)
        .child(
          S.document()
            .schemaType('developerProfile')
            .documentId('developerProfile')
            .title('Developer Profile')
        ),

      S.divider(),

      // 2. Collection Lists
      S.listItem()
        .title('Students Directory (শিক্ষার্থী তালিকা)')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('student')
            .title('All Students (সকল শিক্ষার্থী)')
            .defaultOrdering([{ field: 'position', direction: 'asc' }])
        ),
      S.listItem()
        .title('Rooms & Capacities (রুমসমূহ)')
        .icon(PackageIcon)
        .child(
          S.documentTypeList('room')
            .title('All Rooms (সকল রুম)')
            .defaultOrdering([{ field: 'room_no', direction: 'asc' }])
        ),
      S.listItem()
        .title('Photo Gallery (ফটো গ্যালারি)')
        .icon(ImageIcon)
        .child(
          S.documentTypeList('galleryItem')
            .title('Gallery Items (ফটো গ্যালারি)')
            .defaultOrdering([{ field: 'position', direction: 'asc' }])
        ),
    ])
