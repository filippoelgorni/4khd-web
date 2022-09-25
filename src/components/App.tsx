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
          <Logo logo="cyclobrowsing" className="cyclobrowsing" />
          <div
            style={{
              fontFamily: "helvetica",
              padding: 20,
              overflow: "hidden",
              textJustify: "inter-word",
            }}
          >
            {`"MI CHIAMO IGOR COLOMBO E STO PER COMINCIARE UN VIAGGIO INSENSATO.\n
             PEDALERÒ OGNI GIORNO PER RAGGIUNGERE NUOVE COORDINATE…LATITUDINI E LONGITUDINI. NO LIMITE E NO DIREZIONE. \n
             IL MIO UNICO OBIETTIVO È SPINGERE, E SPINGERÒ FINO A QUANDO LA STANCHEZZA NON MI INTORPIDIRÀ LE DITA DEI PIEDI. MI TRASCINERÒ CICLABILE DOPO CICLABILE E POTRETE SEGUIRMI IN QUESTO GESTO….CORRERE CON ME…VIRTUALMENTE\n
             LO SO, IL MIO ASPETTO MI CONTRADDICE. MA SPERO CHE IL MIO VIAGGIO SARÀ UN ESEMPIO DEL CONTRARIO: VOGLIO CHE CON ME LIBERIATE IL CICLISMO DELLA CHADNESS CHE LO PERSEGUITA…DA TANTI ANNI E IN TANTI KILOMETRI HO INCONTRATO BIKERS TALENTUOSI MA TROPPO PIENI DI SE. UN NUOVO CYCLING È:NO CHA\n
             NO TUTINA\n
             NO FOTO CON LA MARCIA PIÙ ALTA\n
             NO STRAVA BRAGGING\n
             NO SFIDE SE NON CON ME STESSO\n
             NO CHAD \n
             NO TUTINA\n
             LONG DISTANCE MULTI-RYTHM\n
             VOGLIO SOLO SENTIRE SENTIRE IL VENTO CHE GONFIA LA MIA MAGLIA…SE MI RALLENTA VORRÀ DIRE CHE DOVRÒ PEDALARE PIÙ FORTE…"`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
