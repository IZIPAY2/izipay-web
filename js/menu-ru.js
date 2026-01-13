// Функционал меню
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы меню
    const centerMenuButton = document.querySelector('.center-menu-button');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item');

    // Открытие меню
    if (centerMenuButton) {
        centerMenuButton.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Закрытие меню
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Навигация по разделам из меню
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Закрываем меню при клике на пункты меню
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // Если это якорная ссылка на раздел на той же странице
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
                // Обычные ссылки будут работать стандартно
            });
        });
    }

    // Закрытие меню по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // События касания для лучшего мобильного опыта
    if (menuOverlay) {
        let startY = 0;

        menuOverlay.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        menuOverlay.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // Если свайп вниз более 50px, закрываем меню
            if (diff > 50) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Обновление цветов меню в зависимости от раздела
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

    // Инициализация цветов меню на основе текущего раздела
    setTimeout(() => {
        const firstSection = document.querySelector('.section') || 
                           document.querySelector('.hero-animation-section');
        if (firstSection && window.updateMenuColors) {
            window.updateMenuColors(firstSection);
        }
    }, 100);
});

// Функция для добавления меню на любую страницу
function loadMenu() {
    const menuHTML = `
        <!-- Центральная кнопка меню -->
        <div class="center-menu-button">
            <img src="images/lg1.webp" alt="IZIPAY Logo - Анонимные криптокарты" class="menu-logo-img">
            <div class="menu-brand">IZIPAY</div>
            <div class="menu-plus">+</div>
        </div>

        <!-- Оверлей меню -->
        <div class="menu-overlay">
            <div class="menu-header">
                <div class="menu-logo-overlay">IZIPAY</div>
                <div class="menu-close">Закрыть</div>
            </div>

            <div class="menu-content">
                <a href="index-ru.html" class="menu-item">Главная</a>
                <a href="virtual-debit-card-ru.html" class="menu-item">Виртуальная криптокарта</a>
                <a href="physical-debit-card-ru.html" class="menu-item">Физическая криптокарта</a>
                <a href="pricing-ru.html" class="menu-item">Цены и тарифы</a>
                <a href="faq-ru.html" class="menu-item">Частые вопросы</a>
                <a href="terms-conditions-ru.html" class="menu-item">Условия использования</a>
                <a href="privacy-policy-ru.html" class="menu-item">Политика конфиденциальности</a>
                <a href="about-us-ru.html" class="menu-item">О нас</a>
                <a href="blog-ru.html" class="menu-item">Блог</a>
                
                <!-- Кнопки авторизации -->
                <div class="auth-buttons">
                    <a href="login.php" class="auth-btn login-btn">Войти</a>
                    <a href="register.php" class="auth-btn signup-btn">Регистрация</a>
                </div>
            </div>

            <div class="menu-footer">
                <div class="copyright">2022-2026 © IZIPAY</div>
            </div>
        </div>
    `;
    
    // Создаем контейнер для меню
    const menuContainer = document.createElement('div');
    menuContainer.id = 'izipay-menu-container';
    menuContainer.innerHTML = menuHTML;
    
    // Вставляем меню в начало body
    document.body.insertBefore(menuContainer, document.body.firstChild);
    
    // Инициализируем функционал меню
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}

// Автоматическая загрузка меню, если контейнер не существует
if (!document.getElementById('izipay-menu-container')) {
    loadMenu();
}

// Экспорт для использования в модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadMenu };
}