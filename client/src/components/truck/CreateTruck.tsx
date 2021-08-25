import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AppNotification, NotificationType } from '../../common/AppNotification';
import TruckService from '../../api/TruckService';
import { ERRORS, MESSAGES, LABELS } from '../../constants';
import { Truck } from '../../interfaces/Truck';

const schema = yup.object().shape({
    model: yup.string().required(ERRORS.truck.MODEL_REQUIRED),
    year: yup.number().positive().integer().min(1900).max(new Date().getFullYear()).typeError(ERRORS.truck.YEAR_INVALID),
    licensePlate: yup.string().required(ERRORS.truck.LICENCE_PLATE_REQUIRED),
    currentKm: yup.number().positive().min(0).typeError(ERRORS.truck.CURRENT_KM_INVALID),
    maximumLoadKg: yup.number().positive().min(0).typeError(ERRORS.truck.MAXIMUM_LOAD_KG_INVALID),
    fuelType: yup.string().required(ERRORS.truck.FUEL_TYPE_REQUIRED)
});

const fuelOptions: string[] = [
    'Gasoline',
    'Diesel',
    'Propane',
    'Ethanol'
]

export const CreateTruck: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [notificationType, setNotificationType] = useState<NotificationType>(NotificationType.Null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Truck>({
        resolver: yupResolver(schema)
    });

    const onSubmit = handleSubmit(async (newTruck: Truck) => {
        try {
            await TruckService.create(newTruck);
            reset();
            setMessage(MESSAGES.TRUCK_CREATED);
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
            <h1 className="text-xl font-semibold text-center p-5">{LABELS.truck.CREATE_TRUCK}</h1>
            {showNotification &&
                <AppNotification
                    message={message}
                    type={notificationType}
                    showNotification={showNotification}
                    closeNotification={closeNotification}
                />
            }
            <form onSubmit={onSubmit}>
                <div className="max-w-screen-md mx-auto">
                    <div className="bg-white shadow-md rounded px-8 py-5 mb-4">
                        <div className="mb-4">
                            <label className="form-label" htmlFor="model">{LABELS.truck.MODEL}</label>
                            <input {...register("model")} className="form-input" id="model" type="text" placeholder="Ford, Toyota..."></input>
                            {errors.model && <p className="form-error">{errors.model.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="form-label" htmlFor="year">{LABELS.truck.YEAR}</label>
                            <input {...register("year")} className="form-input" id="year" type="number" min="1900" placeholder="2000, 2021..."></input>
                            {errors.year && <p className="form-error">{errors.year.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="form-label" htmlFor="licensePlate">{LABELS.truck.LICENCE_PLATE}</label>
                            <input {...register("licensePlate")} className="form-input" id="licensePlate" type="text" placeholder="P3LK56..."></input>
                            {errors.licensePlate && <p className="form-error">{errors.licensePlate.message}</p>}
                        </div>
                        <div className="mb-4 grid grid-cols-3 gap-2">
                            <div>
                                <label className="form-label" htmlFor="currentKM">{LABELS.truck.CURRENT_KM}</label>
                                <input {...register("currentKm")} className="form-input" id="currentKM" type="number" min="0" step="0.01" placeholder="0, 1000..."></input>
                                {errors.currentKm && <p className="form-error">{errors.currentKm.message}</p>}
                            </div>
                            <div>
                                <label className="form-label" htmlFor="maximumLoadKg">{LABELS.truck.MAXIMUM_LOAD_KG}</label>
                                <input {...register("maximumLoadKg")} className="form-input" id="maximumLoadKg" type="number" min="0" step="0.01" placeholder="0, 100"></input>
                                {errors.maximumLoadKg && <p className="form-error">{errors.maximumLoadKg.message}</p>}
                            </div>
                            <div>
                                <label className="form-label" htmlFor="fuelType">{LABELS.truck.FUEL_TYPE}</label>
                                <select {...register("fuelType")} id="fuelType" className="form-input">
                                    <option value="">{LABELS.truck.SELECT_FUEL_TYPE}</option>
                                    {fuelOptions.map((fuel: string, index) => <option key={index} value={fuel}>{fuel}</option>)}
                                </select>
                                {errors.fuelType && <p className="form-error">{errors.fuelType.message}</p>}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button className="form-btn">{LABELS.truck.CREATE_TRUCK}</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

