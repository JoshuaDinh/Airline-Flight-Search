import React from "react";
import "./singleFlight.css";
import DatePicker from "../DatePicker/DatePicker";

const SingleFlight = ({
  setDate,
  setInput,
  airports,
  setAirportOrigin,
  setAirportDestination,
  roundTrip,
  setReturnDate,
}) => {
  const originSetting = (e) => {
    setInput(e.target.value);
    if (airports) {
      setAirportOrigin(e.target.value);
    }
  };

  const destinationSetting = (e) => {
    setInput(e.target.value);
    if (airports) {
      setAirportDestination(e.target.value);
    }
  };
  return (
    <div className="singleFlight">
      <div className="singleFlight__inputContainer">
        <div className="singleFlight__input">
          <input
            onChange={(e) => originSetting(e)}
            placeholder="Leaving From"
            type="text"
            list="origin"
          />
          <datalist id="origin">
            <select>
              {airports &&
                airports?.slice(0, 6).map((airport) => {
                  return (
                    <option value={airport.PlaceId}>{airport.PlaceName}</option>
                  );
                })}
            </select>
          </datalist>
        </div>
        <div className="singleFlight__input">
          <input
            onChange={(e) => destinationSetting(e)}
            placeholder="Going To"
            type="text"
            list="destination"
          />
          <datalist id="destination">
            {airports &&
              airports?.slice(0, 6).map((airport) => {
                return (
                  <option value={airport.PlaceId}>{airport.PlaceName}</option>
                );
              })}
          </datalist>
        </div>
        <div className="singleFlight__datePicker">
          <DatePicker selectedDate={setDate} />
          {roundTrip && <DatePicker selectedDate={setReturnDate} />}
        </div>
      </div>
    </div>
  );
};

export default SingleFlight;
