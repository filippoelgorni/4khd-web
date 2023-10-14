import { useEffect, useState } from "react";
import { compact, range } from "lodash";
import moment from "moment";
import { Map } from "./Map";
import { csv } from "d3";
import { Logo } from "./Logo";
import { Footer } from "./Footer";
import { Loader } from "./Loader";
import { ParentSize } from "@visx/responsive";
import { InfoContent } from "./InfoContent";

import "../style.css";

type Datum = { longitude: number; latitude: number; altitude: number };
export type Dataset = Datum[];

function Cyclobrowsing() {
  const firstDay = moment(new Date("2022-05-31T18:00:00.000+01:00"));
  const today = moment();

  const days = today.diff(firstDay, "days");

  const [dataset, setDataset] = useState<Dataset>([]);

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
    <ParentSize className="cyclobrowsing">
      {({ width }) => {
        const isMobile = width < 800;

        return (
          <div className="container">
            {isLoading ? (
              <>
                <Map
                  coordinates={coordinates}
                  isMobile={isMobile}
                  className="map"
                />
                <Logo
                  logo="4khd"
                  style={{
                    position: "absolute",
                    left: 20,
                    bottom: 20,
                    width: 140,
                  }}
                  className="logo"
                />
                <p className="title">dove sei Igor</p>
                <div className="carousel">
                  <img
                    src="./assets/carousel.png"
                    alt="Igor chilling while he travels"
                  />
                </div>
                <InfoContent coordinates={coordinates} dataset={dataset} />
                <Footer className="desktop" />
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

export default Cyclobrowsing;
