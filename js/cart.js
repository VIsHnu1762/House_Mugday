/* =====================================================
   HOUSE MUGDAY — CART EXPERIENCE
   Dynamic cart management, animations, and persistence
   ===================================================== */

(function ($) {
    if (!$) {
        console.error('Cart script requires jQuery.');
        return;
    }

    const STORAGE_KEY = 'houseMugdayCart';
    const DELIVERY_FEE = 5;
    const FREE_DELIVERY_THRESHOLD = 40;
    const DISCOUNT_THRESHOLD = 55;
    const DISCOUNT_RATE = 0.08; // 8% once guests spend more than threshold
    const CURRENCY = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    /* --------------------
       Toast helper
    -------------------- */
    function showCartToast(type, message) {
        const toast = $(`
      <div class="cart-toast ${type}">
        <span class="cart-toast__icon">${type === 'success' ? '✓' : '!'}</span>
        <p>${message}</p>
      </div>
    `);

        $('body').append(toast);
        requestAnimationFrame(() => toast.addClass('show'));
        setTimeout(() => toast.removeClass('show'), 3200);
        setTimeout(() => toast.remove(), 3600);
    }

    function animateCartIcon() {
        const $bag = $('.nav-item.cart .bag');
        if (!$bag.length) return;
        $bag.addClass('animate-bounce');
        setTimeout(() => $bag.removeClass('animate-bounce'), 600);
    }

    /* --------------------
       Cart store + helpers
    -------------------- */
    const CartStore = {
        items: [],

        init() {
            try {
                const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
                this.items = Array.isArray(data) ? data : [];
            } catch (error) {
                this.items = [];
            }
        },

        persist() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
            localStorage.setItem('cartCount', this.getCount());
        },

        getCount() {
            return this.items.reduce((acc, item) => acc + item.quantity, 0);
        },

        getSubtotal() {
            return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },

        computeSummary() {
            const subtotal = this.getSubtotal();
            const discount = subtotal >= DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0;
            const delivery = subtotal === 0 ? 0 : (subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE);
            const total = Math.max(subtotal - discount + delivery, 0);
            const remainingForDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

            return {
                subtotal,
                discount,
                delivery,
                total,
                remainingForDelivery
            };
        },

        upsert(item) {
            const existing = this.items.find((entry) => entry.id === item.id);
            if (existing) {
                existing.quantity += item.quantity;
            } else {
                this.items.push(item);
            }
            this.persist();
        },

        updateQuantity(id, quantity) {
            const next = [];
            this.items.forEach((item) => {
                if (item.id === id) {
                    next.push(Object.assign({}, item, { quantity: Math.max(1, quantity) }));
                } else {
                    next.push(item);
                }
            });
            this.items = next;
            this.persist();
        },

        remove(id) {
            this.items = this.items.filter((item) => item.id !== id);
            this.persist();
        },

        clear() {
            this.items = [];
            this.persist();
        }
    };

    /* --------------------
       DOM rendering helpers
    -------------------- */
    const CartUI = {
        selectors: {
            items: '[data-cart-items]',
            empty: '[data-cart-empty]',
            summaryCount: '[data-summary-count]',
            summarySubtotal: '[data-summary-subtotal]',
            summaryDiscount: '[data-summary-discount]',
            summaryDelivery: '[data-summary-delivery]',
            summaryTotal: '[data-summary-total]',
            progressFill: '[data-progress-fill]',
            progressRemaining: '[data-progress-remaining]'
        },
        elements: {},

        getElement(key) {
            const selector = this.selectors[key];
            if (!selector) {
                return $();
            }
            const cached = this.elements[key];
            if (cached && cached.length) {
                return cached;
            }
            const $el = $(selector);
            this.elements[key] = $el;
            return $el;
        },

        render() {
            this.renderItems();
            this.renderSummary();
            this.toggleEmptyState();
            this.updateNavBadge();
        },

        renderItems() {
            const $container = this.getElement('items');
            if (!$container.length) return;

            $container.empty();

            CartStore.items.forEach((item, index) => {
                const row = $(`
          <article class="cart-item animate-stagger" data-item-id="${item.id}" style="--stagger-index:${index}">
            <div class="cart-item__media" style="background-image:url('${item.image || 'images/menu-1.jpg'}')"></div>
            <div class="cart-item__body">
              <div>
                <p class="cart-item__category">${item.category || 'Signature Pick'}</p>
                <h4>${item.name}</h4>
                <p class="cart-item__note">${item.description || 'Curated with care for your perfect sip.'}</p>
              </div>
              <div class="cart-item__meta">
                <span class="cart-item__price">${CURRENCY.format(item.price)}</span>
                <div class="cart-quantity" aria-label="Quantity selector">
                  <button class="qty-btn" data-qty-action="decrement" aria-label="Decrease quantity">-</button>
                  <input type="number" min="1" value="${item.quantity}" data-qty-input>
                  <button class="qty-btn" data-qty-action="increment" aria-label="Increase quantity">+</button>
                </div>
                <button class="btn btn-link remove-item" data-remove-item>Remove</button>
              </div>
            </div>
          </article>
        `);
                $container.append(row);
                requestAnimationFrame(() => row.addClass('revealed'));
            });
        },

        renderSummary() {
            const summary = CartStore.computeSummary();
            const subtotal = summary.subtotal || 0;
            const summaryCount = this.getElement('summaryCount');
            if (summaryCount.length) summaryCount.text(CartStore.getCount());

            const summarySubtotal = this.getElement('summarySubtotal');
            if (summarySubtotal.length) summarySubtotal.text(CURRENCY.format(subtotal));

            const summaryDiscount = this.getElement('summaryDiscount');
            if (summaryDiscount.length) summaryDiscount.text(`-${CURRENCY.format(summary.discount)}`);

            const summaryDelivery = this.getElement('summaryDelivery');
            if (summaryDelivery.length) {
                summaryDelivery.text(summary.delivery === 0 ? 'Free' : CURRENCY.format(summary.delivery));
            }

            const summaryTotal = this.getElement('summaryTotal');
            if (summaryTotal.length) summaryTotal.text(CURRENCY.format(summary.total));

            const progressRatio = FREE_DELIVERY_THRESHOLD ? subtotal / FREE_DELIVERY_THRESHOLD : 0;
            const progress = Math.min(1, Math.max(0, progressRatio));
            const progressFill = this.getElement('progressFill');
            if (progressFill.length) {
                progressFill.css('--progress', `${progress * 100}%`);
            }

            const progressRemaining = this.getElement('progressRemaining');
            if (progressRemaining.length) {
                progressRemaining.text(
                    summary.remainingForDelivery === 0
                        ? 'Free delivery unlocked'
                        : CURRENCY.format(summary.remainingForDelivery)
                );
            }
        },

        toggleEmptyState() {
            const hasItems = CartStore.items.length > 0;
            const emptyState = this.getElement('empty');
            if (emptyState.length) emptyState.toggleClass('visible', !hasItems);

            const itemsContainer = this.getElement('items');
            if (itemsContainer.length) itemsContainer.toggleClass('visible', hasItems);

            $('[data-cart-clear]').prop('disabled', !hasItems);
            $('[data-proceed-checkout]').prop('disabled', !hasItems);
        },

        updateNavBadge() {
            const count = CartStore.getCount();
            $('.nav-item.cart .bag small').text(count);
        }
    };

    /* --------------------
       Utilities
    -------------------- */
    function slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function extractImage($context) {
        const $img = $context.find('img').first();
        if ($img.length && $img.attr('src')) {
            return $img.attr('src');
        }

        const $bg = $context.find('.img').first();
        if ($bg.length) {
            const bg = $bg.css('background-image');
            if (bg && bg !== 'none') {
                const match = /url\(["']?(.*?)["']?\)/.exec(bg);
                if (match && match[1]) {
                    return match[1];
                }
            }
        }

        return 'images/menu-1.jpg';
    }

    function parsePrice(text) {
        if (!text) return 0;
        const numeric = parseFloat(text.replace(/[^0-9.]/g, ''));
        return Number.isFinite(numeric) ? numeric : 0;
    }

    function enhanceLegacyButtons() {
        $('a, button').each(function () {
            const label = $(this).text().trim().toLowerCase();
            if (label === 'add to cart' && !$(this).attr('data-cart-ready')) {
                $(this).attr('data-cart-ready', 'true').addClass('add-to-cart-trigger');
            }
        });
    }

    function buildItemFromContext($trigger) {
        const $card = $trigger.closest('.menu-entry, .pricing-entry, .product, .media, .product-name');
        const name = $trigger.data('product-name') || $card.find('h3 a, h3 span, h3').first().text().trim();
        const priceText = $trigger.data('product-price') || $card.find('.price span, .price').first().text().trim();
        const description = $trigger.data('product-desc') || $card.find('p').not('.price').first().text().trim();
        const category = $trigger.data('product-category') || $card.find('.subheading').first().text().trim();
        const image = $trigger.data('product-image') || extractImage($card.length ? $card : $trigger.closest('.menu-entry, .pricing-entry'));

        if (!name || !priceText) {
            showCartToast('error', 'Unable to read product information.');
            return null;
        }

        const price = parsePrice(priceText);
        if (!price) {
            showCartToast('error', 'Price missing for this product.');
            return null;
        }

        return {
            id: `${slugify(name)}-${price}`,
            name,
            price,
            description,
            category,
            image,
            quantity: 1
        };
    }

    /* --------------------
       Event bindings
    -------------------- */
    function bindGlobalEvents() {
        $(document).on('click', '.add-to-cart-trigger, [data-add-to-cart]', function (event) {
            event.preventDefault();
            const item = buildItemFromContext($(this));
            if (!item) return;
            CartStore.upsert(item);
            CartUI.render();
            animateCartIcon();
            showCartToast('success', `${item.name} added to your cart`);
        });

        $(document).on('click', '[data-cart-clear]', function () {
            CartStore.clear();
            CartUI.render();
            showCartToast('success', 'Cart cleared');
        });

        $(document).on('click', '[data-remove-item]', function () {
            const id = $(this).closest('[data-item-id]').data('item-id');
            CartStore.remove(id);
            CartUI.render();
            showCartToast('success', 'Item removed');
        });

        $(document).on('click', '[data-qty-action]', function () {
            const $item = $(this).closest('[data-item-id]');
            const id = $item.data('item-id');
            const $input = $item.find('[data-qty-input]');
            let qty = parseInt($input.val(), 10) || 1;
            qty = $(this).data('qty-action') === 'increment' ? qty + 1 : Math.max(1, qty - 1);
            $input.val(qty);
            CartStore.updateQuantity(id, qty);
            CartUI.renderSummary();
            CartUI.updateNavBadge();
        });

        $(document).on('change', '[data-qty-input]', function () {
            const id = $(this).closest('[data-item-id]').data('item-id');
            const qty = Math.max(1, parseInt($(this).val(), 10) || 1);
            $(this).val(qty);
            CartStore.updateQuantity(id, qty);
            CartUI.renderSummary();
        });

        $(document).on('click', '[data-proceed-checkout]', function () {
            if (!CartStore.items.length) {
                showCartToast('error', 'Add something delicious before checking out.');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }

    /* --------------------
       Init
    -------------------- */
    $(function () {
        CartStore.init();
        enhanceLegacyButtons();
        bindGlobalEvents();
        CartUI.render();
    });
})(window.jQuery);
