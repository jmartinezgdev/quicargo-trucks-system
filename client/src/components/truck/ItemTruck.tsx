import React from 'react';
import { Link } from 'react-router-dom';
import { Messages } from '../../constants/Messages';
import { ITruck } from '../../interfaces/TruckInterface';
import './item.css';

const ItemTruck: React.FC<ITruck> = (truck: ITruck) => {
    return (
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
            <footer className="grid grid-cols-2 text-center gap-x-2 mt-4">
                <Link to={`/create-location/${truck.id}`} className="bg-green-500 rounded-3xl p-1 text-white hover:bg-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Add Location
                </Link>
                <Link to={`/locations/${truck.id}`} className="bg-blue-500 rounded-3xl p-1 text-white hover:bg-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    See Locations
                </Link>
            </footer>
        </div>
    )
}
export default ItemTruck
