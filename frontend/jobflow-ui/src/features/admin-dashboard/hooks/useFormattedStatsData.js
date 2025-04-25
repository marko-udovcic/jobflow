// useStatsData.js
import { useState, useEffect } from "react";
export function useFormattedStatsData(statistics = {}) {
  const month = statistics?.monthName || "Current Month";
  const [statsData, setStatsData] = useState([
    {
      title: "Posted Jobs",
      value: 0,
      isPositive: true,
      iconName: "FaBriefcase",
      color: "bg-[#FBE2F4]",
      period: month,
    },
    {
      title: "Active Users",
      value: 0,
      iconName: "FaUsers",
      color: "bg-[#E3DBFA]",
      period: month,
    },
    {
      title: "Companies",
      value: 0,
      iconName: "FaBuilding",
      color: "bg-[#D4F6ED]",
      period: month,
    },
    {
      title: "Applications",
      value: 0,
      iconName: "FaFileAlt",
      color: "bg-[#FFE082]",
      period: month,
    },
  ]);
  useEffect(() => {
    if (statistics && statistics.monthName) {
      setStatsData((currentStats) =>
        currentStats.map((stat) => ({
          ...stat,
          period: month,
          value:
            stat.title === "Posted Jobs"
              ? statistics.postedJobsCount || stat.value
              : stat.title === "Active Users"
                ? statistics.activeUsersCount || stat.value
                : stat.title === "Companies"
                  ? statistics.companiesCount || stat.value
                  : stat.title === "Applications"
                    ? statistics.jobApplicationsCount || stat.value
                    : stat.value,
        })),
      );
    }
  }, [statistics, month]);
  return { statsData };
}
