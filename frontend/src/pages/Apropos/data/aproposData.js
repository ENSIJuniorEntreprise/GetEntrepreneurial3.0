// --- ÉTAPE 1 : Importer l'image ---
// Le chemin remonte de deux dossiers (depuis 'data' vers 'Apropos', puis vers 'pages')
// pour ensuite descendre dans 'assets/images'.
import speakerImage from '../../../assets/images/speakers.JPG';


export const aproposData = {
  // --- Contenu pour l'onglet "Thème" ---
  grandPublic: {
    title: "Repenser le Développement Économique à l'Ère de l'Innovation",
    problem: {
      title: "Le Contexte Tunisien : Un Potentiel Freiné",
      points: [
        "Les réformes fiscales sont en retard.",
        "L'accès au financement reste limité pour les startups.",
        "La transition vers l’industrie 4.0 est encore balbutiante.",
        "Le marché de l’emploi ne répond pas aux besoins des jeunes diplômés."
      ]
    },
    theme: {
      title: "Notre Vision : Vers une Économie Agile et Inclusive",
      description: "Malgré ces défis, la Tunisie présente des signaux forts de transformation : une jeunesse dynamique et un écosystème startup en pleine croissance. GET 3.0 se positionne comme un tournant stratégique. En mobilisant startups, institutions, investisseurs et talents autour d’un projet ambitieux, nous pouvons réinventer ensemble une économie plus résiliente et construire un avenir durable."
    },
    stats: [
      { value: '55%', label: 'Plus de la moitié des Tunisiens ont moins de 25 ans.' },
      { value: '+20.5%', label: 'Croissance de l’écosystème startup (2021-2023).' },
      { value: '65%', label: 'Les services génèrent les deux tiers du PIB.' }
    ],
    strategicAxes: [
      'La libéralisation de l’<span class="highlight">initiative</span> <span class="highlight">entrepreneuriale</span>.',
      'Le <span class="highlight">capital</span> <span class="highlight">humain</span>: un atout économique stratégique.',
      'L’<span class="highlight">innovation</span> comme <span class="highlight">moteur</span> de croissance économique.',
      'L’amélioration de la <span class="highlight">compétitivité</span>.'
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