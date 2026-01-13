// Funzionalità del menu
document.addEventListener('DOMContentLoaded', function() {
    // Ottieni gli elementi del menu
    const centerMenuButton = document.querySelector('.center-menu-button');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item');

    // Apri menu
    if (centerMenuButton) {
        centerMenuButton.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Chiudi menu
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Naviga alle sezioni dal menu
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Chiudi menu quando si clicca sugli elementi del menu
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // Se è un collegamento ancorato a una sezione nella stessa pagina
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
                // I collegamenti normali navigheranno normalmente
            });
        });
    }

    // Chiudi menu con il tasto Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Eventi touch per una migliore esperienza mobile
    if (menuOverlay) {
        let startY = 0;

        menuOverlay.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        menuOverlay.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // Se si scorre verso il basso di più di 50px, chiudi menu
            if (diff > 50) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Aggiorna i colori del menu in base alla sezione
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

    // Inizializza i colori del menu in base alla sezione corrente
    setTimeout(() => {
        const firstSection = document.querySelector('.section') || 
                           document.querySelector('.hero-animation-section');
        if (firstSection && window.updateMenuColors) {
            window.updateMenuColors(firstSection);
        }
    }, 100);
});

// Funzione per aggiungere menu a qualsiasi pagina
function loadMenu() {
    const menuHTML = `
        <!-- Pulsante centrale del menu -->
        <div class="center-menu-button">
            <img src="images/lg1.webp" alt="IZIPAY Logo - Carte Crypto Anonime" class="menu-logo-img">
            <div class="menu-brand">IZIPAY</div>
            <div class="menu-plus">+</div>
        </div>

        <!-- Sovrapposizione Menu -->
        <div class="menu-overlay">
            <div class="menu-header">
                <div class="menu-logo-overlay">IZIPAY</div>
                <div class="menu-close">Chiudi</div>
            </div>

            <div class="menu-content">
                <a href="index-it.html" class="menu-item">Home</a>
                <a href="virtual-debit-card-it.html" class="menu-item">Carta Crypto Virtuale</a>
                <a href="physical-debit-card-it.html" class="menu-item">Carta Crypto Fisica</a>
                <a href="pricing-it.html" class="menu-item">Prezzi e Commissioni</a>
                <a href="faq-it.html" class="menu-item">FAQ</a>
                <a href="terms-conditions-it.html" class="menu-item">Termini e Condizioni</a>
                <a href="privacy-policy-it.html" class="menu-item">Informativa sulla Privacy</a>
                <a href="about-us-it.html" class="menu-item">Chi Siamo</a>
                <a href="blog-it.html" class="menu-item">Blog</a>
                
                <!-- Pulsanti di autorizzazione -->
                <div class="auth-buttons">
                    <a href="login.php" class="auth-btn login-btn">Accedi</a>
                    <a href="register.php" class="auth-btn signup-btn">Registrati</a>
                </div>
            </div>

            <div class="menu-footer">
                <div class="copyright">2022-2026 © IZIPAY</div>
            </div>
        </div>
    `;
    
    // Crea contenitore per menu
    const menuContainer = document.createElement('div');
    menuContainer.id = 'izipay-menu-container';
    menuContainer.innerHTML = menuHTML;
    
    // Inserisci menu all'inizio del body
    document.body.insertBefore(menuContainer, document.body.firstChild);
    
    // Inizializza funzionalità del menu
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}

// Carica automaticamente menu se il contenitore non esiste
if (!document.getElementById('izipay-menu-container')) {
    loadMenu();
}

// Esporta per utilizzo del modulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadMenu };
}