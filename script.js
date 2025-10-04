// script.js - Complete JavaScript for Fatima Pharmacy Website

document.addEventListener('DOMContentLoaded', () => {

    // ====== 0. Marquee Stop/Start on Hover ======
    const headquoteMarquee = document.querySelector('.headquote');
    if (headquoteMarquee) {
        headquoteMarquee.addEventListener('mouseover', () => {
            headquoteMarquee.stop();
        });
        headquoteMarquee.addEventListener('mouseout', () => {
            headquoteMarquee.start();
        });
    }

    // ====== 1. Mobile Menu Toggle (For Navbar on Small Screens) ======
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    let hamburgerBtn = document.querySelector('.hamburger'); // Check if it already exists

    // Create hamburger button if it doesn't exist
    if (!hamburgerBtn && navbar && navLinks) {
        hamburgerBtn = document.createElement('div');
        hamburgerBtn.classList.add('hamburger');
        hamburgerBtn.innerHTML = '☰'; // Hamburger icon
        hamburgerBtn.style.cssText = `
            display: none; /* Hidden by default on desktop */
            font-size: 24px;
            cursor: pointer;
            color: #006400; /* Dark Green */
            padding: 5px;
            z-index: 1001;
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
        `;
        navbar.appendChild(hamburgerBtn);
    }

    if (hamburgerBtn && navLinks) {
        // Function to handle mobile menu visibility
        const toggleMobileMenu = () => {
            if (window.innerWidth <= 767) {
                hamburgerBtn.style.display = 'block';
                // Only hide navLinks if it's not already explicitly shown by JS
                if (navLinks.style.display !== 'flex') {
                    navLinks.style.display = 'none';
                }
            } else {
                hamburgerBtn.style.display = 'none';
                navLinks.style.display = 'flex'; // Always show on desktop
                navLinks.style.flexDirection = 'row'; // Ensure row direction on desktop
            }
        };

        // Initial check
        toggleMobileMenu();

        // Listen for window resize
        window.addEventListener('resize', toggleMobileMenu);

        // Toggle menu on hamburger click
        hamburgerBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'none' || navLinks.style.display === '') {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column'; // Stack links vertically
                hamburgerBtn.innerHTML = '✕'; // Change to X when open
            } else {
                navLinks.style.display = 'none';
                hamburgerBtn.innerHTML = '☰'; // Back to hamburger
            }
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 767) {
                    navLinks.style.display = 'none';
                    hamburgerBtn.innerHTML = '☰';
                }
            });
        });
    }


    // ====== 2. Active Navigation Link (Highlight Current Page) ======
    const currentPage = window.location.pathname.split('/').pop() || 'index.html'; // Get current file name
    const navLinksAll = document.querySelectorAll('.nav-links a');

    navLinksAll.forEach(link => {
        const href = link.getAttribute('href');
        // Check if the link's href matches the current page or a category page
        if (href === currentPage ||
            (currentPage.includes('Medicine') && href.includes('Medicine.html')) ||
            (currentPage.includes('Nutritions') && href.includes('Nutritions & Supplements.html')) ||
            (currentPage.includes('Personal') && href.includes('Personal Care.html')) ||
            (currentPage === 'index.html' && href === 'index.html') ||
            (currentPage === 'about.html' && href === 'about.html') ||
            (currentPage === 'services.html' && href === 'services.html')
        ) {
            link.classList.add('active');
        }
    });

    // ====== 3. Enhanced Dropdown Menu (Better for Mobile/Touch) ======
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        const link = dropdown.querySelector('a');

        // On mobile, show/hide on click
        link.addEventListener('click', (e) => {
            // Only prevent default and handle click if on mobile
            if (window.innerWidth <= 767) {
                e.preventDefault();
                const isOpen = menu.style.display === 'block';
                // Close all other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.querySelector('.dropdown-menu').style.display = 'none';
                    }
                });
                // Toggle current
                menu.style.display = isOpen ? 'none' : 'block';
            }
            // On desktop, let CSS hover handle it, or if JS is active, allow default link behavior
        });

        // Close dropdown when clicking outside (only for mobile behavior)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 767 && !dropdown.contains(e.target)) {
                menu.style.display = 'none';
            }
        });
    });

    // ====== 4. Product Popup Functionality (For Product Pages and Index) ======
    const productPopup = document.getElementById('product-popup');
    if (productPopup) {
        const closePopup = productPopup.querySelector('.close');
        const popupImg = document.getElementById('popup-img');
        const popupName = document.getElementById('popup-name');
        const popupPrice = document.getElementById('popup-price');
        const popupDesc = document.getElementById('popup-desc');
        const whatsappBtn = document.getElementById('whatsapp-btn');

        // Event delegation for all view buttons
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('view-btn')) {
                const card = event.target.closest('.card');
                if (!card) return;

                const name = card.dataset.name || 'Product';
                const price = card.dataset.price || 'Price not available';
                const desc = card.dataset.desc || 'Description not available';
                const imgSrc = card.querySelector('img')?.src || '';

                if (popupImg) popupImg.src = imgSrc;
                if (popupName) popupName.textContent = name;
                if (popupPrice) popupPrice.textContent = price;
                if (popupDesc) popupDesc.textContent = desc;

                // WhatsApp message
                const whatsappMessage = `Hello Fatima Pharmacy! I am interested in ordering: ${name} - ${price}. Please let me know availability and delivery options.`;
                if (whatsappBtn) {
                    whatsappBtn.href = `https://wa.me/923337112055?text=${encodeURIComponent(whatsappMessage)}`;
                }

                productPopup.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent body scroll when popup open
            }
        });

        // Close popup
        if (closePopup) {
            closePopup.addEventListener('click', () => {
                productPopup.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scroll
            });
        }

        // Close on outside click
        productPopup.addEventListener('click', (event) => {
            if (event.target === productPopup) {
                productPopup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && productPopup.style.display === 'flex') {
                productPopup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ====== 5. Home Doctor Visit Form (For services.html) ======
    const doctorForm = document.getElementById('doctorForm');
    if (doctorForm) {
        doctorForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name')?.value.trim();
            const phone = document.getElementById('phone')?.value.trim();
            const address = document.getElementById('address')?.value.trim();
            const time = document.getElementById('time')?.value.trim();
            const notes = document.getElementById('notes')?.value.trim();

            // Enhanced validation
            if (!name || !phone || !address || !time) {
                alert('Please fill in all required fields (Name, Phone, Address, Time) for your home doctor visit request.');
                return;
            }

            // Basic phone number format check (e.g., starts with 03, has 11 digits)
            const phoneRegex = /^03\d{9}$/; // Example: 03XXXXXXXXX
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 11-digit phone number starting with "03" (e.g., 03XXXXXXXXX).');
                return;
            }

            // Construct detailed WhatsApp message
            const message = `🩺 Home Doctor Visit Request from Fatima Pharmacy Website\n\n` +
                            `👤 Full Name: ${name}\n` +
                            `📞 Phone Number: ${phone}\n` +
                            `📍 Address: ${address}\n` +
                            `🕒 Preferred Time: ${time}\n` +
                            `📝 Additional Notes: ${notes || 'None provided'}\n\n` +
                            `Please confirm availability and any fees. Thank you!`;

            const whatsappNumber = '923337112055'; // Pharmacy's WhatsApp number (Pakistan format)
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');

            // Success feedback
            alert('Thank you! Your home doctor visit request has been sent to Fatima Pharmacy via WhatsApp. They will contact you soon.');
            doctorForm.reset(); // Clear form
        });

        // Add focus effects to form inputs (enhance UX)
        const formInputs = doctorForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.borderColor = '#006400'; // Dark Green on focus
                input.style.boxShadow = '0 0 5px rgba(0, 100, 0, 0.5)';
            });
            input.addEventListener('blur', () => {
                input.style.borderColor = '#ccc'; // Default border
                input.style.boxShadow = 'none';
            });
        });
    }

    // ====== 6. Smooth Scrolling for Anchor Links (If Any Internal Links) ======
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ====== 7. Footer Social Links Enhancement (Open in New Tab) ======
    const socialLinks = document.querySelectorAll('.social li a');
    socialLinks.forEach(link => {
        // Ensure links with actual hrefs open in new tab
        if (link.getAttribute('href') && link.getAttribute('href') !== '#') {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer'); // Security best practice
        }
    });

    // ====== 8. General Error Handling and Performance ======
    // Preload critical images if needed (e.g., logo)
    const logoImg = document.querySelector('.navbar .logo img');
    if (logoImg && logoImg.src) {
        const img = new Image();
        img.src = logoImg.src; // Preload to avoid flicker
    }

    console.log('Fatima Pharmacy JS loaded successfully!'); // Debug log (remove in production)
});
