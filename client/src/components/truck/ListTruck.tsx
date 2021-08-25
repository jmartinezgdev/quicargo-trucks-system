import React, { useState, useEffect } from 'react';
import TruckService from '../../api/TruckService';
import { AppEmpty } from '../../common/AppEmpty';
import { MESSAGES, LABELS } from '../../constants';
import { Truck } from '../../interfaces/Truck';
import ItemTruck from './ItemTruck';

export const ListTruck: React.FC = () => {
    const [trucks, setTrucks] = useState<Truck[]>([]);
    useEffect(() => {
        const fetchTrucks = async () => setTrucks(await TruckService.getAll());
        fetchTrucks();
    }, []);

    if (!trucks.length) {
        return <AppEmpty message={MESSAGES.TRUCKS_EMPTY} />
    }

    return (
        <>
            <h1 className="text-xl font-semibold text-center p-5">{LABELS.truck.TRUCK_LIST}</h1>
            <div className="grid grid-cols-1 gap-x-8 gap-y-2 md:gap-x-6 md:gap-y-4 md:grid-cols-2 lg:grid-cols-3 m-4 mt-0">
                {trucks.map((truck: Truck) => <ItemTruck key={truck.id} {...truck} />)}
            </div>
        </>
    )
}
