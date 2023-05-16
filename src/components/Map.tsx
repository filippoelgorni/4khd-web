import React, { memo } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { ParentSize } from "@visx/responsive";

import "./style.css";

export const RED = "#ec1556";

export const Map = memo(
  ({
    coordinates,
    style,
    className,
  }: {
    coordinates: [number, number][];
    style?: React.CSSProperties;
    className?: string;
  }) => {
    const geoUrl = "./../geo/topo.json";

    const isLoading = !coordinates;

    const currentPosition = coordinates[coordinates.length - 1];

    return (
      <div style={style} className={className}>
        <ParentSize>
          {({ width, height }) => {
            const scale = 1600;
            const verticalTilt = 44;
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
                      <Geographies
                        geography={geoUrl}
                        style={{
                          display:
                            navigator.userAgent !== "ReactSnap"
                              ? "auto"
                              : "none",
                        }}
                      >
                        {({ geographies }) =>
                          geographies.map((geo) => (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill="white"
                              stroke="#cccccc"
                              strokeWidth={1}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          ))
                        }
                      </Geographies>

                      <Line
                        coordinates={coordinates}
                        stroke={RED}
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
                            <circle r={3} fill={RED} />
                          </Marker>
                          <Marker coordinates={currentPosition}>
                            <circle r={20} fill={RED} className="today" />
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
