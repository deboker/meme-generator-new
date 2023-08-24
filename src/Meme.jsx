import React from "react";
import {
  drawTextWithShadow,
  createAndDownloadBlob,
} from "./utility/canvasUtils";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/2bc2vf.jpg",
  });
  const [allMemes, setAllMemes] = React.useState([]);

  let memeImage;

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function handleSave() {
    if (!memeImage) return;

    const memeCanvas = document.createElement("canvas");
    memeCanvas.width = memeImage.naturalWidth;
    memeCanvas.height = memeImage.naturalHeight;
    const ctx = memeCanvas.getContext("2d");

    ctx.drawImage(memeImage, 0, 0);

    drawTextWithShadow(ctx, meme.topText, memeCanvas.width / 2, 40);
    drawTextWithShadow(
      ctx,
      meme.bottomText,
      memeCanvas.width / 2,
      memeCanvas.height - 20
    );

    createAndDownloadBlob(memeCanvas, "meme.png");
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img
          src={meme.randomImage}
          className="meme--image"
          crossOrigin="anonymus"
          ref={(img) => {
            memeImage = img; // Store to meme image
          }}
        />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
      <div className="button-container">
        <button className="form--button" onClick={handleSave}>
          Save
        </button>
      </div>
    </main>
  );
}
