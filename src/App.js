import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import "./material-ui.css";
import SingleFlight from "./components/SingleFlight/SingleFlight";
import FlightDisplay from "./components/FlightDisplay/FlightDisplay";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";

const App = () => {
  const [flightData, setFlightData] = useState([]);
  const [carriers, setCarriers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [outboundLeg, setOutboundleg] = useState([]);
  const [airports, setAirports] = useState([]);
  const [airportOrigin, setAirportOrigin] = useState("");
  const [airportDestination, setAirportDestination] = useState("");
  const [input, setInput] = useState([]);
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [onSubmit, setOnSubmit] = useState(false);
  const [oneWay, setOneWay] = useState(true);
  const [roundTrip, setRoundTrip] = useState(false);
  const [multipleFlights, setMultipleFlights] = useState(false);
  const [flightLoader, setFlightLoader] = useState(true);

  const API_KEY = process.env.REACT_APP_API_KEY;

  // Retrieves list of airports based off of city, state, region, location etc. autosuggest enabled

  useEffect(() => {
    const fetchPlaces = async () => {
      const list = await Axios.get(
        " https://rapidapi.p.rapidapi.com/apiservices/autosuggest/v1.0/US/usd/en-GB/",
        {
          headers: {
            "x-rapidapi-host":
              "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": API_KEY,
            useQueryString: true,
          },
          params: {
            query: input,
          },
        }
      );
      setAirports(list.data.Places);
    };
    const timer = setTimeout(() => {
      if (input) {
        fetchPlaces();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [input]);
  // <---------------------------------------------------------------------------------->

  // Retrieves OneWay and RoundTrip flight quotes
  const fetchSingleFlights = async () => {
    const Flight1 = Axios.get(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${airportOrigin}/${airportDestination}/${date}/${
        returnDate ? returnDate : ""
      }`,
      {
        headers: {
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
          useQueryString: true,
        },
      }
    );
    setFlightLoader(false);
    const quotes = await Flight1;
    setCarriers(quotes.data.Carriers);
    setPlaces(quotes.data.Places);

    setFlightData(quotes.data);
    // setAmountOfFlights()

    quotes.data.Quotes.map((item) => {
      setOutboundleg(item.OutboundLeg);
      setFlightLoader(true);
    });
  };

  console.log(API_KEY);

  useEffect(() => {
    fetchSingleFlights();
    return () => {
      setOnSubmit(false);
    };
  }, [onSubmit]);
  // <---------------------------------------------------------------------------------->

  useEffect(() => {
    if (oneWay === true) {
      setRoundTrip(false);
      setMultipleFlights(false);
    }
  }, [oneWay]);
  useEffect(() => {
    if (roundTrip === true) {
      setOneWay(false);
      setMultipleFlights(false);
    }
  }, [roundTrip]);

  useEffect(() => {
    if (multipleFlights === true) {
      setOneWay(false);
      setRoundTrip(false);
    }
  }, [multipleFlights]);

  return (
    <div className="app">
      <div className="app__background"></div>
      <div className="app__input">
        <ul>
          <li
            className={`${oneWay && "selected-active"}`}
            onClick={() => setOneWay(true)}
          >
            OneWay
          </li>
          <li
            className={`${roundTrip && "selected-active"}`}
            onClick={() => setRoundTrip(true)}
          >
            Round Trip
          </li>
        </ul>
        <SingleFlight
          setDate={setDate}
          input={input}
          airports={airports}
          airportOrigin={airportOrigin}
          airportDestination={airportDestination}
          setInput={setInput}
          setAirportOrigin={setAirportOrigin}
          setAirportDestination={setAirportDestination}
          roundTrip={roundTrip}
          setReturnDate={setReturnDate}
        />
        <div onClick={() => setOnSubmit(true)} className="app__searchButton">
          Search Flights
          <AirplanemodeActiveIcon color="secondary" />
        </div>
      </div>
      <FlightDisplay
        flightLoader={flightLoader}
        carriers={carriers}
        places={places}
        origin={airportOrigin}
        destination={airportDestination}
        flightData={flightData}
        outboundLeg={outboundLeg}
      />
    </div>
  );
};

export default App;
