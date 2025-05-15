// ApprovalComponent.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import Sidebar from './sidebarmenufarmer';
import Navbar from '../navbar';
import Footer from '../footer';
import apiClient from '../util'; // <-- Make sure apiClient is an axios instance

function NegotiationApproval() {
  const [negotiations, setNegotiations] = useState([]);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);

    if (storedRole === 'farmer') {
      fetchPendingNegotiations();
    }
  }, []);

  const fetchPendingNegotiations = async () => {
    try {
      // Use apiClient or axios directly
      const response = await apiClient.get('/api/negotiations/pending');
      setNegotiations(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDecision = async (id, decision) => {
    try {
      // Use apiClient or axios directly
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
          <h1>Add Products</h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
            <li className="active">Add Products</li>
          </ol>
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row ">
            <div className="col-xs-12">
              <Container className="mt-5">
                <h2 className="mb-4">Pending Negotiation Requests</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Table striped bordered hover responsive>
                  <thead className="table-dark">
                    <tr>
                      <th>User Email</th>
                      <th>Original Amount</th>
                      <th>Negotiated Amount</th>
                      <th>Items</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {negotiations.map(negotiation => (
                      <tr key={negotiation.id}>
                        <td>{negotiation.userEmail}</td>
                        <td>₹{negotiation.originalAmount}</td>
                        <td>₹{negotiation.negotiatedAmount}</td>
                        <td>
                          <ul>
                            {negotiation.items.map(item => (
                              <li key={item.id}>
                                {item.title} (Qty: {item.quantity})
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <div className="d-grid gap-2">
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleDecision(negotiation.id, 'approved')}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDecision(negotiation.id, 'rejected')}
                            >
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {negotiations.length === 0 && (
                  <Alert variant="info" className="mt-3">
                    No pending negotiation requests
                  </Alert>
                )}
              </Container>
            </div>
          </div>
        </section>
        {/* /.content */}
      </div>
      <Footer />
    </div>
  );
}

export default NegotiationApproval;
