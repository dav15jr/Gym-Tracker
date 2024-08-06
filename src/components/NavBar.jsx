import { Link} from 'react-router-dom'
import EditProfile from "./EditProfile";
import LogOff from "./LogOff";

export default function NavBar() {

return (  
<>
<nav className="navbar navbar-expand-lg mb-5 bg-primary">
  <div className=" container-fluid container">
    <a className="navbar-brand px-sm-5 suez-one-regular" href="./">
      <img src="/public/icons/favicon-32x32.png" alt="Logo" width="30" height="30" className="d-inline-block align-text-bottom mx-1"/>
      PrimeYou
    </a>
    <button className="navbar-toggler mx-sm-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end px-md-5" id="navbarScroll">
      <ul className="navbar-nav  ">
        <li className="nav-item">
        <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/progress">Progress</Link>
        </li>
        <EditProfile />
        <LogOff />
      </ul>
    </div>
  </div>
</nav>
</>      
)
}