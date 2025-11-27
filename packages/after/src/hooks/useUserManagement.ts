import { userService, type User } from "@/services/userService";
import { useCallback, useState } from "react";

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userError, setUserError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
      setUserError(null);
    } catch (error: any) {
      setUserError(error.message || "사용자 데이터를 불러오는데 실패했습니다");
    }
  }, []);

  const createUser = async (user: User) => {
    try {
      await userService.create(user);
      await fetchUsers();
      return { success: true, message: "사용자가 생성되었습니다" };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "생성에 실패했습니다",
      };
    }
  };

  const updateUser = async (id: number, values: Partial<User>) => {
    try {
      await userService.update(id, values);
      await fetchUsers();
      return { success: true, message: "사용자가 수정되었습니다" };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "수정에 실패했습니다",
      };
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await userService.delete(id);
      await fetchUsers();
      return { success: true, message: "사용자가 삭제되었습니다" };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "삭제에 실패했습니다",
      };
    }
  };

  return {
    users,
    userError,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};
