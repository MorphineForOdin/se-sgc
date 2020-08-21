console.log('JS uploaded...');

const toggleBtn = document.getElementsByClassName('toggle-button')[0];
const navLinks = document.getElementsByClassName('navigation-links')[0];

if (toggleBtn)
    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggleBtn.classList.toggle('active');
    });
