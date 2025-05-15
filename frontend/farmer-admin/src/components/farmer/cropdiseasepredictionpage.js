import Sidebar from './sidebarmenufarmer';
import Navbar from '../navbar';
import Footer from '../footer';
import React, { useState, useEffect } from 'react';
import apiClient from '../util';

function CropDiseasePrediction() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [advice, setAdvice] = useState(null);


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image.");
      return;
    }
    const formData = new FormData();
    formData.append('image', image);

    // Debug: log FormData
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    fetch('http://localhost:5000/predict_disease', {
      method: 'POST',
      body: formData,
      // Do NOT set Content-Type header!
    })
      .then((response) => response.json())
      .then((data) => {
        setPrediction(data.prediction);
        setConfidence(data.confidence);
        setAdvice(data.advice);
        console.log(data.prediction, data.confidence, data.advice); // Debugging line 
      })
      .catch((error) => console.error(error));
  };
    return (
        <div className="wrapper">
        <Navbar />
        <Sidebar />
        <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <section className="content-header">
      <h1>
        Crop Disease Prediction
      </h1>
      <ol className="breadcrumb">
        <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
        <li className="active">Crop Disease Prediction</li>
      </ol>
    </section>
    {/* Main content */}
    <section className="content">
    
    <div className="row ">
        
        <div className="col-xs-12">
          <div className="box box-default center">
            <div className="box-header with-border">
              <h3 className="box-title">Upload Leaf or Crop Image</h3>
            </div>
            <div className="box-body">
            <div className="row ">
            <div className="col-xs-6">

            </div>

            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginRight: '10px' }} />
    
    <button type="submit">Predict Disease</button>
</form>
            {prediction && (
                <div>
                    
                    <p><h3>Prediction:</h3> {prediction}</p>
                    
                    <p><h3>Confidence:</h3> {confidence}</p>

                    <p><h3>Advice:</h3> {advice}</p>

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

export default CropDiseasePrediction;
