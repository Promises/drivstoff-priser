import React, {FC, useEffect, useState} from 'react';
import {FuelType, IFuelPrice, IStation} from "./station.types";
import './Station.css'


var periods = {
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000
};

function formatTime(timeCreated: number) {
    var diff = Date.now() - timeCreated;

    if (diff > periods.month) {
        // it was at least a month ago
        return Math.floor(diff / periods.month) + "m";
    } else if (diff > periods.week) {
        return Math.floor(diff / periods.week) + "w";
    } else if (diff > periods.day) {
        return Math.floor(diff / periods.day) + "d";
    } else if (diff > periods.hour) {
        return Math.floor(diff / periods.hour) + "h";
    } else if (diff > periods.minute) {
        return Math.floor(diff / periods.minute) + "m";
    }
    return "Just now";
}

interface StationProps {
    station: IStation
}

const Station: FC<StationProps> = (props) => {
    const {station} = props;
    const [diesel, setDiesel] = useState<IFuelPrice | undefined>(undefined);
    const [petrol, setPetrol] = useState<IFuelPrice | undefined>(undefined);


    useEffect(() => {
        const getFuel = (fuelType: FuelType): IFuelPrice | undefined => {
            return station.stationDetails.find((fuel) => fuel.type === fuelType)
        }
        setDiesel(getFuel('D'));
        setPetrol(getFuel('95'));
    }, [station])

    const expiredPrice = (fuel: IFuelPrice | undefined) => {
        if(!fuel) {
            return true;
        }
        return ((Date.now() - fuel.lastUpdated) > 4 * 60 * 60 * 1000)
    }


    return (<div>
        <div>{station.name}</div>
        <div className={`diesel ${expiredPrice(diesel) ? 'faded' : ''}`}>{diesel?.price}</div>
        <div className={`petrol ${expiredPrice(petrol) ? 'faded' : ''}`}>{petrol?.price}</div>
        <div className={``}>{petrol && formatTime(petrol?.lastUpdated)}</div>
    </div>);
};

export default Station;
