import Sidebar from './sidebarmenufarmer';
import Navbar from '../navbar';
import Footer from '../footer';
import React, { useState, useEffect } from 'react';
import apiClient from '../util';

function CropRecommendation() {
    const [nitrogen, setNitrogen] = useState('');
    const [phosphorus, setPhosphorus] = useState('');
    const [potassium, setPotassium] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [ph, setPh] = useState('');
    const [rainfall, setRainfall] = useState('');
    const [recommendation, setRecommendation] = useState(null);
    const [tips, setTips] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient.post('http://localhost:5000/recommend_crop', {
          nitrogen: parseFloat(nitrogen),
          phosphorus: parseFloat(phosphorus),
          potassium: parseFloat(potassium),
          temperature: parseFloat(temperature),
          humidity: parseFloat(humidity),
          ph: parseFloat(ph),
          rainfall: parseFloat(rainfall)
        })
        .then((response) => {
          setRecommendation(response.data.recommended_crop);
          setTips(response.data.tips);
          console.log(response.data.recommended_crop, response.data.tips);
        })
        .catch((error) => {
          console.error(error);
          setTips(error.response?.data?.error || "Server error");
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
                        Crop Recommendation
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
                        <li className="active">Crop Recommendation</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                <div className="row ">
  <div className="col-xs-12">
          <div className="box box-default">
            <div className="box-header with-border">
              <h3 className="box-title">Crop Recommendation by ML</h3>
            </div>
            <div className="box-body">
            <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="box-body">
                <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">Nitrogen (N) Ratio:</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" id="inputEmail3" placeholder="Nitrogen" value={nitrogen} onChange={(e) => setNitrogen(e.target.value)} />
                </div>
                </div>
                <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">Phosphorus (P) Ratio:</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" id="inputEmail3" placeholder="Phosphorus" value={phosphorus} onChange={(e) => setPhosphorus(e.target.value)} />
                </div>
                </div>
                <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">Potassium (K) Ratio:</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" id="inputEmail3" placeholder="Potassium" value={potassium} onChange={(e) => setPotassium(e.target.value)} />
                </div>
                </div>
                <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">Temperature (°C):</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" id="inputEmail3" placeholder="Temperature" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                </div>
                </div>
                <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">Humidity (%):</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="inputEmail3" placeholder="Humidity" value={humidity} onChange={(e) => setHumidity(e.target.value)} />
                </div>
                </div>
                <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">pH:</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" id="inputEmail3" placeholder="pH" value={ph} onChange={(e) => setPh(e.target.value)} />
                </div>
                </div>
                <div className="form-group">
                <label htmlFor="inputEmail3" className="col-sm-2 control-label">Rainfall (mm):</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" id="inputEmail3" placeholder="Rainfall" value={rainfall} onChange={(e) => setRainfall(e.target.value)} />
                </div>
                </div>



            </div>
            {/* /.box-body */}
            <div className="box-footer">
                <button type="submit" className="btn btn-info pull-right">Recommend</button>
            </div>
            {/* /.box-footer */}
            </form>
            {recommendation && (
                        <div>
                            
                            <p><h3>Recommended Crop:</h3>{recommendation}</p>
                            <p><h3>Crop Tips:</h3>{tips}</p>
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

export default CropRecommendation;
