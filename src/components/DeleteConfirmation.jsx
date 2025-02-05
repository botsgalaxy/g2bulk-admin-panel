const DeleteConfirmation = ({ itemName, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <h3>Confirm Deletion</h3>
        <p>
          Are you sure you want to delete "{itemName}"? This action cannot be
          undone.
        </p>
        <div className="confirmation-actions">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
