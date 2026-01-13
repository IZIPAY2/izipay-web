// 菜单功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取菜单元素
    const centerMenuButton = document.querySelector('.center-menu-button');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuItems = document.querySelectorAll('.menu-item');

    // 打开菜单
    if (centerMenuButton) {
        centerMenuButton.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // 关闭菜单
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            if (menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 从菜单导航到页面部分
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // 点击菜单项时关闭菜单
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // 如果是同一页面内的锚点链接
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
                // 普通链接正常导航
            });
        });
    }

    // 按ESC键关闭菜单
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // 触摸事件以获得更好的移动端体验
    if (menuOverlay) {
        let startY = 0;

        menuOverlay.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        menuOverlay.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // 如果向下滑动超过50px，关闭菜单
            if (diff > 50) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 根据页面部分更新菜单颜色
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

    // 根据当前部分初始化菜单颜色
    setTimeout(() => {
        const firstSection = document.querySelector('.section') || 
                           document.querySelector('.hero-animation-section');
        if (firstSection && window.updateMenuColors) {
            window.updateMenuColors(firstSection);
        }
    }, 100);
});

// 为任何页面添加菜单的函数
function loadMenu() {
    const menuHTML = `
        <!-- 中央菜单按钮 -->
        <div class="center-menu-button">
            <img src="images/lg1.webp" alt="IZIPAY Logo - 匿名加密货币卡" class="menu-logo-img">
            <div class="menu-brand">IZIPAY</div>
            <div class="menu-plus">+</div>
        </div>

        <!-- 菜单覆盖层 -->
        <div class="menu-overlay">
            <div class="menu-header">
                <div class="menu-logo-overlay">IZIPAY</div>
                <div class="menu-close">关闭</div>
            </div>

            <div class="menu-content">
                <a href="index-zh.html" class="menu-item">首页</a>
                <a href="virtual-debit-card-zh.html" class="menu-item">虚拟加密货币卡</a>
                <a href="physical-debit-card-zh.html" class="menu-item">实体加密货币卡</a>
                <a href="pricing-zh.html" class="menu-item">价格与费用</a>
                <a href="faq-zh.html" class="menu-item">常见问题</a>
                <a href="terms-conditions-zh.html" class="menu-item">条款与条件</a>
                <a href="privacy-policy-zh.html" class="menu-item">隐私政策</a>
                <a href="about-us-zh.html" class="menu-item">关于我们</a>
                <a href="blog-zh.html" class="menu-item">博客</a>
                
                <!-- 授权按钮 -->
                <div class="auth-buttons">
                    <a href="login.php" class="auth-btn login-btn">登录</a>
                    <a href="register.php" class="auth-btn signup-btn">注册</a>
                </div>
            </div>

            <div class="menu-footer">
                <div class="copyright">2022-2026 © IZIPAY</div>
            </div>
        </div>
    `;
    
    // 创建菜单容器
    const menuContainer = document.createElement('div');
    menuContainer.id = 'izipay-menu-container';
    menuContainer.innerHTML = menuHTML;
    
    // 在body开头插入菜单
    document.body.insertBefore(menuContainer, document.body.firstChild);
    
    // 初始化菜单功能
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}

// 如果容器不存在则自动加载菜单
if (!document.getElementById('izipay-menu-container')) {
    loadMenu();
}

// 模块使用导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadMenu };
}