$(document).ready(function() {
    /* Mobile navigation */
    $('.js--nav-icon').click(function() {
        var nav = $('.js--main-nav');
        var icon = $('.js--nav-icon i');

        nav.slideToggle(200);

        if (icon.hasClass('fa-bars')) {
            icon.addClass('fa-times');
            icon.removeClass('fa-bars');
        } else {
            icon.addClass('fa-bars');
            icon.removeClass('fa-times');
        }
    });

    $(window).resize(function() {
        if ($(window).width() > 480) {
            var icon = $('.js--nav-icon i');
            $('.js--main-nav').css('display', 'none');
            icon.addClass('fa-bars');
            icon.removeClass('fa-times');
        }
    });


    $('#dob').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-mm-yy',
        maxDate: new Date(),
    });

    $('#time').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-mm-yy',
        minDate: new Date(),
    });

    $('.js--open-nav').click(function() {
        event.preventDefault();

        var nav = $('.js--nav');
        nav.slideToggle(200);
    });
});