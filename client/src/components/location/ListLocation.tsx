import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LocationService from '../../api/LocationService';
import { ILocation } from '../../interfaces/LocationInterface';
import GoogleMapReact from 'google-map-react';


export const ListLocation: React.FC = () => {
    const [locations, setLocations] = useState<ILocation[]>([]);
    const { truckId } = useParams<{ truckId: string }>();

    useEffect(() => {
        const fetchLocations = async () => setLocations(await LocationService.getByTruckId(Number(truckId)))
        fetchLocations();
    }, [truckId]);

    if (!locations.length) {
        return <h2>No Locations to Show</h2>
    }

    return (
        <>
            <h1 className="text-xl font-semibold text-center p-5">Locations List</h1>
            <div className="h-screen w-full" >
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBDfsPSGKP4w3LgPXI0YANyznPQrR44qlw' }}
                    center={{ lat: 1, lng: 1 }}
                    defaultZoom={1}
                >
                    {
                        locations.map((location: ILocation) => (
                            <Marker
                                key={location.id}
                                lat={location.latitude}
                                lng={location.longitude}
                            />
                        ))
                    }
                </GoogleMapReact>
            </div>
        </>
    )
}

const Marker = (props: any) => {
    return <div className="w-10 h-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
        </svg>
    </div>
}
