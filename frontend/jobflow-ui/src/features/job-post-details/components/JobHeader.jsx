import moment from "moment";
import PropTypes from "prop-types";
import { useAuthStore } from "../../../store/useAuthStore";
import Button from "../../../components/ui/Button";
import CompoundModal from "../../../components/ui/CompoundModal";
import ApplyJobModal from "./ApplyJobModal";
import ConfirmDelete from "../../../components/ui/ConfirmDelete";
import { useDeleteJobPost } from "../../../hooks/useDeleteJobPost";
import { useNavigate } from "react-router-dom";
function JobHeader({ title = "", date = "", user = {}, jobPostingId }) {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const formattedDate = moment(date).format("MMMM Do YYYY, h:mm a");
  const isAuthUser = currentUser?.id === user?.id;

  const { deleteJobPost } = useDeleteJobPost();

  const handleDeleteJobPost = () => {
    deleteJobPost(jobPostingId);
    navigate("/employer/profile", { replace: true });
  };

  return (
    <div className="bg-black-color flex h-50 flex-col items-center justify-center rounded-2xl">
      <h2 className="text-white">{title} </h2>
      <p className="pl-2 text-[#ACACAC]">Published: {formattedDate}</p>

      {isAuthUser || currentUser?.role === "ADMIN" ? (
        <CompoundModal>
          <CompoundModal.Open opens="delete-modal">
            <Button variant="danger">Remove Job Post</Button>
          </CompoundModal.Open>
          <CompoundModal.Window name="delete-modal">
            <ConfirmDelete name="Job Post" onConfirm={handleDeleteJobPost} />
          </CompoundModal.Window>
        </CompoundModal>
      ) : (
        <CompoundModal>
          <CompoundModal.Open opens="apply-modal">
            <Button variant="secondary" className={"mt-5 flex flex-row items-center"}>
              <span>Apply Now!</span>
            </Button>
          </CompoundModal.Open>
          <CompoundModal.Window name="apply-modal">
            <ApplyJobModal jobPostingId={jobPostingId} />
          </CompoundModal.Window>
        </CompoundModal>
      )}
    </div>
  );
}
JobHeader.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  jobPostingId: PropTypes.string.isRequired,
};

export default JobHeader;
