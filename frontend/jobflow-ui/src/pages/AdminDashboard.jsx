import Statistics from "../features/admin-dashboard/components/Statistics";
import CategorySection from "../features/admin-dashboard/components/CategorySection";
import UserManagment from "../features/admin-dashboard/components/UserManagment";
function AdminDashboard() {
  return (
    <div className="p-2 lg:p-0">
      <Statistics />
      <UserManagment />
      <CategorySection />
    </div>
  );
}

export default AdminDashboard;
