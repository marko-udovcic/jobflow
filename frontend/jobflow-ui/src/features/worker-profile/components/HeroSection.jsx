import PropTypes from "prop-types";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
function HeroSection({ firstName = "User", lastname = "User", userId }) {
  const { currentUser } = useAuthStore();
  console.log("current user ", currentUser, "user id je", userId);
  return (
    <div className="mb-7">
      <div className="flex h-50 w-full items-center justify-between rounded-2xl bg-black p-8">
        <h1 className="text-white">
          {firstName} {lastname}
        </h1>

        {currentUser?.id === userId && (
          <Link to={`/worker/update-cv/${userId}`}>
            <Button variant="secondary">Edit Profile</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

HeroSection.propTypes = {
  firstName: PropTypes.string,
  lastname: PropTypes.string,
  userId: PropTypes.string,
};

export default HeroSection;
