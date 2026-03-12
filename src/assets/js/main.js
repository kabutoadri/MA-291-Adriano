import fetchSnacks from './fetchSnacks.js';
import fetchSalesPoints from './fetchSalesPoints.js';

const loadSnacksBtn = document.querySelector('#load-snacks-btn');
const snacksContainer = document.querySelector('#snacks-container');
const feedback = document.querySelector('#feedback');
const salesContainer = document.querySelector('#sales-points-container');

// TODO task004: ajouter les références DOM nécessaires pour les points de vente
// TODO task004: prévoir une variable d'état pour éviter de recharger inutilement les données

loadSnacksBtn.addEventListener('click', loadSnacks);
// TODO task004: brancher ici l'événement du bouton des points de vente

async function loadSnacks() {
  feedback.textContent = '';

  try {
    const snacks = await fetchSnacks();
    displaySnacks(snacks);
  } catch (error) {
    console.error(error);
    feedback.textContent = 'Impossible de charger les snacks.';
  }
}

function displaySnacks(snacks) {
  snacksContainer.innerHTML = snacks.map((snack) => `
    <article class="card">
      <img src="${snack.imageUrl}" alt="${snack.alt}">
      <div class="card-content">
        <h3>${snack.name.toUpperCase()}</h3>
        <p>${snack.description}</p>
        <p class="price">CHF ${snack.price.toFixed(2)}</p>
        <span class="fake-action">Commander</span>
      </div>
    </article>
  `).join('');

  // TODO task002: adapter le rendu selon le cahier des charges
}

// TODO task003: créer une fonction loadSalesPoints
async function loadSalesPoints() {
  feedback.textContent = '';

  try {
    const SalesPoints = await fetchSalesPoints();
    displaySalesPoints(SalesPoints);
  } catch (error) {
    console.error(error);
    feedback.textContent = 'Impossible de charger les points de vente.';
  }
}
// TODO task003: créer une fonction displaySalesPoints
function displaySalesPoints(SalesPoints) {
  salesContainer.innerHTML = SalesPoints.map((sale) => `
    <article class="sales-point-card">
        <h3>${sale.building}</h3>
        <p><strong>Salle</strong>${sale.room}</p>
        <p><strong>Horaires :</strong>${sale.openingHours}</p>
        <p><strong>Email :</strong>${sale.email}</p>
    </article>
  `).join('');
}
await loadSalesPoints();
// TODO task005: afficher un message lisible si le chargement échoue
