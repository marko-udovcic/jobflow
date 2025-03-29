import JobForm from "../features/post-a-job/components/JobForm";

function PostJob() {
  return (
    <div className="p-2 lg:p-0">
      <div className="bg-black-color flex h-50 items-center justify-center rounded-2xl">
        <h2 className="text-white">Post a Job </h2>
      </div>
      <JobForm />
    </div>
  );
}

export default PostJob;
