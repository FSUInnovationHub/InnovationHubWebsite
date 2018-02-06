/**
 * Theme JS
 */

var $window = $(window);

$window.load(function() {

    // Theme: Preloader
    // ================

    var preloader = $('.preloader');

    preloader.addClass('active');

    setTimeout(function() {
        preloader.hide();
    }, 2500);

});

$(function() {

    // Theme: Navbar
    // =============

    var navbar = $('.navbar');
    var navbarCollapse = $('.navbar-collapse');
    var navbarLinks = $('.navbar-nav > li > a');

    // Toggle navbar on page load if needed
    var scrollTop = $window.scrollTop();

    if (scrollTop > 0) {
        navbar.toggleClass('navbar-default navbar-inverse');
    }

    // Toggle navbar on scroll
    $window.scroll(function() {

        scrollTop = $window.scrollTop();

        if (scrollTop > 0 && $('.navbar-default').length) {
            navbar.removeClass('navbar-default').addClass('navbar-inverse');
        } else if (scrollTop == 0) {
            navbar.removeClass('navbar-inverse').addClass('navbar-default');
        }

    });

    // Toggle navbar on collapse
    navbarCollapse.on('show.bs.collapse', function() {
        $(this).parents('.navbar').removeClass('navbar-default').addClass('navbar-inverse');
    });
    navbarCollapse.on('hidden.bs.collapse', function() {
        var scrollTop = $window.scrollTop();

        if (scrollTop == 0) { 
            $(this).parents('.navbar').removeClass('navbar-inverse').addClass('navbar-default');
        }
    });

    $('[href*="#section_"]').on('click', function() {

        // Close collapsed navbar on click
        navbarCollapse.collapse('hide');

        // Smooths scroll to anchor
        if ( location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname ) {
            
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
                return false;
            }

        }
    });


    // Banner: Carousel
    // ================

    var bannerCarouselImg = $('.banner__carousel__img');

    if ( bannerCarouselImg.length ) {

        var bannerCarouselImgArr = bannerCarouselImg.data('images').split(',');

        // Init carousel

        bannerCarouselImg.backstretch(bannerCarouselImgArr, {
            duration: 5000,
            fade: 750
        });
        bannerCarouselImg.backstretch('pause');

    }

    var bannerCarousel = $('.banner__carousel');

    // Enable sliding

    bannerCarousel.on('slid.bs.carousel', function(e) {
        var slideIndex = $(e.relatedTarget).index();

        // Slide backstretch carousel
        bannerCarouselImg.backstretch('show', slideIndex);

    });

    // Disable carousel when not in viewport

    bannerCarousel.waypoint(function(direction) {
      if ( direction == "down") {
        bannerCarousel.carousel('pause');
      } else {
        bannerCarousel.carousel('cycle');
      }
    }, {
      offset: function() {
        return -bannerCarousel.outerHeight();
      }
    });


    // Banner: Parallax
    // ================

    var bannerSection = $('.section_banner');

    if ( bannerSection.length ) {
        var bannerSectionOffsetTop = bannerSection.offset().top;
        var bannerSectionHeight = bannerSection.height();
        var parallaxRate = 5;

        $window.scroll(function() {

            if ( bannerSection.hasClass('parallax') ) {
                setTimeout(function() {
                    var windowScrollTop = $window.scrollTop(),
                        bannerSectionOffset = windowScrollTop - bannerSectionOffsetTop,
                        parallaxOffset = Math.round(bannerSectionOffset / parallaxRate);
                    
                    if (bannerSectionOffset <= bannerSectionHeight) {
                        bannerCarouselImg.css({
                            '-webkit-transform': 'translateY(' + parallaxOffset + 'px)',
                                    'transform': 'translateY(' + parallaxOffset + 'px)'
                        });
                    }
                }, 10);

            }

        });

    }
    

    // Portfolio: Modal
    // ================

    $('#modal_portfolio').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var modal = $(this);
        var heading = button.data('heading');
        var img = button.data('img');
        var content = button.data('content');

        modal.find('#modal_portfolio__heading').text(heading);
        modal.find('#modal_portfolio__img').attr('src', img);
        modal.find('#modal_portfolio__content').text(content);
    });


    // Stats: Count To
    // ===============

    var statsItem = $('.stats__item__value');

    if ( statsItem.length ) {

        statsItem.each(function() {
            var $this = $(this);

            $this.waypoint(function(direction) {
                $this.not('.finished').countTo({
                    'onComplete': function() {
                        $this.addClass('finished');
                    }
                });
            }, {
                offset: '75%'
            });

        });
    }


    // Footer: Year
    // ============

    var currentYear = new Date().getFullYear();

    $('#footer__year').text(currentYear);


    // Theme: Animation
    // ================

    $('[data-animate]').each(function() {
        var $this = $(this);
        var animation = $this.data('animate');

        // Animate elements when in viewport

        $this.waypoint(function(direction) {
            $this.addClass(animation);
        }, {
            offset: '75%'
        });

    });


    // Screenshots: Owl carousel
    // =========================

    var screenshotsOwlCarousel = $('.screenshots__carousel');

    if ( screenshotsOwlCarousel.length ) {
        screenshotsOwlCarousel.owlCarousel({
            items: 3,
            loop: true
        })
    }

    // Theme: Fullpage
    // ===============

    var fullPageContainer = $('#fullpage');

    if ( fullPageContainer.length ) {

        // Init backstretch plugin
        var fullpageCarouselImg = $('#fullpage__carousel');
        var fullpageCarouselImgArr = fullpageCarouselImg.data('images').split(',');

        // Init carousel

        fullpageCarouselImg.backstretch(fullpageCarouselImgArr, {
            duration: 5000,
            fade: 750
        });
        fullpageCarouselImg.backstretch('pause');

        // Init fullpage plugin

        fullPageContainer.fullpage({

            // Navigation
            menu: '.navbar-nav',
            anchors: ['fp-section_banner', 'fp-section_features', 'fp-section_portfolio', 'fp-section_pricing', 'fp-section_team', 'fp-section_stats', 'fp-section_skills', 'fp-section_about', 'fp-section_testimonials', 'fp-section_news', 'fp-section_contact'],

            //Custom selectors
            sectionSelector: 'section',

            // Scrolling
            scrollOverflow: true,
            scrollOverflowReset: true,
            scrollingSpeed: 750,

            // Design
            paddingTop: '100px',
            paddingBottom: '100px',

            // Callbacks
            onLeave: function(index, nextIndex, direction) {

                // Change background image
                fullpageCarouselImg.backstretch('show', nextIndex - 1);

                // Collapse menu
                navbarCollapse.collapse('hide');

            },
            afterLoad: function(anchorLink, index) {

                // Init countTo plugin

                if ( $('section.active').is('.section_stats') ) {
                    $('.stats__item__value:not(.finished)').countTo({
                        onComplete: function() {
                            $(this).addClass('finished');
                        }
                    });
                }

            }

        });

    }


});