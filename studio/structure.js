import {
  CogIcon,
  HomeIcon,
  CaseIcon,
  UsersIcon,
  PackageIcon,
  ImageIcon,
  CodeIcon,
  CalendarIcon,
} from '@sanity/icons'

export const structure = (S) =>
  S.list()
    .title('Hall Management Content')
    .items([
      // ═══════════════════════════════════════════
      // 1. Site-wide Singletons
      // ═══════════════════════════════════════════
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

      // ═══════════════════════════════════════════
      // 2. Students & Rooms
      // ═══════════════════════════════════════════
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

      S.divider(),

      // ═══════════════════════════════════════════
      // 3. Gallery — Events + Photo Items
      // ═══════════════════════════════════════════
      S.listItem()
        .title('Gallery Events (ইভেন্ট গ্যালারি)')
        .icon(CalendarIcon)
        .child(
          S.documentTypeList('galleryEvent')
            .title('All Events (সকল ইভেন্ট)')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
        ),
      S.listItem()
        .title('Gallery Items (ফটো গ্যালারি — ব্যাচভিত্তিক)')
        .icon(ImageIcon)
        .child(
          S.list()
            .title('Photo Gallery by Batch (ব্যাচভিত্তিক ফটো গ্যালারি)')
            .items([
              S.listItem()
                .title('HSC-27 Photo Gallery (এইচএসসি-২৭)')
                .icon(ImageIcon)
                .child(
                  S.document()
                    .schemaType('galleryItem')
                    .documentId('galleryItem_hsc27')
                    .title('HSC-27 Photo Gallery')
                ),
              S.listItem()
                .title('HSC-28 Photo Gallery (এইচএসসি-২৮)')
                .icon(ImageIcon)
                .child(
                  S.document()
                    .schemaType('galleryItem')
                    .documentId('galleryItem_hsc28')
                    .title('HSC-28 Photo Gallery')
                ),
              S.listItem()
                .title('HSC-29 Photo Gallery (এইচএসসি-২৯)')
                .icon(ImageIcon)
                .child(
                  S.document()
                    .schemaType('galleryItem')
                    .documentId('galleryItem_hsc29')
                    .title('HSC-29 Photo Gallery')
                ),
              S.listItem()
                .title('General / All Batches (সাধারণ গ্যালারি)')
                .icon(ImageIcon)
                .child(
                  S.document()
                    .schemaType('galleryItem')
                    .documentId('galleryItem_all')
                    .title('General Photo Gallery')
                ),
              S.divider(),
              S.listItem()
                .title('Manage & Delete Old Collections (সকল কালেকশন ও ডিলিট)')
                .icon(ImageIcon)
                .child(
                  S.documentTypeList('galleryItem')
                    .title('All Photo Collections (পুরোনো তালিকা ও ডিলিট করুন)')
                ),
            ])
        ),
    ])
