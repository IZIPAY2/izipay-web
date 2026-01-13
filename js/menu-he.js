// תפריט פונקציונלי
document.addEventListener('DOMContentLoaded', function() {
    // קבל את רכיבי התפריט
    const centerMenuButton = document.querySelector('.center-menu-button');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item');

    // פתח תפריט
    if (centerMenuButton) {
        centerMenuButton.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // סגור תפריט
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ניווט לסעיפים מתוך התפריט
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // סגור תפריט בלחיצה על פריטי תפריט
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // אם זה קישור עוגן לסעיף באותה הדף
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
                // קישורים רגילים ינווטו כרגיל
            });
        });
    }

    // סגור תפריט עם מקש Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // אירועי מגע לחוויה ניידת טובה יותר
    if (menuOverlay) {
        let startY = 0;

        menuOverlay.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        menuOverlay.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // אם מחליקים מטה יותר מ-50 פיקסלים, סגור תפריט
            if (diff > 50) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // עדכן צבעי תפריט לפי סעיף
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

    // אתחל צבעי תפריט לפי הסעיף הנוכחי
    setTimeout(() => {
        const firstSection = document.querySelector('.section') || 
                           document.querySelector('.hero-animation-section');
        if (firstSection && window.updateMenuColors) {
            window.updateMenuColors(firstSection);
        }
    }, 100);
});

// פונקציה להוספת תפריט לכל דף
function loadMenu() {
    const menuHTML = `
        <!-- כפתור תפריט מרכזי -->
        <div class="center-menu-button">
            <img src="images/lg1.webp" alt="IZIPAY לוגו - כרטיסי קריפטו אנונימיים" class="menu-logo-img">
            <div class="menu-brand">IZIPAY</div>
            <div class="menu-plus">+</div>
        </div>

        <!-- שכבה של תפריט -->
        <div class="menu-overlay">
            <div class="menu-header">
                <div class="menu-logo-overlay">IZIPAY</div>
                <div class="menu-close">סגור</div>
            </div>

            <div class="menu-content">
                <a href="index-he.html" class="menu-item">דף הבית</a>
                <a href="virtual-debit-card-he.html" class="menu-item">כרטיס קריפטו וירטואלי</a>
                <a href="physical-debit-card-he.html" class="menu-item">כרטיס קריפטו פיזי</a>
                <a href="pricing-he.html" class="menu-item">מחירים ועמלות</a>
                <a href="faq-he.html" class="menu-item">שאלות נפוצות</a>
                <a href="terms-conditions-he.html" class="menu-item">תנאים והגבלות</a>
                <a href="privacy-policy-he.html" class="menu-item">מדיניות פרטיות</a>
                <a href="about-us-he.html" class="menu-item">אודותינו</a>
                <a href="blog-he.html" class="menu-item">בלוג</a>
                
                <!-- כפתורי הרשאה -->
                <div class="auth-buttons">
                    <a href="login.php" class="auth-btn login-btn">התחברות</a>
                    <a href="register.php" class="auth-btn signup-btn">הרשמה</a>
                </div>
            </div>

            <div class="menu-footer">
                <div class="copyright">2022-2026 © IZIPAY</div>
            </div>
        </div>
    `;
    
    // צור מיכל לתפריט
    const menuContainer = document.createElement('div');
    menuContainer.id = 'izipay-menu-container';
    menuContainer.innerHTML = menuHTML;
    
    // הכנס תפריט לתחילת ה-body
    document.body.insertBefore(menuContainer, document.body.firstChild);
    
    // אתחל פונקציונליות תפריט
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}

// טען תפריט אוטומטית אם המיכל לא קיים
if (!document.getElementById('izipay-menu-container')) {
    loadMenu();
}

// ייצוא לשימוש במודול
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadMenu };
}