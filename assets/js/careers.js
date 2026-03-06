const toggles = document.querySelectorAll('.career-faq-toggle');
const watermark = document.querySelector('.watermark');
const careerFaqs = document.querySelectorAll('.career-faq');

toggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.stopPropagation(); 
        const careerFaq = toggle.parentElement;
        careerFaq.classList.toggle('active');
    });
});

careerFaqs.forEach(careerFaq => {
    careerFaq.addEventListener('click', (e) => {
        if (!e.target.classList.contains('career-faq-toggle') && 
            !e.target.closest('.career-faq-toggle')) {
            
            const toggle = careerFaq.querySelector('.career-faq-toggle');
            if (toggle) {
                toggle.click();
            }
        }
    });
});

careerFaqs.forEach(careerFaq => {
    careerFaq.addEventListener('click', saveFAQState);
});

window.addEventListener('load', loadFAQState);