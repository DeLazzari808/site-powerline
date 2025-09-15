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
            
            // Simular envio (aqui você integraria com um backend real)
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Simular delay de envio
            setTimeout(() => {
                alert('Obrigado! Sua solicitação foi enviada com sucesso. Entraremos em contato em breve.');
                this.reset();
                
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
            
            // Em um ambiente real, você faria algo como:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // }).then(response => response.json())
            //   .then(result => {
            //       alert('Mensagem enviada com sucesso!');
            //       this.reset();
            //   })
            //   .catch(error => {
            //       alert('Erro ao enviar mensagem. Tente novamente.');
            //   });
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
    
    // Aplicar animação aos contadores quando visíveis
    const statNumbers = document.querySelectorAll('.stat .number');
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
    
    // Header transparente/sólido baseado no scroll
    const header = document.querySelector('.header');
    
    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
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
