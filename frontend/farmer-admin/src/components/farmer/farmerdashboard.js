import { Container, Table, Button, Alert, Row, Col, Card, CardGroup } from 'react-bootstrap';
import Sidebar from './sidebarmenufarmer';
import Navbar from '../navbar';
import Footer from '../footer';
import React, { useState, useEffect } from 'react';
import apiClient from '../util';

function FarmerDashboard() {
  const [stats, setStats] = useState({ productsAdded: 0, productsOrdered: 0, totalSales: 0, customerOrders: [] });
  const [latestOrders, setLatestOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [negotiations, setNegotiations] = useState([]);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    apiClient.get('/api/dashboard-stats')
      .then(response => setStats(response.data))
      .catch(error => console.error(error));
    apiClient.get('/api/latest-orders')
      .then(response => setLatestOrders(response.data.latestOrders))
      .catch(error => console.error(error));
    apiClient.get('/api/recent-products')
      .then(response => setRecentProducts(response.data.recentProducts))
      .catch(error => console.error(error));
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
    if (storedRole === 'farmer') {
      fetchPendingNegotiations();
    }
  }, []);

  const fetchPendingNegotiations = async () => {
    try {
      const response = await apiClient.get('/api/negotiations/pending');
      setNegotiations(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDecision = async (id, decision) => {
    try {
      await apiClient.put(`/api/negotiations/${id}`, { status: decision });
      setNegotiations(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <h1>
      Dashboard
    </h1>
    <ol className="breadcrumb">
      <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
      <li className="active">Dashboard</li>
    </ol>
  </section>
  {/* Main content */}
  <section className="content">
    {/* Info boxes */}
    <div className="row">
  <div className="col-md-3 col-sm-6 col-xs-12">
    <div className="info-box">
      <span className="info-box-icon bg-aqua"><i className="ion ion-ios-gear-outline" /></span>
      <div className="info-box-content">
        <span className="info-box-text">TOTAL ORDERS</span>
        <span className="info-box-number">{stats.customerOrders.length}</span>
      </div>
    </div>
  </div>
  <div className="col-md-3 col-sm-6 col-xs-12">
    <div className="info-box">
      <span className="info-box-icon bg-red"><i className="fa fa-google-plus" /></span>
      <div className="info-box-content">
        <span className="info-box-text">PRODUCTS ADDED</span>
        <span className="info-box-number">{stats.productsAdded}</span>
      </div>
    </div>
  </div>
  <div className="clearfix visible-sm-block" />
  <div className="col-md-3 col-sm-6 col-xs-12">
    <div className="info-box">
      <span className="info-box-icon bg-green"><i className="ion ion-ios-cart-outline" /></span>
      <div className="info-box-content">
        <span className="info-box-text">PRODUCT ORDERED</span>
        <span className="info-box-number">{stats.productsOrdered}</span>
      </div>
    </div>
  </div>
  <div className="col-md-3 col-sm-6 col-xs-12">
    <div className="info-box">
      <span className="info-box-icon bg-yellow"><i className="ion ion-ios-people-outline" /></span>
      <div className="info-box-content">
        <span className="info-box-text">TOTAL SALES</span>
        <span className="info-box-number">{stats.totalSales}</span>
      </div>
    </div>
  </div>
</div>

    {/* /.row */}
    {/* Main row */}
    <div className="row">
      {/* Left col */}
      <div className="col-md-8">
        {/* TABLE: LATEST ORDERS */}
        <div className="box box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Latest Orders</h3>
            <div className="box-tools pull-right">
              <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
              </button>
              <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
            </div>
          </div>
          {/* /.box-header */}
          <div className="box-body">
            <div className="table-responsive">
            <table className="table table-striped">
  <thead>
    <tr>
      <th>Order ID</th>
      <th>User</th>
      <th>Email</th>
      <th>Total</th>
      <th>Payment Method</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {latestOrders.length === 0 ? (
      <tr>
        <td colSpan="5">No recent orders.</td>
      </tr>
    ) : (
      latestOrders.map(order => (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.user}</td>
          <td>{order.email}</td>
          <td>{order.total}</td>
          <td>{order.payment_method}</td>
          <td>{order.status}</td>
        </tr>
      ))
    )}
  </tbody>
</table>

            </div>
            {/* /.table-responsive */}
          </div>
          {/* /.box-body */}
          <div className="box-footer clearfix">
            <a href="javascript:void(0)" className="btn btn-sm btn-info btn-flat pull-left">Place New Order</a>
            <a href="javascript:void(0)" className="btn btn-sm btn-default btn-flat pull-right">View All Orders</a>
          </div>
          {/* /.box-footer */}
        </div>
        {/* /.box */}
      </div>
      {/* /.col */}
      <div className="col-md-4">
        {/* PRODUCT LIST */}
        <div className="box box-primary">
          <div className="box-header with-border">
            <h3 className="box-title">Recently Added Products</h3>
            <div className="box-tools pull-right">
              <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
              </button>
              <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
            </div>
          </div>
          {/* /.box-header */}
          <div className="box-body">
            <ul className="products-list product-list-in-box">
            {recentProducts.length === 0 ? (
          <li className="item">
          
          <p>No Products Added Recently</p>
        </li>
        ) : (
          recentProducts.map(product => (
              <li className="item" key={product.id}>
                <div className="product-img">
                {product.image && 
                  <img 
                    src={`http://localhost:5000/${product.image}`} 
                    alt={product.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                }
                </div>
                <div className="product-info">
                  <a href="javascript:void(0)" className="product-title">{product.name}
                    <span className="label label-success pull-right">₹{product.price}</span></a>
                  <span className="product-description">
                  {product.description}
                  </span>
                </div>
              </li>
))
)}

              
            </ul>
          </div>
          {/* /.box-body */}
          <div className="box-footer text-center">
            <a href="javascript:void(0)" className="uppercase">View All Products</a>
          </div>
          {/* /.box-footer */}
        </div>
        {/* /.box */}
      </div>
      {/* /.col */}

      <div className="col-md-12">
      <div className="box box-primary">
          <div className="box-header with-border">
            <h3 className="box-title">Pending Negotiation</h3>
            <div className="box-tools pull-right">
              <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
              </button>
              <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
            </div>
          </div>
          {/* /.box-header */}
          <div className="box-body">
      {role === 'farmer' && (
          <Card className="mt-4">
            
            <Card.Body>
              {negotiations.length === 0 ? (
                <p>No pending negotiations.</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Original Amount</th>
                      <th>Negotiated Amount</th>
                      <th>Items</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {negotiations.map(negotiation => (
                      <tr key={negotiation.id}>
                        <td>{negotiation.username}</td>
                        <td>₹{negotiation.originalAmount}</td>
                        <td>₹{negotiation.negotiatedAmount}</td>
                        <td>
                          <ul>
                            {negotiation.items.map((item, idx) => (
                              <li key={idx}>{item.title} x {item.quantity}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <Button
                            variant="success"
                            className="me-2"
                            onClick={() => handleDecision(negotiation.id, 'approved')}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDecision(negotiation.id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        )}
            </div>
                      {/* /.box-footer */}
        </div>
        {/* /.box */}
      </div>
    </div>
    {/* /.row */}
  </section>
  {/* /.content */}
</div>

      <Footer />
    </div>
  );
}

export default FarmerDashboard;
