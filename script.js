document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Turn hamburger to X visually
            const bars = document.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close mobile nav when clicking a link
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                const bars = document.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // Fetch and render projects
    fetchProjects();

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                contactForm.reset();
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                formStatus.style.color = '#10b981'; // Success green
                
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 4000);
            }, 1500);
        });
    }

    // Scroll Animation Observer for fading in elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .section-title, .about-content, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});

async function fetchProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    try {
        const response = await fetch('./projects/project-data.json');
        
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const projects = await response.json();
        
        if (projects.length === 0) {
            projectsContainer.innerHTML = '<p>No projects found.</p>';
            return;
        }

        let html = '';
        projects.forEach(project => {
            const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            
            // Create fallback SVG path so no external assets are required
            const fallbackImg = `data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22200%22%20viewBox%3D%220%200%20100%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23e2e8f0%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%2394a3b8%22%20font-size%3D%2216%22%20font-family%3D%22sans-serif%22%3E${encodeURIComponent(project.title)}%3C%2Ftext%3E%3C%2Fsvg%3E`;

            html += `
                <div class="project-card" style="opacity: 0; transform: translateY(30px);">
                    <img src="${project.image}" alt="${project.title}" class="project-img" onerror="this.src='${fallbackImg}'">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tags">
                            ${tagsHtml}
                        </div>
                        <a href="${project.link}" target="_blank" class="btn btn-secondary">View Project</a>
                    </div>
                </div>
            `;
        });
        
        projectsContainer.innerHTML = html;

        // Apply scroll animation to inserted project cards
        const projectCards = document.querySelectorAll('.project-card');
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-up');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        projectCards.forEach(card => observer.observe(card));

    } catch (error) {
        console.error('Error fetching projects:', error);
        projectsContainer.innerHTML = `
            <div class="project-card" style="border-left: 4px solid #ef4444;">
                <div class="project-info">
                    <h3>Notice: Data Fetching Issue</h3>
                    <p style="color: #64748b;">Could not load dynamic project data via fetch.</p>
                    <p style="font-size: 0.9rem; color: #ef4444; margin-top: 0.5rem;">
                        <strong>Note on CORS:</strong> If you are opening this file using the <code>file://</code> protocol, modern browsers block fetching local JSON files. Please open this directory using a local web server (like VS Code's Live Server) to see projects dynamically loaded.
                    </p>
                </div>
            </div>
        `;
    }
}
