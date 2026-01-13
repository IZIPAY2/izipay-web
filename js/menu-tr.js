// Menü fonksiyonelliği
document.addEventListener('DOMContentLoaded', function() {
    // Menü elementlerini al
    const centerMenuButton = document.querySelector('.center-menu-button');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item');

    // Menüyü aç
    if (centerMenuButton) {
        centerMenuButton.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Menüyü kapat
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Menüden bölümlere git
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Menü öğelerine tıklanınca menüyü kapat
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // Aynı sayfadaki bir bölüme bağlantı ise
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
                // Normal bağlantılar standart şekilde yönlendirir
            });
        });
    }

    // Escape tuşu ile menüyü kapat
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Daha iyi mobil deneyimi için dokunma olayları
    if (menuOverlay) {
        let startY = 0;

        menuOverlay.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        menuOverlay.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // 50px'den fazla aşağı kaydırılırsa menüyü kapat
            if (diff > 50) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Bölüme göre menü renklerini güncelle
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

    // Mevcut bölüme göre menü renklerini başlat
    setTimeout(() => {
        const firstSection = document.querySelector('.section') || 
                           document.querySelector('.hero-animation-section');
        if (firstSection && window.updateMenuColors) {
            window.updateMenuColors(firstSection);
        }
    }, 100);
});

// Herhangi bir sayfaya menü eklemek için fonksiyon
function loadMenu() {
    const menuHTML = `
        <!-- Merkezi menü butonu -->
        <div class="center-menu-button">
            <img src="images/lg1.webp" alt="IZIPAY Logo - Anonim Kripto Kartlar" class="menu-logo-img">
            <div class="menu-brand">IZIPAY</div>
            <div class="menu-plus">+</div>
        </div>

        <!-- Menü Kaplaması -->
        <div class="menu-overlay">
            <div class="menu-header">
                <div class="menu-logo-overlay">IZIPAY</div>
                <div class="menu-close">Kapat</div>
            </div>

            <div class="menu-content">
                <a href="index-tr.html" class="menu-item">Ana Sayfa</a>
                <a href="virtual-debit-card-tr.html" class="menu-item">Sanal Kripto Kart</a>
                <a href="physical-debit-card-tr.html" class="menu-item">Fiziksel Kripto Kart</a>
                <a href="pricing-tr.html" class="menu-item">Fiyatlandırma & Ücretler</a>
                <a href="faq-tr.html" class="menu-item">SSS</a>
                <a href="terms-conditions-tr.html" class="menu-item">Şartlar & Koşullar</a>
                <a href="privacy-policy-tr.html" class="menu-item">Gizlilik Politikası</a>
                <a href="about-us-tr.html" class="menu-item">Hakkımızda</a>
                <a href="blog-tr.html" class="menu-item">Blog</a>
                
                <!-- Yetkilendirme butonları -->
                <div class="auth-buttons">
                    <a href="login.php" class="auth-btn login-btn">Giriş Yap</a>
                    <a href="register.php" class="auth-btn signup-btn">Kayıt Ol</a>
                </div>
            </div>

            <div class="menu-footer">
                <div class="copyright">2022-2026 © IZIPAY</div>
            </div>
        </div>
    `;
    
    // Menü için konteyner oluştur
    const menuContainer = document.createElement('div');
    menuContainer.id = 'izipay-menu-container';
    menuContainer.innerHTML = menuHTML;
    
    // Menüyü body'nin başına ekle
    document.body.insertBefore(menuContainer, document.body.firstChild);
    
    // Menü fonksiyonelliğini başlat
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}

// Konteyner yoksa otomatik menü yükle
if (!document.getElementById('izipay-menu-container')) {
    loadMenu();
}

// Modül kullanımı için dışa aktar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadMenu };
}