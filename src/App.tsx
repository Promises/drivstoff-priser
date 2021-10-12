import React, {useEffect, useState} from 'react';
import './App.css';
import {IStation} from "./station.types";
import Station from "./Station";
const BASE_URL = "https://api.drivstoffappen.no";
const LATITUDE = 1.310672;
const LONGITUDE = 1.293653;

function getDistanceFromLatLonInKm(lat1:number, lon1:number, lat2:number, lon2:number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
  ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180)
}

function App() {

  const [stations, setStations] = useState<IStation[]>([])

  useEffect(() => {
    const getFuels = () => {
      fetch(BASE_URL+"/api/stations", {headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': '2CD114509703F6E0A976C32FCB79C4F62966EEC6'
        }}).then(async (res) => {
        const newStations: IStation[] = (await res.json());
        newStations.sort((a,b) =>
            getDistanceFromLatLonInKm(LATITUDE, LONGITUDE,parseFloat(a.latitude), parseFloat(a.longitude))-
            getDistanceFromLatLonInKm(LATITUDE, LONGITUDE,parseFloat(b.latitude), parseFloat(b.longitude)))
        setStations(newStations.slice(0, 10));
      })
    }

    const timeOut = setTimeout(() => getFuels(), 5 * 60 * 1000);


    getFuels();

    return () => {
      clearTimeout(timeOut);
    }

  }, [])

  return (
    <div className="App">
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.tsx</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
      {stations.map((station) => <Station station={station} />)}

    </div>
  );
}

export default App;
