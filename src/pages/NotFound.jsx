import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="kicker">404</p>
        <h1 className="display">This page is quiet.</h1>
        <p className="lede">It is not here. The rest of the house is.</p>
      </header>
      <Link className="btn btn-primary" to="/">Home</Link>
    </div>
  );
}
