import { useStatistics } from "../hooks/useStatistics";
import { useFormattedStatsData } from "../hooks/useFormattedStatsData";
import { FaBriefcase, FaUsers, FaBuilding, FaFileAlt } from "react-icons/fa";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useErrorHandler } from "../../../hooks/useErrorHandler";

function Statistics() {
  const { statistics, isLoading, isError, error } = useStatistics();
  const { statsData } = useFormattedStatsData(statistics);
  useErrorHandler(isError, error);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const renderIcon = (iconName, size = 24) => {
    switch (iconName) {
      case "FaBriefcase":
        return <FaBriefcase size={size} />;
      case "FaUsers":
        return <FaUsers size={size} />;
      case "FaBuilding":
        return <FaBuilding size={size} />;
      case "FaFileAlt":
        return <FaFileAlt size={size} />;
      default:
        return null;
    }
  };
  return (
    <div className="mt-5">
      <div>
        <header className="mb-3">
          <h2>Dashboard</h2>
          <p className="mt-1">Overview of your platform metrics</p>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <div className={`h-2 ${stat.color}`}></div>
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className={`rounded-lg p-3 ${stat.color} bg-opacity-10`}>
                    {renderIcon(stat.iconName)}
                  </div>
                </div>
                <div className="mb-2">
                  <h3 className="text-lg font-medium text-gray-600">{stat.title}</h3>
                  <p className="mt-1 text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-500">Data for {stat.period}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
