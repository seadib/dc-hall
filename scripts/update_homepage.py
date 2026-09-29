import re

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Define the new enhanced sections
new_sections = '''
    <!-- 3. Results Preview (Point 1 from user) -->
    <section class="section" id="results-preview">
      <div class="container">
        <div class="results-preview-wrap">
          <div data-aos="fade-up">
            <p class="eyebrow" data-i18n="results.eyebrow">Academic Records</p>
            <h2 data-i18n="results.title">Academic Results & Term Overviews</h2>
            <p class="lead">
              Review term-wise academic performance and download CT-1, CT-2, Half-Yearly, CT-3, and Yearly Examination PDFs directly linked to student records.
            </p>
            <div class="results-badges">
              <span class="result-term-badge">CT-1 Exam</span>
              <span class="result-term-badge">CT-2 Exam</span>
              <span class="result-term-badge">Half Yearly</span>
              <span class="result-term-badge">CT-3 Exam</span>
              <span class="result-term-badge">Yearly Final</span>
            </div>
            <a class="btn primary" href="results.html">View All Academic Results</a>
          </div>
          <div class="results-preview-card" data-aos="fade-left">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
              <div style="width: 44px; height: 44px; border-radius: 10px; background: var(--accent-soft); display: flex; align-items: center; justify-content: center; color: var(--accent);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
              </div>
              <div>
                <h3 style="margin: 0; font-size: 1.15rem;">Exam Result PDFs</h3>
                <p style="margin: 0; font-size: 0.85rem; color: var(--muted);">Direct Official Downloads</p>
              </div>
            </div>
            <p style="color: var(--muted); font-size: 0.95rem; margin-bottom: 20px;">
              Individual student profiles contain verified term exam results. Filter by section, roll, or group to check term marks.
            </p>
            <a class="btn secondary" href="results.html" style="width: 100%; text-align: center; justify-content: center;">
              Open Result Portal &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Hall Info Preview -->
    <section class="section tinted" id="hostel-info-preview">
      <div class="container">
        <div class="split">
          <div data-aos="fade-up">
            <p class="eyebrow" data-i18n="common.hostelInfo">Hall Info</p>
            <h2 data-i18n="home.infoTitle">Legacy, achievement and student life</h2>
            <p class="lead" data-i18n="home.infoLead">
              International Hall brings student profiles, room assignments, result records and important hall stories into a clean digital hub.
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 18px;">
              <a class="btn primary" href="hostel.html" data-i18n="home.exploreHostel">Explore Hall Info</a>
              <a class="btn secondary" href="hallsuper.html">Hall Super Message</a>
            </div>
          </div>
          <div class="info-grid">
            <article class="info-box" data-aos="fade-up" data-aos-delay="0">
              <span class="info-icon">01</span>
              <h3 data-i18n="common.history">History</h3>
              <p data-i18n="home.historyText">A short look at Dhaka College's academic legacy and hall life.</p>
            </article>
            <article class="info-box" data-aos="fade-up" data-aos-delay="140">
              <span class="info-icon">02</span>
              <h3 data-i18n="common.famousStudents">Notable Students</h3>
              <p data-i18n="home.famousText">Demo profiles for notable former students and their achievements.</p>
            </article>
            <article class="info-box" data-aos="fade-up" data-aos-delay="280">
              <span class="info-icon">03</span>
              <h3 data-i18n="common.admissionSuccess">Admission Success</h3>
              <p data-i18n="home.successText">Medical, university and engineering admission success preview.</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Gallery Preview (Point 1 from user) -->
    <section class="section" id="gallery-preview">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow">Moments & Memories</p>
            <h2>Hall Photo Gallery</h2>
          </div>
          <a class="btn secondary" href="gallery.html">View Full Gallery</a>
        </div>
        <div class="gallery-grid" id="homeGalleryGrid"></div>
        <div style="text-align: center; margin-top: 28px;">
          <a class="btn primary" href="gallery.html">See More Photos &rarr;</a>
        </div>
      </div>
    </section>

    <!-- 6. Dhaka College Official Portals & Resources (Point 2 from user) -->
    <section class="section tinted" id="dc-resources">
      <div class="container">
        <div class="section-head">
          <div data-aos="fade-up">
            <p class="eyebrow">Dhaka College</p>
            <h2>Official Portals & Resources</h2>
          </div>
          <p class="location-copy" data-aos="fade-up" data-aos-delay="100">
            Direct access to official Dhaka College institutional links, notice boards, exam portals, and student clubs.
          </p>
        </div>
        <div class="dc-resource-grid">
          <a href="https://www.dhakacollege.edu.bd/" target="_blank" rel="noopener" class="dc-resource-card" data-aos="fade-up" data-aos-delay="50">
            <div class="dc-resource-card-top">
              <div class="dc-resource-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 3.66L18.42 8 12 10.91 5.58 8 12 5.66zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
              </div>
              <span class="dc-resource-arrow">&rarr;</span>
            </div>
            <div class="dc-resource-body">
              <h3>Dhaka College Website</h3>
              <p>Official portal of Dhaka College containing institutional governance and announcements.</p>
            </div>
          </a>

          <a href="https://www.dhakacollege.edu.bd/en/notice?limit=100&page=1" target="_blank" rel="noopener" class="dc-resource-card" data-aos="fade-up" data-aos-delay="100">
            <div class="dc-resource-card-top">
              <div class="dc-resource-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
              </div>
              <span class="dc-resource-arrow">&rarr;</span>
            </div>
            <div class="dc-resource-body">
              <h3>Dhaka College Notice</h3>
              <p>Official notices, administrative circulars, schedules, and college updates.</p>
            </div>
          </a>

          <a href="https://dhakacollege.eshiksabd.com/" target="_blank" rel="noopener" class="dc-resource-card" data-aos="fade-up" data-aos-delay="150">
            <div class="dc-resource-card-top">
              <div class="dc-resource-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>
              </div>
              <span class="dc-resource-arrow">&rarr;</span>
            </div>
            <div class="dc-resource-body">
              <h3>DC Result & Admit Card</h3>
              <p>Online portal for checking college examinations results and downloading admit cards.</p>
            </div>
          </a>

          <a href="https://thedcarchive.pages.dev/" target="_blank" rel="noopener" class="dc-resource-card" data-aos="fade-up" data-aos-delay="200">
            <div class="dc-resource-card-top">
              <div class="dc-resource-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm2 4h12v2H6zm3 4h6v2H9zm-7 6h20v-2H2v2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
              </div>
              <span class="dc-resource-arrow">&rarr;</span>
            </div>
            <div class="dc-resource-body">
              <h3>The DC Archive Website</h3>
              <p>Comprehensive historical records, magazines, memory vaults, and publications.</p>
            </div>
          </a>

          <a href="dc-social.html" class="dc-resource-card" data-aos="fade-up" data-aos-delay="250">
            <div class="dc-resource-card-top">
              <div class="dc-resource-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
              </div>
              <span class="dc-resource-arrow">&rarr;</span>
            </div>
            <div class="dc-resource-body">
              <h3>DC Facebook Pages</h3>
              <p>Official Facebook communities, student clubs, and updates from the student body.</p>
            </div>
          </a>

          <a href="dc-clubs.html" class="dc-resource-card" data-aos="fade-up" data-aos-delay="300">
            <div class="dc-resource-card-top">
              <div class="dc-resource-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
              <span class="dc-resource-arrow">&rarr;</span>
            </div>
            <div class="dc-resource-body">
              <h3>Dhaka College Clubs</h3>
              <p>Explore cultural, science, IT, debate, business, and language clubs of Dhaka College.</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- 7. Location Section (Point 3 - Exact Embed from user) -->
    <section class="section location-section" id="location">
      <div class="container">
        <div class="section-head">
          <div data-aos="fade-up">
            <p class="eyebrow" data-i18n="common.location">Location</p>
            <h2 data-i18n="home.locationTitle">International Hall, Dhaka College</h2>
          </div>
          <p class="location-copy" data-aos="fade-up" data-aos-delay="120" data-i18n="home.locationText">
            Use the live Google map below to view the exact International Hall location directly from the website.
          </p>
        </div>
        <div class="map-wrap" data-aos="zoom-in">
          <iframe title="101, International Hall, Dhaka College" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.3493074552675!2d90.37753227353564!3d23.734919989373893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8c96600dbfb%3A0x8e5b3315eace1aee!2s101%2C%20International%20Hall%2C%20Dhaka%20College!5e0!3m2!1sen!2sbd!4v1790641266403!5m2!1sen!2sbd" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
      </div>
    </section>
'''

# Find from <section class="section" id="hostel-info-preview"> to </section> before </main>
pattern = r'<section class="section" id="hostel-info-preview">.*?</section>\s*<section class="section location-section" id="location">.*?</section>'
match = re.search(pattern, content, re.DOTALL)
if match:
    updated = content[:match.start()] + new_sections.strip() + content[match.end():]
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(updated)
    print("SUCCESS: index.html updated with all enhanced sections!")
else:
    print("Pattern not matched directly, checking location tag...")
