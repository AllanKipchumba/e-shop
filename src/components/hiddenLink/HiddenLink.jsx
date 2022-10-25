import { useSelector } from "react-redux";

export const ShowOnLogin = ({ children }) => {
  const { isLoggedIn } = useSelector((store) => store["auth"]);

  if (isLoggedIn) {
    return children;
  } else {
    return null;
  }
};

export const ShowOnLogout = ({ children }) => {
  const { isLoggedIn } = useSelector((store) => store["auth"]);

  if (!isLoggedIn) {
    return children;
  } else {
    return null;
  }
};
