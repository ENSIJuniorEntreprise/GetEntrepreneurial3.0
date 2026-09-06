// backend/seed/seedSiteContent.js
//
// Insère dans la base de données le contenu qui est déjà en dur sur le site
// aujourd'hui (Home, Apropos, Contact, Collaboration, Inscription, Footer,
// formulaires) — pour qu'au moment où le dashboard admin passe en production,
// le site public affiche exactement la même chose qu'avant (rien ne change),
// et que l'admin puisse ensuite tout modifier depuis le dashboard.
//
// Les images locales sont uploadées vers Cloudinary si CLOUDINARY_* est
// configuré dans .env ; sinon elles restent vides (à uploader plus tard
// depuis le dashboard, sans casser le reste).
//
// Usage : node seed/seedSiteContent.js

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connectDB = require('../config/db');
const { cloudinaryConfigured, uploadLocalImage } = require('./seedUtils');

const EventSettings = require('../models/EventSettings');
const AgendaItem = require('../models/AgendaItem');
const Panel = require('../models/Panel');
const Sponsor = require('../models/Sponsor');
const Article = require('../models/Article');
const Axis = require('../models/Axis');
const Speaker = require('../models/Speaker');
const SiteContent = require('../models/SiteContent');
const FormOptions = require('../models/FormOptions');

const img = async (filename, folder) => {
  const { url, publicId } = await uploadLocalImage(filename, folder);
  return { url, publicId };
};

// ---------------------------------------------------------------------------
// EventSettings
// ---------------------------------------------------------------------------
const seedEventSettings = async () => {
  const payload = {
    eventName: 'Get Entrepreneurial 3.0',
    tagline: 'Faire de la Tunisie un hub économique pour un avenir durable',
    aboutText:
      "ENSI Junior Enterprise, fondée en 2006, est une association étudiante affiliée à l'École Nationale des Sciences de l'Informatique (ENSI).\n\nNotre mission est d'introduire les étudiants tunisiens à la vie professionnelle à travers des activités axées sur trois principaux piliers : la formation, les événements et le développement de projets TIC. De plus, nous assumons activement la responsabilité de promouvoir un esprit entrepreneurial au sein de l'écosystème tunisien, grâce à nos activités, notamment les événements qui renforcent le lien entre les étudiants et les entreprises.",
    heroImageUrl: '',
    heroVideoUrl: '/getecomp.mp4',
    days: [
      { key: 'bigDay', label: 'Big Day', date: new Date('2025-10-22') },
      { key: 'greenTechDay', label: 'Green & Tech Day', date: null },
      { key: 'b2bDealDay', label: 'B2B Deal Day', date: null },
    ],
  };

  const existing = await EventSettings.findOne();
  if (existing) {
    await EventSettings.findByIdAndUpdate(existing._id, payload);
  } else {
    await EventSettings.create(payload);
  }
  console.log('EventSettings : ok');
};

// ---------------------------------------------------------------------------
// AgendaItem
// ---------------------------------------------------------------------------
const AGENDA_ITEMS = [
  { day: 'bigDay', order: 0, time: '09H00', title: 'Accueil des participants', speakerHtml: '', descriptionHtml: '' },
  { day: 'bigDay', order: 1, time: '09H30', title: "Ouverture de l'événement", speakerHtml: '', descriptionHtml: '' },
  { day: 'bigDay', order: 2, time: '10H00', title: 'Conférence Plénière – Innovation Act : ambition à concrétiser', speakerHtml: '', descriptionHtml: '' },
  { day: 'bigDay', order: 3, time: '11H00', title: 'Keynotes', speakerHtml: '', descriptionHtml: '<ul><li>Ooredoo</li><li>Gomycode</li></ul>' },
  { day: 'bigDay', order: 4, time: '11H15', title: 'Worshop Ooredoo : How to land an internship that open doors', speakerHtml: '', descriptionHtml: '' },
  { day: 'bigDay', order: 5, time: '12H00', title: 'Panel – Tunisie 2035 : Où miser pour faire la différence ?', speakerHtml: '', descriptionHtml: '' },
  { day: 'bigDay', order: 6, time: '12H45', title: 'Pause Café', speakerHtml: '', descriptionHtml: '' },
  { day: 'bigDay', order: 7, time: '13H15', title: 'Panel – Accès aux Marchés Publics & Internationaux', speakerHtml: '', descriptionHtml: '' },
  { day: 'bigDay', order: 8, time: '14H00', title: 'Panel – Financement et investissement', speakerHtml: '', descriptionHtml: '' },
  { day: 'bigDay', order: 9, time: '15H00', title: 'Clôture', speakerHtml: '', descriptionHtml: '' },
  { day: 'greenTechDay', order: 0, time: '09H30', title: 'Coffee time', speakerHtml: '', descriptionHtml: '' },
  { day: 'greenTechDay', order: 1, time: '10H00 - 11H00', title: 'Présentation des candidats & Workshop', speakerHtml: '', descriptionHtml: '<ul><li>Session de pitch </li><li>Workshop en parallèle</li></ul>' },
  { day: 'greenTechDay', order: 2, time: '11H00', title: 'Pause Café', speakerHtml: '', descriptionHtml: '' },
  { day: 'greenTechDay', order: 3, time: '11H30 - 12H30', title: 'Présentation des candidats & Workshop', speakerHtml: '', descriptionHtml: '<ul><li>Session de pitch </li><li>Workshop en parallèle</li></ul>' },
];

