import LoginForm from "../../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="max-w-7xl mt-10 mb-10 flex flex-col h-full justify-center items-center w-full mx-auto">
      <div className="text-3xl sm:text-4xl font-bold pt-7">
        Log in to your account.
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
