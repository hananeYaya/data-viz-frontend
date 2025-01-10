import React, { useState } from 'react';
import { 
  RiDashboardLine, 
  RiMusicLine,
  RiBarChartLine, 
  RiHeartLine, 
  RiSettings4Line,
  RiCloseLine
} from 'react-icons/ri';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import HeatmapChart from './charts/HeatmapChart';
import CurvedLineChart from './charts/CurvedLineChart';
import PieChart from './charts/PieChart';
import DoughnutChart from './charts/DoughnutChart';
import {
  useTracksByYear,
  useTracksByArtistYear,
  useAcousticnessByYear,
  useDanceabilityByYear,
  useDanceabilityAndValence,
  usePopularityByTempo,
  useTop10Popular,
  useTop10Dance,
  useTop10Relaxing,
  usePopularityByLanguage,
  useTop10Longest,
  useMode,
  useKey
} from '../hooks/useApi';

// Composant pour le logo Spotify
const SpotifyLogo = () => (
  <img 
    src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
    alt="Spotify Logo"
    className="spotify-logo"
  />
);

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div 
    className={`sidebar-item ${active ? 'active' : ''}`}
    onClick={onClick}
  >
    <span className="icon">{icon}</span>
    <span className="label">{label}</span>
  </div>
);

const YearInput = ({ value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue && !isNaN(inputValue) && inputValue >= 1900 && inputValue <= new Date().getFullYear()) {
      onChange(inputValue);
    }
  };

  return (
    <form className="year-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
    </form>
  );
};

