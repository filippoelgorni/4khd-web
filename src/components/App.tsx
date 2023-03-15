import React, { useEffect, useState } from "react";
import { compact, max, min, range, sum } from "lodash";
import moment from "moment";
import { Map } from "./Map";
import { csv, geoDistance } from "d3";

import "./style.css";
import { Logo } from "./Logo";
import { Footer } from "./Footer";
import { Loader } from "./Loader";

type Datum = { longitude: number; latitude: number; altitude: number };
type Dataset = Datum[];

function App() {
  const earthRadius = 6357; // kilometers
  const firstDay = moment(new Date("2022-05-31T18:00:00.000+01:00"));
  const today = moment();

  const days = today.diff(firstDay, "days");
  console.log("days: ", days);

  const [dataset, setDataset] = useState<Dataset>([]);
  const [isStatsShown, setIsStatsShown] = useState<Boolean>(false);

  useEffect(() => {
    //  for f in ./public/maps\ data/*.csv; do sed -i ''  '1d' $f; done delete first line in csv bash

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
  const compressedCoordinates = compressDataset(coordinates, 300);

  const isLoading = compressedCoordinates.length !== 0;

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
      {isLoading ? (
        <>
          <Map
            coordinates={compressedCoordinates}
            style={{ height: "inherit", width: "inherit" }}
          />
          <Logo
            logo="4khd"
            style={{
              position: "absolute",
              left: 50,
              top: 0,
              width: 300,
              height: 300,
            }}
          />
          <Footer />
          <div
            className="sidebar"
            style={{
              transform: `translateX(${isStatsShown ? 0 : -350}px)`,
              transition: "250ms transform",
            }}
            onClick={() => setIsStatsShown(!isStatsShown)}
          >
            <div
              style={{
                position: "absolute",
                left: 350,
                width: 50,
                height: "100%",
                cursor: "pointer",
              }}
            />
            <div className="sidebar-content">
              <div
                style={{
                  padding: 30,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Logo
                  logo="cyclobrowsing"
                  style={{ height: 100, width: "100%" }}
                  onClick={() => setIsStatsShown(!isStatsShown)}
                />
                <p>
                  Who is Igor? Igor is a digital avatar born from the minds of
                  4KHD, a collective that plays with irony, the digital domain,
                  and sports. He has decided to travel with his bike in a
                  scripted fashion, with only code telling him where to go. His
                  mission is that of bringing a new aesthetic to its sport,
                  coded in his “anti-chad manifesto”. Where is Igor? Our digital
                  friend still cycling around Europe, and you can read the daily
                  bulletin on twitter to know his daily stats, along with other
                  fun bots. This is “Cyclobrowsing”.
                </p>
                <h3>All-time global stats</h3>
                <div className="info-row">
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
                <div className="info-row">
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
                <div className="info-row">
                  <div>Highest point: </div>
                  <div style={{ fontWeight: 700 }}>
                    {(max(dataset.map((d) => d.altitude))?.toFixed(0) ?? 0) +
                      " m"}
                  </div>
                </div>
                <div className="info-row">
                  <div>Lowest point: </div>
                  <div style={{ fontWeight: 700 }}>
                    {(min(dataset.map((d) => d.altitude))?.toFixed(0) ?? 0) +
                      " m"}
                  </div>
                </div>
                <div className="info-row">
                  <div>Current altitude: </div>
                  {dataset.length && (
                    <div style={{ fontWeight: 700 }}>
                      {dataset[dataset.length - 1].altitude + " m"}
                    </div>
                  )}
                </div>
                <div className="info-row">
                  <div>Current position: </div>
                  {dataset.length && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ fontWeight: 700 }}>
                        {`${dataset[dataset.length - 1].latitude} (lat)`}
                      </div>
                      <div style={{ fontWeight: 700 }}>
                        {`${dataset[dataset.length - 1].longitude} (lon)`}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <p>
                    You can read the manifesto{" "}
                    <a
                      style={{ width: "inherit" }}
                      href="./../assets/manifesto.jpg"
                    >
                      here
                    </a>{" "}
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
