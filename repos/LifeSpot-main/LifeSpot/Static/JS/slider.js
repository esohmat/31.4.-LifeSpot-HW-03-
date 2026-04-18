class ImageSlider {
    constructor() {
        this.currentIndex = 0;
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.autoSlideInterval = null;

        if (this.slides.length === 0) return;
        this.init();
    }

    init() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());

        this.dots.forEach((dot, i) => {
            dot.addEventListener('click', () => this.goToSlide(i));
        });

        this.updateSlider();
        this.startAutoSlide();
    }

    updateSlider() {
        this.slides.forEach((s, i) => s.classList.toggle('active', i === this.currentIndex));
        this.dots.forEach((d, i) => d.classList.toggle('active', i === this.currentIndex));
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlider();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
    }

    goToSlide(i) {
        if (i >= 0 && i < this.slides.length) {
            this.currentIndex = i;
            this.updateSlider();
        }
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider();
});