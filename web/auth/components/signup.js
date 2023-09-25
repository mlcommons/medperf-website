import { useAuth0 } from "@auth0/auth0-react";


const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
        prompt: "login",
        scope: "",
      },
    });
  };

  return (
    <button onClick={handleSignUp}>
      Sign Up
    </button>
  );
};

export default SignupButton;
