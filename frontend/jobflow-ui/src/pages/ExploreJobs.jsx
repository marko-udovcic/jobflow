import HeroSection from "../features/explore-jobs/components/HeroSection";
import SearchSection from "../features/explore-jobs/components/SearchSection";
import { useState, useEffect } from "react";
import { useJobExplore } from "../features/explore-jobs/hooks/useJobExplore";
import JobsList from "../components/ui/JobsList";
import Pagination from "../components/Pagination";

function ExploreJobs() {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [page, setPage] = useState(0);

  const {
    data: jobPostings,
    refetch,
    isFetching,
  } = useJobExplore({
    title: searchTitle,
    location: searchLocation,
    page: page,
    size: 2,
  });

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    setPage(0);
  }, [searchTitle, searchLocation]);

  return (
    <div className="p-2 lg:p-0">
      <HeroSection />
      <SearchSection
        setSearchTitle={setSearchTitle}
        setSearchLocation={setSearchLocation}
        searchLocation={searchLocation}
        searchTitle={searchTitle}
        jobPostings={jobPostings}
        isFetching={isFetching}
        refetch={refetch}
      />
      <JobsList jobList={jobPostings?.content} isAuthUser={false} className={"mt-10"} />

      {jobPostings && typeof jobPostings.totalPages !== "undefined" && (
        <Pagination
          setPage={setPage}
          page={page}
          totalPages={jobPostings.totalPages}
          isLoading={isFetching}
        />
      )}
    </div>
  );
}

export default ExploreJobs;
