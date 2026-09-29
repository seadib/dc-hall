import glob
import re

html_files = glob.glob("*.html")
print(f"Processing {len(html_files)} HTML files...")

for path in html_files:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    orig = content
    # Remove netlify identity scripts
    content = re.sub(r'[ \t]*<script\s+src="https://identity\.netlify\.com/v1/netlify-identity-widget\.js"></script>\r?\n?', '', content)
    content = re.sub(r'[ \t]*<script\s+src="js/netlify-identity\.js"></script>\r?\n?', '', content)

    # Insert sanity-client.js before js/app.js if not present
    if "js/sanity-client.js" not in content:
        content = re.sub(r'([ \t]*)<script\s+src="js/app\.js"></script>', r'\1<script src="js/sanity-client.js"></script>\n\1<script src="js/app.js"></script>', content)

    if content != orig:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Successfully updated: {path}")
    else:
        print(f"No change: {path}")

print("All HTML files updated.")
