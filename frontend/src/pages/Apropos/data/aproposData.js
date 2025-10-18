// --- ÉTAPE 1 : Importer les images des intervenants ---
// Les chemins et noms de fichiers sont basés sur votre capture d'écran.
import adelChouariImg from '../../../assets/images/Adel Chouari.jpg';
import fatmaTaghoutiImg from '../../../assets/images/Fatma_Taghouti.jpg';
import jiheneElOukadiImg from '../../../assets/images/Jihene El Oukadi.jpg';
import karimAhresImg from '../../../assets/images/Karim Ahres.webp';
import omarBouzouadaImg from '../../../assets/images/Omar_Bouzouada.jpg';
import ridhaDriraImg from '../../../assets/images/Ridha Drira (1).jpg';
import wahbOuertaniImg from '../../../assets/images/Wahb Ouertani.webp';
import sawsenHajAmorImg from '../../../assets/images/sawsen-Haj-Amor.webp';
import raziMilaniImg from '../../../assets/images/Razi Milani.jpg';
import chirazArfaouiImg from '../../../assets/images/chiraz.jpg';
import karimBououniImg from '../../../assets/images/Karim bououni.jpg';
import mehdiFarhatImg from '../../../assets/images/mehdi farhat.png';

// --- Images non trouvées dans la liste, utilisation d'une image générique ---
import walidHadjAmorImg from '../../../assets/images/waalid.jpg'; 
import rymGmatiImg from '../../../assets/images/riim.jpg';
// AJOUTS : Chemins vers des images génériques pour les nouveaux intervenants
import hanaChoyakhImg from '../../../assets/images/hana.jpg'; 
import mohamedLahianiImg from '../../../assets/images/lahy.png';
import oussemaMessaoudImg from '../../../assets/images/oussema.jpg';
import mohamedThamerChagourImg from '../../../assets/images/thaa.png'; // Remplacez par le chemin réel
import wassimZehaniImg from '../../../assets/images/wass.jpg'; 

// Image générique pour les panels non définis
import speakerImage from '../../../assets/images/speakers.JPG';

export const aproposData = {
  // --- Contenu pour l'onglet "Thème" ---
  grandPublic: {
    title: "STARTUP HORIZONS ET SOLUTIONS : VISION DES JEUNES",
    description: "Face au potentiel remarquable de la Tunisie en matière de startups, Get Entrepreneurial 3.0 explore une question essentielle : Comment ne pas rater le virage des opportunités offertes par le startup Act 1.0, et répondre aux nouveaux défis émergents pour toutes les PME  innovants ?",
    axes: {
      title: "LES GRANDES AXES",
      points: [
        'Les <span class="highlight">secteurs</span> dans lesquels la <span class="highlight">Tunisie</span> peut être déterminante.',  
        'Faciliter <span class="highlight">l’accès</span>  <span class="highlight">aux marchés</span> en levant les obstacles à l’internationalisation ',  
        'Renforcer les <span class="highlight">structures</span> <span class="highlight">d’accompagnement</span> (SSO).',  
        'Repenser le <span class="highlight">financement des</span>  <span class="highlight">startups</span> à travers les leviers privés, publics et internationaux.'
      ]
    }
  },
  
  // --- Contenu pour l'onglet "Panels" ---
  b2bDealDay: {
    panels: [
      {
        id: 1,
        title: 'Conférence',
        items: [
          'Rétrospective du Startup Act 1.0',
          'Analyse critique et état des lieux',
          'Proposition de valeur : Vers un Innovation Act'
        ],
        speakers: [
          { name: 'Mohamed Lahiani', role: 'Modérateur', image: mohamedLahianiImg },
          { name: 'Jihene EL Ouakdi', role: 'Conférencière', image: jiheneElOukadiImg },
          { name: 'Chiraz Arfaoui', role: 'Conférencière', image: chirazArfaouiImg },
          // AJOUTS D'APRÈS LA CAPTURE
          
          { name: 'Oussema Messaoud', role: 'Conférencier', image: oussemaMessaoudImg },
        ]
      },
      {
        id: 2,
        title: 'Tunisie 2035 : Où miser pour faire la différence ?',
        items: [
          'Arbitrage stratégique : financer moins mais mieux',
          'Identification des secteurs prioritaires (3 à 5)',
          'Cadre sélectif et comité multi-acteurs'
        ],
        speakers: [
          // MODIFICATION : Style pour la modératrice
          { name: 'Sawsen Haj Amor', role: 'Modératrice', image: sawsenHajAmorImg },
          { name: 'Adel Chouari', role: 'Paneliste', image: adelChouariImg },
          { name: 'Wahb Ouertani', role: 'Paneliste', image: wahbOuertaniImg },
          { name: 'Omar Bouzouada', role: 'Paneliste', image: omarBouzouadaImg }
        ]
      },
      {
        id: 3,
        title: 'Accès aux Marchés Publics & Internationaux',
        items: [
          'État acheteur innovant & achats publics',
          'Sandbox élargi au-delà du financier',
          'Diaspora comme accélérateur global',
          'Programmes soft landing & partenariats internationaux'
        ],
        speakers: [
          // MODIFICATION : Style pour la modératrice
          { name: 'Fatma Taghouti', role: 'Modératrice', image: fatmaTaghoutiImg },
          { name: 'Ridha Drira', role: 'Paneliste', image: ridhaDriraImg },
          { name: 'Razi Milani', role: 'Paneliste', image: raziMilaniImg },
          { name: 'Karim Ahres', role: 'Paneliste', image: karimAhresImg },
          { name: 'Walid Hadj Amor', role: 'Paneliste', image: walidHadjAmorImg }
        ]
      },
      {
        id: 4,
        title: 'Financement et Investissement',
        items: [
          'Gaps structurels (pré-amorçage, scale-up)',
          'Diaspora et levées de fonds cross-border',
          'Introduction des SAFE Notes & assouplissements réglementaires',
          'Bonnes pratiques internationales'
        ],
        // MODIFICATIONS : Liste des intervenants mise à jour d'après la capture
        speakers: [
          { name: 'Hana Choyakh', role: 'Modératrice', image: hanaChoyakhImg },
          { name: 'Karim Bououni', role: 'Paneliste', image: karimBououniImg },
          { name: 'Mehdi Farhat', role: 'Paneliste', image: mehdiFarhatImg },
          { name: 'Rym Gmati', role: 'Paneliste', image: rymGmatiImg }
        ]
      }
    ]
  },
  // --- Contenu pour l'onglet "Workshops" ---
 greenTechDay: {
    workshops: [
      {
        id: 1,
        title: 'Workshop Ooredoo',
        subtitle: 'How to land an internship that opens doors',
        speakers: [
          { name: 'Mohamed Thamer Chagour', role: '', image: mohamedThamerChagourImg },
          { name: 'Mohamed Wassim Zehani', role: '', image: wassimZehaniImg },
        ]
      },
      // Vous pouvez ajouter d'autres workshops ici si nécessaire
    ]
  }
};