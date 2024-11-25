import { useState, useEffect } from "react";
import { connectToNotificationHub } from "../Service/notificationService";
import { Link } from "react-router-dom";

const Notifications = () => {
    const [notifications, setNotifications] = useState<any>([]);

    useEffect(() => {
        connectToNotificationHub((notification: any) => {
            console.log("Connection");
            console.log(notification);
            setNotifications((prev: any) => [notification, ...prev]);
        });
        // Fetch existing notifications
        fetch("https://localhost:7052/api/Notifications", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => setNotifications(data));
    }, []);

    return (
        <div>
            <Link to={'/create-notification'}>Create New</Link>
            <div style={{ textAlign: "center" }}>
                <h2>Notifications</h2>
                {notifications.map((notification: any, index: any) => (
                    <p key={notification.id}>{index + 1}.
                        {notification.title} - {notification.message}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
