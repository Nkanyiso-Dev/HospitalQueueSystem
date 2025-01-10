// Smooth scrolling for navigation links with active link highlighting
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault(); // Prevent default link behavior
        const targetId = link.getAttribute('href').substring(1); // Get the target section ID
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50, // Adjust for navbar height
                behavior: 'smooth'
            });
        }

        // Remove 'active' class from all links and add it to the clicked link
        document.querySelectorAll('.nav-links a').forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active link as user scrolls
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section'); // Select all sections
    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 60; // Adjust for navbar height
        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSectionId) {
            link.classList.add('active');
        }
    });
});

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.classList.add('progress-bar');
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = (scrollPosition / scrollHeight) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
});

// Scroll to Top Button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerText = '↑';
scrollToTopButton.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Show button after scrolling 300px
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Sticky Navigation Bar
const navbar = document.querySelector('nav'); // Assuming your navbar is a <nav> element

window.addEventListener('scroll', () => {
    if (window.scrollY > navbar.offsetTop) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});
