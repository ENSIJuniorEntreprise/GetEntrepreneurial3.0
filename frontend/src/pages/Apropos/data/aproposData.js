// --- ÉTAPE 1 : Importer l'image ---
// Le chemin remonte de deux dossiers (depuis 'data' vers 'Apropos', puis vers 'pages')
// pour ensuite descendre dans 'assets/images'.
import speakerImage from '../../../assets/images/speakers.JPG';


export const aproposData = {
  // --- Contenu pour l'onglet "Thème" ---
  grandPublic: {
    title: "Repenser l’Avenir des Startups en Tunisie",
    problem: {
      title: "Le Contexte : Opportunités et Défis",
      points: [
        "La Tunisie dispose d’un fort potentiel dans plusieurs secteurs stratégiques.",
        "L’accès aux marchés reste difficile à cause des obstacles à l’internationalisation et à la commande publique.",
        "Les structures d’accompagnement (SSO) manquent encore de moyens pour répondre aux besoins des jeunes entrepreneurs.",
        "Le financement des startups est limité et insuffisamment diversifié entre leviers privés, publics et internationaux."
      ]
    },
    theme: {
      title: "Notre Vision : Vers un Écosystème Startup Dynamique et Inclusif",
      description: "Malgré ces défis, la Tunisie présente des signaux forts de transformation : une jeunesse dynamique et un écosystème startup en pleine croissance. GET 3.0 se positionne comme un tournant stratégique. En mobilisant startups, institutions, investisseurs et talents autour d’un projet ambitieux, nous pouvons réinventer ensemble "
    },
    stats: [
      { value: '55%', label: 'Plus de la moitié des Tunisiens ont moins de 25 ans.' },
      { value: '+20.5%', label: 'Croissance de l’écosystème startup (2021-2023).' },
      { value: '65%', label: 'Les services génèrent les deux tiers du PIB.' }
    ],
    strategicAxes: [
      'Les <span class="highlight">secteurs</span> dans lesquels la <span class="highlight">Tunisie</span> peut être déterminante.',  
'Faciliter l’<span class="highlight">accès</span> aux <span class="highlight">marchés</span> en levant les obstacles à l’internationalisation ',  
'Renforcer les <span class="highlight">structures</span> d’<span class="highlight">accompagnement</span> (SSO).',  
'Repenser le <span class="highlight">financement</span> des <span class="highlight">startups</span> à travers les leviers privés, publics et internationaux.'  

    ]
  },
  
  // --- Contenu pour l'onglet "Panels" ---
  b2bDealDay: {
    panels: [
      {
        id: 1,
        title: 'Conférence Plénière',
        items: [
          'Rétrospective du Startup Act 1.0',
          'Analyse critique du Startup Act 1.0 et état des lieux',
          'Proposition de valeur : Vers un Innovation Act'
        ],
        speakers: [
          // --- ÉTAPE 2 : Utiliser la variable importée ---
          { name: 'Nom Speaker 1', image: speakerImage },
          { name: 'Nom Speaker 2', image: speakerImage },
          { name: 'Nom Speaker 3', image: speakerImage }
        ]
      },
      {
        id: 2,
        title: 'Panel Tunisie 2035 : Où miser pour faire la différence ?',
        items: [
          'Arbitrage stratégique : financer moins mais mieux',
          'Identification des secteurs prioritaires (3 à 5)',
          'Cadre sélectif et comité multi-acteurs'
        ],
        speakers: [
          { name: 'Nom Speaker 4', image: speakerImage },
          { name: 'Nom Speaker 5', image: speakerImage },
          { name: 'Nom Speaker 6', image: speakerImage }
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
          { name: 'Nom Speaker 7', image: speakerImage },
          { name: 'Nom Speaker 8', image: speakerImage },
          { name: 'Nom Speaker 9', image: speakerImage }
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
        speakers: [
          { name: 'Nom Speaker 10', image: speakerImage },
          { name: 'Nom Speaker 11', image: speakerImage },
          { name: 'Nom Speaker 12', image: speakerImage }
        ]
      }
    ]
  },

  // --- Contenu pour l'onglet "Workshops" ---
  greenTechDay: {
    workshops: [
      {
        id: 1,
        title: 'Workshop 1',
        subtitle: 'Build Your Startup from Scratch',
        details: {
          target: 'Étudiants et jeunes entrepreneurs en phase d’idéation.',
          duration: '2h',
          topics: [
            'Validation de l’idée qui répond à un vrai problème',
            'Construction d’un Business Model simple (Canvas)',
            'Création d’un prototype rapide et test d’hypothèses'
          ]
        }
      },
      {
        id: 2,
        title: 'Workshop 2',
        subtitle: 'Étudiant et Startups – Développez les compétences pour réussir demain',
        details: {
          target: 'Étudiants ingénieurs et futurs professionnels de l’écosystème.',
          duration: '2h',
          topics: [
            'Compétences techniques clés (IA, Data, Cybersécurité)',
            'Maîtrise des Soft Skills stratégiques (Pensée systémique, agilité)',
            'Ateliers pratiques et simulations de pitch'
          ]
        }
      },
      {
        id: 3,
        title: 'Workshop 3',
        subtitle: 'AI ERA : Nouvelle Cartographie des Métiers',
        details: {
          target: 'Étudiants en fin de cycle et jeunes diplômés.',
          duration: '2h',
          topics: [
            'Comprendre l’impact de l’IA sur les métiers actuels et futurs',
            'Découvrir les métiers émergents liés à l’IA',
            'Identifier les compétences clés à développer pour l’avenir'
          ]
        }
      },
      {
        id: 4,
        title: 'Workshop 4',
        subtitle: 'Freelance et Opportunités : Trouvez vos premiers clients',
        details: {
          target: 'Étudiants et jeunes diplômés visant le freelance.',
          duration: '2h',
          topics: [
            'Définir son positionnement et construire une offre claire',
            'Cibler les startups et comprendre leurs attentes',
            'Maîtriser les techniques d’approche commerciale et de networking'
          ]
        }
      }
    ]
  }
};