const seedAgenda = async () => {
  const count = await AgendaItem.countDocuments();
  if (count > 0) { console.log('AgendaItem : déjà rempli, ignoré'); return; }
  await AgendaItem.insertMany(AGENDA_ITEMS);
  console.log(`AgendaItem : ${AGENDA_ITEMS.length} éléments créés`);
};

// ---------------------------------------------------------------------------
// Panel (Apropos : panels du B2B Deal Day + workshops du Green & Tech Day)
// ---------------------------------------------------------------------------
const seedPanels = async () => {
  const count = await Panel.countDocuments();
  if (count > 0) { console.log('Panel : déjà rempli, ignoré'); return; }

  const speaker = async (name, role, filename) => {
    const { url, publicId } = await img(filename, 'speakers');
    return { name, role, photoUrl: url, photoPublicId: publicId };
  };

  const panels = [
    {
      section: 'b2bDealDay',
      order: 0,
      title: 'Conférence',
      items: [
        'Rétrospective du Startup Act 1.0',
        'Analyse critique et état des lieux',
        "Proposition de valeur : Vers un Innovation Act",
      ],
      speakers: await Promise.all([
        speaker('Mohamed Lahiani', 'Modérateur', 'lahy.png'),
        speaker('Jihene EL Ouakdi', 'Conférencière', 'Jihene El Oukadi.jpg'),
        speaker('Chiraz Arfaoui', 'Conférencière', 'chiraz.jpg'),
        speaker('Oussema Messaoud', 'Conférencier', 'oussema.jpg'),
      ]),
    },
    {
      section: 'b2bDealDay',
      order: 1,
      title: 'Tunisie 2035 : Où miser pour faire la différence ?',
      items: [
        'Arbitrage stratégique : financer moins mais mieux',
        'Identification des secteurs prioritaires (3 à 5)',
        'Cadre sélectif et comité multi-acteurs',
      ],
      speakers: await Promise.all([
        speaker('Sawsen Haj Amor', 'Modératrice', 'sawsen-Haj-Amor.webp'),
        speaker('Adel Chouari', 'Paneliste', 'Adel Chouari.jpg'),
        speaker('Wahb Ouertani', 'Paneliste', 'Wahb Ouertani.webp'),
        speaker('Omar Bouzouada', 'Paneliste', 'Omar_Bouzouada.jpg'),
      ]),
    },
    {
      section: 'b2bDealDay',
      order: 2,
      title: 'Accès aux Marchés Publics & Internationaux',
      items: [
        'État acheteur innovant & achats publics',
        'Sandbox élargi au-delà du financier',
        'Diaspora comme accélérateur global',
        'Programmes soft landing & partenariats internationaux',
      ],
      speakers: await Promise.all([
        speaker('Fatma Taghouti', 'Modératrice', 'Fatma_Taghouti.jpg'),
        speaker('Ridha Drira', 'Paneliste', 'Ridha Drira (1).jpg'),
        speaker('Razi Milani', 'Paneliste', 'Razi Milani.jpg'),
        speaker('Karim Ahres', 'Paneliste', 'Karim Ahres.webp'),
        speaker('Walid Hadj Amor', 'Paneliste', 'waalid.jpg'),
      ]),
    },
    {
      section: 'b2bDealDay',
      order: 3,
      title: 'Financement et Investissement',
      items: [
        'Gaps structurels (pré-amorçage, scale-up)',
        'Diaspora et levées de fonds cross-border',
        'Introduction des SAFE Notes & assouplissements réglementaires',
        'Bonnes pratiques internationales',
      ],
      speakers: await Promise.all([
        speaker('Hana Choyakh', 'Modératrice', 'hana.jpg'),
        speaker('Karim Bououni', 'Paneliste', 'Karim bououni.jpg'),
        speaker('Mehdi Farhat', 'Paneliste', 'mehdi farhat.png'),
        speaker('Rym Gmati', 'Paneliste', 'riim.jpg'),
      ]),
    },
    {
      section: 'greenTechDay',
      order: 0,
      title: 'Workshop Ooredoo',
      subtitle: 'How to land an internship that opens doors',
      items: [],
      speakers: await Promise.all([
        speaker('Mohamed Thamer Chagour', '', 'thaa.png'),
        speaker('Mohamed Wassim Zehani', '', 'wass.jpg'),
      ]),
    },
  ];

  await Panel.insertMany(panels);
  console.log(`Panel : ${panels.length} panels/workshops créés`);
};

