import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { store } from '../../redux/store'

export const AdminOnlyRoute = ({ children }) => {
  const { email } = useSelector((store) => store["auth"]);

  if (email === "test123@gmail.com") {
    return children;
  }
  //fall back content for non-admin
  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied</h2>
        <p>This page can only be viewed by an Admin user.</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Back To Home</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const { email } = useSelector((store) => store["auth"]);

  if (email === "test123@gmail.com") {
    return children;
  }
  return null;
};
