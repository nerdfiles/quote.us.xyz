# quote.us.xyz

Quote Us is a quote-taking and quote-mining app. 

## Features

1. Connect with people around quotes. 
2. Quote-for-Truth features to blast social networks. 
3. Tipping fororiginal quotes. 
4. Quotebooks. 
5. Tagging
6. Categories
7. Author Sections
8. Date Groupings
9. Sorting (by Complexity of Quote)
10. Respect Matrix around Original Quotes
11. Recommendations
12. Full-text Search

## Problem

Sometimes I just want an easier way to “think in someone else’s shoes”, 
especially Wittgenstein’s. So I want all the CRUD features of a 
note-taking app à la tags, categories, projects (quotebooks), authors, 
date grouping, sorting, searching, recommendations. I want this simply 
and not as some component to a Book site or a Native phone App.

## Setup

Run `grunt setup` to install dependencies for the front end.

## Build & development

Run `grunt` for building and `grunt devel` for development

## Serving Locally

Run the local server with `node server/www.js`.

## Style Compilation

Move into the `app/styles/` folder and run `sass --watch sass:css`

## Testing

Running `grunt test` will run the unit tests with karma.

## Management

### “Building” content from static site copy

Content Authors (CA) may use http://prose.io to update the `contents` directory.

This project uses [Punch](https://github.com/laktek/punch/wiki) to convert 
Moustache templates into static site pages that essentially map public URLs 
to files created in the repository. Github, effectively, and logical naming of,
files becomes the CMS. This should happen during the Build phase (Grunt).

## Sitemap

1. Home/Search  
   (Educate, Start Search): Use Mixpanel tracking in AngularJS to track hover, keydown, mousedown, scroll, visibility of quotes within viewport bounds. So virtual data is “watching all users” to collect info on them.
2. Chat  
   (Simple) automated chat with conversational UI as “sequences of questions user would choose on other parts of the site” but in “text flow” with momentary data (relative to other data) inquiry-response.
3. Login  
   A login screen that stores username optionally.
4. Account (Latest Quotes, etc.)
   Very similar to medium’s “macrogrouping” of Latest, Featured, Recommended, Popular, Sorted...
