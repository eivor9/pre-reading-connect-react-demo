import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function BookmarkNewForm() {
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState({
    name: "",
    isFavorite: false,
    category: "",
    url: ""
  });

  // Add a bookmark, return to the index view
  const addBookmark = () => {
    fetch(`${API}/bookmarks`, {
      method: "POST",
      body: JSON.stringify(bookmark),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate(`/bookmarks`);
      })
      .catch((error) => console.error("catch", error));
  };

  const handleTextChange = (event) => {
    setBookmark({ ...bookmark, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setBookmark({ ...bookmark, isFavorite: !bookmark.isFavorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addBookmark();
  };

  return (
    <div className="New">
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
          checked={bookmark.isFavorite}
        />
        <br />
        <br />
        <button>Submit</button>
      </form>
      <br />
      <Link to={`/colors`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default BookmarkNewForm;
