export const getStatusColor = (status) => {
  switch (status) {
    case "APPROVED":
      return "text-[#00AD3A] font-primary font-medium";
    case "REJECTED":
      return "text-red-500 font-primary font-medium";
    case "PENDING":
      return "text-yellow-500 font-primary font-medium ";
    default:
      return "";
  }
};

export const getFormattedStatus = (status) => {
  switch (status) {
    case "APPROVED":
      return "Accepted";
    case "REJECTED":
      return "Rejected";
    case "PENDING":
      return "Pending";
    default:
      return "";
  }
};
