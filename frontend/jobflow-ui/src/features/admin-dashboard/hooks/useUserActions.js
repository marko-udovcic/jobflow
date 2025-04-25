import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateUserStatus } from "./useUpdateUserStatus";
export function useUserActions(users = []) {
  const navigate = useNavigate();
  const [editedUser, setEditedUser] = useState(null);
  const { updateUserStatus } = useUpdateUserStatus();

  const handleUserAction = (userId, action) => {
    const user = users.find((u) => u.id === userId);

    switch (action) {
      case "view": {
        navigate(`/${user.role.toLowerCase()}/profile/${userId}`);
        break;
      }
      case "toggle": {
        if (!user) return;

        if (editedUser && editedUser.id !== userId) {
          alert("Please save or cancel your current changes first");
          return;
        }

        const currentStatus = editedUser?.id === userId ? editedUser.enabled : user.enabled;

        const newStatus = !currentStatus;

        if (newStatus === user.enabled) {
          setEditedUser(null);
        } else {
          setEditedUser({
            id: userId,
            enabled: newStatus,
          });
        }
        break;
      }
      case "save": {
        if (!user || !editedUser) return;

        updateUserStatus({
          userId,
          enabled: editedUser.enabled,
        });

        setEditedUser(null);
        break;
      }
      default:
        break;
    }
  };

  const getStatus = (user) => {
    return editedUser?.id === user.id ? editedUser.enabled : user.enabled;
  };

  return { handleUserAction, editedUser, getStatus };
}
