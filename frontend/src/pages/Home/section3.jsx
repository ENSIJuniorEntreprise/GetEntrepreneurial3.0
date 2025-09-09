import React, { useState } from 'react';
import './section3.css';
import { useInView } from 'react-intersection-observer';
import { FaArrowLeft } from 'react-icons/fa';

// --- ÉTAPE 1 : Importer vos nouvelles images ---
import communityImage from '../../assets/images/sociale.png';
import circularEconomyImage from '../../assets/images/ecocir.png';
import startupsImage from '../../assets/images/startup.png';

// --- ÉTAPE 2 : Remplacer les données par vos articles ---
const articlesData = [
  {
    image: communityImage,
    category: 'ÉCONOMIE SOCIALE',
    date: 'July 22, 2025',
    title: 'Les Sociétés Communautaires : Pilier d’une Économie Locale Durable',
    content: `« Nous ne créons pas seulement des entreprises, nous construisons l’avenir de nos villages », confie Amira Benali, fondatrice d’une coopérative agricole dans la région de Béja. À l’image de son initiative, une nouvelle génération d’entrepreneurs tunisiens réinvente l’économie locale à travers les sociétés communautaires. Ces structures, qui allient profit et impact social, émergent comme une réponse innovante aux défis économiques du pays en plaçant les communautés locales au cœur du développement. De Bizerte à Tataouine, ces entreprises d’un nouveau genre transforment le paysage économique tunisien en démontrant qu’un développement ancré dans les réalités locales est possible. Malgré un cadre juridique souvent jugé dépassé, elles jouent un rôle essentiel dans le développement régional en incarnant un modèle inclusif, durable et participatif. Leur impact est tangible à plusieurs niveaux. En redistribuant les ressources générées, elles financent des projets communautaires visant à améliorer le bien-être collectif. Leur engagement environnemental se traduit par l’adoption de pratiques durables qui contribuent à la préservation des ressources naturelles. Par ailleurs, elles stimulent l’entrepreneuriat en favorisant l’émergence de solutions adaptées aux besoins locaux et en participant à la réduction du chômage par la création d’emplois. En Tunisie, les sociétés communautaires se positionnent comme des acteurs stratégiques dans un contexte marqué par des défis économiques persistants. Leur présence est particulièrement remarquée dans des secteurs variés tels que l’agriculture, la technologie, le tourisme durable et l’artisanat. Les réformes entreprises en 2024 et 2025, notamment l’introduction de la loi sur l’économie sociale et solidaire (ESS) et la mise en place d’incitations fiscales, ont favorisé leur essor. Ces mesures, associées au rôle clé de la Banque Tunisienne de Solidarité (BTS), ont permis de financer 15 entreprises en 2023 grâce à une enveloppe de 20 millions de dinars. Ce soutien financier s’est accompagné de conditions avantageuses, comme des taux d’intérêt préférentiels fixés à 5 %. Cependant, malgré ces avancées, le potentiel des sociétés communautaires reste encore largement sous-exploité. Sur les 140 entreprises recensées, seules 21 sont pleinement opérationnelles. Plusieurs obstacles freinent leur développement. La dépendance aux subventions limite leur capacité à innover et à assurer leur pérennité. L’accès aux marchés locaux et nationaux demeure compliqué en raison de barrières logistiques et du manque de mécanismes de promotion efficaces, ce qui affecte leur rentabilité à long terme. Par ailleurs, la complexité des démarches administratives et la rigidité du cadre législatif découragent de nombreuses initiatives et ralentissent la création de nouvelles structures. Pour maximiser l’impact des sociétés communautaires en Tunisie, des efforts supplémentaires doivent être entrepris. Il est essentiel de simplifier les procédures administratives en favorisant la digitalisation des démarches et le recours à des plateformes en ligne. Le renforcement des capacités des acteurs locaux par le biais de formations en gestion, en innovation et en marketing apparaît également indispensable. La mise en place de réseaux de mentorat et de pôles régionaux pourrait encourager des collaborations plus efficaces entre les différentes parties prenantes. Enfin, le développement de partenariats avec des coopératives et des circuits de distribution locaux est crucial pour assurer une meilleure visibilité des produits communautaires et garantir leur commercialisation à grande échelle. Les sociétés communautaires offrent une opportunité précieuse pour promouvoir un développement économique local inclusif et durable. Bien que des avancées notables aient été réalisées, des défis majeurs subsistent, notamment la dépendance aux subventions, l’accès limité aux marchés et la lourdeur administrative. Des actions concertées visant à simplifier les procédures, diversifier les financements et renforcer les compétences locales permettront à ces organisations de déployer pleinement leur potentiel et de contribuer durablement à l’économie nationale. Au-delà d’un simple modèle économique, les sociétés communautaires incarnent une véritable philosophie de développement. Elles portent l’ambition d’une Tunisie plus résiliente, inclusive et dynamique, où le progrès économique est pensé en harmonie avec les besoins des communautés et le respect des ressources naturelles.`
  },
  {
    image: circularEconomyImage,
    category: 'DURABILITÉ',
    date: 'August 1, 2025',
    title: 'L’économie circulaire : un levier de transformation pour la Tunisie',
    content: `L’économie circulaire, en tant que modèle visant à optimiser l’utilisation des ressources et à réduire les déchets, repense nos modes de production et de consommation pour un développement durable, en adéquation avec les enjeux environnementaux, économiques et sociaux. Son rôle est essentiel non seulement pour encourager des pratiques telles que le réemploi, la réparation et le recyclage, mais aussi pour assurer un développement structurel et durable de l’économie. Elle représente un puissant levier pour transformer les industries tunisiennes en moteurs de durabilité. Elle ne se limite pas à la réduction des déchets, mais vise aussi à optimiser l’utilisation des ressources et à générer de nouvelles opportunités d’emploi et de croissance économique. En adoptant ses principes, les entreprises tunisiennes peuvent améliorer leur compétitivité sur un marché mondial en constante évolution tout en contribuant à la protection de l’environnement. Ce modèle encourage également la conception de produits durables, réparables et recyclables, incitant les entreprises à innover dans leurs processus de production. Il favorise par ailleurs la création d’emplois dans des secteurs comme le recyclage, la réparation et la réutilisation, renforçant ainsi le tissu économique local. En limitant l’extraction de nouvelles ressources et en réduisant la production de déchets, l’économie circulaire contribue à la préservation de l’environnement et à la diminution de l’empreinte écologique. En Tunisie, l’économie circulaire gagne en importance grâce à plusieurs initiatives visant à intégrer des pratiques durables dans divers secteurs. Le gouvernement tunisien a ainsi élaboré une stratégie nationale de gestion circulaire globale et sectorielle des déchets pour la période 2035-2050, présentée en décembre 2024. Cette stratégie met l’accent sur la réutilisation et le recyclage des matériaux, cherchant à transformer les pratiques industrielles et commerciales. Par ailleurs, le projet de loi de finances pour 2025 prévoit une ligne de financement de dix millions de dinars, issue du fonds de lutte contre la pollution, destinée à soutenir des projets relevant de l’économie verte, bleue et circulaire, en proposant des prêts avantageux aux jeunes entrepreneurs et aux entreprises souhaitant adopter des pratiques durables. Cependant, malgré ces avancées, l’économie circulaire en Tunisie est encore en phase de développement et se heurte à plusieurs obstacles. L’absence de méthodologies standardisées complique l’évaluation de l’impact des initiatives circulaires et freine leur adoption par les entreprises. Les ressources financières et techniques limitées rendent difficile l’établissement d’analyses de rentabilité viables, notamment pour les projets en phase initiale. Le cadre réglementaire actuel ne favorise pas suffisamment l’innovation et limite la collaboration entre les acteurs du secteur. À cela s’ajoutent des freins culturels et socio-économiques, comme le manque de sensibilisation et d’éducation sur les avantages économiques et environnementaux des pratiques circulaires, qui ralentissent leur intégration dans les stratégies industrielles et entrepreneuriales. Selon la Banque mondiale, la mise en œuvre d’une économie circulaire en Tunisie pourrait créer près de 100 000 nouveaux emplois et générer une croissance de 0,8 % du PIB. Pour atteindre ces objectifs, il est impératif de renforcer les infrastructures de recyclage, de mettre en place des programmes de sensibilisation efficaces et de développer une industrie du recyclage bien établie. Toutefois, l’adoption de l’économie circulaire ne se limite pas à un simple changement de processus industriels. Elle implique une transformation profonde des mentalités et une refonte des stratégies d’entreprise. Cette transition impose une responsabilité sociétale qui doit guider les actions quotidiennes et les décisions stratégiques des entreprises et institutions. Dans ce contexte, la Responsabilité Sociétale des Entreprises (RSE) apparaît comme un levier essentiel pour accompagner cette transition. En Tunisie, la RSE a connu une évolution notable ces dernières années, se positionnant comme un moteur clé du développement durable. En 2018, la Tunisie a adopté la loi n°2018-35 relative à la RSE, visant à intégrer les préoccupations sociales, environnementales et économiques dans les activités des entreprises. Toutefois, en l’absence de décrets d’application, sa mise en œuvre effective reste limitée. L’économie circulaire et la RSE partagent des objectifs communs, notamment la réduction de l’empreinte environnementale et la promotion du développement durable. En intégrant des pratiques de RSE, les entreprises tunisiennes peuvent faciliter la transition vers un modèle circulaire à travers plusieurs axes. L’optimisation de l’utilisation des ressources permet d’améliorer l’efficacité des processus tout en réduisant les déchets. La promotion de l’innovation encourage le développement de nouveaux produits et services basés sur des modèles circulaires. Le renforcement de la transparence, quant à lui, incite les entreprises à communiquer sur leurs pratiques durables et à impliquer davantage les parties prenantes dans leurs décisions stratégiques. L’économie circulaire représente une opportunité majeure pour la Tunisie, combinant croissance économique et durabilité. Son succès repose sur un engagement collectif, un cadre réglementaire adapté et une intégration renforcée de la RSE. En misant sur l’innovation et la collaboration, et en adoptant une approche axée sur la responsabilité sociétale, les entreprises tunisiennes peuvent inscrire la durabilité au cœur de leur stratégie. Cela permettra une transition réussie vers un modèle économique plus résilient, compétitif et en harmonie avec les défis environnementaux et sociaux contemporains.`
  },
  {
    image: startupsImage,
    category: 'ENTREPRENEURIAT',
    date: 'July 15, 2025',
    title: 'L’essor des startups tunisiennes face aux défis du marché',
    content: `L’entrepreneuriat en Tunisie est devenu un moteur clé du développement économique, favorisant la création d’emplois et l’émergence d’idées novatrices. Grâce à une population jeune et ambitieuse, ce secteur représente une véritable opportunité pour diversifier l’économie et stimuler une croissance durable. Longtemps considéré comme marginal, il prend aujourd’hui une ampleur significative. Bien que confrontés à de nombreux défis, les jeunes entrepreneurs tunisiens sont déterminés à s’investir dans des projets créatifs et innovants, convaincus du potentiel de leur pays. Toutefois, entreprendre en Tunisie n’est pas un parcours sans embûches. Les obstacles sont multiples et touchent divers aspects de la vie entrepreneuriale. La bureaucratie et la complexité des démarches administratives constituent l’un des premiers freins. Créer une entreprise peut s’avérer être un véritable casse-tête en raison des procédures longues et contraignantes. Ces lourdeurs administratives découragent de nombreux jeunes entrepreneurs qui souhaiteraient consacrer leur énergie à l’innovation et au développement de leur projet. L’accès au financement est un autre défi majeur. Les banques, souvent frileuses à l’idée de soutenir des projets jugés risqués, hésitent à accorder des prêts aux startups. Bien que des initiatives publiques existent pour encourager l’entrepreneuriat, les fonds alloués restent parfois insuffisants face à une demande croissante. Ce manque de financement place de nombreuses jeunes entreprises dans une situation délicate, où leur succès dépend largement de leur capacité à mobiliser des ressources financières. L’internationalisation constitue également un obstacle de taille. Se faire une place sur les marchés étrangers est un défi complexe, entravé par des barrières commerciales, le manque de réseaux internationaux et l’absence de soutien structuré à l’exportation. Cette difficulté limite considérablement le potentiel de croissance des startups tunisiennes, qui peinent à s’imposer au-delà des frontières nationales. Malgré ces défis, l’écosystème entrepreneurial tunisien recèle de nombreuses opportunités. La transformation numérique représente un levier majeur de développement. Grâce à la digitalisation, les startups ont la possibilité de toucher un public plus large et d’intégrer un environnement dynamique propice à l’innovation. Des secteurs comme l’e-commerce, la fintech ou encore l’edtech connaissent un essor important, offrant ainsi de nouvelles perspectives aux jeunes entrepreneurs. Le capital humain tunisien est un autre atout indéniable. Chaque année, des milliers de diplômés en ingénierie, technologies de l’information et intelligence artificielle sortent des grandes écoles et universités du pays. Ces talents qualifiés représentent une ressource précieuse pour les startups, leur permettant de développer des solutions innovantes et d’assurer une croissance durable. L’accompagnement institutionnel, bien qu’imparfait, joue un rôle crucial dans la structuration du secteur. Des initiatives comme le Startup Act offrent des incitations fiscales et des solutions de financement adaptées aux besoins des jeunes entreprises. Ce cadre législatif vise à encourager l’innovation et à faciliter le développement des startups, en leur offrant des conditions plus favorables pour prospérer. Ce qui distingue particulièrement les startups tunisiennes, c’est leur capacité de résilience. Malgré un environnement économique parfois hostile, un accès limité aux financements et des barrières administratives pesantes, elles parviennent à s’adapter et à se réinventer. Cette ténacité leur permet de surmonter les crises et de faire face aux nombreux défis qui jalonnent leur parcours. Elles font preuve d’une grande créativité pour contourner les obstacles, en développant des solutions alternatives et en misant sur des collaborations internationales. Ces alliances stratégiques leur permettent d’élargir leur réseau, d’accéder à de nouveaux marchés et de bénéficier d’un accompagnement plus structuré. La résilience des startups tunisiennes repose ainsi sur une volonté constante d’apprendre, d’innover et de transformer chaque difficulté en opportunité de croissance. Les startups tunisiennes illustrent parfaitement le potentiel de l’entrepreneuriat dans un pays en pleine mutation. Malgré les nombreux défis qu’elles doivent affronter, elles démontrent qu’avec de la détermination, de l’innovation et un écosystème en amélioration, il est possible de réussir et de contribuer activement au développement économique du pays. Avec un accompagnement renforcé et des réformes adaptées, ces jeunes entreprises ont toutes les cartes en main pour prospérer et jouer un rôle clé dans l’avenir économique de la Tunisie.`
  }
];

