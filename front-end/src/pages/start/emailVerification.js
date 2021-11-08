import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlertMessage from "../../components/alerts/AlertMessage";

const EmailVerification = () => {
  const { uniqueString } = useParams();
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setisError] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);

  useEffect(() => {
    async function verifyEmail() {
      const response = await fetch("http://localhost:8080/api/user/verified", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uniqueString: uniqueString,
        }),
      });
      try {
        const responseData = await response.json();
        if (response.status !== 200) {
          setAlertMessage(responseData.message);
          setisError(true);
          throw new Error(responseData.message);
        }

        if (response.status === 200) {
          setAlertMessage(responseData.message);
        }
      } catch (err) {
        setisError(true);
      }
    }
    verifyEmail();
  });

  return (
    <div className="max-w-7xl mt-10 mb-10 flex flex-col h-full justify-center items-center w-max mx-auto">
      {alertMessage !== "" && openAlert ? (
        <AlertMessage
          open={openAlert}
          setOpen={setOpenAlert}
          isError={isError}
          message={alertMessage}
        />
      ) : undefined}
      <div className="bg-purple bg-opacity-50 px-32 py-20 rounded-md">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold pt-7">
          Email verified.
        </div>
        <p className="text-xl text-sm md:text-2xl text-purple-dark p-7">
          Please proceed to login with your <br /> registered email account.
        </p>
        <button
          type="submit"
          className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-black bg-yellow-dark hover:bg-opacity-75 mt-6"
        >
          <Link className="text-black pl-1 hover:underline" to="/login">
            Back to log in
          </Link>
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
