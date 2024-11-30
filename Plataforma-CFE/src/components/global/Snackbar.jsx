import { useState, useEffect } from "react";

const Snackbar = ({ message, type = "success", duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false); 
                const closeTimer = setTimeout(() => {
                    if (onClose) onClose();
                }, 500); 
                return () => clearTimeout(closeTimer);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message) return null;

    const bgColor =
        type === "success" ? "bg-emerald-600" : type === "error" ? "bg-red-600" : "bg-gray-600";

    return (
        <div
            className={`fixed bottom-4 right-4 px-6 py-3 text-sm text-white rounded shadow-lg transform transition-transform duration-500 ${
                visible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0" 
            } ${bgColor}`}
        >
            {message}
        </div>
    );
};

export default Snackbar;
