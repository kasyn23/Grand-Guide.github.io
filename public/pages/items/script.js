const itemsPerPage = 12;
let currentPage = 1;
let items = [];

// Função para carregar itens do arquivo JSON
async function loadItems(category) {
    const fileName = category ? `${category}.json` : 'items.json'; // Define o nome do arquivo
    try {
        const response = await fetch(fileName);
        items = await response.json();
        displayItems();
        setupPagination();
    } catch (error) {
        console.error('Erro ao carregar os itens:', error);
    }
}

// Função para exibir os itens na página
function displayItems() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, items.length);

    for (let i = start; i < end; i++) {
        const item = items[i];
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <img src="${item.cover}" alt="${item.name}">
            <span>${item.description}</span>
            <span>${item.price} G</span>
        `;
        itemList.appendChild(itemElement);
    }
}

// Adiciona eventos de clique para cada categoria na barra lateral
document.querySelectorAll('.sidebar li').forEach(categoryElement => {
    categoryElement.addEventListener('click', () => {
        const category = categoryElement.getAttribute('data-category');
        currentPage = 1; // Reseta para a primeira página
        loadItems(category); // Carrega os itens da categoria selecionada
    });
});

// Função para obter o ícone de status
function getStatusIcon(status) {
    return status === 'verificado' ? 'fa-check-circle' : 'fa-exclamation-triangle';
}

// Carrega os itens iniciais ao carregar a página
loadItems();
