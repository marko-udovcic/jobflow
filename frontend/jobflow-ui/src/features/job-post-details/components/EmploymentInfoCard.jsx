import PropTypes from "prop-types";

function EmploymentInfoCard({ title = "Title", content = "Content" }) {
  return (
    <div className="flex flex-col rounded-[20px] bg-white px-10 py-5">
      <p className="font-primary font-semibold">{title}</p>
      <p>{content}</p>
    </div>
  );
}

EmploymentInfoCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default EmploymentInfoCard;
