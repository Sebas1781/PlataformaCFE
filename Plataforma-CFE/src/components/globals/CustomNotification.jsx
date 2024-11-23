import React, { useEffect } from 'react';

const CustomNotification = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            const notificationElement = document.getElementById('notification');
            if (notificationElement) {
                notificationElement.classList.add('fade-out');
                setTimeout(() => {
                    if (typeof onClose === 'function') {
                        onClose();
                    }
                }, 500); // Call onClose after fade-out animation
            }
        }, 3500); // Start fade-out animation after 3.5 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div id="notification" className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 bg-emerald-600 text-white rounded-lg shadow-lg transition-opacity duration-500 fade-in z-50">
            {message}
        </div>
    );
};

// Add these CSS classes to your global stylesheet or within a <style> tag in your component
/*
.fade-in {
    opacity: 0;
    animation: fadeIn 0.5s forwards;
}

.fade-out {
    animation: fadeOut 0.5s forwards;
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    to {
        opacity: 0;
    }
}
*/

export default CustomNotification;