
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
    <header className="main-header">
  {/* Logo */}
  <a href="index2.html" className="logo">
    {/* mini logo for sidebar mini 50x50 pixels */}
    <span className="logo-mini"><b>A</b>LT</span>
    {/* logo for regular state and mobile devices */}
    <span className="logo-lg"><b>Krop</b>Cart</span>
  </a>
  {/* Header Navbar: style can be found in header.less */}
  <nav className="navbar navbar-static-top">
    {/* Sidebar toggle button*/}
    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
      <span className="sr-only">Toggle navigation</span>
    </a>
    {/* Navbar Right Menu */}
    <div className="navbar-custom-menu">
      <ul className="nav navbar-nav">
        {/* User Account: style can be found in dropdown.less */}
        <li className="dropdown user user-menu">
          
          <a href="#" className="dropdown-toggle"  onClick={handleSignOut}>Sign out</a>
          <ul className="dropdown-menu">
            {/* User image */}
            
            {/* Menu Footer*/}
            <li className="user-footer">
              <div className="pull-left">
                <a href="#" className="btn btn-default btn-flat">Profile</a>
              </div>
              <div className="pull-right">
                <a href="#" className="btn btn-default btn-flat" onClick={handleSignOut}>Sign out</a>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</header>

    </>
  );
}

export default Navbar;
