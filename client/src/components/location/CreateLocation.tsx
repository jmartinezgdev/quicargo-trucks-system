import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AppNotification, NotificationType } from '../../common/AppNotification';
import LocationService from '../../api/LocationService';
import { Location } from "../../interfaces/Location";
import { useParams } from 'react-router-dom';
import { LABELS, MESSAGES } from '../../constants';

const schema = yup.object().shape({
    latitude: yup.number().min(-90).max(90).typeError('Invalid Latitude'),
    longitude: yup.number().min(-180).max(180).typeError('Invalid Longitude')
});

export const CreateLocation: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [notificationType, setNotificationType] = useState<NotificationType>(NotificationType.Null);
    const { truckId } = useParams<{ truckId: string }>();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Location>({
        resolver: yupResolver(schema)
    });

    const onSubmit = handleSubmit(async (location: Location) => {
        const newLocation = {
            ...location,
            truckId: Number(truckId),
            dateAndTime: new Date()
        }
        try {
            await LocationService.create(newLocation);
            reset();
            setMessage(MESSAGES.LOCATION_CREATED);
            setNotificationType(NotificationType.Success)
        } catch (e) {
            setMessage(e.message);
            setNotificationType(NotificationType.Error)
        } finally {
            setShowNotification(true);
        }
    });

    const closeNotification = (): void => {
        setShowNotification(false)
        setNotificationType(NotificationType.Null)
        setMessage('')
    }

    return (
        <>
            <h1 className="text-xl font-semibold text-center p-5">{LABELS.location.CREATE_LOCATION}</h1>
            {showNotification && <AppNotification message={message} type={notificationType} showNotification={showNotification} closeNotification={closeNotification} />}
            <form onSubmit={onSubmit}>
                <div className="max-w-screen-md mx-auto">
                    <div className="bg-white shadow-md rounded px-8 py-5 mb-4">
                        <div className="mb-4">
                            <label className="form-label" htmlFor="latitude">{LABELS.location.LATITUDE}</label>
                            <input {...register("latitude")} className="form-input" id="latitude" type="number" min="-90" max="90" step="0.000001" placeholder="-90, 90..."></input>
                            {errors.latitude && <p className="form-error">{errors.latitude.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="form-label" htmlFor="longitude">{LABELS.location.LONGITUDE}</label>
                            <input {...register("longitude")} className="form-input" id="longitude" type="number" min="-180" max="180" step="0.000001" placeholder="-180,180..."></input>
                            {errors.longitude && <p className="form-error">{errors.longitude.message}</p>}
                        </div>
                        <div className="flex justify-center">
                            <button className="form-btn">{LABELS.location.ADD_LOCATIONS}</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}