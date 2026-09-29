import os
import re

html_files = [
    "index.html", "students.html", "roommates.html", "results.html", 
    "hostel.html", "hallsuper.html", "gallery.html", 
    "dc-social.html", "dc-clubs.html", "profile.html", "developer.html", "embed.html"
]

for filename in html_files:
    if not os.path.exists(filename):
        continue
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Update Title for SEO
    title_match = re.search(r"<title>(.*?)</title>", content)
    if title_match:
        old_title = title_match.group(1)
        if "Dhaka College International Hall" not in old_title:
            new_title = f"{old_title} | Dhaka College International Hall | DC Hall Website"
            content = content.replace(f"<title>{old_title}</title>", f"<title>{new_title}</title>")
    
    # Remove existing custom SEO lines to prevent duplicates if script runs again
    content = re.sub(r'\s*<meta name="description" content="Dhaka College International Hall.*?>', '', content)
    content = re.sub(r'\s*<meta name="keywords" content="dhaka college international.*?>', '', content)
    content = re.sub(r'\s*<link rel="icon" href="images/(?:logo|favicon)\.png".*?>', '', content)
    content = re.sub(r'\s*<link rel="shortcut icon" href="images/(?:logo|favicon)\.png".*?>', '', content)
    content = re.sub(r'\s*<link rel="apple-touch-icon" href="images/(?:logo|favicon)\.png".*?>', '', content)
    content = re.sub(r'\s*<script type="application/ld\+json">.*?</script>', '', content, flags=re.DOTALL)

    # 2. Insert Meta Tags and Favicons right after <head>
    seo_tags = """
  <meta name="description" content="Dhaka College International Hall Website (DC Hall Website). Explore student directory, room details, roommates search, academic results, club directory, and official social pages. Searchable for adib dchall, hostel info, and international hall students.">
  <meta name="keywords" content="dhaka college international hall wbsite, dc hall website, adib dchall, international hall info, hostel, dhaka college hostel, dc hostel, dhaka college, adib">
  <link rel="icon" href="images/favicon.png" type="image/png" sizes="192x192">
  <link rel="icon" href="images/favicon.png" type="image/png" sizes="96x96">
  <link rel="icon" href="images/favicon.png" type="image/png" sizes="48x48">
  <link rel="icon" href="images/favicon.png" type="image/png" sizes="32x32">
  <link rel="icon" href="images/favicon.png" type="image/png" sizes="16x16">
  <link rel="shortcut icon" href="images/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="images/favicon.png" sizes="180x180">"""

    # Add JSON-LD Structured Data to index.html
    if filename == "index.html":
        json_ld = """
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Dhaka College International Hall",
    "alternateName": ["DC Hall", "Dhaka College Hostel", "dchall", "adib dchall"],
    "url": "https://dchall.github.io/",
    "logo": "https://dchall.github.io/images/logo.png",
    "description": "Dhaka College International Hall Website (DC Hall Website). Information about rooms, roommates, student directories, academic results, and college clubs.",
    "keywords": "dhaka college international hall wbsite, dc hall website, adib dchall, international hall info, hostel"
  }
  </script>"""
        seo_tags += json_ld

    content = content.replace("<head>", f"<head>{seo_tags}")
        
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Successfully updated SEO & favicon tags in {filename}")
