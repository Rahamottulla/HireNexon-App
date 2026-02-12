import { useEffect, useState } from "react";
import api from "@/shared/api/axios";
import { formatToIST } from "@/shared/utils/dateFormatter";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/users"); // your backend route
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Created At (IST)</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td className="p-2 border">{user.username}</td>
            <td className="p-2 border">
              {formatToIST(user.createdAt)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
