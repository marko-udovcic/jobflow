import { useAuthStore } from "../../../store/useAuthStore";
import { useWorkerApplications } from "../hooks/useWorkerApplications";
import { getStatusColor } from "../../../utils/statusHelpers";
import { getFormattedStatus } from "../../../utils/statusHelpers";
import RenderWorkerMessageStatus from "./RenderWorkerMessageStatus";
import moment from "moment";

const headingTable = [
  { id: 1, name: "Company Name" },
  { id: 2, name: "Job" },
  { id: 3, name: "Status" },
  { id: 4, name: "Application Date" },
  { id: 5, name: "Message" },
];
import { Link } from "react-router-dom";
function WorkerApplications() {
  const { currentUser } = useAuthStore();
  const { workerApplications = [], isLoading } = useWorkerApplications(currentUser?.id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {workerApplications.length === 0 ? (
        <p className="mt-5">No applications found</p>
      ) : (
        <div className="mt-1 w-full overflow-x-auto">
          <table className="hidden w-full md:table">
            <thead className="">
              <tr>
                {headingTable.map((head) => (
                  <th key={head.id} className="font-primary py-4 text-left text-[1rem]">
                    {head.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workerApplications.map((app) => (
                <tr key={app.id} className="border-b border-[#0E0E0E]/10">
                  <td className="py-4">{app.companyName}</td>
                  <td className="py-4">
                    <Link to={`/job-post-details/${app.jobPostingId}`}>
                      <button className="font-semibold underline">View Job</button>
                    </Link>
                  </td>
                  <td className={`py-4 ${getStatusColor(app.applicationStatus)}`}>
                    {getFormattedStatus(app.applicationStatus)}
                  </td>
                  <td className="py-4">{moment(app.applicationDate).format("L")}</td>
                  <td className="py-4">
                    <RenderWorkerMessageStatus
                      length={app.messages.length}
                      messages={app.messages}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="md:hidden">
            {workerApplications.map((app) => (
              <div key={app.id} className="border-b border-[#0E0E0E]/10 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-primary font-medium">{app.companyName}</h3>
                  <span
                    className={`rounded-full px-2 py-1 text-sm ${getStatusColor(app.applicationStatus)}`}
                  >
                    {getFormattedStatus(app.applicationStatus)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Link to={`/job-post-details/${app.jobPostingId}`}>
                    <button className="cursor-pointer font-semibold underline">View Job</button>
                  </Link>
                  <div>
                    <RenderWorkerMessageStatus length={app.messages.length} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default WorkerApplications;
