import React, { useState } from 'react';
import { 
  RiDashboardLine, 
  RiMusicLine,
  RiCloseLine
} from 'react-icons/ri';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import HeatmapChart from './charts/HeatmapChart';
import CurvedLineChart from './charts/CurvedLineChart';
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
  useTop10Longest
} from '../hooks/useApi';

// Composants utilitaires
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
  const content = (
    <>
      <h3 className="widget-title">{title}</h3>
      <div className="widget-content">{children}</div>
    </>
  );

  if (expanded) {
    return (
      <div className="expanded-widget-overlay" onClick={() => onExpand()}>
        <div className="expanded-widget" onClick={e => e.stopPropagation()}>
          <button className="close-button" onClick={() => onExpand()}>
            <RiCloseLine size={24} />
          </button>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={`widget ${className}`} onClick={onExpand}>
      {content}
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

// Fonctions utilitaires
const renderWidgetContent = (isLoading, error, content) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Erreur lors du chargement des données" />;
  return content;
};

const transformTrackData = (data) => {
  if (!data?.songsByYear) return [];
  return Object.entries(data.songsByYear).map(([year, count]) => ({
    year: parseInt(year),
    count
  }));
};

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [expandedWidget, setExpandedWidget] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  
  // Récupération des données avec un objet pour une meilleure organisation
  const apiData = {
    tracks: useTracksByYear(),
    artists: useTracksByArtistYear(selectedYear),
    acousticness: useAcousticnessByYear(),
    danceability: useDanceabilityByYear(),
    danceValence: useDanceabilityAndValence(),
    popularityTempo: usePopularityByTempo(),
    top10Popular: useTop10Popular(),
    top10Dance: useTop10Dance(),
    top10Relaxing: useTop10Relaxing(),
    popularityLanguage: usePopularityByLanguage(),
    top10Longest: useTop10Longest()
  };

  const handleExpand = (widgetId) => {
    setExpandedWidget(expandedWidget === widgetId ? null : widgetId);
  };

  const handleYearChange = (newYear) => {
    if (newYear && /^\d{4}$/.test(newYear)) {
      setSelectedYear(newYear);
    }
  };

  const renderTrackList = (tracks, statKey, statLabel) => (
    <div className="top-tracks-list">
      {tracks.map((track, index) => (
        <TrackItem 
          key={index}
          rank={index + 1}
          name={track.name}
          artists={track.artists}
          artwork={track.artwork_url}
          stats={`${statLabel}: ${track[statKey]}`}
        />
      ))}
    </div>
  );

  const kpisGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '20px',
  };

  const sectionContentStyle = {
    marginBottom: '40px',
  };

  return (
    <div className="app-container" style={{display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden'}}>
      <div className="main-content" style={{flex: 1, width: '100%', padding: '20px', overflowY: 'auto'}}>
        <header className="header">
          <div className="logo-container">
            <SpotifyLogo />
          </div>
          <h1>Tableau de Bord Statistique </h1>
        </header>

        <div className="dashboard-grid">
          <div className="kpis-section">
            <div className="section">
              <h2 className="section-title">Évolution Temporelle</h2>
              <div className="section-content" style={sectionContentStyle}>
                <div className="kpis-grid" style={kpisGridStyle}>
                  <Widget 
                    title="Évolution du Nombre de Titres par Année" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('tracksYear')}
                    expanded={expandedWidget === 'tracksYear'}
                  >
                    {renderWidgetContent(
                      apiData.tracks.isLoading,
                      apiData.tracks.error,
                      <LineChart 
                        data={transformTrackData(apiData.tracks.data)}
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
                    {renderWidgetContent(
                      apiData.artists.isLoading,
                      apiData.artists.error,
                      apiData.artists.data?.songsPerArtist ? (
                        <BarChart 
                          data={Object.entries(apiData.artists.data.songsPerArtist)
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
                      )
                    )}
                  </Widget>

                  <Widget 
                    title="Caractéristiques Musicales" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('features')}
                    expanded={expandedWidget === 'features'}
                  >
                    {renderWidgetContent(
                      apiData.acousticness.isLoading || apiData.danceability.isLoading,
                      apiData.acousticness.error || apiData.danceability.error,
                      <CurvedLineChart 
                        data={Object.entries(apiData.acousticness.data?.average_acousticness || {}).map(([year, value]) => ({
                          year: parseInt(year),
                          acousticness: value,
                          danceability: apiData.danceability.data?.average_danceability[year] || 0
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
                    {renderWidgetContent(
                      apiData.danceValence.isLoading,
                      apiData.danceValence.error,
                      apiData.danceValence.data?.data ? (
                        <HeatmapChart 
                          data={apiData.danceValence.data.data}
                          maxDensity={apiData.danceValence.data.maxDensity}
                          title="Corrélation entre Dansabilité et Positivité"
                          xLabel="Dansabilité (0-1)"
                          yLabel="Positivité (0-1)"
                          expanded={expandedWidget === 'danceValence'}
                        />
                      ) : (
                        <div className="placeholder">Aucune donnée disponible</div>
                      )
                    )}
                  </Widget>

                  <Widget 
                    title="Impact du Tempo sur la Popularité" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('popularityTempo')}
                    expanded={expandedWidget === 'popularityTempo'}
                  >
                    {renderWidgetContent(
                      apiData.popularityTempo.isLoading,
                      apiData.popularityTempo.error,
                      apiData.popularityTempo.data?.data ? (
                        <LineChart 
                          data={apiData.popularityTempo.data.data}
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
                      )
                    )}
                  </Widget>

                  <Widget 
                    title="Popularité par Langue" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('popularityLanguage')}
                    expanded={expandedWidget === 'popularityLanguage'}
                  >
                    {renderWidgetContent(
                      apiData.popularityLanguage.isLoading,
                      apiData.popularityLanguage.error,
                      apiData.popularityLanguage.data?.popularity_per_language ? (
                        <BarChart 
                          data={Object.entries(apiData.popularityLanguage.data.popularity_per_language)
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
                      )
                    )}
                  </Widget>
                </div>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">Top Morceaux</h2>
              <div className="section-content" style={sectionContentStyle}>
                <div className="kpis-grid" style={kpisGridStyle}>
                  <Widget 
                    title="Top 10 des Titres les Plus Populaires" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('topPopular')}
                    expanded={expandedWidget === 'topPopular'}
                  >
                    {renderWidgetContent(
                      apiData.top10Popular.isLoading,
                      apiData.top10Popular.error,
                      apiData.top10Popular.data ? (
                        renderTrackList(apiData.top10Popular.data, 'popularity', 'Popularité')
                      ) : (
                        <div className="placeholder">Données non disponibles</div>
                      )
                    )}
                  </Widget>

                  <Widget 
                    title="Top 10 des Titres les Plus Dansants" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('topDance')}
                    expanded={expandedWidget === 'topDance'}
                  >
                    {renderWidgetContent(
                      apiData.top10Dance.isLoading,
                      apiData.top10Dance.error,
                      apiData.top10Dance.data ? (
                        renderTrackList(apiData.top10Dance.data, 'danceability', 'Dansabilité')
                      ) : (
                        <div className="placeholder">Données non disponibles</div>
                      )
                    )}
                  </Widget>

                  <Widget 
                    title="Top 10 des Titres les Plus Relaxants" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('topRelax')}
                    expanded={expandedWidget === 'topRelax'}
                  >
                    {renderWidgetContent(
                      apiData.top10Relaxing.isLoading,
                      apiData.top10Relaxing.error,
                      apiData.top10Relaxing.data ? (
                        renderTrackList(apiData.top10Relaxing.data, 'acousticness', 'Acoustique')
                      ) : (
                        <div className="placeholder">Données non disponibles</div>
                      )
                    )}
                  </Widget>

                  <Widget 
                    title="Top 10 des Morceaux les Plus Longs" 
                    className="kpi-widget"
                    onExpand={() => handleExpand('topLongest')}
                    expanded={expandedWidget === 'topLongest'}
                  >
                    {renderWidgetContent(
                      apiData.top10Longest.isLoading,
                      apiData.top10Longest.error,
                      apiData.top10Longest.data ? (
                        renderTrackList(apiData.top10Longest.data, 'duration_ms', 'Durée')
                      ) : (
                        <div className="placeholder">Données non disponibles</div>
                      )
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
