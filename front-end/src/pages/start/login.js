import LoginForm from "../../components/forms/LoginForm";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

const LoginPage = () => {
  const cookies = new Cookies();
  const existCookies = cookies.get("token") ? true : false;

  return (
    <div>
      {existCookies ? (
        <Redirect to="/studysessions" />
      ) : (
        <div className="max-w-7xl mt-10 mb-10 flex flex-col h-full justify-center items-center w-full mx-auto">
          <div className="text-3xl sm:text-4xl font-bold pt-7">
            Log in to your account.
          </div>
          <LoginForm />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