const Widget = ({ title, children, className = '', onExpand, expanded }) => {
  if (expanded) {
    return (
      <div className="expanded-widget-overlay" onClick={() => onExpand()}>
        <div className="expanded-widget" onClick={e => e.stopPropagation()}>
          <button className="close-button" onClick={() => onExpand()}>
            <RiCloseLine size={24} />
          </button>
          <h3 className="widget-title">{title}</h3>
          <div className="widget-content">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`widget ${className}`} onClick={onExpand}>
      <h3 className="widget-title">{title}</h3>
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <span className="error-icon">⚠️</span>
    <p>{message}</p>
  </div>
);

const TrackItem = ({ rank, name, artists, artwork, stats }) => (
  <div className="track-item">
    <div className="track-rank">{rank}</div>
    {artwork && (
      <div className="track-artwork">
        <img src={artwork} alt={name} />
      </div>
    )}
    <div className="track-info">
      <div className="track-name">{name}</div>
      <div className="track-artists">{artists}</div>
      {stats && <div className="track-stats">{stats}</div>}
    </div>
  </div>
);

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [expandedWidget, setExpandedWidget] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  
  // Récupération des données
  const { data: tracksByYear, isLoading: isLoadingTracks, error: tracksError } = useTracksByYear();
  const { data: artistTracks, isLoading: isLoadingArtist, error: artistError } = useTracksByArtistYear(selectedYear);
  const { data: acousticnessData, isLoading: isLoadingAcousticness, error: acousticnessError } = useAcousticnessByYear();
  const { data: danceabilityData, isLoading: isLoadingDanceability, error: danceabilityError } = useDanceabilityByYear();
  const { data: danceValenceData, isLoading: isLoadingDanceValence, error: danceValenceError } = useDanceabilityAndValence();
  const { data: popularityTempoData, isLoading: isLoadingPopTempo, error: popTempoError } = usePopularityByTempo();
  const { data: top10Popular, isLoading: isLoadingTop10Popular, error: top10PopularError } = useTop10Popular();
  const { data: top10Dance, isLoading: isLoadingTop10Dance, error: top10DanceError } = useTop10Dance();
  const { data: top10Relaxing, isLoading: isLoadingTop10Relaxing, error: top10RelaxingError } = useTop10Relaxing();
  const { data: popularityLanguageData, isLoading: isLoadingPopLanguage, error: popLanguageError } = usePopularityByLanguage();
  const { data: top10Longest, isLoading: isLoadingTop10Longest, error: top10LongestError } = useTop10Longest();
  const { data: mode, isLoading: isLoadingMode, error: modeError} = useMode();
  const { data: key, isLoading: isLoadingKey, error: keyError} = useKey();

  const handleExpand = (widgetId) => {
    setExpandedWidget(expandedWidget === widgetId ? null : widgetId);
  };

  const handleYearChange = (newYear) => {
    if (newYear && /^\d{4}$/.test(newYear)) {
      setSelectedYear(newYear);
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo-container">
          <SpotifyLogo />
        </div>
        <div className="sidebar-items">
          <SidebarItem 
            icon={<RiDashboardLine />}
            label="Dashboard" 
            active={activeSection === 'dashboard'} 
            onClick={() => setActiveSection('dashboard')}
          />
          <SidebarItem 
            icon={<RiMusicLine />}
            label="Top Tracks" 
            active={activeSection === 'tracks'} 
            onClick={() => setActiveSection('tracks')}
          />
        </div>
      </div>

      <div className="main-content">
        <header className="header">
          <h1>Analyse des Données Spotify</h1>
        </header>

        <div className="dashboard-grid">
          <div className="kpis-section">
            <div className="section">
              <h2 className="section-title">Évolution Temporelle</h2>
              <div className="section-content">
                <div className="kpis-grid">
                  <Widget 
                    title="Évolution du Nombre de Titres par Année" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('tracksYear')}
                    expanded={expandedWidget === 'tracksYear'}
                  >
                    {isLoadingTracks ? (
                      <LoadingSpinner />
                    ) : tracksError ? (
                      <ErrorMessage message="Erreur lors du chargement des données" />
                    ) : (
                      <LineChart 
                        data={Object.entries(tracksByYear?.songsByYear || {}).map(([year, count]) => ({
                          year: parseInt(year),
                          count: count
                        }))}
                        xKey="year"
                        yKey="count"
                        title="Nombre de Titres par Année"
                        xLabel="Année"
                        yLabel="Nombre de Titres"
                        expanded={expandedWidget === 'tracksYear'}
                        variant="smooth"
                      />
                    )}
                  </Widget>

                  <Widget 
                    title="Top 10 Artistes par Année" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('artistYear')}
                    expanded={expandedWidget === 'artistYear'}
                  >
                    <YearInput
                      value={selectedYear}
                      onChange={handleYearChange}
                      placeholder="Entrez une année..."
                    />
                    {isLoadingArtist ? (
                      <LoadingSpinner />
                    ) : artistError ? (
                      <ErrorMessage message="Erreur lors du chargement des données" />
                    ) : artistTracks?.songsPerArtist ? (
                      <BarChart 
                        data={Object.entries(artistTracks.songsPerArtist)
                          .map(([artist, count]) => ({
                            artist,
                            count
                          }))}
                        xKey="artist"
                        yKey="count"
                        title={`Top 10 Artistes en ${selectedYear}`}
                        xLabel="Artiste"
                        yLabel="Nombre de Titres"
                        expanded={expandedWidget === 'artistYear'}
                      />
                    ) : (
                      <div className="placeholder">Entrez une année pour voir les données</div>
                    )}
                  </Widget>

                  <Widget 
                    title="Caractéristiques Musicales" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('features')}
                    expanded={expandedWidget === 'features'}
                  >
                    {isLoadingAcousticness || isLoadingDanceability ? (
                      <LoadingSpinner />
                    ) : acousticnessError || danceabilityError ? (
                      <ErrorMessage message="Erreur lors du chargement des données" />
                    ) : (
                      <CurvedLineChart 
                        data={Object.entries(acousticnessData?.average_acousticness || {}).map(([year, value]) => ({
                          year: parseInt(year),
                          acousticness: value,
                          danceability: danceabilityData?.average_danceability[year] || 0
                        }))}
                        xKey="year"
                        yKeys={["acousticness", "danceability"]}
                        labels={["Acoustique", "Dansabilité"]}
                        title="Évolution des Caractéristiques Musicales"
                        xLabel="Année"
                        yLabel="Score (0-1)"
                        expanded={expandedWidget === 'features'}
                      />
                    )}
                  </Widget>

                  <Widget 
                    title="Relation Dansabilité et Positivité" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('danceValence')}
                    expanded={expandedWidget === 'danceValence'}
                  >
                    {isLoadingDanceValence ? (
                      <LoadingSpinner />
                    ) : danceValenceError ? (
                      <ErrorMessage message="Erreur lors du chargement des données" />
                    ) : danceValenceData?.data ? (
                      <HeatmapChart 
                        data={danceValenceData.data}
                        maxDensity={danceValenceData.maxDensity}
                        title="Corrélation entre Dansabilité et Positivité"
                        xLabel="Dansabilité (0-1)"
                        yLabel="Positivité (0-1)"
                        expanded={expandedWidget === 'danceValence'}
                      />
                    ) : (
                      <div className="placeholder">Aucune donnée disponible</div>
                    )}
                  </Widget>

                  <Widget 
                    title="Impact du Tempo sur la Popularité" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('popularityTempo')}
                    expanded={expandedWidget === 'popularityTempo'}
                  >
                    {isLoadingPopTempo ? (
                      <LoadingSpinner />
                    ) : popTempoError ? (
                      <ErrorMessage message="Erreur lors du chargement des données" />
                    ) : popularityTempoData?.data ? (
                      <LineChart 
                        data={popularityTempoData.data}
                        xKey="tempo"
                        yKey="popularity"
                        title="Impact du Tempo sur la Popularité"
                        xLabel="Tempo (BPM)"
                        yLabel="Popularité moyenne"
                        expanded={expandedWidget === 'popularityTempo'}
                        variant="smooth"
                      />
                    ) : (
                      <div className="placeholder">Aucune donnée disponible</div>
                    )}
                  </Widget>

                  <Widget 
                    title="Popularité par Langue" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('popularityLanguage')}
                    expanded={expandedWidget === 'popularityLanguage'}
                  >
                    {isLoadingPopLanguage ? (
                      <LoadingSpinner />
                    ) : popLanguageError ? (
                      <ErrorMessage message="Erreur lors du chargement des données" />
                    ) : popularityLanguageData?.popularity_per_language ? (
                      <BarChart 
                        data={Object.entries(popularityLanguageData.popularity_per_language)
                          .map(([language, popularity]) => ({
                            language: language || 'Inconnu',
                            popularity: Math.round(popularity)
                          }))}
                        xKey="language"
                        yKey="popularity"
                        title="Popularité moyenne par langue"
                        xLabel="Langue"
                        yLabel="Popularité"
                        expanded={expandedWidget === 'popularityLanguage'}
                      />
                    ) : (
                      <div className="placeholder">Aucune donnée disponible</div>
                    )}
                  </Widget>
                  <Widget 
                    title="Modalité du track (Major vs Minor)" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('mode')}
                    expanded={expandedWidget === 'mode'}
                  >
                    {isLoadingMode ? (
                      <LoadingSpinner />
                    ) : modeError ? (
                      <ErrorMessage message="Erreur lors du chargement des données" />
                    ) : mode?.items ? (
                      <PieChart
                        data={Object.entries(mode.items).map(([key, value]) => ({
                          label: key,
                          value: value
                        }))}
                        title="Distribution du Mode (Major vs Minor)"
                        colors={['#1ed760', '#d14f21']}
                        expanded={expandedWidget === 'mode'}
                      />
                    ) : (
                      <div className="placeholder">Aucune donnée disponible</div>
                    )}
                  </Widget>
                  <Widget
                    title="Tonalité musicale du track"
                    className="kpi-widget"
                    onExpand={() => handleExpand('key')}
                    expanded={expandedWidget === 'key'}
                  >
                    {isLoadingKey ? (
                      <LoadingSpinner />
                    ) : keyError ? (
                      <ErrorMessage message="Erreur lors du chargement des données" />
                    ) : key?.items ? (
                      <DoughnutChart
                        data={Object.entries(key.items).map(([key, value]) => ({
                          label: key,
                          value: value
                        }))}
                        title="La tonalité musicale"
                        colors={[
                          '#1ed760', '#1fdf6f', '#d14f21', '#b10f2e', '#f39c12',
                          '#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#e67e22',
                          '#ecf0f1', '#95a5a6'
                        ]}
                        expanded={expandedWidget === 'key'}
                      />
                    ) : (
                      <div className="placeholder">Aucune donnée disponible</div>
                    )}
                  </Widget>


                </div>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">Top Morceaux</h2>
              <div className="section-content">
                <div className="kpis-grid">
                  <Widget 
                    title="Top 10 des Titres les Plus Populaires" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('topPopular')}
                    expanded={expandedWidget === 'topPopular'}
                  >
                    {isLoadingTop10Popular ? (
                      <LoadingSpinner />
                    ) : top10PopularError ? (
                      <ErrorMessage message="Erreur lors du chargement des données" />
                    ) : top10Popular ? (
                      <div className="top-tracks-list">
                        {top10Popular.map((track, index) => (
                          <TrackItem 
                            key={index} 
                            rank={index + 1} 
                            name={track.name} 
                            artists={track.artists} 
                            artwork={track.artwork_url} 
                            stats={`Popularité: ${track.popularity}`}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="placeholder">Données non disponibles</div>
                    )}
                  </Widget>

                  <Widget 
                    title="Top 10 des Titres les Plus Dansants" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('topDance')}
                    expanded={expandedWidget === 'topDance'}
                  >
                    {isLoadingTop10Dance ? (
                      <LoadingSpinner />
                    ) : top10DanceError ? (
                      <ErrorMessage message="Erreur lors du chargement des données" />
                    ) : top10Dance ? (
                      <div className="top-tracks-list">
                        {top10Dance.map((track, index) => (
                          <TrackItem 
                            key={index} 
                            rank={index + 1} 
                            name={track.name} 
                            artists={track.artists} 
                            artwork={track.artwork_url} 
                            stats={`Dansabilité: ${Math.round(track.danceability * 100)}%`}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="placeholder">Données non disponibles</div>
                    )}
                  </Widget>

                  <Widget 
                    title="Top 10 des Titres les Plus Relaxants" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('topRelax')}
                    expanded={expandedWidget === 'topRelax'}
                  >
                    {isLoadingTop10Relaxing ? (
                      <LoadingSpinner />
                    ) : top10RelaxingError ? (
                      <ErrorMessage message="Erreur lors du chargement des données" />
                    ) : top10Relaxing ? (
                      <div className="top-tracks-list">
                        {top10Relaxing.map((track, index) => (
                          <TrackItem 
                            key={index} 
                            rank={index + 1} 
                            name={track.name} 
                            artists={track.artists} 
                            artwork={track.artwork_url} 
                            stats={`Acoustique: ${Math.round(track.acousticness * 100)}%`}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="placeholder">Données non disponibles</div>
                    )}
                  </Widget>

                  <Widget 
                    title="Top 10 des Morceaux les Plus Longs" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('topLongest')}
                    expanded={expandedWidget === 'topLongest'}
                  >
                    {isLoadingTop10Longest ? (
                      <LoadingSpinner />
                    ) : top10LongestError ? (
                      <ErrorMessage message="Erreur lors du chargement des données" />
                    ) : top10Longest ? (
                      <div className="top-tracks-list">
                        {top10Longest.map((track, index) => (
                          <TrackItem 
                            key={index} 
                            rank={index + 1} 
                            name={track.name} 
                            artists={track.artists} 
                            artwork={track.artwork_url} 
                            stats={`Durée: ${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}`}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="placeholder">Données non disponibles</div>
                    )}
                  </Widget>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
