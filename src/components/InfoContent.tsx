import { geoDistance } from "d3";
import { max, min, sum } from "lodash";
import { Dataset } from "./App";
import { Footer } from "./Footer";

export function InfoContent({
  dataset,
  coordinates,
}: {
  dataset: Dataset;
  coordinates: [number, number][];
}) {
  const earthRadius = 6357; // kilometers

  return (
    <div className="info-container">
      <div className="info-content">
        <div
          style={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="info-content-text">
            <div className="carousel-mobile">
              <img
                src="./assets/carousel.png"
                alt="Igor chilling while he travels"
              />
            </div>
            <p>
              Igor is a digital avatar born from the minds of 4KHD, a collective
              that plays with irony, digital domain and sport. He has decided to
              travel with his bicycle in a scripted fashion, with only the code
              telling him where to go. His mission is to bring a new aesthetic
              to cycling, codified in his 'anti-chad manifesto'. Where are you,
              Igor? Our digital friend is still cycling around Europe and you
              can read the daily bulletin on twitter for his stats.
            </p>
            <div className="stats">
              <div className="info-row">
                <div>TOTAL DISTANCE </div>

                {sum(
                  coordinates.map((c, i) =>
                    i === 0
                      ? 0
                      : geoDistance(c, coordinates[i - 1]) * earthRadius
                  )
                ).toFixed(2) + " km"}
              </div>
              <div className="info-row">
                <div>TOTAL ELEVATION GAIN </div>

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
              <div className="info-row">
                <div>HIGHEST POINT </div>

                {(max(dataset.map((d) => d.altitude))?.toFixed(0) ?? 0) + " m"}
              </div>
              <div className="info-row">
                <div>LOWEST POINT: </div>

                {(min(dataset.map((d) => d.altitude))?.toFixed(0) ?? 0) + " m"}
              </div>
              <div className="info-row">
                <div>CURRENT ALTITUDE </div>
                {dataset.length && (
                  <div>{dataset[dataset.length - 1].altitude + " m"}</div>
                )}
              </div>
              <div className="info-row">
                <div>CURRENT POSITION </div>
                {dataset.length && (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        alignSelf: "flex-end",
                      }}
                    >
                      {`${dataset[dataset.length - 1].latitude}, ${
                        dataset[dataset.length - 1].longitude
                      }`}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Footer className="mobile" />
          </div>
        </div>
      </div>
    </div>
  );
}
