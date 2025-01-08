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
          const { track_name, artist_name, year, artwork_url, album_name } = song;
          return (
            <li className={styles.item} key={`result-${index}`}>
              <img className={styles.cover} src={artwork_url} />
              <div className={styles.content}>
                <div className={styles.track}>{track_name}</div>
                <div className={styles.content}>
                  <span>{album_name}</span>
                  <span> by {artist_name}</span>
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
