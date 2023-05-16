import React, { useEffect, useState } from "react";
import { compact, range } from "lodash";
import moment from "moment";
import { Map } from "./Map";
import { csv } from "d3";

import "./style.css";
import { Logo } from "./Logo";
import { Footer } from "./Footer";
import { Loader } from "./Loader";
import { ParentSize } from "@visx/responsive";
import { InfoContent } from "./InfoContent";

type Datum = { longitude: number; latitude: number; altitude: number };
export type Dataset = Datum[];

function App() {
  const firstDay = moment(new Date("2022-05-31T18:00:00.000+01:00"));
  const today = moment();

  const days = today.diff(firstDay, "days");

  const [dataset, setDataset] = useState<Dataset>([]);
  const [isStatsShown, setIsStatsShown] = useState<Boolean>(false);

  useEffect(() => {
    const datasetPromises = range(1, days).map((day) => {
      const path = `./../data/stats_day${day}.csv`;
      return csv(path)
        .then((res) => {
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
        })
        .catch((error) => {
          console.error(error);
          return [];
        });
    });

    Promise.all(datasetPromises)
      .then((res) => compact(res).flat())
      .then((res) => setDataset(res));
  }, [days]);

  const coordinates = dataset.map(
    (d) => [d.longitude, d.latitude] as [number, number]
  );

  const isLoading = coordinates.length !== 0;

  return (
    <ParentSize>
      {({ width }) => {
        const isMobile = width < 800;

        return (
          <div className="container">
            {isLoading ? (
              <>
                {navigator.userAgent !== "ReactSnap" && (
                  <Map coordinates={coordinates} className="map" />
                )}
                <Logo
                  logo="4khd"
                  style={{
                    position: "absolute",
                    left: 50,
                    top: 0,
                    width: 200,
                    height: 200,
                  }}
                  className="logo"
                />
                {!isMobile && <Footer />}
                {!isMobile && (
                  <div
                    style={{
                      transform: `translateX(${isStatsShown ? 0 : -350}px)`,
                      transition: "250ms transform",
                    }}
                    className="sidebar"
                    onClick={() => setIsStatsShown(!isStatsShown)}
                  >
                    <InfoContent dataset={dataset} coordinates={coordinates} />
                    <div className="clickable-invisible-sidebar" />
                  </div>
                )}
                {isMobile && (
                  <div className="bottom-info">
                    <InfoContent dataset={dataset} coordinates={coordinates} />
                    <Footer />
                  </div>
                )}
              </>
            ) : (
              <Loader />
            )}
          </div>
        );
      }}
    </ParentSize>
  );
}

export default App;
