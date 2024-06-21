

export default function NavBar() {

        {/* <nav className="nav">
            <div className="logo">
                Gym Tracker
            </div>
                <div className="menu">
                <a href="#home">Home</a>
                <a href="#workouts">Workouts</a>
                <a href="#progress">Progress</a>
                <a href="#profile">Profile</a>
            </div>
        </nav>  
        */}


    
return (  
<>

  <nav className="navbar navbar-expand-sm" style={{backgroundColor: "#e3f2fd"}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">GYM APP</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarScroll">
      <ul className="navbar-nav my-2 my-lg-0 navbar-nav-scroll" >
      {/* style="--bs-scroll-height: 100px;" */}
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Profile</a>
        </li>
        <li className="nav-item dropdown d-flex">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Menu
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item d-flex">
          <a className="nav-link disabled" aria-disabled="true">Log Out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>




</>      
)
}