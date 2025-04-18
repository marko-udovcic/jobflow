import { useAuthStore } from "../store/useAuthStore";
import Modal from "../components/ui/Modal";
import UpdateCompanyForm from "../features/employer-profile/components/UpdateCompanyForm";
import AboutCompany from "../features/employer-profile/components/AboutCompany";
import JobOpenings from "../features/employer-profile/components/JobOpenings";
import companyImage from "../assets/images/company_img.jpg";
import UserLogo from "../components/ui/UserLogo";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../features/employer-profile/hooks/useUser";
function EmployerProfile() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const companyId = id === undefined ? currentUser?.id : id;
  const { user, isLoading } = useUser(companyId);

  useEffect(() => {
    if (currentUser?.companyName == null && currentUser?.role === "EMPLOYER") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [currentUser]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-2 lg:p-0">
      <Modal showCloseBtn={false} isOpen={isModalOpen}>
        <UpdateCompanyForm setIsModalOpen={setIsModalOpen} />
      </Modal>
      <div className="w-full">
        <img
          src={companyImage}
          className="w-full rounded-2xl object-cover object-center lg:h-[400px]"
        />
      </div>
      <UserLogo user={user} />
      <AboutCompany aboutCompany={user?.aboutCompany} />
      <JobOpenings companyId={companyId} />
    </div>
  );
}

export default EmployerProfile;
