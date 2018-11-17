/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    var container = $('.feed'),
        feedList = $('.feed-list'),
        feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
        feedId = 0,
        menuIcon = $('.menu-icon-link');
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
           * in the allFeeds object and ensures it has a URL defined
           * and that the URL is not empty.
           */
        it('have URL', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have Name', function () {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('hidden by default', function () {
            const bodyClassName = document.body.className;
            expect(bodyClassName).toBeDefined();
            expect(bodyClassName).toBe('menu-hidden');
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when clicked', function () {
            // Click Menu icon and open menu
            menuIcon.click();
            let bodyClassName = document.body.className;
            expect(bodyClassName).toBe('');

            // Click Menu icon again and hide menu
            menuIcon.click();
            bodyClassName = document.body.className;
            expect(bodyClassName).toBe('menu-hidden');

        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* TODO: Write a test that ensures when the loadFeed
      * function is called and completes its work, there is at least
      * a single .entry element within the .feed container.
      * Remember, loadFeed() is asynchronous so this test will require
      * the use of Jasmine's beforeEach and asynchronous done() function.
      */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('are loaded', function (done) {
            const container = $('.feed');
            const entries = container.children('.entry-link');
            expect(entries).toBeDefined();
            expect(entries.length).not.toBeLessThan(1);
            done();
        });

    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        
        // Variables
        let firstFeed = {};
        let secondFeed = {};

        let container = $('.feed');
        let feedTitle = $('.header-title').text();
        let feedUrl = $('.entry-link');
        let feedContent= container.html();

        /* TODO: Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstFeed.feedUrl = feedUrl;
                firstFeed.feedTitle = feedTitle;
                firstFeed.feedContent = feedContent;
                loadFeed(1, function () {
                    secondFeed.feedUrl = feedUrl;
                    secondFeed.feedTitle = feedTitle;
                    secondFeed.feedContent = feedContent;
                    done();
                });
            });
        });

        it('changed content', function (done) {
            expect(firstFeed.feedTitle).not.toEqual(secondFeed.feedTitle);
            expect(firstFeed.feedUrl).not.toEqual(secondFeed.feedUrl);
            expect(firstFeed.feedContent).not.toEqual(secondFeed.feedContent);
            done();
        });

    });
 
}());
