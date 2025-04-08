import HeadingSection from "./HeadingSection";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import FlexRowInfo from "./ui/FlexRowInfo";
import PropTypes from "prop-types";

function PersonalInfo({ userCv = {} }) {
  const personalInfoList = [
    { icon: <MdOutlineMailOutline />, label: "Email", value: userCv?.email },
    { icon: <IoIosPhonePortrait />, label: "Phone", value: userCv?.phone },
    { icon: <FaLocationDot />, label: "Location", value: `${userCv?.city}, ${userCv?.country}` },
    { icon: null, label: "Nationality", value: userCv?.nationality },
    { icon: null, label: "Date of Birth", value: userCv?.dateOfBirth },
  ];

  return (
    <div>
      <HeadingSection title="Personal Information" />
      <div className="mb-5 flex flex-col">
        {personalInfoList.map((item, index) => (
          <FlexRowInfo key={index}>
            {item.icon && item.icon}
            <p className="font-semibold">{item.label}</p>
            <p>{item.value}</p>
          </FlexRowInfo>
        ))}
      </div>
    </div>
  );
}
PersonalInfo.propTypes = {
  userCv: PropTypes.shape({
    email: PropTypes.string,
    phone: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    nationality: PropTypes.string,
    dateOfBirth: PropTypes.string,
  }),
};

export default PersonalInfo;