const Section3 = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const handleCardClick = (article) => setSelectedArticle(article);
  const handleClose = () => setSelectedArticle(null);

  return (
    <section 
      className={`articles-section ${inView ? 'visible' : ''} ${selectedArticle ? 'detail-view-active' : ''}`}
      ref={ref}
    >
      <div className="articles-container">
        <div className="articles-header">
          <h2>
            Découvrez nos analyses exclusives à travers <span className="text-orange">des articles phares</span>
          </h2>
        </div>

        <div className="articles-grid">
          {articlesData.map((article, index) => (
            <div 
              className="article-card"
              key={index} 
              onClick={() => handleCardClick(article)}
            >
              <div className="article-card-inner">
                <div className="card-background" style={{ backgroundImage: `url(${article.image})` }}></div>
                <div className="card-overlay"></div>
                <div className="card-content">
                  <span className="category-tag">{article.category}</span>
                  <div className="card-footer">
                    <p className="article-date">{article.date}</p>
                    <h3 className="article-title">{article.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`article-detail-view ${selectedArticle ? 'open' : ''}`}>
        {selectedArticle && (
          <>
            <div className="detail-image-background" style={{ backgroundImage: `url(${selectedArticle.image})` }}></div>
            <div className="detail-content-overlay">
              <div className="detail-content">
                <button className="close-button" onClick={handleClose}><FaArrowLeft /> Retour</button>
                <span className="category-tag detail-category">{selectedArticle.category}</span>
                <h2 className="detail-title">{selectedArticle.title}</h2>
                <p className="detail-date">{selectedArticle.date}</p>
                <div className="detail-text-wrapper">
                  <p className="detail-text">{selectedArticle.content}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Section3;