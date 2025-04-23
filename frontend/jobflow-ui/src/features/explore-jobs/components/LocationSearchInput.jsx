import PropTypes from "prop-types";
import { IoLocationOutline } from "react-icons/io5";
import Input from "../../../components/ui/Input";
import { useSuggestLocations } from "../hooks/useSuggestLocations";
import SuggestionsList from "./SuggestionsList";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { useSuggestions } from "../hooks/useSuggestions";

function LocationSearchInput({ regionQuery, setRegionQuery }) {
  const { data: locationSuggestions = [] } = useSuggestLocations(regionQuery);
  const options = {
    minQueryLength: 1,
    maxSuggestions: 5,
    splitFirst: true,
  };
  const {
    showSuggestions,
    setShowSuggestions,
    getFilteredSuggestions,
    onSuggestionClick,
    handleInputChange,
    handleInputFocus,
    inputValue,
  } = useSuggestions(regionQuery, setRegionQuery, locationSuggestions, options);

  const handleClickOutside = () => setShowSuggestions(false);
  const locationSuggestionsRef = useOutsideClick(handleClickOutside);

  const filteredLocationSuggestions = getFilteredSuggestions();

  return (
    <div
      className={`relative ${showSuggestions ? "flex-[2]" : "flex-1"} flex items-center rounded-full bg-white p-2 shadow-md md:rounded-none md:p-0 md:shadow-none`}
    >
      <div className="px-3">
        <IoLocationOutline className="h-5 w-5 text-gray-500" />
      </div>
      <Input
        type="text"
        placeholder="In the city..."
        className="flex-1 p-2 focus:outline-none"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />

      <SuggestionsList
        suggestions={filteredLocationSuggestions}
        onSuggestionClick={onSuggestionClick}
        refProp={locationSuggestionsRef}
        showSuggestions={showSuggestions}
      />
    </div>
  );
}
LocationSearchInput.propTypes = {
  regionQuery: PropTypes.string.isRequired,
  setRegionQuery: PropTypes.func.isRequired,
};

export default LocationSearchInput;