// ---------------------------------------------------------------------------
// Sponsor (alimente le bandeau Accueil ET la page Collaboration)
// ---------------------------------------------------------------------------
const SPONSOR_SOURCE = [
  { category: 'Gold', file: 'cdcc.png', name: 'Asteelflash', link: 'https://www.cdc.tn/fr' },
  { category: 'Gold', file: 'oreedo-.png', name: 'Ooredoo', link: 'https://www.ooredoo.tn/' },
  { category: 'Gold', file: 'villagee.png', name: 'The Dot (Village by CA)', link: 'https://www.startupvillage.tn/en/' },
  { category: 'Silver', file: 'DAAM-.png', name: 'DAAM', link: 'https://www.daam.tn/' },
  { category: 'Silver', file: 'atiii.png', name: 'ATII', link: 'https://www.atii.tn/' },
  { category: 'Silver', file: 'hotell.png', name: 'Laico Hotel', link: '' },
  { category: 'Silver', file: 'sepcmm.png', name: 'SEPCM', link: '' },
  { category: 'Nos Alliés', file: 'BIASS.png', name: 'BIAS', link: 'https://bias.com.tn/fr' },
  { category: 'Nos Alliés', file: 'honoo.png', name: 'Honoris United Universities', link: 'https://honoris.net/our-institutions/tunisia/' },
  { category: 'Nos Alliés', file: 'smartcapital-logo.png', name: 'Smart Capital', link: 'https://www.smartcapital.tn/' },
  { category: 'Nos Alliés', file: 'Tunisian startups.png', name: 'Tunisian Startups', link: 'https://startup.gov.tn/' },
  { category: 'Nos Alliés', file: 'BID.png', name: 'BID', link: 'https://bidata-consulting.tn/' },
  { category: 'Institutions', file: 'umaa.png', name: 'UMA', link: 'https://uma.rnu.tn/fr' },
  { category: 'Institutions', file: 'CONECT (2).png', name: 'CONECT', link: 'https://www.conect.org.tn/' },
  { category: 'Institutions', file: 'Anettti.png', name: 'ANETI', link: 'https://www.emploi.nat.tn/fo/Fr/global.php' },
  { category: 'Institutions', file: 'apiii.png', name: 'APII', link: 'https://www.tunisieindustrie.nat.tn/FR/doc.asp?docid=753&mcat=22&mrub=178' },
  { category: 'Institutions', file: 'SLRdark.png', name: 'SLR', link: 'https://www.slrconsulting.com/' },
  { category: 'Institutions', file: 'lapresse.png', name: 'La Presse', link: 'https://lapresse.tn/' },
  { category: 'Institutions', file: 'tachghill.png', name: "Ministère de l'Emploi", link: 'https://www.emploi.gov.tn/fr/' },
  { category: 'Institutions', file: 'insat_press.png', name: 'INSAT Presse', link: '' },
  // Sponsors qui n'apparaissaient que dans le bandeau Accueil (section6) —
  // rattachés à "Institutions" pour garder 4 catégories propres côté Collaboration.
  { category: 'Institutions', file: 'managers.png', name: 'Managers', link: '' },
  { category: 'Institutions', file: 'uib.png', name: 'UIB', link: '' },
  { category: 'Institutions', file: 'ATB.png', name: 'ATB', link: '' },
  { category: 'Institutions', file: 'talys.png', name: 'Talys', link: '' },
  { category: 'Institutions', file: 'digitalcollege.png', name: 'Digital College', link: '' },
  { category: 'Institutions', file: 'darblockchain.png', name: 'Dar Blockchain', link: '' },
  { category: 'Institutions', file: 'digicom.png', name: 'Digicom', link: '' },
  { category: 'Institutions', file: 'monétique.png', name: 'Monétique', link: '' },
  { category: 'Institutions', file: 'fond.png', name: 'Fondation Tunisie', link: '' },
];

const seedSponsors = async () => {
  const count = await Sponsor.countDocuments();
  if (count > 0) { console.log('Sponsor : déjà rempli, ignoré'); return; }

  const sponsors = await Promise.all(
    SPONSOR_SOURCE.map(async (s, index) => {
      const { url, publicId } = await img(s.file, 'sponsors');
      return { name: s.name, logoUrl: url, logoPublicId: publicId, category: s.category, link: s.link, order: index };
    })
  );
  await Sponsor.insertMany(sponsors);
  console.log(`Sponsor : ${sponsors.length} sponsors créés`);
};

