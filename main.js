// Main JavaScript for Vaasudev Cooperative Society Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && closeMenu && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.add('active');
        });
        
        closeMenu.addEventListener('click', function() {
            mainNav.classList.remove('active');
        });
    }
    
    // Sticky Header
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('sticky');
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate the corresponding dot
        slides[n].classList.add('active');
        dots[n].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Initialize slider
    if (slides.length > 0 && dots.length > 0) {
        showSlide(0);
        
        // Auto slide
        setInterval(nextSlide, 5000);
        
        // Click on dots to navigate
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.innerText.replace(/,/g, ''));
            const count = 0;
            const increment = target / 50; // Adjust speed here
            
            function updateCount() {
                const currentCount = Math.ceil(count);
                if (currentCount < target) {
                    counter.innerText = currentCount + Math.ceil(increment);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            }
            
            updateCount();
        });
    }
    
    // Intersection Observer for counters
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('numbers-container')) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);
    
    const numbersContainer = document.querySelector('.numbers-container');
    if (numbersContainer) {
        observer.observe(numbersContainer);
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // EMI Calculator Button
    const calculatorBtn = document.querySelector('.calculator-btn');
    
    if (calculatorBtn) {
        calculatorBtn.addEventListener('click', function() {
            event.preventDefault(); // Prevent default anchor behavior
            // Create calculator modal
            const modal = document.createElement('div');
            modal.className = 'calculator-modal';
            
            modal.innerHTML = `
                <div class="calculator-modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>EMI Calculator</h2>
                    <div class="calculator-form">
                        <div class="form-group">
                            <label for="modal-loan-amount">Loan Amount (₹)</label>
                            <input type="number" id="modal-loan-amount" class="form-control" value="100000" min="1000" max="10000000">
                        </div>
                        <div class="form-group">
                            <label for="modal-interest-rate">Interest Rate (% p.a.)</label>
                            <input type="number" id="modal-interest-rate" class="form-control" value="12" min="1" max="30" step="0.1">
                        </div>
                        <div class="form-group">
                            <label for="modal-loan-tenure">Loan Tenure (Years)</label>
                            <input type="number" id="modal-loan-tenure" class="form-control" value="3" min="1" max="30">
                        </div>
                        <div class="form-group">
                            <button id="modal-calculate-btn" class="submit-btn">Calculate EMI</button>
                        </div>
                    </div>
                    <div class="calculator-result">
                        <h4>Monthly EMI</h4>
                        <p id="modal-emi-result">₹3,321</p>
                        
                        <div class="emi-details">
                            <div class="emi-detail-item">
                                <h5>Principal Amount</h5>
                                <p id="modal-principal-amount">₹1,00,000</p>
                            </div>
                            <div class="emi-detail-item">
                                <h5>Total Interest</h5>
                                <p id="modal-total-interest">₹19,556</p>
                            </div>
                            <div class="emi-detail-item">
                                <h5>Total Amount</h5>
                                <p id="modal-total-amount">₹1,19,556</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal
            const closeModal = modal.querySelector('.close-modal');
            closeModal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    document.body.removeChild(modal);
                }
            });
            
            // Calculate EMI
            const modalCalculateBtn = document.getElementById('modal-calculate-btn');
            const modalLoanAmountInput = document.getElementById('modal-loan-amount');
            const modalInterestRateInput = document.getElementById('modal-interest-rate');
            const modalLoanTenureInput = document.getElementById('modal-loan-tenure');
            const modalEmiResult = document.getElementById('modal-emi-result');
            const modalPrincipalAmount = document.getElementById('modal-principal-amount');
            const modalTotalInterest = document.getElementById('modal-total-interest');
            const modalTotalAmount = document.getElementById('modal-total-amount');
            
            modalCalculateBtn.addEventListener('click', function() {
                const principal = parseFloat(modalLoanAmountInput.value);
                const rate = parseFloat(modalInterestRateInput.value) / 100 / 12; // Monthly interest rate
                const time = parseFloat(modalLoanTenureInput.value) * 12; // Total months
                
                // EMI calculation formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
                const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
                const totalAmt = emi * time;
                const interestAmt = totalAmt - principal;
                
                // Format currency
                const formatter = new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });
                
                modalEmiResult.textContent = formatter.format(emi);
                modalPrincipalAmount.textContent = formatter.format(principal);
                modalTotalInterest.textContent = formatter.format(interestAmt);
                modalTotalAmount.textContent = formatter.format(totalAmt);
            });
        });
    }
    
    // Add CSS for calculator modal
    const style = document.createElement('style');
    style.textContent = `
        .calculator-modal {
            display: block;
            position: fixed;
            z-index: 1001;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.5);
        }
        
        .calculator-modal-content {
            background-color: #fff;
            margin: 10% auto;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            width: 80%;
            max-width: 600px;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 28px;
            font-weight: bold;
            color: #0d47a1;
            cursor: pointer;
        }
        
        .close-modal:hover {
            color: #1976d2;
        }
    `;
    document.head.appendChild(style);
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const icon = this.querySelector('i');
                
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                    icon.className = 'fas fa-plus';
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.className = 'fas fa-minus';
                }
            });
        });
    }
    
    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Form Validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const messageInput = document.getElementById('message');
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.remove();
            });
            
            // Validate name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Valid email is required');
                isValid = false;
            }
            
            // Validate phone
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.trim())) {
                showError(phoneInput, 'Valid 10-digit phone number is required');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Your message has been sent successfully! We will contact you soon.';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
        
        function showError(input, message) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            errorMessage.style.color = '#f44336';
            errorMessage.style.fontSize = '12px';
            errorMessage.style.marginTop = '5px';
            
            input.parentNode.appendChild(errorMessage);
            input.style.borderColor = '#f44336';
            
            input.addEventListener('input', function() {
                errorMessage.remove();
                input.style.borderColor = '';
            });
        }
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(n) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        testimonials[n].style.display = 'block';
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    if (testimonials.length > 1) {
        // Initialize testimonial slider
        showTestimonial(0);
        
        // Auto slide testimonials
        setInterval(nextTestimonial, 8000);
    }
    
    // Add animation to elements when they come into view
    const animatedElements = document.querySelectorAll('.service-box, .scheme-card, .testimonial, .feature-box, .team-member, .vm-box');
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Add animation CSS
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .service-box, .scheme-card, .testimonial, .feature-box, .team-member, .vm-box {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .service-box.animate, .scheme-card.animate, .testimonial.animate, .feature-box.animate, .team-member.animate, .vm-box.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-box:nth-child(2), .scheme-card:nth-child(2), .testimonial:nth-child(2), .feature-box:nth-child(2), .team-member:nth-child(2), .vm-box:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .service-box:nth-child(3), .scheme-card:nth-child(3), .testimonial:nth-child(3), .feature-box:nth-child(3), .team-member:nth-child(3), .vm-box:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .service-box:nth-child(4), .scheme-card:nth-child(4), .testimonial:nth-child(4), .feature-box:nth-child(4), .team-member:nth-child(4), .vm-box:nth-child(4) {
            transition-delay: 0.6s;
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="spinner"></div>
    `;
    document.body.appendChild(preloader);
    
    // Add preloader CSS
    const preloaderStyle = document.createElement('style');
    preloaderStyle.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #0d47a1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(preloaderStyle);
    
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        setTimeout(() => {
            document.body.removeChild(preloader);
        }, 500);
    });
});
