import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function BookmarkDetails() {
  const [bookmark, setBookmark] = useState({ name: "" });
  let navigate = useNavigate();
  let { index } = useParams();

  // On page load, load color details
  useEffect(() => {
    fetch(`${API}/bookmarks/${index}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        setBookmark(responseJSON);
      })
      .catch(() => {
        navigate("/not-found");
      });
  }, []);

  // Be able to delete a color. Return to index view.
  const handleDelete = () => {
    fetch(`${API}/bookmarks/${index}`, { method: "DELETE" })
      .then(() => {
        navigate(`/bookmarks`);
      })
      .catch((error) => console.error(error));
  };

  return (
    <article
      style={{ border: "1px solid black" }}
      className={null}
    >
      <h3>
        {bookmark.isFavorite ? <span>⭐️</span> : null}
        {bookmark.category}
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        {bookmark.name}
        <a href={bookmark.url} target="_blank">Click here to visit</a>
      </h3>

      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/bookmarks`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/bookmarks/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
          {!bookmark.name ? <h1>No such bookmark</h1> : null}
        </div>
      </div>
    </article>
  );
}

export default BookmarkDetails;
