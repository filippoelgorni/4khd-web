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
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 200,
          height: "100%",
          backgroundColor: "white",
          borderRight: "2px solid black",
        }}
      >
        <Logo style={{ width: "100%" }} />
        <div
          style={{ fontFamily: "helvetica", padding: 20, overflow: "hidden" }}
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
      </div>
    </div>
  );
}

export default App;
