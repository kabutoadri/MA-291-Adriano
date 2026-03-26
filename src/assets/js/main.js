import fetchSnacks from './fetchSnacks.js';
import fetchSalesPoints from './fetchSalesPoints.js';

const loadSnacksBtn = document.querySelector('#load-snacks-btn');
const snacksContainer = document.querySelector('#snacks-container');
const feedback = document.querySelector('#feedback');
const salesContainer = document.querySelector('#sales-points-container');

// TODO task004: ajouter les références DOM nécessaires pour les points de vente
const loadSalesPointsBtn = document.querySelector('#load-sales-btn');
// TODO task004: prévoir une variable d'état pour éviter de recharger inutilement les données
let statesSalesPoint = false
let visibleSalesPoint = false

loadSnacksBtn.addEventListener('click', loadSnacks);
// TODO task004: brancher ici l'événement du bouton des points de vente
loadSalesPointsBtn.addEventListener('click', hiddenSalesPoints);

// Fonction qui affiche ou masque les points de vente sans recharger la page à chaque fois
function hiddenSalesPoints() {
  if (!statesSalesPoint) {
    loadSalesPoints();
    statesSalesPoint = true;
  }
  else if (!visibleSalesPoint) {
    salesContainer.style.visibility = 'hidden';
    visibleSalesPoint = true;
  }
  else{
    salesContainer.style.visibility = 'visible';
    visibleSalesPoint = false;
  }

  loadSalesPointsBtn.textContent = visibleSalesPoint
      ? 'Afficher les points de vente'
      : 'Masquer les points de vente';
}

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
// Fonction qui affiche les snacks en construisant les balises HTML
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
  feedback.textContent = '';  // prépare le feed back sur le chargement du json
  // essaye de charger le json
  try {
    const SalesPoints = await fetchSalesPoints();
    displaySalesPoints(SalesPoints);
  }
  // attrape une erreur
  catch (error) {
    console.error(error); // affiche l'erreur dans la console
    feedback.textContent = 'Impossible de charger les points de vente.';  // message d'erreur dans le feedback
  }
}
// TODO task003: créer une fonction displaySalesPoints
// Fonction qui affiche les points de vente en construisant les balises HTML
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
// TODO task005: afficher un message lisible si le chargement échoue
