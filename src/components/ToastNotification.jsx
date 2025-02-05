const ToastNotification = ({ message, type }) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "⚠";
      default:
        return "ℹ";
    }
  };

  return (
    <div className={`toast ${type}`}>
      <span className="toast-icon">{getIcon()}</span>
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default ToastNotification;
