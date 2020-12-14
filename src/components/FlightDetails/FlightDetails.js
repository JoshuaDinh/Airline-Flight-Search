import React from "react";
import "./flightDetails.css";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";

const FlightDetails = ({
  carriers,
  direct,
  outboundLeg,
  quotedPrice,
  cachedPrice,
  origin,
  destination,
}) => {
  return (
    <div className="flightDetails">
      <div className="flightDetails__info-Container">
        <div className="flightDetails__info">
          {<h5>{outboundLeg?.DepartureDate?.split("T")[0]}</h5>}
          <h3> {carriers?.Name}</h3>
          <div className="flightDetails__locations">
            <span>From: {origin?.Name}</span>
            <span>To: {destination?.Name}</span>
          </div>
        </div>
        <AirplanemodeActiveIcon color="secondary" />
        <div className="flightDetails__prices">
          <h2>
            <span>price: </span> ${quotedPrice} <br></br>{" "}
            <span className="flightDetails__perTraveler">Per Traveler</span>
          </h2>
          <p>Direct Flight: {direct?.toString()}</p>
          <p className="flightDetails__cachedPrice">
            Quote cached on{" "}
            {`${cachedPrice.split("T")[0]} at ${cachedPrice.split("T")[1]}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
