// Cache mémoire très simple pour le contenu public du CMS.
//
// Chaque endpoint /api/content/* n'est interrogé qu'une seule fois par
// session de navigation : les pages publiques qui utilisent la même donnée
// (Footer, Navbar, etc., remontés à chaque changement de page) la lisent
// directement du cache au lieu de refaire l'appel et de re-afficher un
// état de chargement.
//
// Seules les pages PUBLIQUES lisent ce cache. Les écrans admin du
// dashboard font toujours des appels directs (jamais de cache, pour voir
// leurs propres modifications immédiatement) et appellent clearCached(...)
// après un enregistrement réussi, pour que la prochaine visite d'une page
// publique dans le même onglet reflète le changement au lieu de données
// périmées.

const cache = new Map();

export const getCached = (key) => (cache.has(key) ? cache.get(key) : undefined);

export const setCached = (key, value) => {
  cache.set(key, value);
  return value;
};

export const clearCached = (key) => {
  cache.delete(key);
};

export const clearCachedPrefix = (prefix) => {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) cache.delete(key);
  }
};
