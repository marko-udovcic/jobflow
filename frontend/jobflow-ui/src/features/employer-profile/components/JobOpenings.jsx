import { useCompanyJobOpenings } from "../hooks/useCompanyJobOpenings";
import JobsList from "../../../components/ui/JobsList";
import { useAuthStore } from "../../../store/useAuthStore";
import PropTypes from "prop-types";
function JobOpenings({ companyId }) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { companyJobsList, isLoading } = useCompanyJobOpenings(companyId);
  if (isLoading) return <div>Loading...</div>;
  let isAuthUser = currentUser?.id === companyId;

  return (
    <div className="mt-5 mb-[10rem]">
      <h2 className="mb-3">Job Openings</h2>
      <JobsList jobList={companyJobsList} cardVariant={"primary"} isAuthUser={isAuthUser} />
    </div>
  );
}
JobOpenings.propTypes = {
  companyId: PropTypes.string.isRequired,
};

export default JobOpenings;
