import { useState, useEffect } from "react";
import { useUserSearch } from "../hooks/useUserSearch";
import UserTable from "./UserTable";
import Pagination from "../../../components/Pagination";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

function UserManagement() {
  const [searchParams, setSearchParams] = useState({
    email: "",
    page: 0,
  });

  const { data, isLoading, refetch } = useUserSearch(searchParams.email, searchParams.page);
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  const handleSearch = (searchTerm) => {
    setSearchParams({
      email: searchTerm,
      page: 0,
    });
  };

  if (isLoading && !data) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="my-3">User Management</h2>
      {data && data.content ? (
        <UserTable users={data.content} onSearch={handleSearch} />
      ) : (
        <p>No user data available</p>
      )}
      <Pagination
        page={searchParams.page}
        setPage={handlePageChange}
        totalPages={data?.totalPages}
        isLoading={isLoading}
      />
    </div>
  );
}

export default UserManagement;
