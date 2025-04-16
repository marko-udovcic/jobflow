export function formatDate(inputDate) {
  if (!inputDate) return null;

  if (typeof inputDate === "string" && inputDate.includes("undefined-undefined-")) {
    const match = inputDate.match(/undefined-undefined-(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : null;
  }

  if (typeof inputDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(inputDate)) {
    return inputDate;
  }

  try {
    if (typeof inputDate === "string" && inputDate.includes("/")) {
      const formattedDate = inputDate.split("/");

      if (formattedDate.length === 3) {
        return `${formattedDate[2]}-${formattedDate[1]}-${formattedDate[0]}`;
      }
    }

    if (inputDate instanceof Date) {
      const year = inputDate.getFullYear();

      const month = String(inputDate.getMonth() + 1).padStart(2, "0");
      const day = String(inputDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return null;
  }

  return null;
}
