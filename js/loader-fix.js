/* QUICK FIX FOR STUCK LOADER - Add to enhancements.js or create as separate file */

(function ($) {
    "use strict";

    // Force loader to hide after maximum 2 seconds
    $(document).ready(function () {
        // Hide loader immediately
        setTimeout(function () {
            $('#ftco-loader').removeClass('show').fadeOut('fast');
        }, 100);

        // Backup: Force hide after 2 seconds no matter what
        setTimeout(function () {
            $('#ftco-loader').remove();
        }, 2000);
    });

    // Also hide on window load
    $(window).on('load', function () {
        $('#ftco-loader').removeClass('show').fadeOut('fast');
    });

    // Emergency: Hide on any error
    window.addEventListener('error', function () {
        $('#ftco-loader').removeClass('show').hide();
    });

})(jQuery);

console.log('⚡ Loader fix applied - will hide within 2 seconds maximum');
