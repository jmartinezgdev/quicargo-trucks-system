import React from 'react';

export enum NotificationType {
    Error,
    Success,
    Null
}

type Notification = {
    message: string,
    type: NotificationType,
    showNotification: boolean,
    closeNotification: Function
}

export const AppNotification: React.FC<Notification> = ({ message, type, showNotification, closeNotification }) => {

    if (!showNotification) {
        return null;
    }

    return (
        <div className={`text-white p-5 my-5 rounded-md relative max-w-screen-sm mx-auto ${type === NotificationType.Error ? "bg-red-500" : "bg-green-500"}`}>
            {message}
            <button className="absolute top-1 right-1" onClick={() => closeNotification()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
            </button>
        </div>
    )
}