// ===== HAMBURGER MENU =====
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobilePanel = document.getElementById('mobilePanel');

if (hamburgerBtn && mobilePanel) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        mobilePanel.classList.toggle('active');
        
        // Prevent body scroll when mobile menu is open
        document.body.style.overflow = mobilePanel.classList.contains('active') ? 'hidden' : '';
    });

    // Close when clicking a link
    document.querySelectorAll('.mobile-nav-link, .mobile-login, .mobile-register, .mobile-logout').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            mobilePanel.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== FLASH MESSAGES =====
document.querySelectorAll('.flash').forEach(flash => {
    setTimeout(() => {
        flash.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => flash.remove(), 300);
    }, 5000);
});

document.querySelectorAll('.flash-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.closest('.flash').remove();
    });
});

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
const currentPath = window.location.pathname;

document.querySelectorAll('.menu-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath === href) {
        link.classList.add('active');
    }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== FORM LOADING STATES =====
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }
    });
});

// ===== LOADING ANIMATION STYLES =====
const style = document.createElement('style');
style.textContent = `
    .btn-primary.loading, .creative-btn.loading {
        position: relative;
        color: transparent !important;
        pointer-events: none;
    }
    
    .btn-primary.loading::after,
    .creative-btn.loading::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: button-loading 0.8s linear infinite;
    }
    
    @keyframes button-loading {
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }

    @keyframes slideOut {
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===== CONSOLE GREETING =====
console.log(
    '%c🚀 Alok Singh %cSite',
    'font-size: 20px; color: #a855f7; font-weight: bold;',
    'font-size: 16px; color: #f97316;'
);

// ===== CLOSE MOBILE PANEL ON RESIZE =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        if (mobilePanel?.classList.contains('active')) {
            hamburgerBtn?.classList.remove('active');
            mobilePanel.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ===== GITHUB ACTIVITY FETCH =====
async function fetchGitHubActivity() {
    try {
        const response = await fetch('https://api.github.com/users/alok-uchiha/repos?sort=updated&per_page=3');
        const repos = await response.json();
        
        const githubGrid = document.querySelector('.github-grid');
        if (!githubGrid) return;
        
        githubGrid.innerHTML = ''; // Clear fake ones
        
        repos.forEach(repo => {
            const date = new Date(repo.updated_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            const card = `
                <div class="github-card">
                    <div class="github-repo">
                        <i class="fas fa-code-branch"></i>
                        <span>${repo.full_name}</span>
                    </div>
                    <p class="github-desc">${repo.description || 'No description'}</p>
                    <span class="github-date">Updated ${date}</span>
                </div>
            `;
            
            githubGrid.innerHTML += card;
        });
    } catch (error) {
        console.log('GitHub API error:', error);
    }
}

// Call it when page loads
document.addEventListener('DOMContentLoaded', fetchGitHubActivity);