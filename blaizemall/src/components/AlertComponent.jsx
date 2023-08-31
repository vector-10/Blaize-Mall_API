import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const AlertComponent = ({ message, timeout, type }) => {
  const [showNotification, setShowNotitifcation] = useState(true);

  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      setShowNotitifcation(false);
    }, timeout);

    return () => {
      clearTimeout(notificationTimer);
    };
  }, [timeout]);
  return (
    showNotification && (
      <div className="d-flex justify-content-center align-items-center">
        <div
          className={`toast show bg-${type} `}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className={`text-${type} me-auto`}>Notification</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="close"
            ></button>
          </div>
          <div className="toast-body text-light">{message}</div>
        </div>
      </div>
    )
  );
};

AlertComponent.propTypes = {
  type: PropTypes.oneOf(["success", "info", "warning", "danger"]).isRequired,
  message: PropTypes.string.isRequired,
  timeout: PropTypes.number.isRequired,
};

export default AlertComponent;
