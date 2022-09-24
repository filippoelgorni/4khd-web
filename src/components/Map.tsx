import React, { useEffect, useState } from "react";
import { range } from "d3";
import * as d3 from "d3";
import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
} from "react-simple-maps";
import { compact } from "lodash";
import ParentSize from "@visx/responsive/lib/components/ParentSizeModern";
import "./style.css";
import moment from "moment";

type Datum = { longitude: number; latitude: number; altitude: number };
type Dataset = Datum[];

export function Map({ style }: { style?: React.CSSProperties }) {
  const red = "#ff6868";

  const firstDay = moment(new Date("2022-05-31T18:00:00.000+01:00"));
  const today = moment();

  const days = today.diff(firstDay, "days");

  const [dataset, setDataset] = useState<Dataset>([]);

  const isLoading = !dataset;

  useEffect(() => {
    //  for f in ./public/data/*.csv; do sed -i ''  '1d' $f; done delete first line in csv bash

    const datasetPromises = range(days).map((day) => {
      const path = `./../data/stats_day${day}.csv`;
      return d3.csv(path).then((res) => {
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
  }, []);

  function compressDataset<A>(dataset: A[], granularity: number) {
    return dataset.filter((d, i) => i % granularity === 0);
  }

  const geoUrl =
    "https://raw.githubusercontent.com/viniciusparede/world-map-geojson/main/world.json";

  const coordinates = dataset.map(
    (d) => [d.longitude, d.latitude] as [number, number]
  );
  const compressedCoordinates = compressDataset(coordinates, 4);

  const currentPosition =
    compressedCoordinates[compressedCoordinates.length - 1];

  return (
    <div style={style}>
      <ParentSize>
        {({ width, height }) => {
          return (
            !isLoading && (
              <svg width={width} height={height}>
                <ComposableMap
                  projectionConfig={{
                    center: [12, 44],
                    scale: 1600,
                  }}
                >
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="white"
                          stroke="black"
                          strokeWidth={1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      ))
                    }
                  </Geographies>

                  <>
                    <Line
                      coordinates={compressedCoordinates}
                      stroke={red}
                      strokeWidth={5.5}
                      opacity={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {currentPosition && (
                      <Marker coordinates={currentPosition}>
                        <circle r={20} fill={red} className="today" />
                      </Marker>
                    )}
                    <Line
                      coordinates={compressedCoordinates}
                      stroke="white"
                      strokeWidth={3}
                      opacity={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {currentPosition && (
                      <Marker coordinates={currentPosition}>
                        <circle r={5} fill={"white"} />
                      </Marker>
                    )}
                  </>
                </ComposableMap>
              </svg>
            )
          );
        }}
      </ParentSize>
    </div>
  );
}
