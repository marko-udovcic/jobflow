import Button from "../../../components/ui/Button";
import ConfirmDelete from "../../../components/ui/ConfirmDelete";
import CompoundModal from "../../../components/ui/CompoundModal";
import { useDeleteJobPost } from "../../../hooks/useDeleteJobPost";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
function CompanyActionButtons({ jobPostingId }) {
  const navigate = useNavigate();
  const { deleteJobPost } = useDeleteJobPost();

  const handleDeleteJobPost = () => {
    deleteJobPost(jobPostingId);
    navigate("/employer/profile", { replace: true });
  };

  return (
    <div className="mt-3 flex flex-row items-center justify-between gap-7">
      <Button
        className={
          "bg-gold-color text-black-color flex-1 cursor-pointer rounded-lg p-2 font-medium"
        }
      >
        View Detail
      </Button>
      <CompoundModal>
        <CompoundModal.Open opens="delete-modal">
          <Button
            className="cursor-pointer text-red-600"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Remove Job Post
          </Button>
        </CompoundModal.Open>
        <CompoundModal.Window name="delete-modal">
          <ConfirmDelete name="Job Post" onConfirm={handleDeleteJobPost} />
        </CompoundModal.Window>
      </CompoundModal>
    </div>
  );
}
CompanyActionButtons.propTypes = {
  jobPostingId: PropTypes.string.isRequired,
};

export default CompanyActionButtons;
