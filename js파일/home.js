document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  const sliderTrack = document.querySelector(".split-slider-track");
  const sliderViewport = document.querySelector(".split-slider-viewport");
  const prevBtn = document.querySelector(".split-slider-btn.prev");
  const nextBtn = document.querySelector(".split-slider-btn.next");

  if (sliderTrack && sliderViewport && prevBtn && nextBtn) {
    const originalSlides = Array.from(sliderTrack.querySelectorAll("img"));
    if (originalSlides.length > 1) {
      const firstClone = originalSlides[0].cloneNode(true);
      const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

      sliderTrack.insertBefore(lastClone, originalSlides[0]);
      sliderTrack.appendChild(firstClone);

      const slides = Array.from(sliderTrack.querySelectorAll("img"));
      let currentIndex = 1;
      let isAnimating = false;
      let autoSlide = null;

      const getSlideWidth = () => sliderViewport.clientWidth;

      const moveTo = (index, withTransition = true) => {
        if (withTransition) {
          sliderTrack.classList.remove("no-transition");
        } else {
          sliderTrack.classList.add("no-transition");
        }

        sliderTrack.style.transform = `translateX(-${getSlideWidth() * index}px)`;
      };

      const startAutoSlide = () => {
        stopAutoSlide();
        autoSlide = setInterval(() => {
          goToNext();
        }, 4000);
      };

      const stopAutoSlide = () => {
        if (autoSlide) {
          clearInterval(autoSlide);
          autoSlide = null;
        }
      };

      const goToNext = () => {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex += 1;
        moveTo(currentIndex, true);
      };

      const goToPrev = () => {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex -= 1;
        moveTo(currentIndex, true);
      };

      moveTo(currentIndex, false);

      nextBtn.addEventListener("click", () => {
        goToNext();
        startAutoSlide();
      });

      prevBtn.addEventListener("click", () => {
        goToPrev();
        startAutoSlide();
      });

      sliderTrack.addEventListener("transitionend", () => {
        const totalSlides = slides.length;

        if (currentIndex === totalSlides - 1) {
          currentIndex = 1;
          moveTo(currentIndex, false);
        }

        if (currentIndex === 0) {
          currentIndex = totalSlides - 2;
          moveTo(currentIndex, false);
        }

        requestAnimationFrame(() => {
          isAnimating = false;
        });
      });

      window.addEventListener("resize", () => {
        moveTo(currentIndex, false);
      });

      sliderViewport.addEventListener("mouseenter", stopAutoSlide);
      sliderViewport.addEventListener("mouseleave", startAutoSlide);
      prevBtn.addEventListener("mouseenter", stopAutoSlide);
      nextBtn.addEventListener("mouseenter", stopAutoSlide);
      prevBtn.addEventListener("mouseleave", startAutoSlide);
      nextBtn.addEventListener("mouseleave", startAutoSlide);

      startAutoSlide();
    }
  }
});