// ---------------------------------------------------------------------------
// Article (Accueil, section "articles phares")
// ---------------------------------------------------------------------------
const seedArticles = async () => {
  const count = await Article.countDocuments();
  if (count > 0) { console.log('Article : déjà rempli, ignoré'); return; }

  const articles = await Promise.all([
    (async () => {
      const { url, publicId } = await img('socialecomp.png', 'hero');
      return {
        order: 0, image: url, imagePublicId: publicId,
        category: 'ÉCONOMIE SOCIALE', date: 'July 22, 2025',
        title: 'Les Sociétés Communautaires : Pilier d’une Économie Locale Durable',
        content: `« Nous ne créons pas seulement des entreprises, nous construisons l’avenir de nos villages », confie Amira Benali, fondatrice d’une coopérative agricole dans la région de Béja. À l’image de son initiative, une nouvelle génération d’entrepreneurs tunisiens réinvente l’économie locale à travers les sociétés communautaires. Ces structures, qui allient profit et impact social, émergent comme une réponse innovante aux défis économiques du pays en plaçant les communautés locales au cœur du développement. De Bizerte à Tataouine, ces entreprises d’un nouveau genre transforment le paysage économique tunisien en démontrant qu’un développement ancré dans les réalités locales est possible. Malgré un cadre juridique souvent jugé dépassé, elles jouent un rôle essentiel dans le développement régional en incarnant un modèle inclusif, durable et participatif. Leur impact est tangible à plusieurs niveaux. En redistribuant les ressources générées, elles financent des projets communautaires visant à améliorer le bien-être collectif. Leur engagement environnemental se traduit par l’adoption de pratiques durables qui contribuent à la préservation des ressources naturelles. Par ailleurs, elles stimulent l’entrepreneuriat en favorisant l’émergence de solutions adaptées aux besoins locaux et en participant à la réduction du chômage par la création d’emplois. En Tunisie, les sociétés communautaires se positionnent comme des acteurs stratégiques dans un contexte marqué par des défis économiques persistants. Leur présence est particulièrement remarquée dans des secteurs variés tels que l’agriculture, la technologie, le tourisme durable et l’artisanat. Les réformes entreprises en 2024 et 2025, notamment l’introduction de la loi sur l’économie sociale et solidaire (ESS) et la mise en place d’incitations fiscales, ont favorisé leur essor. Ces mesures, associées au rôle clé de la Banque Tunisienne de Solidarité (BTS), ont permis de financer 15 entreprises en 2023 grâce à une enveloppe de 20 millions de dinars. Ce soutien financier s’est accompagné de conditions avantageuses, comme des taux d’intérêt préférentiels fixés à 5 %. Cependant, malgré ces avancées, le potentiel des sociétés communautaires reste encore largement sous-exploité. Sur les 140 entreprises recensées, seules 21 sont pleinement opérationnelles. Plusieurs obstacles freinent leur développement. La dépendance aux subventions limite leur capacité à innover et à assurer leur pérennité. L’accès aux marchés locaux et nationaux demeure compliqué en raison de barrières logistiques et du manque de mécanismes de promotion efficaces, ce qui affecte leur rentabilité à long terme. Par ailleurs, la complexité des démarches administratives et la rigidité du cadre législatif découragent de nombreuses initiatives et ralentissent la création de nouvelles structures. Pour maximiser l’impact des sociétés communautaires en Tunisie, des efforts supplémentaires doivent être entrepris. Il est essentiel de simplifier les procédures administratives en favorisant la digitalisation des démarches et le recours à des plateformes en ligne. Le renforcement des capacités des acteurs locaux par le biais de formations en gestion, en innovation et en marketing apparaît également indispensable. La mise en place de réseaux de mentorat et de pôles régionaux pourrait encourager des collaborations plus efficaces entre les différentes parties prenantes. Enfin, le développement de partenariats avec des coopératives et des circuits de distribution locaux est crucial pour assurer une meilleure visibilité des produits communautaires et garantir leur commercialisation à grande échelle. Les sociétés communautaires offrent une opportunité précieuse pour promouvoir un développement économique local inclusif et durable. Bien que des avancées notables aient été réalisées, des défis majeurs subsistent, notamment la dépendance aux subventions, l’accès limité aux marchés et la lourdeur administrative. Des actions concertées visant à simplifier les procédures, diversifier les financements et renforcer les compétences locales permettront à ces organisations de déployer pleinement leur potentiel et de contribuer durablement à l’économie nationale. Au-delà d’un simple modèle économique, les sociétés communautaires incarnent une véritable philosophie de développement. Elles portent l’ambition d’une Tunisie plus résiliente, inclusive et dynamique, où le progrès économique est pensé en harmonie avec les besoins des communautés et le respect des ressources naturelles.`,
      };
    })(),
    (async () => {
      const { url, publicId } = await img('ecocircomp.png', 'hero');
      return {
        order: 1, image: url, imagePublicId: publicId,
        category: 'DURABILITÉ', date: 'August 1, 2025',
        title: 'L’économie circulaire : un levier de transformation pour la Tunisie',
        content: `L’économie circulaire, en tant que modèle visant à optimiser l’utilisation des ressources et à réduire les déchets, repense nos modes de production et de consommation pour un développement durable, en adéquation avec les enjeux environnementaux, économiques et sociaux. Son rôle est essentiel non seulement pour encourager des pratiques telles que le réemploi, la réparation et le recyclage, mais aussi pour assurer un développement structurel et durable de l’économie. Elle représente un puissant levier pour transformer les industries tunisiennes en moteurs de durabilité. Elle ne se limite pas à la réduction des déchets, mais vise aussi à optimiser l’utilisation des ressources et à générer de nouvelles opportunités d’emploi et de croissance économique. En adoptant ses principes, les entreprises tunisiennes peuvent améliorer leur compétitivité sur un marché mondial en constante évolution tout en contribuant à la protection de l’environnement. Ce modèle encourage également la conception de produits durables, réparables et recyclables, incitant les entreprises à innover dans leurs processus de production. Il favorise par ailleurs la création d’emplois dans des secteurs comme le recyclage, la réparation et la réutilisation, renforçant ainsi le tissu économique local. En limitant l’extraction de nouvelles ressources et en réduisant la production de déchets, l’économie circulaire contribue à la préservation de l’environnement et à la diminution de l’empreinte écologique. En Tunisie, l’économie circulaire gagne en importance grâce à plusieurs initiatives visant à intégrer des pratiques durables dans divers secteurs. Le gouvernement tunisien a ainsi élaboré une stratégie nationale de gestion circulaire globale et sectorielle des déchets pour la période 2035-2050, présentée en décembre 2024. Cette stratégie met l’accent sur la réutilisation et le recyclage des matériaux, cherchant à transformer les pratiques industrielles et commerciales. Par ailleurs, le projet de loi de finances pour 2025 prévoit une ligne de financement de dix millions de dinars, issue du fonds de lutte contre la pollution, destinée à soutenir des projets relevant de l’économie verte, bleue et circulaire, en proposant des prêts avantageux aux jeunes entrepreneurs et aux entreprises souhaitant adopter des pratiques durables. Cependant, malgré ces avancées, l’économie circulaire en Tunisie est encore en phase de développement et se heurte à plusieurs obstacles. L’absence de méthodologies standardisées complique l’évaluation de l’impact des initiatives circulaires et freine leur adoption par les entreprises. Les ressources financières et techniques limitées rendent difficile l’établissement d’analyses de rentabilité viables, notamment pour les projets en phase initiale. Le cadre réglementaire actuel ne favorise pas suffisamment l’innovation et limite la collaboration entre les acteurs du secteur. À cela s’ajoutent des freins culturels et socio-économiques, comme le manque de sensibilisation et d’éducation sur les avantages économiques et environnementaux des pratiques circulaires, qui ralentissent leur intégration dans les stratégies industrielles et entrepreneuriales. Selon la Banque mondiale, la mise en œuvre d’une économie circulaire en Tunisie pourrait créer près de 100 000 nouveaux emplois et générer une croissance de 0,8 % du PIB. Pour atteindre ces objectifs, il est impératif de renforcer les infrastructures de recyclage, de mettre en place des programmes de sensibilisation efficaces et de développer une industrie du recyclage bien établie. Toutefois, l’adoption de l’économie circulaire ne se limite pas à un simple changement de processus industriels. Elle implique une transformation profonde des mentalités et une refonte des stratégies d’entreprise. Cette transition impose une responsabilité sociétale qui doit guider les actions quotidiennes et les décisions stratégiques des entreprises et institutions. Dans ce contexte, la Responsabilité Sociétale des Entreprises (RSE) apparaît comme un levier essentiel pour accompagner cette transition. En Tunisie, la RSE a connu une évolution notable ces dernières années, se positionnant comme un moteur clé du développement durable. En 2018, la Tunisie a adopté la loi n°2018-35 relative à la RSE, visant à intégrer les préoccupations sociales, environnementales et économiques dans les activités des entreprises. Toutefois, en l’absence de décrets d’application, sa mise en œuvre effective reste limitée. L’économie circulaire et la RSE partagent des objectifs communs, notamment la réduction de l’empreinte environnementale et la promotion du développement durable. En intégrant des pratiques de RSE, les entreprises tunisiennes peuvent faciliter la transition vers un modèle circulaire à travers plusieurs axes. L’optimisation de l’utilisation des ressources permet d’améliorer l’efficacité des processus tout en réduisant les déchets. La promotion de l’innovation encourage le développement de nouveaux produits et services basés sur des modèles circulaires. Le renforcement de la transparence, quant à lui, incite les entreprises à communiquer sur leurs pratiques durables et à impliquer davantage les parties prenantes dans leurs décisions stratégiques. L’économie circulaire représente une opportunité majeure pour la Tunisie, combinant croissance économique et durabilité. Son succès repose sur un engagement collectif, un cadre réglementaire adapté et une intégration renforcée de la RSE. En misant sur l’innovation et la collaboration, et en adoptant une approche axée sur la responsabilité sociétale, les entreprises tunisiennes peuvent inscrire la durabilité au cœur de leur stratégie. Cela permettra une transition réussie vers un modèle économique plus résilient, compétitif et en harmonie avec les défis environnementaux et sociaux contemporains.`,
      };
    })(),
    (async () => {
      const { url, publicId } = await img('startupcomp.png', 'hero');
      return {
        order: 2, image: url, imagePublicId: publicId,
        category: 'ENTREPRENEURIAT', date: 'July 15, 2025',
        title: 'L’essor des startups tunisiennes face aux défis du marché',
        content: `L’entrepreneuriat en Tunisie est devenu un moteur clé du développement économique, favorisant la création d’emplois et l’émergence d’idées novatrices. Grâce à une population jeune et ambitieuse, ce secteur représente une véritable opportunité pour diversifier l’économie et stimuler une croissance durable. Longtemps considéré comme marginal, il prend aujourd’hui une ampleur significative. Bien que confrontés à de nombreux défis, les jeunes entrepreneurs tunisiens sont déterminés à s’investir dans des projets créatifs et innovants, convaincus du potentiel de leur pays. Toutefois, entreprendre en Tunisie n’est pas un parcours sans embûches. Les obstacles sont multiples et touchent divers aspects de la vie entrepreneuriale. La bureaucratie et la complexité des démarches administratives constituent l’un des premiers freins. Créer une entreprise peut s’avérer être un véritable casse-tête en raison des procédures longues et contraignantes. Ces lourdeurs administratives découragent de nombreux jeunes entrepreneurs qui souhaiteraient consacrer leur énergie à l’innovation et au développement de leur projet. L’accès au financement est un autre défi majeur. Les banques, souvent frileuses à l’idée de soutenir des projets jugés risqués, hésitent à accorder des prêts aux startups. Bien que des initiatives publiques existent pour encourager l’entrepreneuriat, les fonds alloués restent parfois insuffisants face à une demande croissante. Ce manque de financement place de nombreuses jeunes entreprises dans une situation délicate, où leur succès dépend largement de leur capacité à mobiliser des ressources financières. L’internationalisation constitue également un obstacle de taille. Se faire une place sur les marchés étrangers est un défi complexe, entravé par des barrières commerciales, le manque de réseaux internationaux et l’absence de soutien structuré à l’exportation. Cette difficulté limite considérablement le potentiel de croissance des startups tunisiennes, qui peinent à s’imposer au-delà des frontières nationales. Malgré ces défis, l’écosystème entrepreneurial tunisien recèle de nombreuses opportunités. La transformation numérique représente un levier majeur de développement. Grâce à la digitalisation, les startups ont la possibilité de toucher un public plus large et d’intégrer un environnement dynamique propice à l’innovation. Des secteurs comme l’e-commerce, la fintech ou encore l’edtech connaissent un essor important, offrant ainsi de nouvelles perspectives aux jeunes entrepreneurs. Le capital humain tunisien est un autre atout indéniable. Chaque année, des milliers de diplômés en ingénierie, technologies de l’information et intelligence artificielle sortent des grandes écoles et universités du pays. Ces talents qualifiés représentent une ressource précieuse pour les startups, leur permettant de développer des solutions innovantes et d’assurer une croissance durable. L’accompagnement institutionnel, bien qu’imparfait, joue un rôle crucial dans la structuration du secteur. Des initiatives comme le Startup Act offrent des incitations fiscales et des solutions de financement adaptées aux besoins des jeunes entreprises. Ce cadre législatif vise à encourager l’innovation et à faciliter le développement des startups, en leur offrant des conditions plus favorables pour prospérer. Ce qui distingue particulièrement les startups tunisiennes, c’est leur capacité de résilience. Malgré un environnement économique parfois hostile, un accès limité aux financements et des barrières administratives pesantes, elles parviennent à s’adapter et à se réinventer. Cette ténacité leur permet de surmonter les crises et de faire face aux nombreux défis qui jalonnent leur parcours. Elles font preuve d’une grande créativité pour contourner les obstacles, en développant des solutions alternatives et en misant sur des collaborations internationales. Ces alliances stratégiques leur permettent d’élargir leur réseau, d’accéder à de nouveaux marchés et de bénéficier d’un accompagnement plus structuré. La résilience des startups tunisiennes repose ainsi sur une volonté constante d’apprendre, d’innover et de transformer chaque difficulté en opportunité de croissance. Les startups tunisiennes illustrent parfaitement le potentiel de l’entrepreneuriat dans un pays en pleine mutation. Malgré les nombreux défis qu’elles doivent affronter, elles démontrent qu’avec de la détermination, de l’innovation et un écosystème en amélioration, il est possible de réussir et de contribuer activement au développement économique du pays. Avec un accompagnement renforcé et des réformes adaptées, ces jeunes entreprises ont toutes les cartes en main pour prospérer et jouer un rôle clé dans l’avenir économique de la Tunisie.`,
      };
    })(),
  ]);

  await Article.insertMany(articles);
  console.log(`Article : ${articles.length} articles créés`);
};

