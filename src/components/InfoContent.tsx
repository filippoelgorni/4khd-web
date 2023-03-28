import { geoDistance } from "d3";
import { max, min, sum } from "lodash";
import { Dataset } from "./App";
import { Logo } from "./Logo";

export function InfoContent({
  dataset,
  coordinates,
}: {
  dataset: Dataset;
  coordinates: [number, number][];
}) {
  const earthRadius = 6357; // kilometers

  return (
    <div className="info-content">
      <div
        style={{
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Logo logo="cyclobrowsing" className="cyclobrowsing" />
        <div className="info-content-text">
          <p>
            Who is Igor? Igor is a digital avatar born from the minds of 4KHD, a
            collective that plays with irony, the digital domain, and sports. He
            has decided to travel with his bike in a scripted fashion, with only
            code telling him where to go. His mission is that of bringing a new
            aesthetic to its sport, coded in his “anti-chad manifesto”. Where is
            Igor? Our digital friend still cycling around Europe, and you can
            read the daily bulletin on twitter to know his daily stats, along
            with other fun bots. This is “Cyclobrowsing”.
          </p>
          <h3>All-time global stats</h3>
          <div className="info-row">
            <div>Total distance: </div>
            <div style={{ fontWeight: 700 }}>
              {sum(
                coordinates.map((c, i) =>
                  i === 0 ? 0 : geoDistance(c, coordinates[i - 1]) * earthRadius
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
              {(max(dataset.map((d) => d.altitude))?.toFixed(0) ?? 0) + " m"}
            </div>
          </div>
          <div className="info-row">
            <div>Lowest point: </div>
            <div style={{ fontWeight: 700 }}>
              {(min(dataset.map((d) => d.altitude))?.toFixed(0) ?? 0) + " m"}
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
                <div style={{ fontWeight: 700, alignSelf: "flex-end" }}>
                  {`${dataset[dataset.length - 1].latitude} (lat)`}
                </div>
                <div style={{ fontWeight: 700, alignSelf: "flex-end" }}>
                  {`${dataset[dataset.length - 1].longitude} (lon)`}
                </div>
              </div>
            )}
          </div>
          <div>
            <p>
              You can read the manifesto{" "}
              <a style={{ width: "inherit" }} href="./../assets/manifesto.jpg">
                here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
