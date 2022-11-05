import { Outlet } from "react-router-dom";
import Directory from "../../directory/directory.component";

function Home() {

  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  );
}

export default Home;
