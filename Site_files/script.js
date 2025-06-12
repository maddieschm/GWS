document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link, .nav-menu .nav-link-copy');

    if (menuButton && navMenu && navOverlay) {
        // Function to toggle menu state
        function toggleMenu() {
            navMenu.classList.toggle('open');
            navOverlay.classList.toggle('open');
            // Toggle aria-expanded for accessibility
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !isExpanded);
            // Toggle body scroll lock to prevent scrolling when menu is open
            document.body.classList.toggle('no-scroll', !isExpanded);
        }

        // Event listener for the menu button (hamburger icon)
        menuButton.addEventListener('click', toggleMenu);

        // Event listener for the overlay (clicking outside the menu)
        navOverlay.addEventListener('click', toggleMenu);

        // Event listener for nav links (closing menu after clicking a link)
        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                // Check if the link is an anchor to a section on the same page
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    // Only close the menu if it's currently open
                    if (navMenu.classList.contains('open')) {
                        toggleMenu(); // Close the menu
                    }
                    // Prevent default anchor jump to allow smooth scroll handling if added later
                    // event.preventDefault(); // Keep commented out if you want instant scroll
                    
                    // Optional: Smooth scroll manually if you don't add a library
                    // This is a basic example, better smooth scroll functions exist.
                    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});