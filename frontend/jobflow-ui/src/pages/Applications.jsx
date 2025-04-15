import WorkerApplications from "../features/applications/components/WorkerApplications";
function Applications() {
  return (
    <div className="p-2 lg:p-0">
      <div className="bg-black-color flex h-50 items-center justify-center rounded-2xl">
        <h1 className="text-white">Applications </h1>
      </div>
      <WorkerApplications />
    </div>
  );
}

export default Applications;
