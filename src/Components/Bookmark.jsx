import { Link } from "react-router-dom";

function Color({ bookmark, index }) {
  return (
    <tr>
      <td>
        {bookmark.isFavorite ? (
          <span>⭐️</span>
        ) : (
          <span>&nbsp; &nbsp; &nbsp;</span>
        )}
      </td>
      <td>
        {bookmark.category}
      </td>
      <td>
        <Link to={`/bookmarks/${index}`}> {bookmark.name}</Link>
      </td>
      <td>
        {" "}
        <a href={bookmark.url} target="_blank">
          <span style={{ backgroundColor: "blue", borderRadius: "50%"}}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </a>
      </td>
    </tr>
  );
}

export default Color;
