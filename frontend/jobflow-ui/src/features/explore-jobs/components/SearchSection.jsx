import { useState } from "react";
import Button from "../../../components/ui/Button";
import LocationSearchInput from "./LocationSearchInput";
import JobSearchInput from "./JobSearchInput";
import PropTypes from "prop-types";
function SearchSection({ setSearchTitle, setSearchLocation, refetch, isFetching }) {
  const [jobQuery, setJobQuery] = useState("");
  const [regionQuery, setRegionQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTitle(jobQuery);
    setSearchLocation(regionQuery);
    setTimeout(() => {
      refetch();
    }, 10);
  };

  return (
    <>
      <div className="mt-4 flex w-full justify-center p-4">
        <div className="w-full max-w-4xl rounded-full md:bg-white">
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 p-2 md:flex-row md:items-center md:gap-0 md:rounded-full lg:shadow-lg"
          >
            <JobSearchInput jobQuery={jobQuery} setJobQuery={setJobQuery} />
            <div className="mx-2 hidden h-8 w-px bg-gray-200 md:block"></div>

            <LocationSearchInput regionQuery={regionQuery} setRegionQuery={setRegionQuery} />

            <Button variant="primary" type="submit" className="w-[25%] lg:w-[15%]">
              {isFetching ? "Searching..." : "Search"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

SearchSection.propTypes = {
  setSearchTitle: PropTypes.func.isRequired,
  setSearchLocation: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default SearchSection;
