// وظائف القائمة
document.addEventListener('DOMContentLoaded', function() {
    // الحصول على عناصر القائمة
    const centerMenuButton = document.querySelector('.center-menu-button');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item');

    // فتح القائمة
    if (centerMenuButton) {
        centerMenuButton.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // إغلاق القائمة
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // التنقل إلى الأقسام من القائمة
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // إغلاق القائمة عند النقر على عناصر القائمة
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // إذا كان رابطًا يشير إلى قسم في نفس الصفحة
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
                // الروابط العادية ستتنقل بشكل طبيعي
            });
        });
    }

    // إغلاق القائمة بمفتاح Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // أحداث اللمس لتجربة جوال أفضل
    if (menuOverlay) {
        let startY = 0;

        menuOverlay.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        menuOverlay.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // إذا تم السحب لأسفل أكثر من 50 بكسل، إغلاق القائمة
            if (diff > 50) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // تحديث ألوان القائمة بناءً على القسم
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

    // تهيئة ألوان القائمة بناءً على القسم الحالي
    setTimeout(() => {
        const firstSection = document.querySelector('.section') || 
                           document.querySelector('.hero-animation-section');
        if (firstSection && window.updateMenuColors) {
            window.updateMenuColors(firstSection);
        }
    }, 100);
});

// دالة لإضافة قائمة إلى أي صفحة
function loadMenu() {
    const menuHTML = `
        <!-- زر القائمة المركزي -->
        <div class="center-menu-button">
            <img src="images/lg1.webp" alt="شعار IZIPAY - بطاقات كريبتو مجهولة" class="menu-logo-img">
            <div class="menu-brand">IZIPAY</div>
            <div class="menu-plus">+</div>
        </div>

        <!-- طبقة القائمة -->
        <div class="menu-overlay">
            <div class="menu-header">
                <div class="menu-logo-overlay">IZIPAY</div>
                <div class="menu-close">إغلاق</div>
            </div>

            <div class="menu-content">
                <a href="index-ar.html" class="menu-item">الرئيسية</a>
                <a href="virtual-debit-card-ar.html" class="menu-item">بطاقة كريبتو افتراضية</a>
                <a href="physical-debit-card-ar.html" class="menu-item">بطاقة كريبتو مادية</a>
                <a href="pricing-ar.html" class="menu-item">الأسعار والرسوم</a>
                <a href="faq-ar.html" class="menu-item">الأسئلة الشائعة</a>
                <a href="terms-conditions-ar.html" class="menu-item">الشروط والأحكام</a>
                <a href="privacy-policy-ar.html" class="menu-item">سياسة الخصوصية</a>
                <a href="about-us-ar.html" class="menu-item">من نحن</a>
                <a href="blog-ar.html" class="menu-item">المدونة</a>
                
                <!-- أزرار المصادقة -->
                <div class="auth-buttons">
                    <a href="login.php" class="auth-btn login-btn">تسجيل الدخول</a>
                    <a href="register.php" class="auth-btn signup-btn">إنشاء حساب</a>
                </div>
            </div>

            <div class="menu-footer">
                <div class="copyright">2022-2026 © IZIPAY</div>
            </div>
        </div>
    `;
    
    // إنشاء حاوية للقائمة
    const menuContainer = document.createElement('div');
    menuContainer.id = 'izipay-menu-container';
    menuContainer.innerHTML = menuHTML;
    
    // إدراج القائمة في بداية body
    document.body.insertBefore(menuContainer, document.body.firstChild);
    
    // تهيئة وظائف القائمة
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}

// التحميل التلقائي للقائمة إذا لم تكن الحاوية موجودة
if (!document.getElementById('izipay-menu-container')) {
    loadMenu();
}

// التصدير لاستخدام الوحدة
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadMenu };
}