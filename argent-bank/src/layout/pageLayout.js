import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function PageLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
export default PageLayout;
