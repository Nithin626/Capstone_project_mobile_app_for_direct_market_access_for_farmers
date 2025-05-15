import Sidebar from './sidebarmenufarmer';
import Navbar from '../navbar';
import Footer from '../footer';
import React, { useState, useEffect } from 'react';
import apiClient from '../util';


function AddProducts() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('image', image);

      apiClient.post('http://localhost:5000/add_product', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then((response) => {
          console.log(response.data);
          setMessage('Product added successfully!');
          setMessageType('success');
          // Clear form fields
          setName('');
          setDescription('');
          setPrice(0);
          setImage(null);
          // Clear message after 3 seconds
          setTimeout(() => setMessage(''), 3000);
      })
      .catch((error) => {
          console.error(error);
          setMessage('Error adding product. Please try again.');
          setMessageType('error');
          setTimeout(() => setMessage(''), 3000);
      });
  };

    return (
        <div className="wrapper">
      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <h1>
      Add Products
    </h1>
    <ol className="breadcrumb">
      <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
      <li className="active">Add Products</li>
    </ol>
  </section>
  {/* Main content */}
  <section className="content">
    <div className="row ">
  <div className="col-xs-12">
          <div className="box box-default">
            <div className="box-header with-border">
              <h3 className="box-title">Add Products</h3>
            </div>
            <div className="box-body">
            <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="box-body">
                <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">Name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                </div>
                <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">Description</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                </div>
                <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">Price</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                </div>
                <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">Image</label>
                <div className="col-sm-10">
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                </div>

            </div>
            {/* /.box-body */}
            <div className="box-footer">
                <button type="submit" className="btn btn-info pull-right">Add</button>
            </div>
            {/* /.box-footer */}
            </form>
{/* Message Display */}
{message && (
                        <div className={`alert alert-${messageType}`} 
                            style={{
                                backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
                                color: messageType === 'success' ? '#155724' : '#721c24',
                                padding: '10px',
                                margin: '10px 0',
                                borderRadius: '4px',
                                border: '1px solid transparent'
                            }}>
                            {message}
                        </div>
                    )}
            
            </div>
          </div>
        </div>
        </div>
        
        </section>
        {/* /.content */}
        </div>
        <Footer />
        </div>
    );
}

export default AddProducts;
