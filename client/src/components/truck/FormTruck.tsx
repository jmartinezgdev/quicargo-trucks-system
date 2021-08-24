import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ITruck } from '../../interfaces/TruckInterface';
import TruckService from '../../api/TruckService';
import AppNotification, { NotificationType } from '../../common/AppNotification';
import { Messages } from '../../constants/Messages';

const schema = yup.object().shape({
    model: yup.string().required(Messages.truck.MODEL_REQUIRED),
    year: yup.number().positive().integer().min(1900).max(new Date().getFullYear()).typeError(Messages.truck.INVALID_YEAR),
    licensePlate: yup.string().required(Messages.truck.LICENCE_PLATE_REQUIRED),
    currentKm: yup.number().positive().min(0).typeError(Messages.truck.INVALID_CURRENT_KM),
    maximumLoadKg: yup.number().positive().min(0).typeError(Messages.truck.INVALID_MAXIMUM_LOAD_KG),
    fuelType: yup.string().required(Messages.truck.FUEL_TYPE_REQUIRED)
});

const fuelOptions: string[] = [
    'Gasoline',
    'Diesel',
    'Propane',
    'Ethanol'
]

const FormTruck: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [notificationType, setNotificationType] = useState<NotificationType>(NotificationType.Null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ITruck>({
        resolver: yupResolver(schema)
    });

    const onSubmit = handleSubmit(async (newTruck: ITruck) => {
        try {
            await TruckService.create(newTruck);
            reset();
            setMessage(Messages.truck.TRUCK_CREATED);
            setNotificationType(NotificationType.Success)
        } catch (e) {
            setMessage(e.message);
            setNotificationType(NotificationType.Error)
        } finally {
            setShowNotification(true);
        }
    });

    const closeNotification = () => {
        setShowNotification(false)
        setNotificationType(NotificationType.Null)
        setMessage('')
    }

    return (
        <>
            {showNotification && <AppNotification message={message} type={notificationType} showNotification={showNotification} closeNotification={closeNotification} />}
            <form onSubmit={onSubmit}>
                <div className="max-w-screen-md mx-auto">
                    <div className="bg-white shadow-md rounded px-8 py-5 mb-4">
                        <div className="mb-4">
                            <label className="form-label" htmlFor="model">{Messages.truck.MODEL}</label>
                            <input {...register("model")} className="form-input" id="model" type="text" placeholder="Ford, Toyota..."></input>
                            {errors.model && <p className="form-error">{errors.model.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="form-label" htmlFor="year">{Messages.truck.YEAR}</label>
                            <input {...register("year")} className="form-input" id="year" type="number" min="1900" placeholder="2000, 2021..."></input>
                            {errors.year && <p className="form-error">{errors.year.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="form-label" htmlFor="licensePlate">License plate</label>
                            <input {...register("licensePlate")} className="form-input" id="licensePlate" type="text" placeholder="P3LK56..."></input>
                            {errors.licensePlate && <p className="form-error">{errors.licensePlate.message}</p>}
                        </div>
                        <div className="mb-4 grid grid-cols-3 gap-2">
                            <div>
                                <label className="form-label" htmlFor="currentKM">Current Kilometers</label>
                                <input {...register("currentKm")} className="form-input" id="currentKM" type="number" min="0" step="0.01" placeholder="0, 1000..."></input>
                                {errors.currentKm && <p className="form-error">{errors.currentKm.message}</p>}
                            </div>
                            <div>
                                <label className="form-label" htmlFor="maximumLoadKg">Maximum load (Kg)</label>
                                <input {...register("maximumLoadKg")} className="form-input" id="maximumLoadKg" type="number" min="0" step="0.01" placeholder="0, 100"></input>
                                {errors.maximumLoadKg && <p className="form-error">{errors.maximumLoadKg.message}</p>}
                            </div>
                            <div>
                                <label className="form-label" htmlFor="fuelType">Fuel Type</label>
                                <select {...register("fuelType")} id="fuelType" className="form-input">
                                    <option value="">Select Fuel Type</option>
                                    {fuelOptions.map((fuel: string, index) => <option key={index} value={fuel}>{fuel}</option>)}
                                </select>
                                {errors.fuelType && <p className="form-error">{errors.fuelType.message}</p>}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button className="form-btn">Create Truck</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default FormTruck
