document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const recipeName = params.get('recipe');
    
    const response = await fetch(`recettes/${recipeName}`);
    const recipe = await response.json();
    
    // Afficher les informations
    document.getElementById('recipeTitle').textContent = recipe.nom;
    
    // Gestionnaire multiplicateur
    const multiplier = document.getElementById('multiplier');
    
    function updateQuantities() {
        const factor = parseInt(multiplier.value);
        const ingredientsList = document.getElementById('ingredientsList');
        ingredientsList.innerHTML = '';
        
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${ingredient.nom}</strong> : 
                ${ingredient.quantite * factor} ${ingredient.unite || ''}
            `;
            ingredientsList.appendChild(li);
        });
    }
    
    // Afficher les étapes
    const stepsList = document.getElementById('stepsList');
    recipe.etapes.forEach(etape => {
        const li = document.createElement('li');
        li.textContent = etape;
        stepsList.appendChild(li);
    });
    
    multiplier.addEventListener('change', updateQuantities);
    updateQuantities(); // Initialisation
});
