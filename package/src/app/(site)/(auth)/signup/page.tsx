import { Metadata } from "next";
import AuthSignup from "@/app/components/auth/auth-signup";

export const metadata: Metadata = {
  title: "Sign Up | Creditor",
};

const SignupPage = () => {
  return (
    <>
      <AuthSignup />
    </>
  );
};

export default SignupPage;
