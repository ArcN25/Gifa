import { useState } from "react";
import "./index.css";
const gf = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.MY_API_KEY}&limit=20&offset=4&q=`;

const App = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [style, setStyle] = useState(false);

  let findGif = () => {
    fetch(gf + search)
      .then((response) => response.json())
      .then((content) => {
        setResult(
          content.data.map((gif) => {
            return gif.images.fixed_height.url;
          })
        );
        console.log(content.data);
        console.log("META", content.meta);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const inputHandling = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      findGif();
      setStyle(true);
    }
  };

  const handleClick = (e) => {
    setStyle(true);
  };

  return (
    <div className="App">
      <h1>GIFA</h1>
      <input
        className="input-style"
        value={search}
        className={style ? "styleTrue" : "styleFalse"}
        onKeyUp={inputHandling}
        placeholder="search the gif"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <button
        className={style ? "styleTrue" : "styleFalse"}
        onClick={function () {
          findGif();
          handleClick();
        }}
        className="btn"
      >
        search
      </button>
      <div className="list">
        {result.map((gif) => {
          return (
            <div className="item">
              <img src={gif} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
