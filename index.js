document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    
    async function loadRecipes() {
        const response = await fetch('recettes/');
        const recipes = await response.json();
        
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <h2>${recipe.nom}</h2>
                <a href="recettes.html?recipe=${recipe.nom}">Voir la recette</a>
            `;
            carousel.appendChild(recipeCard);
        });
    }
    
    loadRecipes();
});
