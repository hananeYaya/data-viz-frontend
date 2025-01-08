import styles from "./index.module.css";

export const List = ({ content, title, label }) => {
  const { results, isLoading } = content;
  if (isLoading) return <div>Loading...</div>;

  console.log(results);

  return (
    <div>
      <h2>{title}</h2>
      <span>{label}</span>
      <ul className={styles.list}>
        {results.map((song, index) => {
          const { track_name, artist_name, year, artwork_url, album_name, danceability } = song;
          return (
            <li className={styles.item} key={`result-${index}`}>
              <img className={styles.cover} src={artwork_url} />
              <div className={styles.content}>
                <div className={styles.track}>{index + 1}. {track_name}</div>
                <div className={styles.texts}>
                  <span>Album {album_name} by </span>
                  <span>{artist_name}</span>
                  <p>{year}</p>
                  <p>Danceability score: {danceability * 100}/100</p>
                  {/* Faire une barre de progression avec le pourcentage rempli de danceabilité*/}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