// ---------------------------------------------------------------------------
// Axis (Accueil, "Trois Axes, Une Destination")
// ---------------------------------------------------------------------------
const seedAxes = async () => {
  const count = await Axis.countDocuments();
  if (count > 0) { console.log('Axis : déjà rempli, ignoré'); return; }

  const axes = await Promise.all([
    (async () => {
      const { url, publicId } = await img('B2Bcom.png', 'hero');
      return {
        order: 0, image: url, imagePublicId: publicId,
        titleLine1: 'Business', titleLine2: 'To Business',
        backText: "L'événement propose des ateliers, des sessions de networking et des panels pour favoriser la rencontre entre startups et grandes entreprises, afin de développer des partenariats stratégiques durables. Les participants auront l'opportunité d'explorer des technologies innovantes et des solutions permettant d'améliorer l'efficacité opérationnelle. L'objectif est de permettre aux entreprises d'accéder à des innovations et de créer des collaborations qui soutiendront leur croissance.",
        ctaLabel: "S'ABONNER", ctaHref: '/inscription',
      };
    })(),
    (async () => {
      const { url, publicId } = await img('BtoCcomp.jpg', 'hero');
      return {
        order: 1, image: url, imagePublicId: publicId,
        titleLine1: 'Business', titleLine2: 'To Client',
        backText: "Des stands d'exposition, des démonstrations en direct et des opportunités d'acquisition de clients sont proposés pour permettre aux startups et entreprises de rencontrer directement leur clientèle cible. C'est l'occasion idéale de tester vos produits, de recueillir des retours instantanés et de fidéliser de nouveaux clients. Les participants peuvent ainsi mieux comprendre les besoins du marché, ajuster leurs offres en temps réel et renforcer leur présence auprès de leur public.",
        ctaLabel: "S'ABONNER", ctaHref: '/inscription',
      };
    })(),
    (async () => {
      const { url, publicId } = await img('BtoScomp.jpg', 'hero');
      return {
        order: 2, image: url, imagePublicId: publicId,
        titleLine1: 'Business', titleLine2: 'To Stakeholders',
        backText: "Des sessions privées de pitching avec des investisseurs et des tables rondes avec des décideurs politiques sont proposées, offrant ainsi aux entrepreneurs l'opportunité de se connecter avec des investisseurs, des représentants du gouvernement et des influenceurs du secteur. C'est une occasion clé pour établir des relations cruciales en matière de financement, de réglementation et de croissance. Ces échanges permettent d'influencer les futurs cadres légaux.",
        ctaLabel: "S'ABONNER", ctaHref: '/inscription',
      };
    })(),
  ]);

  await Axis.insertMany(axes);
  console.log(`Axis : ${axes.length} axes créés`);
};

