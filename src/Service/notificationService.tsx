import * as signalR from "@microsoft/signalr";

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7052/notificationHub", {
        withCredentials: true,
    })
    .withAutomaticReconnect()
    .build();


export const connectToNotificationHub = (onReceiveNotification: any) => {

    if (hubConnection.state == signalR.HubConnectionState.Disconnected) {
        hubConnection.start().catch(err => console.error("Connection failed: ", err));
    }

    hubConnection.off("ReceiveNotification");

    hubConnection.on("ReceiveNotification", (notification) => {
        onReceiveNotification(notification);
    });
};

export const createNotification = async (notification: any) => {
    await fetch("https://localhost:7052/api/Notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notification),
    });
};
