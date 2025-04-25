import { useState } from "react";
import Input from "../../../components/ui/Input";
import Form from "../../../components/ui/Form";
import Button from "../../../components/ui/Button";
import { useUserActions } from "../hooks/useUserActions";
import PropTypes from "prop-types";
const UserTable = ({ users = [], onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { handleUserAction, editedUser, getStatus } = useUserActions(users);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="mt-3 mb-[3rem] min-h-[15rem]">
      <div className="mb-10 flex justify-center">
        <Form
          className="flex w-full max-w-3xl flex-row items-center justify-center gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex-grow">
            <Input
              variant={"primary"}
              type="text"
              className="w-full"
              placeholder="Search by email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Button variant="primary">Search</Button>
          </div>
        </Form>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Role</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-black-color/10 divide-y">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleUserAction(user.id, "toggle")}
                      className={`cursor-pointer rounded-full px-2 py-1 text-xs font-semibold ${
                        getStatus(user)
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {getStatus(user) ? "Enabled" : "Disabled"}
                    </button>
                  </td>
                  <td onClick={() => handleUserAction(user.id, "view")}>
                    <Button variant="primary" className={"!px-3 !py-1"}>
                      Profile
                    </Button>
                  </td>
                  <td>
                    {editedUser?.id === user.id && (
                      <button
                        onClick={() => handleUserAction(user.id, "save")}
                        className="ml-1 rounded bg-green-600 px-3 py-2 text-sm text-white transition-colors hover:bg-green-700"
                      >
                        Save
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
UserTable.propTypes = {
  users: PropTypes.array,
  onSearch: PropTypes.func.isRequired,
};

export default UserTable;
