import React, { useEffect, useState } from "react";
import { compact, max, min, range, sum } from "lodash";
import moment from "moment";
import { Logo } from "./Logo";
import { Map } from "./Map";
import { csv, geoDistance } from "d3";

import "./style.css";

type Datum = { longitude: number; latitude: number; altitude: number };
type Dataset = Datum[];

function App() {
  const earthRadius = 6357; // kilometers
  const firstDay = moment(new Date("2022-05-31T18:00:00.000+01:00"));
  const today = moment();

  const days = today.diff(firstDay, "days");

  const [dataset, setDataset] = useState<Dataset>([]);

  useEffect(() => {
    //  for f in ./public/data/*.csv; do sed -i ''  '1d' $f; done delete first line in csv bash

    const datasetPromises = range(1, days).map((day) => {
      const path = `./../data/stats_day${day}.csv`;
      return csv(path).then((res) => {
        const typedRes = compact(
          res.map((d) => {
            const datum =
              d.latitude && d.longitude && d.altitude
                ? {
                    latitude: parseFloat(d.latitude),
                    longitude: parseFloat(d.longitude),
                    altitude: parseFloat(d.altitude),
                  }
                : undefined;

            return datum as Datum | undefined;
          })
        );
        return typedRes as Dataset;
      });
    });

    Promise.all(datasetPromises)
      .then((res) => compact(res).flat())
      .then((res) => setDataset(res));
  }, [days]);

  function compressDataset<A>(dataset: A[], granularity: number) {
    return dataset.filter((_, i) => (i + 1) % granularity === 0);
  }
  const coordinates = dataset.map(
    (d) => [d.longitude, d.latitude] as [number, number]
  );
  const compressedCoordinates = compressDataset(coordinates, 200);

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
      <Map
        coordinates={compressedCoordinates}
        style={{ height: "inherit", width: "inherit" }}
      />
      <div className="sidebar">
        <div className="sidebar-content">
          <Logo logo="4khd" className="logo" />
          <Logo logo="cyclobrowsing" className="cyclobrowsing" />
          <div
            style={{
              padding: 20,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>Total distance: </div>
              <div style={{ fontWeight: 700 }}>
                {sum(
                  coordinates.map((c, i) =>
                    i === 0
                      ? 0
                      : geoDistance(c, coordinates[i - 1]) * earthRadius
                  )
                ).toFixed(2) + " km"}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>Total elevation gain: </div>
              <div style={{ fontWeight: 700 }}>
                {sum(
                  dataset.map((d, i) =>
                    i === 0
                      ? 0
                      : d.altitude - dataset[i - 1].altitude > 0
                      ? d.altitude - dataset[i - 1].altitude
                      : 0
                  )
                ).toFixed(0) + " m"}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>Highest point: </div>
              <div style={{ fontWeight: 700 }}>
                {(max(dataset.map((d) => d.altitude))?.toFixed(0) ?? 0) + " m"}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>Lowest point: </div>
              <div style={{ fontWeight: 700 }}>
                {(min(dataset.map((d) => d.altitude))?.toFixed(0) ?? 0) + " m"}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>Current altitude: </div>
              {dataset.length && (
                <div style={{ fontWeight: 700 }}>
                  {dataset[dataset.length - 1].altitude + " m"}
                </div>
              )}
            </div>
            {/* <div style={{ paddingTop: 30 }}>
              {`MI CHIAMO IGOR COLOMBO E STO PER COMINCIARE UN VIAGGIO INSENSATO.\n
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
             VOGLIO SOLO SENTIRE SENTIRE IL VENTO CHE GONFIA LA MIA MAGLIA…SE MI RALLENTA VORRÀ DIRE CHE DOVRÒ PEDALARE PIÙ FORTE…`
                .toString()
                .toLocaleLowerCase()}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
