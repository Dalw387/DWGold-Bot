import { Link, useParams } from "react-router-dom";
import VideoStage from "../components/VideoStage.jsx";
import { allFilms } from "../content/site.js";

const cats = [...new Set(allFilms.map((f) => f.category))];

export default function Watch() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">Watch Kiwi</p>
        <h1 className="display">Read it. Watch it. Experience it.</h1>
        <p className="lede">
          Every important product has a film. Designed as architecture, not an embedded rectangle.
        </p>
      </header>
      {cats.map((cat) => (
        <section key={cat} style={{ marginBottom: "4rem" }}>
          <p className="kicker">{cat}</p>
          <div className="watch-list">
            {allFilms.filter((f) => f.category === cat).map((f) => (
              <Link key={f.slug} to={`/watch/${f.slug}`}>
                <strong>{f.title}</strong>
                <span>{f.duration} · {f.summary}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function WatchFilm() {
  const { slug } = useParams();
  const film = allFilms.find((f) => f.slug === slug);
  if (!film) {
    return (
      <div className="page">
        <h1 className="display-md">This film is not in the library.</h1>
        <Link className="btn btn-text" to="/watch">Watch Kiwi</Link>
      </div>
    );
  }
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">{film.category}</p>
        <h1 className="display-md">{film.title}</h1>
        <p className="lede">{film.summary}</p>
      </header>
      <VideoStage film={film} />
      <div className="actions">
        <Link className="btn btn-ghost" to="/watch">Library</Link>
        <Link className="btn btn-primary" to="/build">Start a project</Link>
      </div>
    </div>
  );
}
