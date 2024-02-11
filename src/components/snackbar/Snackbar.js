import React from 'react';
import PropTypes from 'prop-types';

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

Snackbar.propTypes = {
    open: PropTypes.bool.isRequired,
    autoHideDuration: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
};

export default Snackbar;
