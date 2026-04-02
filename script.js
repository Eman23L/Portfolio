// --- RENDER LOGIC (Do not edit below unless you know JS) ---

// List of API URLs to try (Public DDNS and Local Fallback)
const API_ENDPOINTS = [
    'https://djry.myqnapcloud.com:12',      // External access (HTTPS on standard Port 443)
    // 'http://192.168.50.3:3000'        // Internal NAS IP (Fallback for local network) - Removed as per user request
];

async function fetchAPI(path, options) {
    for (const base of API_ENDPOINTS) {
        try {
            const response = await fetch(`${base}/${path}`, options);
            if (response.ok) return response;
        } catch (err) {
            console.warn(`Failed to connect to ${base}, trying next...`);
        }
    }
    throw new Error('All API connections failed. Check your network or server status.');
}

// --- ROUTING ENGINE ---
function updateBreadcrumbs(path) {
    const container = document.getElementById('breadcrumbs');
    if (!container) return;
    
    const items = [{ name: 'Home', action: 'goHome()' }, ...path];
    container.innerHTML = items.map((item, index) => {
        if (index === items.length - 1) return `<span>${item.name}</span>`;
        return `<a href="javascript:void(0)" onclick="${item.action}">${item.name}</a>`;
    }).join(' <span class="separator">›</span> ');
}

window.goHome = () => {
    document.getElementById('home-view').style.display = 'block';
    document.getElementById('page-view').style.display = 'none';
    window.scrollTo(0, 0);
    initObserver(); // Re-trigger scroll reveals
};

window.goHomeAndScroll = (id) => {
    goHome();
    setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
};

function showPage(contentHTML, breadcrumbPath) {
    const homeView = document.getElementById('home-view');
    const pageView = document.getElementById('page-view');
    const pageBody = document.getElementById('page-body');

    homeView.style.display = 'none';
    pageView.style.display = 'block';
    pageBody.innerHTML = contentHTML;
    
    updateBreadcrumbs(breadcrumbPath);
    window.scrollTo(0, 0);
}

