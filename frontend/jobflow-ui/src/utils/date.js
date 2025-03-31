export function formatDate(inputDate) {
  let formattedDate = inputDate.split("/");
  return formattedDate[2] + "-" + formattedDate[1] + "-" + formattedDate[0];
}