// ---------------------------------------------------------------------------
// Speaker (Accueil, "Nos Conférenciers")
// ---------------------------------------------------------------------------
const SPEAKER_SOURCE = [
  { name: 'Jihene El Oukadi', title: "Émissaire du ministère de l'Enseignement supérieur", file: 'Jihene El Oukadi.jpg', description: "Engagée dans le développement de la recherche scientifique et la promotion de l'excellence académique." },
  { name: 'Chiraz Arfaoui', title: 'DG Wiki startup', file: 'chiraz.jpg', description: "Pionnière de l'écosystème startup, elle guide les innovateurs vers le succès et la croissance." },
  { name: 'Sawsen Haj Amor', title: 'CEO of YOU.Branded', file: 'sawsen-Haj-Amor.webp', description: 'Spécialiste du branding et de la stratégie de marque, aidant les entreprises à construire leur identité.' },
  { name: 'Adel Chouari', title: 'DG RNE', file: 'Adel Chouari.jpg', description: 'Expert en registres nationaux des entreprises, au cœur de la modernisation administrative.' },
  { name: 'Wahb Ouertani', title: 'Président CONECT INTECH', file: 'Wahb Ouertani.webp', description: 'Leader engagé pour la promotion du secteur privé et le développement économique en Tunisie.' },
  { name: 'Omar Bouzouada', title: 'DG APII', file: 'Omar_Bouzouada.jpg', description: "Acteur majeur de la promotion de l'investissement industriel et de l'innovation en Tunisie." },
  { name: 'Fatma Taghouti', title: 'Founder of ecospark', file: 'Fatma_Taghouti.jpg', description: "Experte en entrepreneuriat durable et fondatrice d'ecospark, un acteur clé de l'innovation verte." },
  { name: 'Ridha Drira', title: "Président de la commission supérieure d'exclusion", file: 'Ridha Drira (1).jpg', description: 'Spécialiste des marchés publics et de la régulation économique au sein de la présidence du gouvernement.' },
  { name: 'Razi Milani', title: 'CEO of COGEPHA', file: 'Razi Milani.jpg', description: "Une vision stratégique pour l'industrie pharmaceutique et la croissance durable en Afrique du Nord." },
  { name: 'Karim Ahres', title: 'CEO Netcom Tunisia & BE CONECT', file: 'Karim Ahres.webp', description: "Visionnaire dans le secteur des technologies de l'information et des télécommunications en Tunisie." },
  { name: 'Walid Hadj Amor', title: 'Administrateur Pegazeus International', file: 'waalid.jpg', description: 'Expert en commerce international et en développement de partenariats stratégiques.' },
  { name: 'Karim Bououni', title: 'DG de la CDC gestion', file: 'Karim bououni.jpg', description: "Spécialiste du financement et de l'investissement au service du développement économique." },
  { name: 'Mehdi Farhat', title: 'Responsable direction RSE chez UBCI', file: 'mehdi farhat.png', description: 'Acteur clé de la responsabilité sociétale des entreprises dans le secteur bancaire.' },
  { name: 'Rym Gmati', title: 'Avocate, Spécialisée en Venture Capital', file: 'riim.jpg', description: 'Experte juridique en capital-risque, accompagnant les startups dans leurs levées de fonds.' },
  { name: 'Hana Choyakh', title: 'Director Financial Advisory Deloitte Africa', file: 'hana.jpg', description: '' },
  { name: 'Mohamed Lahiani', title: 'Ex président de ENSI Junior Entreprise', file: 'lahy.png', description: '' },
  { name: 'Oussema Messaoud', title: 'Chief Operating Officer at Betawaves', file: 'oussema.jpg', description: "Visionnaire des opérations et de la technologie, il optimise les processus pour l'innovation et la performance." },
];

