// Importez vos images ici. Assurez-vous que les chemins sont corrects.
// Exemple : import hamdiBaraki from '../../../assets/images/speakers/hamdi-baraki.jpg';
// Pour l'instant, nous utiliserons des chaînes de caractères comme placeholders.

export const aproposData = {
  grandPublic: {
    title: 'Façonner l’avenir en élargissant les horizons des startups grâce à la vision des jeunes',
    description: 'Plongeons dans un espace où l’innovation et la créativité des nouvelles générations rencontrent les solutions de demain. Ensemble, transformons les défis en opportunités et dessinons un futur ambitieux et durable.',
    panels: [
      {
        id: 1,
        title: 'Panel 1 : Valoriser le Capital Humain : Bâtir les Compétences de Demain pour une Tunisie Inclusive',
        description: 'Ce panel a mis en avant l’importance du développement des compétences pour préparer la Tunisie à l’économie de demain.',
        speakers: [
          { name: 'Hamdi Baraki', image: '/speakers/hamdi-baraki.png' },
          { name: 'Ghizlen El Abdi', image: '/speakers/ghizlen-el-abdi.png' },
          { name: 'Tarek Ben Jazia', image: '/speakers/tarek-ben-jazia.png' },
          { name: 'Faten Ben Aissa', image: '/speakers/faten-ben-aissa.png' },
          { name: 'Amine Msolgha', image: '/speakers/amine-msolgha.png' },
        ]
      },
      {
        id: 2,
        title: 'Panel 2 : Libérer le Génie Entrepreneuriale : Booster l’Innovation et les Startups Tunisiennes',
        description: 'Ce panel explore les opportunités et défis de l’entrepreneuriat en Tunisie afin d’identifier les soutiens nécessaires et les actions concrètes pour libérer son potentiel.',
        speakers: [
          { name: 'Sawssen Bejaoui Aouej', image: '/speakers/sawssen-bejaoui.png' },
          { name: 'Rolf Milla', image: '/speakers/rolf-milla.png' },
          { name: 'Karim Mejbari', image: '/speakers/karim-mejbari.png' },
          { name: 'Doria Bengaelle', image: '/speakers/doria-bengaelle.png' },
        ]
      },
      {
        id: 3,
        title: 'Panel 3 : La Tunisie à la Conquête de Nouveaux Horizons Économiques',
        description: 'Ce panel examine des stratégies essentielles pour renforcer la compétitivité économique de la Tunisie, allant de l’amélioration du climat des affaires à la diversification des marchés internationaux.',
        speakers: [
          { name: 'Sawssen Bejaoui Aouej', image: '/speakers/sawssen-bejaoui.png' },
          { name: 'Ridha Guesmi', image: '/speakers/ridha-guesmi.png' },
          { name: 'Walid Bel Hadj Amor', image: '/speakers/walid-bel-hadj.png' },
          { name: 'Taoufik Rajhi', image: '/speakers/taoufik-rajhi.png' },
        ]
      }
    ],
    webinaire: {
        title: 'WEBINAIRE (pré-Évent)',
        description: 'Accélérer l’impact des SSO : professionnaliser l’accompagnement, structurer les réseaux, démultiplier les résultats'
    }
  },
  b2bDealDay: {
    title: 'Repenser le Développement Économique à l’Ère de l’Innovation',
    description: 'Depuis plus d’une décennie, les diagnostics et les solutions proposées pour revoir le modèle de développement en Tunisie ont abondé à tire-larigot. Économistes tunisiens et internationaux se sont accordés à dire que l’ancien modèle économique a atteint ses limites.',
    stats: [
        { value: '-1572,8 MD', label: 'BALANCE COMMERCIALE' },
        { value: '1%', label: 'CROISSANCE' }
    ],
    projectInfo: 'Un projet qui doit assurer la transformation structurelle de l’économie en une économie productive, créatrice de richesse et d’emplois de qualité. Ce processus de transformation implique :',
    keyPoints: [
        'La libéralisation de l’initiative entrepreneuriale',
        'L’innovation comme moteur de croissance économique',
        'Le capital humain : un atout économique stratégique',
        'L’amélioration de la compétitivité'
    ],
    conclusion: 'Sa réalisation requiert, ainsi, la mobilisation de l’ensemble des acteurs nationaux autour d’un projet rénové et participatif de construction du pays.'
  },
  greenTechDay: {
      workshops: [
          {
              id: 1,
              title: 'Workshop 1',
              subtitle: 'Profiling des entrepreneurs',
              speaker: {
                  name: 'Hella BEN ABDALLAH',
                  role: 'Directrice Exécutive de la fondation BIAT',
                  image: '/speakers/hella-ben-abdallah.png'
              }
          },
          {
              id: 2,
              title: 'Workshop 2',
              subtitle: 'From Idea to Impact : Designing a Sustainable Startup',
              speaker: {
                  name: 'Nour BEN LAZRAK',
                  role: 'CEO & Founder Digibaytoh & Chrysoprase',
                  image: '/speakers/nour-ben-lazrak.png'
              }
          },
          {
              id: 3,
              title: 'Workshop 3',
              subtitle: 'Introduction to Hedera',
              speaker: {
                  name: 'Talel BEN GHORBEL',
                  role: 'Ecosystem Lead at the HBAR foundation',
                  image: '/speakers/talel-ben-ghorbel.png'
              }
          },
          {
              id: 4,
              title: 'Workshop 4',
              subtitle: 'La Transformation SI à l’Ère du Digital',
              speaker: {
                  name: 'Mouna DAMMAK',
                  role: 'Consultante SI chez Talan Consulting',
                  image: '/speakers/mouna-dammak.png'
              }
          }
      ]
  }
};