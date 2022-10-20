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
              padding: 30,
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
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
            <div
              style={{
                paddingTop: 60,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <a style={{ width: "inherit" }} href="./../assets/manifesto.jpg">
                <img
                  style={{ width: "inherit" }}
                  src="./../assets/manifesto.jpg"
                  alt="manifesto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
