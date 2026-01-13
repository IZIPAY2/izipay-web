// Fonctionnalité du menu
document.addEventListener('DOMContentLoaded', function() {
    // Obtenir les éléments du menu
    const centerMenuButton = document.querySelector('.center-menu-button');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item');

    // Ouvrir le menu
    if (centerMenuButton) {
        centerMenuButton.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Fermer le menu
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Naviguer vers les sections depuis le menu
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Fermer le menu en cliquant sur les éléments du menu
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // S'il s'agit d'un lien d'ancrage vers une section de la même page
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
                // Les liens réguliers navigueront normalement
            });
        });
    }

    // Fermer le menu avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Événements tactiles pour une meilleure expérience mobile
    if (menuOverlay) {
        let startY = 0;

        menuOverlay.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        menuOverlay.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // Si glissement vers le bas de plus de 50px, fermer le menu
            if (diff > 50) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Mettre à jour les couleurs du menu selon la section
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

    // Initialiser les couleurs du menu selon la section actuelle
    setTimeout(() => {
        const firstSection = document.querySelector('.section') || 
                           document.querySelector('.hero-animation-section');
        if (firstSection && window.updateMenuColors) {
            window.updateMenuColors(firstSection);
        }
    }, 100);
});

// Fonction pour ajouter un menu à n'importe quelle page
function loadMenu() {
    const menuHTML = `
        <!-- Bouton de menu central -->
        <div class="center-menu-button">
            <img src="images/lg1.webp" alt="Logo IZIPAY - Cartes Crypto Anonymes" class="menu-logo-img">
            <div class="menu-brand">IZIPAY</div>
            <div class="menu-plus">+</div>
        </div>

        <!-- Superposition de menu -->
        <div class="menu-overlay">
            <div class="menu-header">
                <div class="menu-logo-overlay">IZIPAY</div>
                <div class="menu-close">Fermer</div>
            </div>

            <div class="menu-content">
                <a href="index-fr.html" class="menu-item">Accueil</a>
                <a href="virtual-debit-card-fr.html" class="menu-item">Carte Crypto Virtuelle</a>
                <a href="physical-debit-card-fr.html" class="menu-item">Carte Crypto Physique</a>
                <a href="pricing-fr.html" class="menu-item">Tarification et Frais</a>
                <a href="faq-fr.html" class="menu-item">FAQ</a>
                <a href="terms-conditions-fr.html" class="menu-item">Conditions Générales</a>
                <a href="privacy-policy-fr.html" class="menu-item">Politique de Confidentialité</a>
                <a href="about-us-fr.html" class="menu-item">À Propos</a>
                <a href="blog-fr.html" class="menu-item">Blog</a>
                
                <!-- Boutons d'autorisation -->
                <div class="auth-buttons">
                    <a href="login.php" class="auth-btn login-btn">Connexion</a>
                    <a href="register.php" class="auth-btn signup-btn">S'inscrire</a>
                </div>
            </div>

            <div class="menu-footer">
                <div class="copyright">2022-2026 © IZIPAY</div>
            </div>
        </div>
    `;
    
    // Créer un conteneur pour le menu
    const menuContainer = document.createElement('div');
    menuContainer.id = 'izipay-menu-container';
    menuContainer.innerHTML = menuHTML;
    
    // Insérer le menu au début du body
    document.body.insertBefore(menuContainer, document.body.firstChild);
    
    // Initialiser la fonctionnalité du menu
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}

// Chargement automatique du menu si le conteneur n'existe pas
if (!document.getElementById('izipay-menu-container')) {
    loadMenu();
}

// Export pour utilisation du module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadMenu };
}