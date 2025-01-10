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

const convertMin = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const List = ({ data, xKey, xLabel }) => {
  return (
  <div className="top-tracks-list">
    {data.map((track, index) => {
      let value;
      if (xKey === "duration_ms") {
        value = convertMin(track[xKey]) + "min";
      } else if (xKey === "acousticness") {
        value = ((( 1 - track["energy"]) * 0.5 + track["valence"] * 0.5) * 100).toFixed(2);
      } else if (xKey === "danceability") {
        value = (track[xKey] * 100).toFixed(2);
      } else {
        value = track[xKey];
      }
      return (
        <TrackItem 
          key={index} 
          rank={index + 1} 
          name={track.name} 
          artists={track.artists} 
          artwork={track.artwork_url} 
          stats={`${xLabel}: ${value}`}
        />
      );
    })}
  </div>
  )
}

export default List
