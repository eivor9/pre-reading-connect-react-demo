import { useState, useEffect } from "react";
import Bookmark from "./Bookmark";

const API = import.meta.env.VITE_API_URL;

function Colors() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetch(`${API}/bookmarks`)
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => setColors(responseJSON))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="Colors">
      <section>
        <table>
          <thead>
            <tr>
              <th>Favorite</th>
              <th>Category</th>
              <th>Name</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((bookmark, index) => {
              return <Bookmark key={index} bookmark={bookmark} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Colors;
