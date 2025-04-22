// JobSearchInput.jsx
import PropTypes from "prop-types";
import { CiSearch } from "react-icons/ci";
import Input from "../../../components/ui/Input";
import { useSuggestTitles } from "../hooks/useSuggestTitles";
import SuggestionsList from "./SuggestionsList";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { useSuggestions } from "../hooks/useSuggestions";

function JobSearchInput({ jobQuery, setJobQuery }) {
  const { data: jobSuggestions = [] } = useSuggestTitles(jobQuery);
  const {
    showSuggestions,
    setShowSuggestions,
    getFilteredSuggestions,
    onSuggestionClick,
    handleInputChange,
    handleInputFocus,
    inputValue,
  } = useSuggestions(jobQuery, setJobQuery, jobSuggestions);

  const handleClickOutside = () => setShowSuggestions(false);
  const jobSuggestionsRef = useOutsideClick(handleClickOutside);

  const filteredJobSuggestions = getFilteredSuggestions();

  return (
    <div className="relative flex flex-[2] items-center rounded-full bg-white p-2 shadow-md md:rounded-none md:p-0 md:shadow-none">
      <div className="px-3">
        <CiSearch className="font-secondary h-6 w-6 text-gray-500" />
      </div>
      <Input
        type="text"
        placeholder="I'm looking for jobs..."
        className="flex-1 p-2 focus:outline-none"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
      <SuggestionsList
        suggestions={filteredJobSuggestions}
        onSuggestionClick={onSuggestionClick}
        refProp={jobSuggestionsRef}
        showSuggestions={showSuggestions}
      />
    </div>
  );
}
JobSearchInput.propTypes = {
  jobQuery: PropTypes.string.isRequired,
  setJobQuery: PropTypes.func.isRequired,
};

export default JobSearchInput;
