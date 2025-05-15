import React from 'react';
import { Nav } from 'react-bootstrap';

function Sidebarmenufarmer() {
  return (
    <div>
<aside className="main-sidebar">
  {/* sidebar: style can be found in sidebar.less */}
  <section className="sidebar">
    {/* Sidebar user panel */}

    {/* sidebar menu: : style can be found in sidebar.less */}
    <ul className="sidebar-menu" data-widget="tree">
      <li className="header">MAIN NAVIGATION</li>
      
      <li><a href="/farmer/dashboard"><i className="fa fa-dashboard" /> <span>Dashboard</span></a></li>
      <li><a href="/farmer/addproducts"><i className="fa fa-circle-o text-red" /> <span>Add Product</span></a></li>
      <li><a href="/farmer/cropdisease"><i className="fa fa-circle-o text-yellow" /> <span>Crop Disease Prediction</span></a></li>
      <li><a href="/farmer/croprecommend"><i className="fa fa-circle-o text-aqua" /> <span>Crop Recommendation</span></a></li>
      </ul>
  </section>
  {/* /.sidebar */}
</aside>

    </div>
  );
}

export default Sidebarmenufarmer;
