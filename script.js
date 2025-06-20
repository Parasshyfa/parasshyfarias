document.addEventListener('DOMContentLoaded', function() {
  // --- Mobile Menu Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
  
  // --- Dark Mode Toggle - Fixed ---
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  
  // Check for saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    // No need to update innerHTML as the toggle uses CSS transitions now
  }
  
  themeToggle.addEventListener('click', () => {
    // Toggle dark mode class
    body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
  
  // --- Header Scroll Effect ---
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.style.padding = '10px 0';
    } else {
      header.style.padding = '15px 0';
    }
  });
  
  // --- Active Navigation Link ---
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
  
  // --- Gallery Slideshows ---
  function setupSlideshow(id) {
    const slideshow = document.getElementById(id);
    if (!slideshow) return; // Skip if slideshow doesn't exist
    
    const slides = slideshow.querySelector('.slides');
    const slideItems = slideshow.querySelectorAll('.slide');
    const prevBtn = slideshow.querySelector('.prev-btn');
    const nextBtn = slideshow.querySelector('.next-btn');
    const dotsContainer = slideshow.querySelector('.dots-container');
    
    let currentSlide = 0;
    const slideCount = slideItems.length;
    
    // Create dots
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
    
    // Update dots
    function updateDots() {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
    
    // Go to slide
    function goToSlide(n) {
      currentSlide = (n + slideCount) % slideCount;
      slides.style.transform = `translateX(-${currentSlide * 100}%)`;
      updateDots();
    }
    
    // Next slide
    function nextSlide() {
      goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
      goToSlide(currentSlide - 1);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto slide - uncomment if you want automatic slideshow
    /*
    setInterval(() => {
      nextSlide();
    }, 5000);
    */
  }
  
  // Set up all slideshows
  setupSlideshow('modern-hijab-slideshow');
  setupSlideshow('solo-putri-hijab-slideshow');
  setupSlideshow('bali-bride-slideshow');
  setupSlideshow('banjar-bride-slideshow');
  setupSlideshow('paes-ageng-pembayun-slideshow');
  setupSlideshow('minang-bride-slideshow');
  setupSlideshow('jogja-putri-slideshow');
  setupSlideshow('paes-ageng-jangan-menir-slideshow');
  setupSlideshow('solo-putri-slideshow');
  setupSlideshow('modern-slideshow');
  setupSlideshow('sunda-siger-slideshow');
  
  // --- Gallery Tabs ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const slideshows = document.querySelectorAll('.slideshow-container');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate all tabs
      tabBtns.forEach(tab => tab.classList.remove('active'));
      // Hide all slideshows
      slideshows.forEach(show => show.classList.remove('active'));
      
      // Activate current tab and slideshow
      btn.classList.add('active');
      const category = btn.dataset.category;
      document.getElementById(`${category}-slideshow`).classList.add('active');
    });
  });
  
  // --- Form Validation ---
  const bookingForm = document.getElementById('booking-form');
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const date = document.getElementById('date').value;
      const service = document.getElementById('service').value;
      
      if (!name || !email || !phone || !date || !service) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // For demo purposes - show success message
      alert('Thank you for your booking request! We will contact you shortly.');
      bookingForm.reset();
    });
  }
  
  // --- Animations on Scroll ---
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.package-card, .about-img, .about-text, .contact-form, .contact-info');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Initialize elements as invisible
  document.querySelectorAll('.package-card, .about-img, .about-text, .contact-form, .contact-info').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });
  
  // Run on page load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});


  function sendWhatsAppMessage(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const dateRaw = document.getElementById("date").value;
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    // Ubah format tanggal dari yyyy-mm-dd menjadi dd-mm-yyyy
    let formattedDate = "";
    if (dateRaw) {
      const [year, month, day] = dateRaw.split("-");
      formattedDate = `${day}-${month}-${year}`;
    }

    const fullMessage = `Halo, saya ingin booking jasa:\n\n` +
      `*Nama:* ${name}\n` +
      `*Tanggal Pernikahan:* ${formattedDate}\n` +
      `*Paket Layanan:* ${service}\n` +
      `*Pesan Tambahan:* ${message}`;

    const whatsappNumber = "6287772234446";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

    window.open(whatsappURL, "_blank");
  }

