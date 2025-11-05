/* ============================================
   HOUSE MUGDAY - JAVASCRIPT ENHANCEMENTS
   Additional features and improvements
   ============================================ */

(function($) {
    "use strict";

    // ===== SCROLL TO TOP BUTTON =====
    function initScrollToTop() {
        // Create scroll to top button
        const scrollBtn = $('<div class="scroll-to-top"><i class="icon-arrow-up"></i></div>');
        $('body').append(scrollBtn);

        // Show/hide based on scroll position
        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                scrollBtn.addClass('show');
            } else {
                scrollBtn.removeClass('show');
            }
        });

        // Smooth scroll to top on click
        scrollBtn.click(function() {
            $('html, body').animate({ scrollTop: 0 }, 600, 'easeInOutExpo');
            return false;
        });
    }

    // ===== FORM VALIDATION =====
    function initFormValidation() {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Phone validation regex (Indian format)
        const phoneRegex = /^[6-9]\d{9}$/;

        // Validate appointment forms
        $('.appointment-form').submit(function(e) {
            let isValid = true;
            let errorMessage = '';

            // Get form fields
            const firstName = $(this).find('input[placeholder="First Name"]').val().trim();
            const lastName = $(this).find('input[placeholder="Last Name"]').val().trim();
            const phone = $(this).find('input[placeholder="Phone"]').val().trim();
            const date = $(this).find('.appointment_date').val().trim();
            const time = $(this).find('.appointment_time').val().trim();

            // Validate first name
            if (firstName === '') {
                isValid = false;
                errorMessage += 'Please enter your first name.\n';
            }

            // Validate last name
            if (lastName === '') {
                isValid = false;
                errorMessage += 'Please enter your last name.\n';
            }

            // Validate phone
            if (phone === '') {
                isValid = false;
                errorMessage += 'Please enter your phone number.\n';
            } else if (!phoneRegex.test(phone.replace(/\s+/g, '').replace(/^\+91/, ''))) {
                isValid = false;
                errorMessage += 'Please enter a valid 10-digit phone number.\n';
            }

            // Validate date
            if (date === '') {
                isValid = false;
                errorMessage += 'Please select a date.\n';
            }

            // Validate time
            if (time === '') {
                isValid = false;
                errorMessage += 'Please select a time.\n';
            }

            // Show error or submit
            if (!isValid) {
                e.preventDefault();
                alert(errorMessage);
                return false;
            }

            // Show success message
            e.preventDefault();
            showNotification('success', 'Booking request submitted successfully! We will contact you soon.');
            $(this)[0].reset();
            return false;
        });
    }

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(type, message) {
        const notification = $(`
            <div class="custom-notification ${type}">
                <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `);

        $('body').append(notification);

        // Add CSS if not exists
        if ($('#notification-styles').length === 0) {
            $('head').append(`
                <style id="notification-styles">
                    .custom-notification {
                        position: fixed;
                        top: 100px;
                        right: 30px;
                        padding: 20px 30px;
                        background: white;
                        border-radius: 10px;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        z-index: 9999;
                        animation: slideInRight 0.5s ease;
                        max-width: 400px;
                    }
                    .custom-notification.success {
                        border-left: 5px solid #28a745;
                    }
                    .custom-notification.error {
                        border-left: 5px solid #dc3545;
                    }
                    .notification-icon {
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .custom-notification.success .notification-icon {
                        color: #28a745;
                    }
                    .custom-notification.error .notification-icon {
                        color: #dc3545;
                    }
                    @keyframes slideInRight {
                        from {
                            transform: translateX(500px);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                    @keyframes slideOutRight {
                        from {
                            transform: translateX(0);
                            opacity: 1;
                        }
                        to {
                            transform: translateX(500px);
                            opacity: 0;
                        }
                    }
                </style>
            `);
        }

        // Auto remove after 5 seconds
        setTimeout(function() {
            notification.css('animation', 'slideOutRight 0.5s ease');
            setTimeout(function() {
                notification.remove();
            }, 500);
        }, 5000);
    }

    // ===== ADD TO CART FUNCTIONALITY =====
    function initCartFunctionality() {
        let cartCount = parseInt($('.bag small').text()) || 0;

        // Add to cart buttons
        $(document).on('click', '.btn-outline-primary', function(e) {
            const productName = $(this).closest('.text, .media-body').find('h3 a').text();
            const productPrice = $(this).closest('.text, .media-body').find('.price span').text();

            if (productName && productPrice) {
                e.preventDefault();
                
                // Increment cart count
                cartCount++;
                $('.bag small').text(cartCount);
                
                // Animate cart icon
                $('.bag').addClass('animate-bounce');
                setTimeout(function() {
                    $('.bag').removeClass('animate-bounce');
                }, 600);

                // Show notification
                showNotification('success', `${productName} added to cart!`);

                // Store in localStorage
                let cart = JSON.parse(localStorage.getItem('houseMugdayCart')) || [];
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
                localStorage.setItem('houseMugdayCart', JSON.stringify(cart));
                localStorage.setItem('cartCount', cartCount);
            }
        });

        // Load cart count from localStorage
        const savedCount = localStorage.getItem('cartCount');
        if (savedCount) {
            $('.bag small').text(savedCount);
        }

        // Add bounce animation CSS
        if ($('#cart-animation-styles').length === 0) {
            $('head').append(`
                <style id="cart-animation-styles">
                    .animate-bounce {
                        animation: bounce 0.6s ease;
                    }
                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% {
                            transform: translateY(0);
                        }
                        40% {
                            transform: translateY(-10px);
                        }
                        60% {
                            transform: translateY(-5px);
                        }
                    }
                </style>
            `);
        }
    }

    // ===== LAZY LOADING FOR IMAGES =====
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            // Observe all images with data-src attribute
            document.querySelectorAll('img[data-src]').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    // ===== SMOOTH REVEAL ANIMATIONS =====
    function initRevealAnimations() {
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15
            });

            // Observe elements with animate-on-scroll class
            document.querySelectorAll('.animate-on-scroll').forEach(function(elem) {
                revealObserver.observe(elem);
            });
        }
    }

    // ===== SEARCH FUNCTIONALITY =====
    function initSearch() {
        // Add search functionality if search form exists
        $('.search-form').submit(function(e) {
            e.preventDefault();
            const searchTerm = $(this).find('input').val().trim();
            
            if (searchTerm) {
                showNotification('success', `Searching for: ${searchTerm}`);
                // Implement actual search logic here
            } else {
                showNotification('error', 'Please enter a search term');
            }
        });
    }

    // ===== NAVBAR ANIMATION ON SCROLL =====
    function enhanceNavbarScroll() {
        let lastScroll = 0;
        const navbar = $('.ftco_navbar');

        $(window).scroll(function() {
            const currentScroll = $(this).scrollTop();

            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                navbar.css('transform', 'translateY(-100%)');
            } else {
                // Scrolling up
                navbar.css('transform', 'translateY(0)');
            }

            lastScroll = currentScroll;
        });

        // Add CSS for navbar transform
        if ($('#navbar-scroll-styles').length === 0) {
            $('head').append(`
                <style id="navbar-scroll-styles">
                    .ftco_navbar {
                        transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
                    }
                </style>
            `);
        }
    }

    // ===== PARALLAX EFFECT ENHANCEMENT =====
    function enhanceParallax() {
        $(window).scroll(function() {
            const scrolled = $(this).scrollTop();
            $('.home-slider .slider-item').css('transform', 'translateY(' + (scrolled * 0.5) + 'px)');
        });
    }

    // ===== COUNTER ANIMATION IMPROVEMENT =====
    function improveCounterAnimation() {
        $('.number').each(function() {
            const $this = $(this);
            const countTo = $this.data('number');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 3000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum).toLocaleString());
                },
                complete: function() {
                    $this.text(this.countNum.toLocaleString());
                }
            });
        });
    }

    // ===== MODAL/LIGHTBOX ENHANCEMENT =====
    function initLightboxEnhancement() {
        // Keyboard navigation for gallery
        $(document).keydown(function(e) {
            if ($('.mfp-ready').length > 0) {
                if (e.keyCode === 37) { // Left arrow
                    $('.mfp-arrow-left').click();
                } else if (e.keyCode === 39) { // Right arrow
                    $('.mfp-arrow-right').click();
                }
            }
        });
    }

    // ===== TOOLTIPS =====
    function initTooltips() {
        // Add tooltips to social icons
        $('.ftco-footer-social a').each(function() {
            const iconClass = $(this).find('span').attr('class');
            let platform = 'Social';
            
            if (iconClass.includes('twitter')) platform = 'Twitter';
            else if (iconClass.includes('facebook')) platform = 'Facebook';
            else if (iconClass.includes('instagram')) platform = 'Instagram';
            
            $(this).attr('title', `Follow us on ${platform}`);
            $(this).attr('aria-label', `Follow us on ${platform}`);
        });
    }

    // ===== READING PROGRESS BAR =====
    function initReadingProgress() {
        if ($('body').hasClass('blog-single') || $('body').hasClass('blog')) {
            const progressBar = $('<div class="reading-progress"><div class="reading-progress-fill"></div></div>');
            $('body').prepend(progressBar);

            $(window).scroll(function() {
                const windowHeight = $(window).height();
                const documentHeight = $(document).height();
                const scrollTop = $(window).scrollTop();
                const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
                
                $('.reading-progress-fill').css('width', progress + '%');
            });

            // Add CSS
            if ($('#reading-progress-styles').length === 0) {
                $('head').append(`
                    <style id="reading-progress-styles">
                        .reading-progress {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 4px;
                            background: rgba(0, 0, 0, 0.1);
                            z-index: 9999;
                        }
                        .reading-progress-fill {
                            height: 100%;
                            background: linear-gradient(90deg, #c49b63, #674c27);
                            transition: width 0.2s ease;
                        }
                    </style>
                `);
            }
        }
    }

    // ===== INITIALIZE ALL ENHANCEMENTS =====
    $(document).ready(function() {
        initScrollToTop();
        initFormValidation();
        initCartFunctionality();
        initLazyLoading();
        initRevealAnimations();
        initSearch();
        enhanceNavbarScroll();
        enhanceParallax();
        initLightboxEnhancement();
        initTooltips();
        initReadingProgress();

        console.log('🏠☕ House Mugday enhancements loaded successfully!');
    });

    // ===== PERFORMANCE MONITORING =====
    $(window).on('load', function() {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
    });

})(jQuery);
