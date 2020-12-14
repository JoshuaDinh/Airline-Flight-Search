import React from "react";
import "./flightDisplay.css";
import FlightDetails from "../FlightDetails/FlightDetails";

const FlightDisplay = ({
  carriers,
  flightData,
  outboundLeg,
  flightLoader,
  places,
}) => {
  return (
    <div className={`flightDisplay ${flightLoader && "flightDisplay-active"}`}>
      {flightData?.Quotes?.slice(0, 4).map((quote) => {
        return (
          <FlightDetails
            outboundLeg={outboundLeg}
            quotedPrice={quote.MinPrice}
            direct={quote.Direct}
            cachedPrice={quote.QuoteDateTime}
            // returns value of the first element in an array that passes the condition/ used to loop up carrier id
            carriers={carriers.find(
              (c) => c.CarrierId == quote.OutboundLeg.CarrierIds[0]
            )}
            origin={places.find((p) => p.PlaceId == quote.OutboundLeg.OriginId)}
            destination={places.find(
              (p) => p.PlaceId == quote.OutboundLeg.DestinationId
            )}
          />
        );
      })}
    </div>
  );
};

export default FlightDisplay;
