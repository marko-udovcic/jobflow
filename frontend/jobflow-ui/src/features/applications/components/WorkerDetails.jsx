import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CompoundModal from "../../../components/ui/CompoundModal";
import ApplicationDetails from "./ApplicationDetails";
function WorkerDetails({ worker }) {
  return (
    <>
      <p className="text-black-color">{worker.email}</p>
      <p className="text-black-color">{moment(worker.applicationDate).format("L")}</p>
      <CompoundModal>
        <CompoundModal.Open opens="details">
          <p className="text-black-color cursor-pointer hover:underline">See Details</p>
        </CompoundModal.Open>
        <CompoundModal.Window name="details">
          <ApplicationDetails worker={worker} />
        </CompoundModal.Window>
      </CompoundModal>

      <Link to={`/worker/profile/${worker.workerId}`}>
        <p className="text-black-color cursor-pointer underline">View CV</p>
      </Link>
    </>
  );
}

WorkerDetails.propTypes = {
  worker: PropTypes.shape({
    email: PropTypes.string.isRequired,
    workerId: PropTypes.string.isRequired,
    applicationDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  }).isRequired,
};

export default WorkerDetails;
