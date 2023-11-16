const img_api = "http://image.tmdb.org/t/p/w500/";
const Api = ({ title, poster_path, overview, vote_average }) => (
  <div className="movie">
    <div className="header">
      <img src={img_api + poster_path} alt={title} />
    </div>
    <div className="title">
      <h3>{title}</h3>
      <span>{vote_average}</span>
    </div>
  </div>
);
export default Api;
