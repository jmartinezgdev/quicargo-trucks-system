import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LocationService from '../../api/LocationService';
import GoogleMapReact from 'google-map-react';
import { Location } from "../../interfaces/locationInterface";
import { LABELS, MESSAGES } from '../../constants';
import { AppEmpty } from '../../common/AppEmpty';
import { GOOGLE_MAP_API_KEY } from '../../env';

export const ListLocation: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const { truckId } = useParams<{ truckId: string }>();
    const [numberOfLocations, setNumberOfLocations] = useState<string>('');

    useEffect(() => {
        const fetchLocations = async () => setLocations(await LocationService.getByTruckId(Number(truckId), Number(numberOfLocations)))
        fetchLocations();
    }, [truckId, numberOfLocations]);

    if (!locations.length) {
        return <AppEmpty message={MESSAGES.LOCATIONS_EMPTY} />
    }

    return (
        <>
            <h1 className="text-xl font-semibold text-center p-5">{LABELS.location.LOCATIONS_FOR} {truckId}</h1>
            
            <div className="bg-white p-2 w-80 mx-auto mb-5 text-center shadow-sm">
                <label className="form-label" htmlFor="numberOfLocations">{LABELS.location.LAST_LOCATIONS}</label>
                <input value={numberOfLocations} onChange={e => setNumberOfLocations(e.target.value)} className="form-input" id="numberOfLocations" type="number" min="1"></input>
            </div>
           
            <div className="w-full" style={{ height: '500px' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
                    center={{ lat: 15, lng: 0 }}
                    defaultZoom={1}
                >
                    {
                        locations.map((location: Location) => (
                            <Marker
                                key={location.id}
                                lat={location.latitude}
                                lng={location.longitude}
                                text={location.dateAndTime}
                            />
                        ))
                    }
                </GoogleMapReact>
            </div>
        </>
    )
}

const Marker = (props: any) => {
    const date = new Date(props.text).toLocaleString()
    return <>
            <div className="bg-white w-32 text-center p-0.5 shadow-sm rounded-sm">{ date }</div>
        <div className="w-10 h-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="#000050E6">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
        </div>
    </>

}
