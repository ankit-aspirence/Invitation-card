PHOTOS — where to drop them
===========================

This invitation ships with NO photographs. Every frame is drawn with SVG + CSS,
so the page looks finished as-is. To add the couple's own pictures, drop the
files in this folder and add one <img> tag per frame in index.html.

1) THE COUPLE  (index.html -> section#couple)
   Inside each <div class="arch"> ... <div class="arch-inner"> add:

     <img src="assets/images/groom.jpg" alt="Darshan Raval" loading="lazy" />
     <img src="assets/images/bride.jpg" alt="Dharal Surelia" loading="lazy" />

   The mandala + initial hide themselves automatically once an image is there.
   Best shape: portrait, roughly 3:4, at least 900x1200.

2) OUR MEMORIES  (index.html -> section#gallery, div#photoGrid)
   There are 10 <figure class="slot"> frames. Put an <img> inside any of them:

     <figure class="slot reveal tall">
       <img src="assets/images/moment-1.jpg" alt="Our first trip" loading="lazy" />
     </figure>

   Keep the "tall" class on frames you want twice as high. Filled frames become
   clickable and join the lightbox on their own - no JS changes needed.
   Best shape: 1200px on the long edge, JPG/WebP, under ~400KB each.

3) A SPECIAL GLIMPSE  (index.html -> section#video)
   Set the YouTube id on the frame to switch the poster into a real player:

     <div class="video-frame reveal" id="videoFrame" data-id="YOUR_VIDEO_ID">

Leave this folder's README out of the upload if you like - it is only a note.