function renderPortfolio() {
    // 1. Render Header & Hero
    document.title = `${data.profile.name} | ${data.profile.title}`;
    
    const navLogo = document.getElementById('nav-logo');
    const linkedInIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`;
    const cvIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
    const ytIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`;
    const emailIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;

    const actionButtonsHTML = `
        <a href="javascript:void(0)" onclick="showVideoPage()" class="header-btn yt-btn" title="YouTube Gallery">
            ${ytIcon} <span>YouTube</span>
        </a>
        <a href="javascript:void(0)" id="header-dark-mode-toggle" class="header-btn" title="Toggle Dark Mode">
            <span>🌓</span> <span>Mode</span>
        </a>
    `;

    // Inject into Desktop Header
    const desktopActions = document.getElementById('desktop-header-actions');
    if (desktopActions) desktopActions.innerHTML = actionButtonsHTML;

    // Restore Branding: Logo Image + "The Digital Builder"
    navLogo.href = "javascript:void(0)";
    navLogo.onclick = (e) => { e.preventDefault(); goHome(); };
    navLogo.innerHTML = `
        <img src="${data.profile.logoImage}" alt="Logo">
        <span>The Digital Builder</span>
    `;
    
    const bioHTML = Array.isArray(data.profile.bio) 
        ? data.profile.bio.map(line => `<span>${line}</span>`).join('') 
        : data.profile.bio;

    const heroHTML = `
        <div class="hero-content-wrapper dream-entrance">
            <div class="hero-text-area">
                <span class="hero-hello">HELLO</span>
                <h1 class="hero-name"><span class="hero-intro-text">My name is</span> ${data.profile.name}</h1>
                <h2 class="hero-role">
                    <span class="hero-intro-text">and I'm</span>
                    <span id="vowel-check" class="hero-intro-text">a</span>
                    <span id="typewriter" class="accent-text"></span>
                </h2>
                <p class="hero-bio reveal">${bioHTML}</p>
                <div class="hero-actions reveal">
                    <a href="javascript:void(0)" class="btn rounded-btn" onclick="goHomeAndScroll('metrics')">View my Portfolio</a>
                </div>
            </div>
            <div class="hero-image-area">
                <img src="${data.profile.image}" alt="${data.profile.name}" class="hero-profile-img">
            </div>
        </div>
    `;
    document.getElementById('hero-content').innerHTML = heroHTML;
    initTypewriter();

    // 1b. Render Metrics Section
    renderMetrics();

    function renderMetrics() {
        const metricsContainer = document.getElementById('metrics-grid');
        if (!metricsContainer) return;

        metricsContainer.innerHTML = data.metrics.map(metric => {
            const floatingHtml = (metric.floatingNames || []).map((name, i) => {
                // Use a grid-based distribution to prevent clustering
                const rows = 3;
                const cols = 2;
                const row = Math.floor(i / cols) % rows;
                const col = i % cols;

                // Calculate position with a small jitter to keep it organic
                const top = (row * 25) + 15 + (Math.random() * 10);
                const left = (col * 40) + 10 + (Math.random() * 15);
                
                const delay = (Math.random() * 5).toFixed(1);
                const duration = (20 + Math.random() * 10).toFixed(1);
                const size = (0.6 + Math.random() * 0.25).toFixed(2); // Vary size for depth
                return `<span class="floating-name" style="top:${top}%; left:${left}%; animation-delay:${delay}s; animation-duration:${duration}s; font-size:${size}rem;">${name}</span>`;
            }).join('');

            return `
                <div class="metric-item reveal">
                    ${floatingHtml}
                    <div class="metric-icon">
                        <img src="icons/${metric.icon}" alt="${metric.label} icon">
                    </div>
                    <div class="metric-value" ${metric.noAnimate ? '' : `data-target="${metric.value}" data-unit="${metric.unit || ''}" data-prefix="${metric.prefix || ''}"`}>${metric.noAnimate ? (metric.prefix || '') + metric.value + (metric.unit || '') : '0'}</div>
                    <div class="metric-label">${metric.label}</div>
                    ${metric.subLabel ? `<div class="metric-sublabel">${metric.subLabel}</div>` : ''}
                </div>
            `}).join('');

        const metricItems = document.querySelectorAll('.metric-item');
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the item is visible
        };

        const metricObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('[data-target]').forEach(el => {
                        animateCounter(el, parseInt(el.dataset.target), el.dataset.unit || '', el.dataset.prefix || '');
                    });
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        metricItems.forEach(item => {
            metricObserver.observe(item);
        });
    }

    function animateCounter(element, targetValue, unit, prefix = '') {
        let startValue = 0;
        const duration = 2000; // 2 seconds
        let startTime = null;

        function easeOutQuad(t) { return t * (2 - t); }

        function step(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;

            if (progress < 1) {
                const easedProgress = easeOutQuad(progress);
                const currentValue = Math.floor(startValue + easedProgress * (targetValue - startValue));
                element.textContent = prefix + currentValue + unit;
                requestAnimationFrame(step);
            } else {
                element.textContent = prefix + targetValue + unit;
            }
        }
        requestAnimationFrame(step);
    }

    function initTypewriter() {
        const element = document.getElementById('typewriter');
        const article = document.getElementById('vowel-check');
        const words = [
            "Civil Engineer",
            "Structural Engineer", 
            "Computational Designer",
            "Automation Enthusiast",              
            "Digital Leader",            
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (article) {
                const firstLetter = currentWord.charAt(0).toLowerCase();
                article.textContent = ['a', 'e', 'i', 'o', 'u'].includes(firstLetter) ? 'an' : 'a';
            }

            if (isDeleting) {
                element.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            // Speed logic: 100ms for typing, 25ms for that "flowing" backspace
            let typeSpeed = isDeleting ? 25 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at the end of the word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Short pause before typing next word
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    // 1c. Render Mobile Menu Categories
    const mobileCatList = document.getElementById('mobile-categories-list');
    const mobileProfileLinks = document.getElementById('mobile-profile-links');
    const mobileConnectLinks = document.getElementById('mobile-connect-links');
    
    if (mobileCatList) {
        mobileCatList.innerHTML = data.projects.map((p, i) => 
            `<a href="javascript:void(0)" onclick="toggleMobileMenu(); showProjectPage(${i})">${p.title}</a>`
        ).join('');
    }

    if (mobileProfileLinks) {
        mobileProfileLinks.innerHTML = `
            <a href="#" onclick="toggleMobileMenu(); showAboutPage(); return false;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                <span>About Me</span>
            </a>
            <a href="javascript:void(0)" onclick="toggleMobileMenu(); showVideoPage();">
                ${ytIcon}
                <span>YouTube Gallery</span>
            </a>
        `;
    }

    // Render fixed utility links at the bottom of the mobile menu
    const mobileFixedUtility = document.getElementById('mobile-fixed-utility');
    if (mobileFixedUtility) {
        mobileFixedUtility.innerHTML = `
            <a href="javascript:void(0)" onclick="toggleMobileMenu(); toggleDarkMode()">
                <span class="mode-icon">🌓</span>
                <span>Toggle Mode</span>
            </a>
        `;
    }

    // 1d. Render Desktop Expertise Dropdown
    const desktopExpertiseMenu = document.getElementById('desktop-expertise-menu');
    
    if (desktopExpertiseMenu) {
        desktopExpertiseMenu.innerHTML = data.projects.map((p, i) => `
            <div class="dropdown-item-nested">
                <a href="javascript:void(0)" onclick="showProjectPage(${i})">${p.title}</a>
                ${p.subProjects ? `
                    <svg class="side-arrow" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                ` : ''}
                <div class="nested-menu">
                    ${p.subProjects ? p.subProjects.map((sub, subIdx) => `
                        <a href="javascript:void(0)" onclick="openSpecificSubProject(${i}, ${subIdx})">${sub.title}</a>
                    `).join('') : ''}
                </div>
            </div>
        `).join('');
    }

    // Helper to open modal and expand a specific sub-project
    window.openSpecificSubProject = (projectIdx, subIdx) => {
        showProjectPage(projectIdx);
        setTimeout(() => {
            const cards = document.querySelectorAll('.sub-project-card');
            if (cards && cards[subIdx]) {
                toggleSubProjectDetails(cards[subIdx]);
                cards[subIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 200);
    };

    // 1c. Mobile Menu Toggle Logic
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    window.toggleMobileMenu = () => {
        const isActive = mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Toggle a class on both body and html for robust scroll locking
        document.body.classList.toggle('mobile-menu-open', isActive);
        document.documentElement.classList.toggle('mobile-menu-open', isActive);
    };

    if (hamburger) {
        hamburger.onclick = (e) => { e.preventDefault(); toggleMobileMenu(); };
    }

    // 2. Render Projects
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = data.projects.map((project, index) => {
        // Check if it's a video or image
        let mediaHtml = '';
        if (project.video) {
            mediaHtml = `<video src="${project.video}" controls controlsList="nodownload" oncontextmenu="return false;" preload="metadata" class="card-img" onclick="event.stopPropagation()"></video>`;
        } else {
            mediaHtml = `<img src="${project.image}" alt="${project.title}" class="card-img">`;
        }

        // Generate Tags
        const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');

        return `
            <article class="card reveal" onclick="showProjectPage(${index})">
                ${mediaHtml}
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tags">${tagsHtml}</div>
                </div>
            </article>
        `;
    }).join('');

    // 3. Render Contact & Footer
    document.getElementById('footer-text').innerHTML = `&copy; ${new Date().getFullYear()} ${data.profile.name}. All rights reserved.`;

    // 4. Initialize Animations
    initObserver();
    initDarkMode();
}

function toggleSubProjectDetails(card) {
    const details = card.querySelector('.sub-project-details');
    const icon = card.querySelector('.toggle-icon');
    
    // Close other cards to keep the view clean
    document.querySelectorAll('.sub-project-card').forEach(c => {
        if (c !== card) {
            c.querySelector('.sub-project-details').style.display = 'none';
            const otherIcon = c.querySelector('.toggle-icon');
            if (otherIcon) otherIcon.textContent = '+';
            c.style.backgroundColor = '#fff';
            c.classList.remove('expanded');

            // Stop any playing video or iframe when closing
            const video = c.querySelector('video');
            if (video) video.pause();
            const iframe = c.querySelector('iframe');
            if (iframe) {
                const src = iframe.src;
                iframe.src = ''; iframe.src = src;
            }
        }
    });

    if (details.style.display === 'none') {
        details.style.display = 'block';
        icon.textContent = '-';
        card.style.backgroundColor = '#f9f9f9';
        card.classList.add('expanded');
    } else {
        details.style.display = 'none';
        icon.textContent = '+';
        card.style.backgroundColor = '#fff';
        card.classList.remove('expanded');

        // Stop any playing video or iframe when collapsing
        const video = card.querySelector('video');
        if (video) video.pause();
        const iframe = card.querySelector('iframe');
        if (iframe) {
            const src = iframe.src;
            iframe.src = ''; iframe.src = src;
        }
    }
}

window.showProjectPage = (index) => {
    const project = data.projects[index];

    // Generate HTML for sub-projects
    const subProjectsHtml = project.subProjects ? project.subProjects.map(sub => {
        let mediaContent = '';
        if (sub.youtube) {
            mediaContent = `<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; margin-top:15px; border-radius:8px;"><iframe style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" src="https://www.youtube.com/embed/${sub.youtube}?rel=0&modestbranding=1&playsinline=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
        } else if (sub.videos) {
            mediaContent = sub.videos.map(v => `
                <div style="margin-top:15px;">
                    <p style="font-size: 0.85rem; font-weight: 600; color: #444; margin-bottom: 5px;">${v.title}</p>
                    <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:8px;">
                        <iframe style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" src="https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1&playsinline=1" title="${v.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
            `).join('');
        } else if (sub.video) {
            mediaContent = `<video src="${sub.video}" controls controlsList="nodownload" oncontextmenu="return false;" preload="metadata" style="width:100%; border-radius:8px; margin-top:15px;"></video>`;
        } else if (sub.images) {
            mediaContent = sub.images.map(imgSrc => `<img src="${imgSrc}" alt="${sub.title}" style="width:100%; border-radius:8px; margin-top:15px;">`).join('');
        } else if (sub.model) {
            mediaContent = `<div class="model-wrapper"><model-viewer src="${sub.model}" alt="${sub.title}" auto-rotate camera-controls shadow-intensity="1" touch-action="pan-y" ar></model-viewer></div>`;
        } else if (sub.img) {
            if (sub.zoomImage) {
                mediaContent = `<img src="${sub.img}" alt="${sub.title}" class="zoomable-img" onclick="toggleImage(this, '${sub.img}', '${sub.zoomImage}')">`;
            } else {
                mediaContent = `<img src="${sub.img}" alt="${sub.title}" style="width:100%; border-radius:8px; margin-top:15px;">`;
            }
        }

        return `<div class="sub-project-card" style="border: 1px solid #eee; border-radius: 8px; margin-bottom: 15px; overflow: hidden; transition: box-shadow 0.3s ease;">
            <div class="card-header" onclick="toggleSubProjectDetails(this.parentNode)" style="padding: 15px; background: #fff; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="margin: 0; color: #333; font-size: 1.1rem;">${sub.title}</h4>
                    <p style="margin: 5px 0 0; font-size: 0.9rem; color: #666;">${sub.role}</p>
                </div>
                <span class="toggle-icon" style="font-size: 1.5rem; color: #007bff; font-weight: bold;">+</span>
            </div>
            <div class="sub-project-details" style="display: none; padding: 15px; border-top: 1px solid #eee; background: #fafafa;">
                ${sub.value || sub.timeline ? `
                    <div style="display: flex; gap: 20px; margin-bottom: 15px; font-size: 0.85rem; color: #555; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                        ${sub.value ? `<span><strong>Value:</strong> ${sub.value}</span>` : ''}
                        ${sub.timeline ? `<span><strong>Timeline:</strong> ${sub.timeline}</span>` : ''}
                    </div>
                ` : ''}
                <p style="margin-bottom: 15px;">${sub.desc}</p>
                ${sub.challenge ? `
                    <div style="margin-bottom: 15px;">
                        <h5 style="margin: 0 0 5px; color: #333; font-size: 0.95rem;">The Challenge</h5>
                        <p style="font-size: 0.9rem; color: #666; line-height: 1.5;">${sub.challenge}</p>
                    </div>` : ''}
                ${sub.contributions ? `
                    <div style="margin-bottom: 15px;">
                        <h5 style="margin: 0 0 5px; color: #333; font-size: 0.95rem;">Key Contributions</h5>
                        <ul style="font-size: 0.9rem; color: #666; line-height: 1.5; padding-left: 1.2rem; margin: 0;">
                            ${Array.isArray(sub.contributions) 
                                ? sub.contributions.map(c => `<li style="margin-bottom: 5px;">${c}</li>`).join('') 
                                : `<li>${sub.contributions}</li>`}
                        </ul>
                    </div>` : ''}
                ${sub.tech ? `
                    <div style="margin-bottom: 15px;">
                        <h5 style="margin: 0 0 5px; color: #333; font-size: 0.95rem;">Tech Stack</h5>
                        <div class="video-tags">${sub.tech.map(t => `<span>${t}</span>`).join('')}</div>
                    </div>` : ''}
                ${sub.outcomes ? `
                    <div style="margin-bottom: 15px;">
                        <h5 style="margin: 0 0 5px; color: #333; font-size: 0.95rem;">Outcomes</h5>
                        <ul style="font-size: 0.9rem; color: #666; line-height: 1.5; padding-left: 1.2rem; margin: 0;">
                            ${Array.isArray(sub.outcomes) 
                                ? sub.outcomes.map(o => `<li style="margin-bottom: 5px;">${o}</li>`).join('') 
                                : `<li>${sub.outcomes}</li>`}
                        </ul>
                    </div>` : ''}
                ${sub.timeSaved ? `
                    <div style="margin-bottom: 15px;">
                        <h5 style="margin: 0 0 5px; color: #333; font-size: 0.95rem;">Project time saved</h5>
                        <p style="font-size: 0.9rem; color: #666; line-height: 1.5;">${sub.timeSaved}</p>
                    </div>` : ''}
                ${mediaContent}
                ${sub.link ? `<a href="${sub.link}" target="_blank" class="btn" style="margin-top:15px; display:inline-block;">${sub.linkText || 'View Content'}</a>` : ''}
            </div>
        </div>`;
    }).join('') : '<p>No details available.</p>';

    const content = `
        <h1 style="font-size: 3rem; margin-bottom: 10px;">${project.title}</h1>
        <p style="font-size: 1.2rem; color: #666; margin-bottom: 40px;">${project.description}</p>
        <div class="sub-projects-container">${subProjectsHtml}</div>
    `;

    showPage(content, [{ name: 'Expertise', action: "goHomeAndScroll('expertise')" }, { name: project.title }]);
};

window.showVideoPage = () => {
    let videosHtml = '';

    data.youtubeGallery.forEach(video => {
        const tagsHtml = video.tags ? `<div class="video-tags">${video.tags.map(t => `<span>${t}</span>`).join('')}</div>` : '';
        
        videosHtml += `
            <div class="video-gallery-item">
                <iframe src="https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1" allowfullscreen></iframe>
                <div class="video-info">
                    <h4>${video.title}</h4>
                    <div class="video-desc">${video.description}</div>
                    ${tagsHtml}
                </div>
            </div>
        `;
    });

    const subUrl = data.profile.logoUrl + "?sub_confirmation=1";
    const ytIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`;

    const content = `
        <div class="video-gallery-header">
            <div style="flex: 1; min-width: 250px;">
                <h2 style="margin-bottom:10px;">YouTube Channel Videos</h2>
                <p style="opacity:0.8;">A collection of all of my videos on computational design and its application to infrastructure delivery.</p>
            </div>
            <a href="${subUrl}" target="_blank" class="subscribe-btn">
                ${ytIcon} Subscribe
            </a>
        </div>
        <div class="video-gallery-grid">
            ${videosHtml || '<p>No videos available at the moment.</p>'}
        </div>
    `;
    showPage(content, [{ name: 'YouTube Gallery' }]);
};

window.showAboutPage = () => {
    const content = `
        <div class="timeline-container">
            <h2>Professional Journey</h2>
            <div class="journey-toggle-container">
                <button id="journey-toggle-btn" class="btn" onclick="toggleJourneyMode()">Show Full Journey</button>
            </div>
            <div id="career-timeline" class="timeline collapsed">
                ${data.experience.map(item => {
                    // Identify items that are NOT work (Education, Qualifications)
                    const isExtended = item.category !== 'work';
                    const extraClass = isExtended ? ' extended-item' : '';
                    
                    const tagsHtml = item.tags ? `<div class="timeline-tags">${item.tags.map(t => `<span>${t}</span>`).join('')}</div>` : '';

                    return `
                    <div class="timeline-item${extraClass}">
                        <div class="timeline-dot"></div>
                        <div class="timeline-date">${item.date}</div>
                        <div class="timeline-content">
                            ${item.logo ? `<img src="${item.logo}" alt="${item.company}" class="timeline-logo">` : ''}
                            <h3>${item.role} <span class="badge ${item.category}">${item.category}</span></h3>
                            <h4>${item.company}</h4>
                            <p>${item.desc}</p>
                            ${tagsHtml}
                        </div>
                    </div>
                `}).join('')}
            </div>
        </div>
    `;
    
    showPage(content, [{ name: 'About Me' }]);
}

function toggleJourneyMode() {
    const timeline = document.getElementById('career-timeline');
    const btn = document.getElementById('journey-toggle-btn');
    
    if (timeline.classList.contains('collapsed')) {
        timeline.classList.remove('collapsed');
        btn.textContent = "Show Work Only";
    } else {
        timeline.classList.add('collapsed');
        btn.textContent = "Show Full Journey";
    }
}

window.prefillContactForm = (subject, message) => {
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    if (subjectInput) subjectInput.value = subject;
    if (messageInput) messageInput.value = message;
    
    // Provide visual feedback by focusing the message area
    if (messageInput) messageInput.focus();
};

window.showContactPage = () => {
    const modal = document.getElementById('contact-modal');

    // If the modal is already open, close it and exit the function
    if (modal && modal.style.display === 'block') {
        closeContactModal();
        return;
    }

    const body = document.getElementById('contact-modal-body');
    const linkedInLogo = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`;
    const cvIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;

    body.innerHTML = `
        <div class="contact-page-container">
            <div class="contact-header">
                <h1>Get in Touch</h1>
                <p>Have a project in mind or want to discuss digital transformation? Send me a message below.</p>
            </div>
            <div class="form-group">
                <label>Quick Select Topic:</label>
                <div class="prefill-options">
                    <button type="button" class="prefill-btn" onclick="prefillContactForm('ICE Mentorship Inquiry', 'Hi David, I am interested in discussing ICE mentorship and professional development opportunities.')">ICE Mentorship</button>
                    <button type="button" class="prefill-btn" onclick="prefillContactForm('Digital Solution Development', 'Hi David, I would like to discuss developing a bespoke digital solution for our engineering workflows.')">Digital Solutions</button>
                    <button type="button" class="prefill-btn" onclick="prefillContactForm('MMC/DFMA Inquiry', 'Hi David, I am interested in learning more about your experience with MMC and DFMA for infrastructure projects.')">MMC / DFMA</button>
                </div>
            </div>
            <form id="contact-form" class="contact-form" onsubmit="handleContactSubmit(event)">
                <div class="form-group"><label for="name">Name</label><input type="text" id="name" name="name" required placeholder="Your Name"></div>
                <div class="form-group"><label for="email">Email</label><input type="email" id="email" name="email" required placeholder="your@email.com"></div>
                <div class="form-group"><label for="subject">Subject</label><input type="text" id="subject" name="subject" required placeholder="How can I help?"></div>
                <div class="form-group"><label for="message">Message</label><textarea id="message" name="message" rows="5" required placeholder="Tell me more..."></textarea></div>
                <button type="submit" class="btn submit-btn">Send Message</button>
                <div id="form-status"></div>
            </form>
            <div class="contact-footer">
                <p>Or connect via social media:</p>
                <div class="contact-social-actions">
                    <a href="${data.contact.link}" class="btn" target="_blank">${linkedInLogo} LinkedIn</a>
                    <a href="${data.contact.cv}" class="btn" download>${cvIcon} Download CV</a>
                </div>
            </div>
        </div>`;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    if (window.location.hash !== '#contact') {
        history.pushState({ modal: 'contact' }, 'Contact', '#contact');
    }
};

window.closeContactModal = (shouldGoBack = true) => {
    const modal = document.getElementById('contact-modal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
    if (shouldGoBack && window.location.hash === '#contact') {
        history.back();
    }
};

window.handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('form-status');
    const formData = Object.fromEntries(new FormData(form));

    status.innerHTML = "Sending...";
    
    try {
        const response = await fetchAPI('contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            status.innerHTML = "<span style='color: green;'>Message sent successfully! I'll get back to you soon.</span>";
            form.reset();
            setTimeout(() => closeContactModal(), 2000);
        } else { throw new Error(); }
    } catch (err) {
        status.innerHTML = "<span style='color: red;'>Failed to send. Please try LinkedIn instead.</span>";
    }
}

function toggleImage(img, src1, src2) {
    if (img.getAttribute('src') === src1) {
        img.setAttribute('src', src2);
    } else {
        img.setAttribute('src', src1);
    }
}

function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Special handling for hero reveal elements: 
                // Only reveal if the user has actually started scrolling.
                if (entry.target.closest('.hero-text-area')) {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrollTop > 10) {
                        entry.target.classList.add('active');
                    }
                } else {
                    entry.target.classList.add('active');
                }
            }
        });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    // Global scroll listener to catch the first scroll and trigger the hero reveal
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroReveals = document.querySelectorAll('.hero-text-area .reveal:not(.active)');
        if (heroReveals.length > 0 && scrollTop > 10) {
            heroReveals.forEach(el => {
                el.classList.add('active');
            });
        }
    }, { passive: true });
}

window.toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

function initDarkMode() {
    // Apply saved preference on load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    const btn = document.getElementById('header-dark-mode-toggle');
    if (btn) {
        btn.onclick = window.toggleDarkMode;
    }
}

function initFloatingContact() {
    const contactBtn = document.getElementById('floating-contact-btn');
    const topBtn = document.getElementById('back-to-top-btn');
    
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 500) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }

        // Concrete Truck Animation Logic
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        // Curing Animation (Color shifts from wet to dry gray)
        const r = Math.floor(120 + (160 - 120) * (scrollPercent / 100));
        const g = Math.floor(113 + (155 - 113) * (scrollPercent / 100));
        const b = Math.floor(108 + (150 - 108) * (scrollPercent / 100));
        
        topBtn.style.setProperty('--concrete-color', `rgb(${r}, ${g}, ${b})`);
        topBtn.style.setProperty('--scroll-p', `${scrollPercent}%`);
        topBtn.style.setProperty('--truck-x', `${scrollPercent}%`);
        
        topBtn.classList.toggle('is-scrolling', scrollPercent > 0.5);
        topBtn.classList.toggle('is-full', scrollPercent >= 99.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

// Run
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    initFloatingContact();

    window.addEventListener('popstate', (event) => { // Corrected popstate listener
        const modal = document.getElementById('contact-modal');
        if (modal && modal.style.display === 'block' && window.location.hash !== '#contact') {
            closeContactModal(false); // Close the modal without pushing another history state
        }
    });

    // --- SCROLL PROMPT INTERACTION LOGIC ---
    const scrollPrompt = document.querySelector('.scroll-prompt');
    let idleTimer;

    const handleInteraction = () => {
        if (!scrollPrompt) return;
        
        // Hide immediately on interaction
        scrollPrompt.classList.add('hidden');
        
        clearTimeout(idleTimer);
        // Reappear after 3 seconds of no movement, regardless of scroll position
        idleTimer = setTimeout(() => {
            scrollPrompt.classList.remove('hidden');
        }, 3000);
    };

    ['scroll', 'mousemove', 'touchstart', 'wheel', 'keydown'].forEach(evt => {
        window.addEventListener(evt, handleInteraction, { passive: true });
    });

    // Force scroll to top on every load/refresh to ensure the Dream Entrance works
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    // Use a slight delay to ensure the browser has finished initial rendering
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Trigger the Dream Entrance
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        const heroIntro = document.querySelector('.dream-entrance');
        if (preloader) preloader.classList.add('preloader-hidden');
        if (heroIntro) heroIntro.classList.add('active');
        document.body.classList.add('hero-active');
    }, 500);

    // Stage 2: Automatic "Slow Delay" Reveal
    // The hero animation takes 2 seconds to complete. 
    // We wait for that to finish, then add your "slow delay" before showing the rest.
    setTimeout(() => {
        document.body.classList.add('content-ready');
    }, 1000); // 500ms (initial) + 1000ms (reduced delay)

    // --- SMART HEADER LOGIC ---
    let lastScrollTop = 0;
    const headerEl = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Always show header at the very top
        if (scrollTop <= 50) {
            headerEl.style.transform = "translateY(0)";
            return;
        }

        if (scrollTop > lastScrollTop) {
            // Scrolling down - hide header to save space
            headerEl.style.transform = "translateY(-100%)";
        } else {
            // Scrolling up - show header for navigation
            headerEl.style.transform = "translateY(0)";
        }
        lastScrollTop = scrollTop;
    }, { passive: true });

    // Check if running from file system (which blocks database connections)
    if (window.location.protocol === 'file:') {
        console.warn("⚠️ Running from file system. Database connections (CORS) will be blocked by the browser. Please host this on a web server.");
    }
    
    // Check for Mixed Content (HTTPS site vs HTTP API)
    if (window.location.protocol === 'https:') {
        console.warn("⚠️ Mixed Content Warning: You are accessing the site via HTTPS, but the API is HTTP. The browser will block the connection. Please use HTTP for the website or enable SSL for the API.");
    }

    // Log visit to database
    fetchAPI('website_data', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: window.location.href }) 
    })
        .then(response => {
            if (!response.ok) throw new Error(`Server responded with ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("✅ Visit tracked successfully:", data);
            const footerText = document.getElementById('footer-text');
            if (footerText && data.count) {
                // Make the text clickable to toggle the graph
                footerText.innerHTML += ` <br><span id="visitor-toggle" style="font-size:0.8em; opacity:0.7; cursor:pointer; text-decoration:underline; text-underline-offset: 4px;" title="Click to view activity graph">Total Visitors: ${data.count} <span style="color:green;">🔌 Connected</span></span>`;

                // Create chart container (hidden by default)
                const footer = document.querySelector('footer');
                const chartDiv = document.createElement('div');
                chartDiv.id = 'visitor-chart-container';
                chartDiv.style.maxWidth = '600px';
                chartDiv.style.margin = '20px auto';
                chartDiv.style.padding = '10px';
                chartDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                chartDiv.style.borderRadius = '8px';
                chartDiv.style.display = 'none'; // Hidden initially
                chartDiv.style.color = '#333';
                chartDiv.innerHTML = '<canvas id="visitorChart"></canvas>';
                footer.appendChild(chartDiv);

                // Toggle logic
                document.getElementById('visitor-toggle').addEventListener('click', () => {
                    const container = document.getElementById('visitor-chart-container');
                    container.style.display = (container.style.display === 'none') ? 'block' : 'none';
                });

                // Load Chart.js and render if history exists
                if (data.history && Array.isArray(data.history) && data.history.length > 0) {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
                    script.onload = () => {
                        new Chart(document.getElementById('visitorChart'), {
                            type: 'line',
                            data: {
                                labels: data.history.map(h => h.date),
                                datasets: [{
                                    label: 'Visitors',
                                    data: data.history.map(h => h.count),
                                    borderColor: '#007bff',
                                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                                    fill: true,
                                    tension: 0.3,
                                    pointRadius: 4
                                }]
                            },
                            options: { 
                                responsive: true, 
                                plugins: { 
                                    legend: { display: false }, 
                                    title: { display: true, text: 'Visitor Activity' } 
                                },
                                scales: {
                                    y: { beginAtZero: true, ticks: { stepSize: 1 } },
                                    x: { ticks: { autoSkip: true, maxTicksLimit: 10 } }
                                }
                            }
                        });
                    };
                    document.head.appendChild(script);
                } else {
                    // Fallback message if no history data
                    chartDiv.innerHTML = '<p style="padding:10px; text-align:center; font-size:0.9em;">No historical activity data available yet.</p>';
                }
            }
        })
        .catch(err => {
            console.error('❌ Tracking failed. Possible causes: CORS, Mixed Content (HTTPS/HTTP), or Server Offline.', err);
            const footer = document.getElementById('footer-text');
            if (footer) {
                footer.innerHTML += ` <br><span style="font-size:0.8em; opacity:0.7;">Database: <span style="color:red;">🔌 Disconnected</span></span>`;
            }
        });

    // Global listener to ensure only one video plays at a time
    document.addEventListener('play', (event) => {
        if (event.target.tagName === 'VIDEO') {
            document.querySelectorAll('video').forEach(video => {
                if (video !== event.target) {
                    video.pause();
                }
            });
        }
    }, true); // Use capture phase because 'play' event does not bubble
});