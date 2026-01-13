// Menufunctionaliteit
document.addEventListener('DOMContentLoaded', function() {
    // Haal menu-elementen op
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

    // Sluit menu
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Navigeer naar secties vanuit menu
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Sluit menu bij klikken op menu-items
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // Als het een ankerlink is naar een sectie op dezelfde pagina
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
                // Gewone links navigeren normaal
            });
        });
    }

    // Sluit menu met escape-toets
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Aanraakgebeurtenissen voor betere mobiele ervaring
    if (menuOverlay) {
        let startY = 0;

        menuOverlay.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        menuOverlay.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // Als er meer dan 50px naar beneden wordt geveegd, sluit menu
            if (diff > 50) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Update menu kleuren op basis van sectie
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

    // Initialiseer menu kleuren op basis van huidige sectie
    setTimeout(() => {
        const firstSection = document.querySelector('.section') || 
                           document.querySelector('.hero-animation-section');
        if (firstSection && window.updateMenuColors) {
            window.updateMenuColors(firstSection);
        }
    }, 100);
});

// Functie om menu aan elke pagina toe te voegen
function loadMenu() {
    const menuHTML = `
        <!-- Centrale menuknop -->
        <div class="center-menu-button">
            <img src="images/lg1.webp" alt="IZIPAY Logo - Anonieme Crypto Kaarten" class="menu-logo-img">
            <div class="menu-brand">IZIPAY</div>
            <div class="menu-plus">+</div>
        </div>

        <!-- Menu Overlay -->
        <div class="menu-overlay">
            <div class="menu-header">
                <div class="menu-logo-overlay">IZIPAY</div>
                <div class="menu-close">Sluiten</div>
            </div>

            <div class="menu-content">
                <a href="index-nl.html" class="menu-item">Home</a>
                <a href="virtual-debit-card-nl.html" class="menu-item">Virtuele Crypto Kaart</a>
                <a href="physical-debit-card-nl.html" class="menu-item">Fysieke Crypto Kaart</a>
                <a href="pricing-nl.html" class="menu-item">Prijzen & Kosten</a>
                <a href="faq-nl.html" class="menu-item">Veelgestelde Vragen</a>
                <a href="terms-conditions-nl.html" class="menu-item">Algemene Voorwaarden</a>
                <a href="privacy-policy-nl.html" class="menu-item">Privacybeleid</a>
                <a href="about-us-nl.html" class="menu-item">Over Ons</a>
                <a href="blog-nl.html" class="menu-item">Blog</a>
                
                <!-- Autorisatieknoppen -->
                <div class="auth-buttons">
                    <a href="login.php" class="auth-btn login-btn">Inloggen</a>
                    <a href="register.php" class="auth-btn signup-btn">Registreren</a>
                </div>
            </div>

            <div class="menu-footer">
                <div class="copyright">2022-2026 © IZIPAY</div>
            </div>
        </div>
    `;
    
    // Maak container voor menu
    const menuContainer = document.createElement('div');
    menuContainer.id = 'izipay-menu-container';
    menuContainer.innerHTML = menuHTML;
    
    // Voeg menu toe aan begin van body
    document.body.insertBefore(menuContainer, document.body.firstChild);
    
    // Initialiseer menu functionaliteit
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}

// Auto-load menu als container niet bestaat
if (!document.getElementById('izipay-menu-container')) {
    loadMenu();
}

// Export voor module gebruik
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadMenu };
}