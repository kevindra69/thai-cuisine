// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${entry.target.dataset.delay || '0s'}`;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation delays to elements
document.querySelectorAll('.animate-slide-up').forEach((element, index) => {
    element.dataset.delay = `${index * 0.2}s`;
    observer.observe(element);
});

// Recipe Navigation
document.addEventListener('DOMContentLoaded', () => {
    const recipeSelection = document.querySelector('.recipe-selection');
    const recipeDetails = document.querySelectorAll('.recipe-details');
    const viewRecipeButtons = document.querySelectorAll('.view-recipe-btn');
    const backToRecipesButtons = document.querySelectorAll('.back-to-recipes-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');

    // Function to show recipe details
    function showRecipe(recipeId) {
        // Hide recipe selection
        recipeSelection.style.display = 'none';
        
        // Hide all recipe details
        recipeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        
        // Show the selected recipe
        const selectedRecipe = document.getElementById(`${recipeId}-recipe`);
        if (selectedRecipe) {
            selectedRecipe.classList.add('active');
            // Scroll to top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Function to go back to recipes
    function backToRecipes() {
        // Show recipe selection
        recipeSelection.style.display = 'block';
        
        // Hide all recipe details
        recipeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        
        // Scroll to top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add click event to view recipe buttons
    viewRecipeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent card click event
            const recipeId = button.getAttribute('data-recipe');
            showRecipe(recipeId);
        });
    });

    // Add click event to back to recipes buttons
    backToRecipesButtons.forEach(button => {
        button.addEventListener('click', backToRecipes);
    });

    // Add click event to recipe cards
    recipeCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Only trigger if not clicking on the button
            if (!e.target.classList.contains('view-recipe-btn')) {
                const recipeId = card.id.replace('-card', '');
                showRecipe(recipeId);
            }
        });
    });

    // Enhanced slider effect
    recipeCards.forEach(card => {
        const sliderImages = card.querySelectorAll('.slider-image');
        
        // Add hover effect with sound (optional)
        card.addEventListener('mouseenter', () => {
            // You can add a subtle sound effect here if desired
            // const hoverSound = new Audio('hover-sound.mp3');
            // hoverSound.volume = 0.2;
            // hoverSound.play();
            
            // Add a subtle pulse animation to the card
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add touch support for mobile devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        card.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        card.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (touchEndX < touchStartX) {
                // Swipe left - show next image
                const currentImage = card.querySelector('.slider-image[style*="opacity: 1"]');
                if (currentImage) {
                    const nextImage = currentImage.nextElementSibling || sliderImages[0];
                    currentImage.style.opacity = '0';
                    nextImage.style.opacity = '1';
                }
            } else if (touchEndX > touchStartX) {
                // Swipe right - show previous image
                const currentImage = card.querySelector('.slider-image[style*="opacity: 1"]');
                if (currentImage) {
                    const prevImage = currentImage.previousElementSibling || sliderImages[sliderImages.length - 1];
                    currentImage.style.opacity = '0';
                    prevImage.style.opacity = '1';
                }
            }
        }
    });
});

// Add hover effect to ingredient cards
document.querySelectorAll('.ingredient-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}); 