import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function BookmarkEditForm() {
  let { index } = useParams();
  const navigate = useNavigate();

  const [bookmark, setBookmark] = useState({
    name: "",
    isFavorite: false,
    category: "",
    url: "",
  });

  // Update a color. Redirect to show view
  const updateBookmark = () => {
    fetch(`${API}/bookmarks/${index}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookmark)
    })
    .then(() => {
      navigate(`/`);
    })
    .catch((error) => console.error("bad edit form", error));
  };

  const handleTextChange = (event) => {
    setBookmark({ ...bookmark, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setBookmark({ ...bookmark, isFavorite: !bookmark.isFavorite });
  };

  // On page load, fill in the form with the bookmark data.
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
  }, [index]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBookmark();
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label><br/>
        <input
          id="name"
          value={bookmark.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Site Name"
          required
        /><br/><br/>

        <label htmlFor="category">Category</label><br/>
        <input
          id="category"
          value={bookmark.category}
          type="text"
          onChange={handleTextChange}
          placeholder="What kind of site is this?"
          required
        /><br/><br/>

        <label htmlFor="url">URL</label><br/>
        <input
          id="url"
          value={bookmark.url}
          type="url"
          onChange={handleTextChange}
          required
        /> <br/><br/>

        <label htmlFor="isFavorite">Favorite?</label><br/>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          value={bookmark.isFavorite}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <Link to={`/bookmarks/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default BookmarkEditForm;
