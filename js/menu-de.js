// Menüfunktionalität
document.addEventListener('DOMContentLoaded', function() {
    // Menüelemente abrufen
    const centerMenuButton = document.querySelector('.center-menu-button');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item');

    // Menü öffnen
    if (centerMenuButton) {
        centerMenuButton.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Menü schließen
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Zu Abschnitten aus dem Menü navigieren
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Menü schließen beim Klicken auf Menüelemente
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // Wenn es ein Ankerlink zu einem Abschnitt auf derselben Seite ist
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
                // Reguläre Links navigieren normal
            });
        });
    }

    // Menü mit Escape-Taste schließen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Berührungsereignisse für bessere mobile Erfahrung
    if (menuOverlay) {
        let startY = 0;

        menuOverlay.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        menuOverlay.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // Wenn um mehr als 50px nach unten gewischt wird, Menü schließen
            if (diff > 50) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Menüfarben basierend auf Abschnitt aktualisieren
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

    // Menüfarben basierend auf aktuellem Abschnitt initialisieren
    setTimeout(() => {
        const firstSection = document.querySelector('.section') || 
                           document.querySelector('.hero-animation-section');
        if (firstSection && window.updateMenuColors) {
            window.updateMenuColors(firstSection);
        }
    }, 100);
});

// Funktion zum Hinzufügen von Menüs zu jeder Seite
function loadMenu() {
    const menuHTML = `
        <!-- Zentraler Menüknopf -->
        <div class="center-menu-button">
            <img src="images/lg1.webp" alt="IZIPAY Logo - Anonyme Krypto-Karten" class="menu-logo-img">
            <div class="menu-brand">IZIPAY</div>
            <div class="menu-plus">+</div>
        </div>

        <!-- Menü-Overlay -->
        <div class="menu-overlay">
            <div class="menu-header">
                <div class="menu-logo-overlay">IZIPAY</div>
                <div class="menu-close">Schließen</div>
            </div>

            <div class="menu-content">
                <a href="index-de.html" class="menu-item">Startseite</a>
                <a href="virtual-debit-card-de.html" class="menu-item">Virtuelle Krypto-Karte</a>
                <a href="physical-debit-card-de.html" class="menu-item">Physische Krypto-Karte</a>
                <a href="pricing-de.html" class="menu-item">Preise & Gebühren</a>
                <a href="faq-de.html" class="menu-item">FAQ</a>
                <a href="terms-conditions-de.html" class="menu-item">Allgemeine Geschäftsbedingungen</a>
                <a href="privacy-policy-de.html" class="menu-item">Datenschutzerklärung</a>
                <a href="about-us-de.html" class="menu-item">Über Uns</a>
                <a href="blog-de.html" class="menu-item">Blog</a>
                
                <!-- Autorisierungsbuttons -->
                <div class="auth-buttons">
                    <a href="login.php" class="auth-btn login-btn">Anmelden</a>
                    <a href="register.php" class="auth-btn signup-btn">Registrieren</a>
                </div>
            </div>

            <div class="menu-footer">
                <div class="copyright">2022-2026 © IZIPAY</div>
            </div>
        </div>
    `;
    
    // Container für Menü erstellen
    const menuContainer = document.createElement('div');
    menuContainer.id = 'izipay-menu-container';
    menuContainer.innerHTML = menuHTML;
    
    // Menü am Anfang des body einfügen
    document.body.insertBefore(menuContainer, document.body.firstChild);
    
    // Menüfunktionalität initialisieren
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}

// Auto-Load Menü, wenn Container nicht existiert
if (!document.getElementById('izipay-menu-container')) {
    loadMenu();
}

// Export für Modulverwendung
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadMenu };
}