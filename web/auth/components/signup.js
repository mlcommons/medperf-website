import { useAuth0 } from "@auth0/auth0-react";


const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
        prompt: "login",
        scope: '', // auth0 uses the union of scopes provided here and in app init
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
