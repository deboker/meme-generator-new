import React from "react"
import image1 from "./assets/troll-face.png"

export default function Header() {
    return (
        <header className="header">
            <img 
                src={image1} 
                className="header--image"
            />
            <h2 className="header--title">Meme Generator</h2>
            <h4 className="header--project">Have some fun 😛</h4>
        </header>
    )
}