import { useSelector } from "react-redux";
// import { store } from '../../redux/store'

export const AdminOnlyRoute = ({ children }) => {
  const { email } = useSelector((store) => store["auth"]);

  if (email === "test123@gmail.com") {
    return children;
  }
  return null;
};
