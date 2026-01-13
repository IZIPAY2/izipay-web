// Menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get menu elements
    const centerMenuButton = document.querySelector('.center-menu-button');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item');

    // Open menu
    if (centerMenuButton) {
        centerMenuButton.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Close menu
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Navigate to sections from menu
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Close menu when clicking on menu items
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // If it's an anchor link to a section on the same page
                const href = item.getAttribute('href');
                if (href && href.includes('#')) {
                    e.preventDefault();
                    const sectionId = href.split('#')[1];
                    const targetSection = document.getElementById(sectionId);
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
                // Regular links will navigate normally
            });
        });
    }

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Touch events for better mobile experience
    if (menuOverlay) {
        let startY = 0;

        menuOverlay.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        menuOverlay.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // If swiping down more than 50px, close menu
            if (diff > 50) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Update menu colors based on section
    window.updateMenuColors = function(section) {
        const centerMenuButton = document.querySelector('.center-menu-button');
        const menuBrand = document.querySelector('.menu-brand');
        const menuPlus = document.querySelector('.menu-plus');
        
        if (centerMenuButton && menuBrand && menuPlus && section) {
            if (section.classList.contains('black') || 
                section.classList.contains('faq-section')) {
                centerMenuButton.style.borderColor = 'rgba(80, 80, 80, 0.4)';
                menuBrand.style.color = 'rgba(255, 255, 255, 0.9)';
                menuPlus.style.color = 'rgba(255, 255, 255, 0.9)';
            } else {
                centerMenuButton.style.borderColor = 'rgba(100, 100, 100, 0.4)';
                menuBrand.style.color = '#fff';
                menuPlus.style.color = '#fff';
            }
        }
    };

    // Initialize menu colors based on current section
    setTimeout(() => {
        const firstSection = document.querySelector('.section') || 
                           document.querySelector('.hero-animation-section');
        if (firstSection && window.updateMenuColors) {
            window.updateMenuColors(firstSection);
        }
    }, 100);
});

// Function to add menu to any page
function loadMenu() {
    const menuHTML = `
        <!-- Центральная кнопка меню -->
        <div class="center-menu-button">
            <img src="images/lg1.webp" alt="IZIPAY Logo - Anonymous Crypto Cards" class="menu-logo-img">
            <div class="menu-brand">IZIPAY</div>
            <div class="menu-plus">+</div>
        </div>

        <!-- Menu Overlay -->
        <div class="menu-overlay">
            <div class="menu-header">
                <div class="menu-logo-overlay">IZIPAY</div>
                <div class="menu-close">Close</div>
            </div>

            <div class="menu-content">
                <a href="index.html" class="menu-item">Home</a>
                <a href="virtual-debit-card.html" class="menu-item">Virtual Debit Card</a>
                <a href="physical-debit-card.html" class="menu-item">Physical Debit Card</a>
                <a href="pricing.html" class="menu-item">Pricing & Fees</a>
                <a href="faq.html" class="menu-item">FAQ</a>
                <a href="terms-conditions.html" class="menu-item">Terms & Conditions</a>
                <a href="privacy-policy.html" class="menu-item">Privacy Policy</a>
                <a href="about-us.html" class="menu-item">About Us</a>
                <a href="blog.html" class="menu-item">Blog</a>
                
                <!-- Кнопки авторизации -->
                <div class="auth-buttons">
                    <a href="login.php" class="auth-btn login-btn">Login</a>
                    <a href="register.php" class="auth-btn signup-btn">Sign Up</a>
                </div>
            </div>

            <div class="menu-footer">
                <div class="copyright">2022-2026 © IZIPAY</div>
            </div>
        </div>
    `;
    
    // Create container for menu
    const menuContainer = document.createElement('div');
    menuContainer.id = 'izipay-menu-container';
    menuContainer.innerHTML = menuHTML;
    
    // Insert menu at the beginning of body
    document.body.insertBefore(menuContainer, document.body.firstChild);
    
    // Initialize menu functionality
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}

// Auto-load menu if container doesn't exist
if (!document.getElementById('izipay-menu-container')) {
    loadMenu();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadMenu };
}