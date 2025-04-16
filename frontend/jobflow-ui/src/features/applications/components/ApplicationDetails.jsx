import CompoundModal from "../../../components/ui/CompoundModal";
import Button from "../../../components/ui/Button";
import PropTypes from "prop-types";

function ApplicationDetails({ worker }) {
  return (
    <div>
      <h2 className="text-center font-semibold">Application Details</h2>
      <div className="flex flex-col">
        <p className="mt-2 underline">{worker?.email}</p>
        <h2 className="my-2 text-2xl">Job Position</h2>
        <p className="">{worker?.jobPosition}</p>
        <h2 className="my-2 text-2xl">Job Message</h2>
        <p className="">{worker?.content}</p>
        <CompoundModal.Close>
          <Button variant="primary" className={"lg:1/2 mt-6 w-1/2 self-end p-2 xl:w-1/2 2xl:w-1/4"}>
            Close
          </Button>
        </CompoundModal.Close>
      </div>
    </div>
  );
}

ApplicationDetails.propTypes = {
  worker: PropTypes.shape({
    email: PropTypes.string,
    jobPosition: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default ApplicationDetails;
