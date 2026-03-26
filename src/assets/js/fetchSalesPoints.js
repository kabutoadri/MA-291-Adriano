// TODO task003: implémenter une fonction similaire à fetchSnacks
// fonction qui fetch le fichier json contenant les points de ventes
export default async function fetchSalesPoints() {

  const response = await fetch('../../data/points-of-sale.json');
  // si on arrive pas a fetch le json
  if (!response.ok) {
    throw new Error(`Unable to load points-of-sale: ${response.status}`);
  }
  // retourne la réponse si c'est ok
  return response.json();
}