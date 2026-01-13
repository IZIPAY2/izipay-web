// मेनू कार्यक्षमता
document.addEventListener('DOMContentLoaded', function() {
    // मेनू तत्व प्राप्त करें
    const centerMenuButton = document.querySelector('.center-menu-button');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item');

    // मेनू खोलें
    if (centerMenuButton) {
        centerMenuButton.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // मेनू बंद करें
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // मेनू से अनुभागों पर नेविगेट करें
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // मेनू आइटम्स पर क्लिक करने पर मेनू बंद करें
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // यदि यह एक ही पृष्ठ पर किसी अनुभाग की एंकर लिंक है
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
                // नियमित लिंक सामान्य रूप से नेविगेट करेंगे
            });
        });
    }

    // एस्केप की से मेनू बंद करें
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // बेहतर मोबाइल अनुभव के लिए टच इवेंट्स
    if (menuOverlay) {
        let startY = 0;

        menuOverlay.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        menuOverlay.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // 50px से अधिक स्वाइप डाउन करने पर मेनू बंद करें
            if (diff > 50) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // अनुभाग के आधार पर मेनू रंग अपडेट करें
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

    // वर्तमान अनुभाग के आधार पर मेनू रंग आरंभ करें
    setTimeout(() => {
        const firstSection = document.querySelector('.section') || 
                           document.querySelector('.hero-animation-section');
        if (firstSection && window.updateMenuColors) {
            window.updateMenuColors(firstSection);
        }
    }, 100);
});

// किसी भी पृष्ठ में मेनू जोड़ने के लिए फ़ंक्शन
function loadMenu() {
    const menuHTML = `
        <!-- केंद्रीय मेनू बटन -->
        <div class="center-menu-button">
            <img src="images/lg1.webp" alt="IZIPAY लोगो - गुमनाम क्रिप्टो कार्ड" class="menu-logo-img">
            <div class="menu-brand">IZIPAY</div>
            <div class="menu-plus">+</div>
        </div>

        <!-- मेनू ओवरले -->
        <div class="menu-overlay">
            <div class="menu-header">
                <div class="menu-logo-overlay">IZIPAY</div>
                <div class="menu-close">बंद करें</div>
            </div>

            <div class="menu-content">
                <a href="index-hi.html" class="menu-item">होम</a>
                <a href="virtual-debit-card-hi.html" class="menu-item">वर्चुअल क्रिप्टो कार्ड</a>
                <a href="physical-debit-card-hi.html" class="menu-item">भौतिक क्रिप्टो कार्ड</a>
                <a href="pricing-hi.html" class="menu-item">मूल्य निर्धारण और शुल्क</a>
                <a href="faq-hi.html" class="menu-item">अक्सर पूछे जाने वाले प्रश्न</a>
                <a href="terms-conditions-hi.html" class="menu-item">नियम और शर्तें</a>
                <a href="privacy-policy-hi.html" class="menu-item">गोपनीयता नीति</a>
                <a href="about-us-hi.html" class="menu-item">हमारे बारे में</a>
                <a href="blog-hi.html" class="menu-item">ब्लॉग</a>
                
                <!-- प्राधिकरण बटन -->
                <div class="auth-buttons">
                    <a href="login.php" class="auth-btn login-btn">लॉग इन करें</a>
                    <a href="register.php" class="auth-btn signup-btn">साइन अप करें</a>
                </div>
            </div>

            <div class="menu-footer">
                <div class="copyright">2022-2026 © IZIPAY</div>
            </div>
        </div>
    `;
    
    // मेनू के लिए कंटेनर बनाएं
    const menuContainer = document.createElement('div');
    menuContainer.id = 'izipay-menu-container';
    menuContainer.innerHTML = menuHTML;
    
    // मेनू को body की शुरुआत में डालें
    document.body.insertBefore(menuContainer, document.body.firstChild);
    
    // मेनू कार्यक्षमता आरंभ करें
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}

// कंटेनर मौजूद न होने पर ऑटो-लोड मेनू
if (!document.getElementById('izipay-menu-container')) {
    loadMenu();
}

// मॉड्यूल उपयोग के लिए निर्यात
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadMenu };
}