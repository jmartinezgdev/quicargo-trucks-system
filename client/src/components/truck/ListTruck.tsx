import React, { useState, useEffect } from 'react';
import TruckService from '../../api/TruckService';
import { ITruck } from '../../interfaces/TruckInterface';
import ItemTruck from './ItemTruck';

export const ListTruck: React.FC = () => {
    const [trucks, setTrucks] = useState<ITruck[]>([]);
    useEffect(() => {
        const fetchTrucks = async () => setTrucks(await TruckService.getAll())
        fetchTrucks();
    }, []);

    if (!trucks.length) {
        return <h2>No Trucks to Show</h2>
    }

    return (
        <>
            <h1 className="text-xl font-semibold text-center p-5">Truck List</h1>
            <div className="grid grid-cols-1 gap-x-8 gap-y-2 md:gap-x-6 md:gap-y-4 md:grid-cols-2 lg:grid-cols-3 m-4 mt-0">
                {trucks.map((truck: ITruck) => <ItemTruck key={truck.id} {...truck} />)}
            </div>
        </>
    )
}
