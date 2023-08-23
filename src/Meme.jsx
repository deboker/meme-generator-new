import React from "react";

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
    if (!memeImage) return; // Check if memeImage is defined

    const memeCanvas = document.createElement("canvas");
    memeCanvas.width = memeImage.width;
    memeCanvas.height = memeImage.height;
    const ctx = memeCanvas.getContext("2d");

    ctx.drawImage(memeImage, 0, 0);

    const shadowOffset = 2; // Adjust this value for desired shadow offset

    // Draw top text with shadow
    ctx.font = "bold 30px impact";
    ctx.fillStyle = "black"; // Shadow color
    ctx.textAlign = "center";
    ctx.fillText(
      meme.topText,
      memeCanvas.width / 2 + shadowOffset,
      40 + shadowOffset
    );

    // Draw top text
    ctx.font = "bold 30px impact";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(meme.topText, memeCanvas.width / 2, 40);

    // Draw bottom text with shadow
    ctx.font = "bold 30px impact";
    ctx.fillStyle = "black"; // Shadow color
    ctx.textAlign = "center";
    ctx.fillText(
      meme.bottomText,
      memeCanvas.width / 2 + shadowOffset,
      memeCanvas.height - 20 + shadowOffset
    );

    // Draw bottom text
    ctx.font = "bold 30px impact";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(meme.bottomText, memeCanvas.width / 2, memeCanvas.height - 20);

    // Convert the canvas to a data URL and create a blob
    memeCanvas.toBlob((blob) => {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "meme.png";
      downloadLink.click();

      // Clean up the object URL after the download
      URL.revokeObjectURL(downloadLink.href);
    }, "image/png");
  }

  function handleShare() {
    if (!memeImage) return;

    const memeCanvas = document.createElement("canvas");
    memeCanvas.width = memeImage.width;
    memeCanvas.height = memeImage.height;
    const ctx = memeCanvas.getContext("2d");

    ctx.drawImage(memeImage, 0, 0);

    ctx.font = "bold 30px impact";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(meme.topText, memeCanvas.width / 2, 40);
    ctx.fillText(meme.bottomText, memeCanvas.width / 2, memeCanvas.height - 20);

    const shareData = {
      files: [memeCanvas.toDataURL("image/png")],
      text: "Check out this awesome meme I made!",
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData);
    } else {
      console.log("Sharing is not supported on this platform.");
    }
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
        <button className="form--button" onClick={handleShare}>
          Share
        </button>
      </div>
    </main>
  );
}
