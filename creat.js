function addIngredient() {
    const div = document.createElement('div');
    div.className = 'ingredient';
    div.innerHTML = `
        <input type="text" placeholder="Nom" class="ingredient-name" required>
        <input type="number" placeholder="Quantité" class="ingredient-quantity" required>
        <input type="text" placeholder="Unité (g, ml, etc.)" class="ingredient-unit">
    `;
    document.getElementById('ingredients').appendChild(div);
}

function addStep() {
    const div = document.createElement('div');
    div.className = 'step';
    div.innerHTML = `<textarea placeholder="Description de l'étape"></textarea>`;
    document.getElementById('steps').appendChild(div);
}

document.getElementById('recipeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const recipe = {
        nom: document.getElementById('recipeName').value,
        ingredients: [],
        etapes: []
    };
    
    // Collecter les ingrédients
    document.querySelectorAll('.ingredient').forEach(ingredient => {
        recipe.ingredients.push({
            nom: ingredient.querySelector('.ingredient-name').value,
            quantite: parseFloat(ingredient.querySelector('.ingredient-quantity').value),
            unite: ingredient.querySelector('.ingredient-unit').value
        });
    });
    
    // Collecter les étapes
    document.querySelectorAll('.step textarea').forEach(step => {
        recipe.etapes.push(step.value);
    });
    
    // Télécharger le JSON
    const blob = new Blob([JSON.stringify(recipe)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.nom.replace(/\s+/g, '_')}.json`;
    a.click();
});
