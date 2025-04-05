import { useParams } from "react-router-dom";
import JobSection from "../features/job-post-details/components/JobSection";
import JobHeader from "../features/job-post-details/components/JobHeader";
import UserLogo from "../components/ui/UserLogo";
import EmploymentInfo from "../features/job-post-details/components/EmploymentInfo";
import { useJobPost } from "../features/job-post-details/hooks/useJobPost";
import JobPostApplications from "../features/applications/components/JobPostApplications";
import { useAuthStore } from "../store/useAuthStore";
function JobPostDetails() {
  const { currentUser } = useAuthStore();
  const { id } = useParams();
  const { jobPost, isLoading } = useJobPost(id);
  if (isLoading) return <div>Loading...</div>;

  const isJobPostAuthor = currentUser?.email === jobPost?.company.email;

  return (
    <div className="p-2 lg:p-0">
      <JobHeader
        title={jobPost?.title}
        date={jobPost?.postingDate}
        user={jobPost?.company}
        jobPostingId={id}
      />
      <UserLogo user={jobPost?.company} isJobPostPage={true} />
      <EmploymentInfo jobPost={jobPost} />
      <JobSection title="Job Description" content={jobPost?.description} />
      <JobSection title="Responsibilities" content={jobPost?.responsibilities} list={true} />
      <JobSection title="Job Requirements" content={jobPost?.jobsRequirements} list={true} />
      {isJobPostAuthor && <JobPostApplications jobPostingId={id} />}
    </div>
  );
}

export default JobPostDetails;
