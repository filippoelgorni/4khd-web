import React, { memo } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import ParentSize from "@visx/responsive/lib/components/ParentSizeModern";

import "./style.css";

export const Map = memo(
  ({
    style,
    coordinates,
  }: {
    coordinates: [number, number][];
    style?: React.CSSProperties;
  }) => {
    const red = "#ff6868";
    const geoUrl = "./../geo/topo.json";

    const isLoading = !coordinates;

    const currentPosition = coordinates[coordinates.length - 1];

    return (
      <div style={style}>
        <ParentSize>
          {({ width, height }) => {
            const isMobile = width <= 800;

            const scale = isMobile ? 2200 : 1600;
            const verticalTilt = isMobile ? 35 : 44;
            return (
              !isLoading && (
                <svg width={width} height={height}>
                  <ComposableMap
                    projectionConfig={{
                      center: [12, verticalTilt],
                      scale: scale,
                    }}
                  >
                    <ZoomableGroup>
                      <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                          geographies.map((geo) => (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill="white"
                              stroke="black"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          ))
                        }
                      </Geographies>

                      <Line
                        coordinates={coordinates}
                        stroke={red}
                        strokeWidth={5.5}
                        opacity={1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <Line
                        coordinates={coordinates}
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
                      {currentPosition && (
                        <>
                          <Marker coordinates={currentPosition}>
                            <circle r={3} fill={red} />
                          </Marker>
                          <Marker coordinates={currentPosition}>
                            <circle r={20} fill={red} className="today" />
                          </Marker>
                        </>
                      )}
                    </ZoomableGroup>
                  </ComposableMap>
                </svg>
              )
            );
          }}
        </ParentSize>
      </div>
    );
  }
);
