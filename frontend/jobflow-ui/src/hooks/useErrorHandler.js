export function useErrorHandler(isError, error) {
  if (isError && error) {
    if (error.message === "Request failed with status code 401" || error.response?.status === 401) {
      console.error("401 Unauthorized error detected");
      // Create a custom error object with additional properties
      const authError = new Error("Unauthorized");
      authError.status = 401;
      authError.statusText = "Unauthorized";
      authError.data = { message: "Your session has expired" };
      throw authError;
    } else {
      throw error;
    }
  }
}
