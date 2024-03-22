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
/* <NavBar /> En le plaçant d'abord, nous nous assurons qu'il est affiché en haut de chaque page. 
Le Outlet est comme une zone réservée où le contenu de nos pages va être affiché.
 C'est là que le contenu spécifique à chaque page, défini par nos routes, apparaîtra.*/