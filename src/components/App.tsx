import React from "react";
import { Logo } from "./Logo";
import { Map } from "./Map";

import "./style.css";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <Map style={{ height: "inherit", width: "inherit" }} />
      <div className="sidebar">
        <div className="sidebar-content">
          <Logo logo="4khd" className="logo" />
          <div
            style={{
              fontFamily: "helvetica",
              padding: 20,
              overflow: "hidden",
              textJustify: "inter-word",
            }}
          >
            {`Who is Igor? Igor is a digital avatar born from the minds of 4KHD, a
          collective that plays with irony, the digital domain, and sports. He
          has decided to travel with his bike in a scripted fashion, with only
          code telling him where to go. His mission is that of bringing a new
          aesthetic to its sport, coded in his “anti-chad manifesto”. Where is
          Igor? Our digital friend still cycling around Europe, and you can read
          the daily bulletin on twitter to know his daily stats, along with
          other fun bots. This is “Cyclobrowsing”.`}
          </div>
          <Logo logo="cyclobrowsing" className="cyclobrowsing" />
        </div>
      </div>
    </div>
  );
}

export default App;
