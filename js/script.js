// PowerLine - Script Principal
document.addEventListener('DOMContentLoaded', function() {
    
    // Menu Mobile Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Highlight da navegação baseado na seção ativa
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Formulário de Contato
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(this);
            const data = {
                nome: formData.get('nome'),
                empresa: formData.get('empresa'),
                email: formData.get('email'),
                telefone: formData.get('telefone'),
                servico: formData.get('servico'),
                mensagem: formData.get('mensagem')
            };
            
            // Validação básica
            if (!data.nome || !data.email || !data.telefone) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Integração real com backend PHP
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Enviar dados para o backend
            fetch('contact.php', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                if (result.success) {
                    // Sucesso
                    alert('✅ ' + result.message);
                    this.reset();
                    
                    // Google Analytics Event (se configurado)
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_submit', {
                            event_category: 'Contact',
                            event_label: 'Contact Form',
                            value: 1
                        });
                    }
                } else {
                    // Erro do servidor
                    alert('❌ ' + result.message);
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('❌ Erro ao enviar solicitação. Tente novamente ou entre em contato pelo WhatsApp.');
            })
            .finally(() => {
                // Restaurar botão
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }
    
    // Animação de entrada dos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.service-card, .stat, .about-text, .contact-info, .contact-form');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Contador animado para estatísticas
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (target >= 100 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (target >= 100 ? '+' : '');
            }
        }
        
        updateCounter();
    }
    
    // Aplicar animação aos contadores quando visíveis (nova versão)
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (number) {
                    animateCounter(entry.target, number);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Carrossel de Projetos
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.dot');
    
    window.moveSlide = function(direction) {
        currentSlideIndex += direction;
        
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        } else if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;
        }
        
        showSlide(currentSlideIndex);
    };
    
    window.currentSlide = function(index) {
        currentSlideIndex = index - 1;
        showSlide(currentSlideIndex);
    };
    
    function showSlide(index) {
        // Ocultar todos os slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remover active de todos os dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar slide atual
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        
        // Ativar dot correspondente
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
    
    // Auto-play do carrossel (opcional)
    setInterval(() => {
        if (slides.length > 1) {
            moveSlide(1);
        }
    }, 5000); // Troca a cada 5 segundos
    
    // Header que some no scroll
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    function updateHeaderOnScroll() {
        const currentScrollY = window.scrollY;
        
        // Header transparente/sólido baseado no scroll
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Header que some/aparece baseado na direção do scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - hide header
            header.classList.add('hidden');
        } else {
            // Scrolling up - show header
            header.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    
    // Fechar menu mobile ao clicar fora
    document.addEventListener('click', function(e) {
        if (nav && nav.classList.contains('active')) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
    
    // Prevenir scroll horizontal
    function preventHorizontalScroll() {
        const body = document.body;
        const scrollWidth = body.scrollWidth;
        const clientWidth = body.clientWidth;
        
        if (scrollWidth > clientWidth) {
            body.style.overflowX = 'hidden';
        }
    }
    
    preventHorizontalScroll();
    window.addEventListener('resize', preventHorizontalScroll);
    
    console.log('PowerLine - Site carregado com sucesso! ⚡');
});

// Carrossel de Depoimentos
let currentTestimonialIndex = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const indicators = document.querySelectorAll('.indicator');

function showTestimonial(index) {
    // Ocultar todos os slides
    testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remover active de todos os indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Mostrar slide atual
    if (testimonialSlides[index]) {
        testimonialSlides[index].classList.add('active');
    }
    
    // Ativar indicator correspondente
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
}

function nextTestimonial() {
    currentTestimonialIndex++;
    if (currentTestimonialIndex >= testimonialSlides.length) {
        currentTestimonialIndex = 0;
    }
    showTestimonial(currentTestimonialIndex);
}

function prevTestimonial() {
    currentTestimonialIndex--;
    if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = testimonialSlides.length - 1;
    }
    showTestimonial(currentTestimonialIndex);
}

function currentTestimonial(index) {
    currentTestimonialIndex = index - 1;
    showTestimonial(currentTestimonialIndex);
}

// Auto-play do carrossel de depoimentos
setInterval(() => {
    if (testimonialSlides.length > 1) {
        nextTestimonial();
    }
}, 6000); // Troca a cada 6 segundos

// Expor funções globalmente para os botões HTML
window.nextTestimonial = nextTestimonial;
window.prevTestimonial = prevTestimonial;
window.currentTestimonial = currentTestimonial;
