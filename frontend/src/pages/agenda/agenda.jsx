import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { getCached, setCached } from '../../api/contentCache';
import Spinner from '../../components/Spinner/Spinner';
import './agenda.css';

const FALLBACK_DAYS = [
  { key: 'bigDay', label: 'BIG DAY' },
  { key: 'greenTechDay', label: 'GREEN & TECH DAY' },
];

const FALLBACK_ITEMS = [
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

const Agenda = () => {
  const cachedSettings = getCached('/content/settings');
  const cachedAgenda = getCached('/content/agenda');
  const bothCached = !!cachedSettings && !!cachedAgenda;

  const initialDays = cachedSettings?.days?.length > 0 ? cachedSettings.days : FALLBACK_DAYS;
  const initialItems = cachedAgenda?.length > 0 ? cachedAgenda : FALLBACK_ITEMS;

  const [days, setDays] = useState(bothCached ? initialDays : FALLBACK_DAYS);
  const [items, setItems] = useState(bothCached ? initialItems : FALLBACK_ITEMS);
  const [activeTab, setActiveTab] = useState(bothCached ? initialDays[0].key : FALLBACK_DAYS[0].key);
  const [loading, setLoading] = useState(!bothCached);

  useEffect(() => {
    if (bothCached) return;
    let isMounted = true;
    Promise.all([
      axiosClient.get('/content/settings'),
      axiosClient.get('/content/agenda'),
    ])
      .then(([settingsRes, agendaRes]) => {
        if (!isMounted) return;
        setCached('/content/settings', settingsRes.data.data);
        setCached('/content/agenda', agendaRes.data.data);
        const fetchedDays = settingsRes.data.data.days;
        if (fetchedDays && fetchedDays.length > 0) {
          setDays(fetchedDays);
          setActiveTab(fetchedDays[0].key);
        }
        if (agendaRes.data.data.length > 0) {
          setItems(agendaRes.data.data);
        }
      })
      .catch(() => {
        // Le programme reste sur le contenu de secours en cas d'échec réseau.
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [bothCached]);

  const itemsForActiveTab = items
    .filter((i) => i.day === activeTab)
    .sort((a, b) => a.order - b.order);

  const activeDayLabel = days.find((d) => d.key === activeTab)?.label || '';

  return (
    <div className="agenda-container">
      <div className="agenda-header">
        <h1>GET ENTREPRENEURIAL 3.0 <br /><span>Agenda</span></h1>
        <nav className="agenda-nav">
          {!loading && days.map((d) => (
            <button key={d.key} onClick={() => setActiveTab(d.key)} className={activeTab === d.key ? 'active' : ''}>
              {d.label.toUpperCase()}
            </button>
          ))}
        </nav>
      </div>

      <div className="agenda-content" key={activeTab}>
        {loading ? (
          <Spinner />
        ) : itemsForActiveTab.length > 0 ? (
          <div className="timeline-container">
            <ul className="timeline">
              {itemsForActiveTab.map((activity) => (
                <li className="timeline-item" key={activity._id || `${activity.day}-${activity.order}`}>
                  <div className="timeline-time">{activity.time}</div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">{activity.title}</h3>
                    {activity.speakerHtml && <p className="timeline-speaker" dangerouslySetInnerHTML={{ __html: activity.speakerHtml }} />}
                    {activity.descriptionHtml && <div className="timeline-description" dangerouslySetInnerHTML={{ __html: activity.descriptionHtml }} />}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="coming-soon-wrapper">
            <div className="cs-card">
              <h2 className="cs-title">{activeDayLabel}</h2>
              <p className="cs-status">COMING SOON</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agenda;
