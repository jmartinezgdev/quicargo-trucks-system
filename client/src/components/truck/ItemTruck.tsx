import React from 'react';
import { Link } from 'react-router-dom';
import { Messages } from '../../constants/Messages';
import { ITruck } from '../../interfaces/TruckInterface';
import './item.css';

const ItemTruck: React.FC<ITruck> = (truck: ITruck) => {
    return (
        <Link to="/create">
            <div className="truck-item bg-white shadow-sm p-4 rounded-md hover:shadow-lg">
                <div>
                    <span>{Messages.truck.MODEL}:</span>
                    <span>{truck.model}</span>
                </div>
                <div>
                    <span>{Messages.truck.YEAR}:</span>
                    <span>{truck.year}</span>
                </div>
                <div>
                    <span>{Messages.truck.LICENCE_PLATE}:</span>
                    <span>{truck.licensePlate}</span>
                </div>
                <div>
                    <span>{Messages.truck.CURRENT_KM}:</span>
                    <span>{truck.currentKm}</span>
                </div>
                <div>
                    <span>{Messages.truck.MAXIMUM_LOAD_KG}:</span>
                    <span>{truck.maximumLoadKg}</span>
                </div>
                <div>
                    <span>{Messages.truck.FUEL_TYPE}:</span>
                    <span>{truck.fuelType}</span>
                </div>
            </div>
        </Link>
    )
}
export default ItemTruck
