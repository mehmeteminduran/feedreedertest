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
        /* Check allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Check each feed has a URL defined
           * and that the URL is not empty.
           */
        it('have URL', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            }
        });

        /* Check allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have Name', function () {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            }
        });
    });


    /* Test suite for menu */
    describe('The menu', function () {

        /* Check that ensures the menu element is
         * hidden by default.
         */
        it('hidden by default', function () {
            const bodyHasClass = $("body").hasClass('menu-hidden');
            expect(bodyHasClass).toBe(true);
        });

        /* Check does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when clicked', function () {
            // Click Menu icon and open menu
            menuIcon.click();
            let bodyHasClass = $("body").hasClass('menu-hidden');
            expect(bodyHasClass).toBe(false);

            // Click Menu icon again and hide menu
            menuIcon.click();
            bodyHasClass = $("body").hasClass('menu-hidden');
            expect(bodyHasClass).toBe(true);

        });
    });

    /* Test suite for entries */
    describe('Initial Entries', function () {

        /* Check when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
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


    /* Test suite for New Feed Selection */
    describe('New Feed Selection', function () {

        // Variables
        let firstFeed = {};
        let secondFeed = {};
 
        let feedTitle = $('.header-title').text();
        let feedUrl = $('.entry-link');
        let feedContent = $('.feed').html();

        /* Check when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        */
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstFeed.feedUrl = feedUrl;
                firstFeed.feedTitle = feedTitle;
                firstFeed.feedContent = feedContent;
                
                loadFeed(1, function () { 
                    feedTitle = $('.header-title').text();
                    feedUrl = $('.entry-link');
                    feedContent = $('.feed').html();

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
