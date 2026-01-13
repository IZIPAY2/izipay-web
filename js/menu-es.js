// Funcionalidad del menú
document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del menú
    const centerMenuButton = document.querySelector('.center-menu-button');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item');

    // Abrir menú
    if (centerMenuButton) {
        centerMenuButton.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Cerrar menú
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Navegar a secciones desde el menú
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Cerrar menú al hacer clic en elementos del menú
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // Si es un enlace de anclaje a una sección en la misma página
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
                // Los enlaces regulares navegarán normalmente
            });
        });
    }

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Eventos táctiles para mejor experiencia móvil
    if (menuOverlay) {
        let startY = 0;

        menuOverlay.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        menuOverlay.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // Si se desliza hacia abajo más de 50px, cerrar menú
            if (diff > 50) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Actualizar colores del menú según la sección
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

    // Inicializar colores del menú según la sección actual
    setTimeout(() => {
        const firstSection = document.querySelector('.section') || 
                           document.querySelector('.hero-animation-section');
        if (firstSection && window.updateMenuColors) {
            window.updateMenuColors(firstSection);
        }
    }, 100);
});

// Función para agregar menú a cualquier página
function loadMenu() {
    const menuHTML = `
        <!-- Botón central del menú -->
        <div class="center-menu-button">
            <img src="images/lg1.webp" alt="Logo IZIPAY - Tarjetas Crypto Anónimas" class="menu-logo-img">
            <div class="menu-brand">IZIPAY</div>
            <div class="menu-plus">+</div>
        </div>

        <!-- Superposición del menú -->
        <div class="menu-overlay">
            <div class="menu-header">
                <div class="menu-logo-overlay">IZIPAY</div>
                <div class="menu-close">Cerrar</div>
            </div>

            <div class="menu-content">
                <a href="index-es.html" class="menu-item">Inicio</a>
                <a href="virtual-debit-card-es.html" class="menu-item">Tarjeta Crypto Virtual</a>
                <a href="physical-debit-card-es.html" class="menu-item">Tarjeta Crypto Física</a>
                <a href="pricing-es.html" class="menu-item">Precios y Tarifas</a>
                <a href="faq-es.html" class="menu-item">Preguntas Frecuentes</a>
                <a href="terms-conditions-es.html" class="menu-item">Términos y Condiciones</a>
                <a href="privacy-policy-es.html" class="menu-item">Política de Privacidad</a>
                <a href="about-us-es.html" class="menu-item">Sobre Nosotros</a>
                <a href="blog-es.html" class="menu-item">Blog</a>
                
                <!-- Botones de autorización -->
                <div class="auth-buttons">
                    <a href="login.php" class="auth-btn login-btn">Iniciar Sesión</a>
                    <a href="register.php" class="auth-btn signup-btn">Registrarse</a>
                </div>
            </div>

            <div class="menu-footer">
                <div class="copyright">2022-2026 © IZIPAY</div>
            </div>
        </div>
    `;
    
    // Crear contenedor para el menú
    const menuContainer = document.createElement('div');
    menuContainer.id = 'izipay-menu-container';
    menuContainer.innerHTML = menuHTML;
    
    // Insertar menú al principio del body
    document.body.insertBefore(menuContainer, document.body.firstChild);
    
    // Inicializar funcionalidad del menú
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}

// Carga automática del menú si el contenedor no existe
if (!document.getElementById('izipay-menu-container')) {
    loadMenu();
}

// Exportar para uso del módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadMenu };
}