import PropTypes from "prop-types";

const StatusSelector = ({ worker, workerStatuses, handleStatusChange }) => {
  return (
    <select
      value={workerStatuses[worker.workerId] || worker.applicationStatus}
      onChange={(e) => handleStatusChange(worker.workerId, e.target.value)}
      className="border-black-color/10 rounded border px-2 py-1"
    >
      <option value="PENDING">Pending</option>
      <option value="APPROVED">Accepted</option>
      <option value="REJECTED">Rejected</option>
    </select>
  );
};

StatusSelector.propTypes = {
  worker: PropTypes.shape({
    workerId: PropTypes.string.isRequired,
    applicationStatus: PropTypes.string.isRequired,
  }).isRequired,
  workerStatuses: PropTypes.objectOf(PropTypes.string).isRequired,
  handleStatusChange: PropTypes.func.isRequired,
};

export default StatusSelector;