const seedSpeakers = async () => {
  const count = await Speaker.countDocuments();
  if (count > 0) { console.log('Speaker : déjà rempli, ignoré'); return; }

  const speakers = await Promise.all(
    SPEAKER_SOURCE.map(async (s, index) => {
      const { url, publicId } = await img(s.file, 'speakers');
      return { order: index, name: s.name, title: s.title, image: url, imagePublicId: publicId, description: s.description };
    })
  );
  await Speaker.insertMany(speakers);
  console.log(`Speaker : ${speakers.length} conférenciers créés`);
};

// ---------------------------------------------------------------------------
// SiteContent (Navbar liens supplémentaires, Footer, Contact, Collaboration, Inscription)
// ---------------------------------------------------------------------------
const seedSiteContentDoc = async () => {
  const { url: ctaImageUrl } = await img('stand.jpeg', 'hero');

  const payload = {
    navLinks: [],
    footer: {
      columns: [
        { title: 'Navigation', links: [
          { label: 'A propos', href: '/apropos' },
          { label: 'Accueil', href: '/' },
          { label: 'Programme', href: '/programme' },
          { label: 'Collaboration', href: '/collaboration' },
        ] },
        { title: 'Legacy', links: [
          { label: '1ère édition', href: '/editions/edition1' },
          { label: '2ème édition', href: '/editions/edition2' },
        ] },
      ],
      socialLinks: [
        { platform: 'facebook', url: 'https://www.facebook.com/ENSI.Junior.Entreprise' },
        { platform: 'instagram', url: 'https://www.instagram.com/ensijunior' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/company/ensi-junior-entreprise/posts/?feedView=all' },
        { platform: 'youtube', url: 'https://www.youtube.com/@ENSIJuniorEntreprise' },
      ],
      contactPhone: '+216 94 30 50 94',
      contactEmail: 'commercial.ensi.junior@gmail.com',
      tagline: '#Forge_The_Future',
      copyrightText: '© All rights reserved - ENSI JE 2025',
    },
    contactPage: {
      introTitle: 'Prenez contact avec nous',
      introText: "Nous vous encourageons à partager vos demandes ou préoccupations en remplissant le formulaire afin d'obtenir de plus amples informations.",
      phones: ['+(216) 25 540 762', '+(216) 94 305 094', '+(216) 93 071 049'],
      emails: ['contact.junior.ensi@gmail.com', 'commercial.ensi.junior@gmail.com'],
      address: 'Campus Universitaire، ENSI, Manouba 2010',
    },
    collaborationPage: {
      ctaImage: ctaImageUrl,
      ctaTitle: 'Rejoignez les partenaires de GET E 3.0',
      ctaText: "À travers Get Entrepreneurial 3.0, vous bénéficiez d'une visibilité stratégique: renforcez votre image de marque et créez des connexions durables avec des startups, investisseurs, institutions et acteurs clés de l'innovation en Tunisie.",
      ctaLinks: [
        { label: 'Devenir Partenaire', href: '/exposant', isDownload: false },
        { label: 'Dossier de collaboration', href: '/Dossierpartenariat.pdf', isDownload: true },
      ],
    },
    inscriptionPage: {
      participantCard: {
        title: 'Participants',
        text: "Rejoignez plus de 500 professionnels passionnés de technologie pour trois jours d'innovations, de networking et de découvertes qui transformeront votre vision du futur. Explorez les dernières tendances, participez à des ateliers exclusifs et créez des connexions qui feront la différence dans votre carrière.",
        benefits: ['10+ Conférences', '10+ Ateliers', 'Networking premium'],
        ctaLabel: "S'inscrire maintenant",
        ctaHref: '/participant',
      },
      exposantCard: {
        title: 'Exposants',
        text: "Présentez vos innovations à un public qualifié et établissez votre leadership sur le marché technologique. Bénéficiez d'une visibilité exceptionnelle auprès des décideurs de l'industrie et générez des leads de qualité premium qui propulseront votre croissance.",
        benefits: ['Visibilités premium', '10+ Ateliers', 'Networking premium'],
        ctaLabel: 'Devenir exposant',
        ctaHref: '/exposant',
      },
    },
  };

  const existing = await SiteContent.findOne();
  if (existing) {
    await SiteContent.findByIdAndUpdate(existing._id, payload);
  } else {
    await SiteContent.create(payload);
  }
  console.log('SiteContent : ok');
};

// ---------------------------------------------------------------------------
// FormOptions (menus déroulants Participant / Exposant)
// ---------------------------------------------------------------------------
const seedFormOptions = async () => {
  const payload = {
    regions: ['Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kébili', 'Le Kef', 'Mahdia', 'La Manouba', 'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'],
    statuts: ['Étudiant', 'Professionnel', 'Entrepreneur', 'Investisseur'],
    expertises: ['Développement Web/Mobile', 'IA & Data Science', 'Systèmes Embarqués & IoT', 'Cybersécurité', 'Business & Marketing', 'Design & UX/UI', 'Finance & Fintech', 'Agritech', 'Healthtech', 'EdTech', 'GreenTech', 'Autre'],
    experiences: ['0 - 2 ans', '3 - 5 ans', '5+ ans'],
    orgTypes: ['Entreprise', 'Startup / Entrepreneur', 'Association / ONG', 'Institution publique', 'Université', 'Artiste / Créateur / Artisan', 'Partenaire / Sponsor'],
  };

  const existing = await FormOptions.findOne();
  if (existing) {
    await FormOptions.findByIdAndUpdate(existing._id, payload);
  } else {
    await FormOptions.create(payload);
  }
  console.log('FormOptions : ok');
};

// ---------------------------------------------------------------------------
const run = async () => {
  if (!cloudinaryConfigured) {
    console.log('Cloudinary non configuré (.env) — le contenu sera créé sans images. Vous pourrez les ajouter depuis le dashboard admin.');
  }

  await connectDB();

  await seedEventSettings();
  await seedAgenda();
  await seedPanels();
  await seedSponsors();
  await seedArticles();
  await seedAxes();
  await seedSpeakers();
  await seedSiteContentDoc();
  await seedFormOptions();

  console.log('\nTerminé. Pensez aussi à lancer `node seed/seedEditions.js` pour les 3 éditions historiques.');
  process.exit(0);
};

run().catch((error) => {
  console.error('Échec du seed du contenu du site :', error);
  process.exit(1);
});
