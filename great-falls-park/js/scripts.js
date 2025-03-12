$(document).ready(function() {
    $('.fade.container').slick({
        dots: true,           // Display navigation dots
        infinite: true,       // Enable infinite scrolling
        speed: 500,           // Transition speed between slides
        fade: true,           // Enable fade transition between slides
        cssEase: 'linear',    // Apply smooth CSS easing
        autoplay: true,       // Enable autoplay
        autoplaySpeed: 2000,  // Speed of autoplay (in milliseconds)
        arrows: false,        // Remove previous/next arrows
        pauseOnHover: false   // Don't pause autoplay when the mouse hovers
    });
});

