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

    // Function to go back to recipe selection
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
            const recipeId = button.getAttribute('data-recipe');
            showRecipe(recipeId);
        });
    });

    // Add click event to back to recipes buttons
    backToRecipesButtons.forEach(button => {
        button.addEventListener('click', backToRecipes);
    });

    // Add click event to recipe cards
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Only trigger if not clicking on the button
            if (!e.target.classList.contains('view-recipe-btn')) {
                const recipeId = card.id.replace('-card', '');
                showRecipe(recipeId);
            }
        });
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