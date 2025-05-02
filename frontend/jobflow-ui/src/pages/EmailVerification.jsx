import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEmailVerification } from "../features/auth/hooks/useEmailVerification";
import Button from "../components/ui/Button";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { verificationResult, isLoading, isError, error } = useEmailVerification(token);

  useEffect(() => {
    if (verificationResult && !isLoading) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [token, verificationResult, isLoading, isError, error, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Email Verification</h1>

        {isLoading && (
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4">Verifying your email address...</p>
          </div>
        )}

        {verificationResult && !isLoading && (
          <div className="text-center text-green-600">
            <FiCheckCircle className="mx-auto h-16 w-16" />
            <p className="mt-4">Your email has been successfully verified!</p>
            <p className="mt-2 text-gray-600">You will be redirected to the login page shortly.</p>
          </div>
        )}

        {(isError || !token) && (
          <div className="text-center text-red-600">
            <FiXCircle className="mx-auto h-16 w-16" />
            <p className="mt-4">Email verification failed.</p>
            <p className="mt-2 text-gray-600">
              The verification link may have expired or is invalid.
            </p>
            <Button onClick={() => navigate("/login")} variant="primary" className="mt-6">
              Go to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;
