import Button from "../../../components/ui/Button";
import { useLogout } from "../hooks/useLogout";
import PropTypes from "prop-types";

function Logout({ className }) {
  const { logout } = useLogout();

  return (
    <Button onClick={logout} className={className} variant="primary">
      Logout
    </Button>
  );
}
Logout.propTypes = {
  className: PropTypes.string,
};

export default Logout;
