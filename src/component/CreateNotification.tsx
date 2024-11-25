import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateNotification = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [isRead, setIsRead] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newNotification = {
            notification: {
                title,
                message,
                createdAt: new Date().toISOString(),
                isRead,
            },
        };

        try {
            const response = await fetch('https://localhost:7052/api/Notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNotification.notification),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Notification Created:', data);

            setTitle('');
            setMessage('');
            setIsRead(false);
        } catch (error) {
            console.error('Failed to create notification:', error);
        }
    };



    return (
        <div>
            <Link to={'/'}>Home</Link>
            <div className="form-container">
                <h1>Create Notification</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Create Notification</button>
                </form>
            </div>
        </div>
    );
};

export default CreateNotification;
