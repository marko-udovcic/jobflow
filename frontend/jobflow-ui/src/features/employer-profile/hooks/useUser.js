import { useQuery } from "@tanstack/react-query";
import { getUserById as getUserByIdApi } from "../../../services/userService";
import { useAuthStore } from "../../../store/useAuthStore";
export function useUser(userId) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isCurrentUser = currentUser?.id === userId;

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserByIdApi(userId),
    enabled: !!userId && !isCurrentUser,
  });
  if (isCurrentUser) return { user: currentUser, isLoading: false };

  return { user, isLoading };
}
