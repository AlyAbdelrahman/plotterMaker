import React from 'react';

const Snackbar = ({ open, autoHideDuration, onClose, message, action }) => {
    if (!open) return null;

    setTimeout(onClose, autoHideDuration);

    return (
        <div className="snackbar">
            <span>{message}</span>
            <button onClick={onClose}>{action}</button>
        </div>
    );
};

export default Snackbar;
