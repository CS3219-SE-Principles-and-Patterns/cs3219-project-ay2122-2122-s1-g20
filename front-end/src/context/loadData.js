import { useContext } from "react";
import { AccountContext } from "./AccountContext";

const isAuthenticated = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/user/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export default function loadData() {
  const { setUser } = useContext(AccountContext);

  isAuthenticated().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      setUser(data.user);
    }
  });
}
