# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #2: Spinner's Stash Application


### overview
This ia a spinning stash inventory app targeted for mobile use. Initially, it will document what you have with some basic descriptors (& notes). Future versions would include: detailed stash info, ability to add new breeds and fiber sources, search)
  
I'm always buying duplicates and/or forgetting what I already have. I need a list of all my stuff that I can access when at fiber festivals/shops/online, and I'm pretty sure I'm not the only one with a little stash problem.

Stretch goals will make this inventory searchable as well as a sort of journal of your spinning life (e.g., what's the biggest your stash has been? how much of your stash has been spun/sold/tossed/traded/given away?)

Spinners are pretty tech-y these days, but the app needs to be very intuitive and MUST be mobile friendly. I want my app to be functional, fast, clean, logical, and extensible.

Phase 1:
* List of fibers in your stash with breed info (one list per user)
* Support for multiple users with authenticated sign in
* Shared breed info
* Images of breeds
* Ability to add/update/delete stash items
* Static pool of breeds (can be updated throughout project 2 by me, but users won't be able to add new breeds)

Fuure upgrades to the app:
* Phase 2: simple search (provide some canned searches)
* Phase 3: ability to add new breeds
* Phase 4: expand stash info
* Phase 5: advanced search
* Phase 6: wish lists (breeds, blends, sources, whatever)
* Phase 7: iOS thumbprint ID?

Inspirations:
* Oklahoma State University's [sheep breed list](http://www.ansi.okstate.edu/breeds/sheep/)
* The Fleece & Fiber Sourcebook: More Than 200 Fibers, from Animal to Spun Yarn by Carol Ekarius and Deborah Robson
* The Field Guide to Fleece: 100 Sheep Breeds & How to Use Their Fibers by Carol Ekarius and Deborah Robson
* In Sheep's Clothing by Nola Fournier and Jane Fournier
* The Spinner's Book of Fleece: A Breed-by-Breed Guide to Choosing and Spinning the Perfect Fiber for Every Purpose by Beth Smith
* [Ravelry[(http://www.ravelry.com)]


---

### installation instructions
Installation is pretty simple: point your browser to *****.


---

### technologies used
* Front End
  * HTML
  * CSS
  * JavaScript
  * DOM manipulation using jQuery
  * Bootstrap

* Not Front, Not Back
  * Ajax
  * express

* Back End
  * Node.js
  * BCrypt
  * Passport
  * request????
  * EJS
  * Mongo
  * Mongoose
  * mocha
  * chai

* Hosting
  * Heroku


---

### approach taken

8/2/17: I'm trying to be smarter with planning this project. I've drawn the [pages and interactions](assets/flow.jpg) I think I'll need ()

7/31/17: I'm using Google CSE (Custom Search Engine) to get images of the different breeds, and may use it to get some starting breed info. Breed info will definitely be augmented with non-API sources as there is no sheep-breed-info-for-spinners API available. I think that's a shame, by the way. 

7/27/17: Starting design with some rough [wireframes](assets/wireframes.jpg) showing basic pages and flows: sign in, filter, index, show, add, delete. Looking to implement at least 3 collections: user, breed, and stash. The breed collection will be populated via data/images returned from the Google CSE API, as well as user inputs in some later phase.


---

### unsolved problems
1. 

