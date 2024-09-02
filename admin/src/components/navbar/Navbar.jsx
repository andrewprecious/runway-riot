import "./navbar.css";

const Navbar = () => {
  return (
    <div className="Navbar">
      {/* form div */}
      <div className="left">
        {" "}
        <form action="" className="searchForm">
          <input type="text" name="search" id="search" placeholder="Search" />
          <i className="fa fa-search" aria-hidden="true"></i>
        </form>
      </div>

      <div className="right">
        {" "}
        {/* bell div */}
        <div className="bell">
          <i class="fa fa-bell-o hover1" aria-hidden="true"></i>
          <div className="count">5</div>
          <p className="sp">Click to see notifications</p>
        </div>
        {/* dark mode and light mode icon */}
        <div className="hover">
          <i className="fa fa-moon-o " aria-hidden="true"></i>
          <p className="sp">Click to change theme</p>
        </div>
        {/* avata */}
        <div className="hover">
          {" "}
          <img src="/avata.jpg" alt="blah" className="avata" />
        </div>
        {/* profile picture */}
        <div className="hover">
          {" "}
          <i class="fa fa-user" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
