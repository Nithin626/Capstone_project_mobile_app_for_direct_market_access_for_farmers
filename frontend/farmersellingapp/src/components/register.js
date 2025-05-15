import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../util'; // Use the shared axios instance
import Header from './header';
import Footer from './footer';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('consumer');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!username.trim() || !email.trim() || !password.trim()) {
            setError('All fields are required');
            return;
        }
        
        

        try {
            const response = await apiClient.post('/register', {
                username: username.trim(),
                email: email.trim(),
                password: password.trim(),
                role : 'consumer'
            });

            if (response.status === 201) {
               // Store user details in localStorage
            localStorage.setItem('user', JSON.stringify({
              name: username.trim(),
              email: email.trim()
          }));
                navigate('/login');
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setError('Invalid form data');
                        break;
                    case 500:
                        setError('Server error. Please try later');
                        break;
                    default:
                        setError('Registration failed');
                }
            } else {
                setError('Network error. Please check your connection');
            }
        }
    };

    return (
        <>
        <div id="pxl-page" className="pxl-page header-pos-df">
        <header id="pxl-header" className="pxl-header header-type-el header-layout-8 header-mobile-type-el sticky-direction-scroll-up">
    <div className="pxl-header-desktop d-none d-xl-block">
      <div data-elementor-type="wp-post" data-elementor-id={8} className="elementor elementor-8">
        <section className="elementor-section elementor-top-section elementor-element elementor-element-5df5b23 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default pxl-section-static-pos-no pxl-section-overflow-hidden-no pxl-container-margin-auto-no pxl-header-sticky" data-id="5df5b23" data-element_type="section">
          <div className="pxl-section-divider-bot-img" />        
          <div className="elementor-container elementor-column-gap-default ">
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-d3f4629 pxl-column-element-grow pxl-column-overflow-hidden-no" data-id="d3f4629" data-element_type="column">
              <div className="elementor-widget-wrap elementor-element-populated">
                <div className="elementor-element elementor-element-2ee5934 elementor-widget__width-auto elementor-widget elementor-widget-pxl_logo" data-id="2ee5934" data-element_type="widget" data-widget_type="pxl_logo.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-logo d-flex-wrap align-items-center">
                      <h2>KropCart</h2>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-7bd3e90 elementor-widget__width-auto elementor-widget elementor-widget-pxl_menu" data-id="7bd3e90" data-element_type="widget" data-widget_type="pxl_menu.default">
                  <div className="elementor-widget-container">
                    <div id="pxl_menu-7bd3e90-3623" className="pxl-nav-menu pxl-nav-menu-main style-df is-arrow has-icon">
                      <div className="menu-main-menu-container"><ul id="pxl-primary-menu-pxl_menu-7bd3e90-3623" className="pxl-primary-menu clearfix">
<li id="menu-item-23" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-23"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Capa_1" x="0px" y="0px" width="46.607px" height="46.607px" viewBox="0 0 46.607 46.607" style={{enableBackground: 'new 0 0 46.607 46.607'}} xmlSpace="preserve"><g>	<g>		<path d="M22.408,12.013c0.221,0.261,0.546,0.412,0.888,0.412c0.343,0,0.668-0.149,0.89-0.411c0.994-1.175,2.469-3.333,2.469-5.802   c0-2.467-1.474-4.624-2.468-5.8C23.965,0.151,23.641,0,23.298,0c-0.342,0-0.668,0.149-0.889,0.411   c-0.995,1.175-2.468,3.333-2.469,5.801C19.941,8.68,21.413,10.838,22.408,12.013z" />		<path d="M23.304,20.1c0.182,0.008,4.554,0.182,7.133-2.396c1.744-1.745,2.229-4.313,2.357-5.847   c0.028-0.341-0.095-0.678-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336c-1.534,0.128-4.104,0.612-5.85,2.356   c-1.926,1.928-2.314,4.86-2.384,6.293c-0.069-1.433-0.458-4.365-2.385-6.293c-1.746-1.745-4.314-2.229-5.849-2.356   c-0.341-0.029-0.678,0.095-0.92,0.337c-0.242,0.243-0.364,0.579-0.336,0.92c0.128,1.534,0.612,4.102,2.356,5.846   C18.75,20.282,23.121,20.108,23.304,20.1z" />		<path d="M25.688,22.209c-1.926,1.928-2.314,4.859-2.384,6.293c-0.069-1.434-0.458-4.365-2.385-6.293   c-1.746-1.745-4.314-2.229-5.849-2.356c-0.341-0.028-0.678,0.095-0.92,0.337c-0.242,0.242-0.364,0.579-0.336,0.92   c0.128,1.534,0.612,4.103,2.356,5.846c2.579,2.579,6.949,2.404,7.133,2.396c0.182,0.009,4.554,0.184,7.133-2.396   c1.745-1.745,2.229-4.313,2.357-5.848c0.028-0.341-0.095-0.678-0.337-0.919c-0.242-0.242-0.579-0.365-0.921-0.336   C30.002,19.98,27.434,20.464,25.688,22.209z" />		<path d="M25.688,31.463c-1.926,1.928-2.314,4.858-2.384,6.293c-0.069-1.435-0.458-4.365-2.385-6.293   c-1.745-1.746-4.313-2.229-5.847-2.356c-0.342-0.028-0.678,0.095-0.92,0.336c-0.242,0.241-0.366,0.579-0.338,0.919   c0.128,1.533,0.611,4.104,2.356,5.847c1.764,1.765,4.368,2.24,5.895,2.362v6.668c0,0.756,0.524,1.369,1.281,1.369   c0.756,0,1.281-0.613,1.281-1.369v-6.675c1.537-0.132,4.076-0.622,5.809-2.354c1.744-1.744,2.229-4.312,2.357-5.847   c0.028-0.341-0.095-0.679-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336C30.002,29.233,27.434,29.717,25.688,31.463z" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg><span className="pxl-menu-title">Home</span></a><span className="main-menu-toggle" />

                          </li>


                          <li id="menu-item-23" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-23"><a href="/aboutus"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Capa_1" x="0px" y="0px" width="46.607px" height="46.607px" viewBox="0 0 46.607 46.607" style={{enableBackground: 'new 0 0 46.607 46.607'}} xmlSpace="preserve"><g>	<g>		<path d="M22.408,12.013c0.221,0.261,0.546,0.412,0.888,0.412c0.343,0,0.668-0.149,0.89-0.411c0.994-1.175,2.469-3.333,2.469-5.802   c0-2.467-1.474-4.624-2.468-5.8C23.965,0.151,23.641,0,23.298,0c-0.342,0-0.668,0.149-0.889,0.411   c-0.995,1.175-2.468,3.333-2.469,5.801C19.941,8.68,21.413,10.838,22.408,12.013z" />		<path d="M23.304,20.1c0.182,0.008,4.554,0.182,7.133-2.396c1.744-1.745,2.229-4.313,2.357-5.847   c0.028-0.341-0.095-0.678-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336c-1.534,0.128-4.104,0.612-5.85,2.356   c-1.926,1.928-2.314,4.86-2.384,6.293c-0.069-1.433-0.458-4.365-2.385-6.293c-1.746-1.745-4.314-2.229-5.849-2.356   c-0.341-0.029-0.678,0.095-0.92,0.337c-0.242,0.243-0.364,0.579-0.336,0.92c0.128,1.534,0.612,4.102,2.356,5.846   C18.75,20.282,23.121,20.108,23.304,20.1z" />		<path d="M25.688,22.209c-1.926,1.928-2.314,4.859-2.384,6.293c-0.069-1.434-0.458-4.365-2.385-6.293   c-1.746-1.745-4.314-2.229-5.849-2.356c-0.341-0.028-0.678,0.095-0.92,0.337c-0.242,0.242-0.364,0.579-0.336,0.92   c0.128,1.534,0.612,4.103,2.356,5.846c2.579,2.579,6.949,2.404,7.133,2.396c0.182,0.009,4.554,0.184,7.133-2.396   c1.745-1.745,2.229-4.313,2.357-5.848c0.028-0.341-0.095-0.678-0.337-0.919c-0.242-0.242-0.579-0.365-0.921-0.336   C30.002,19.98,27.434,20.464,25.688,22.209z" />		<path d="M25.688,31.463c-1.926,1.928-2.314,4.858-2.384,6.293c-0.069-1.435-0.458-4.365-2.385-6.293   c-1.745-1.746-4.313-2.229-5.847-2.356c-0.342-0.028-0.678,0.095-0.92,0.336c-0.242,0.241-0.366,0.579-0.338,0.919   c0.128,1.533,0.611,4.104,2.356,5.847c1.764,1.765,4.368,2.24,5.895,2.362v6.668c0,0.756,0.524,1.369,1.281,1.369   c0.756,0,1.281-0.613,1.281-1.369v-6.675c1.537-0.132,4.076-0.622,5.809-2.354c1.744-1.744,2.229-4.312,2.357-5.847   c0.028-0.341-0.095-0.679-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336C30.002,29.233,27.434,29.717,25.688,31.463z" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg><span className="pxl-menu-title">About</span></a><span className="main-menu-toggle" />

                          </li>
                          <li id="menu-item-24" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-24"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Capa_1" x="0px" y="0px" width="46.607px" height="46.607px" viewBox="0 0 46.607 46.607" style={{enableBackground: 'new 0 0 46.607 46.607'}} xmlSpace="preserve"><g>	<g>		<path d="M22.408,12.013c0.221,0.261,0.546,0.412,0.888,0.412c0.343,0,0.668-0.149,0.89-0.411c0.994-1.175,2.469-3.333,2.469-5.802   c0-2.467-1.474-4.624-2.468-5.8C23.965,0.151,23.641,0,23.298,0c-0.342,0-0.668,0.149-0.889,0.411   c-0.995,1.175-2.468,3.333-2.469,5.801C19.941,8.68,21.413,10.838,22.408,12.013z" />		<path d="M23.304,20.1c0.182,0.008,4.554,0.182,7.133-2.396c1.744-1.745,2.229-4.313,2.357-5.847   c0.028-0.341-0.095-0.678-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336c-1.534,0.128-4.104,0.612-5.85,2.356   c-1.926,1.928-2.314,4.86-2.384,6.293c-0.069-1.433-0.458-4.365-2.385-6.293c-1.746-1.745-4.314-2.229-5.849-2.356   c-0.341-0.029-0.678,0.095-0.92,0.337c-0.242,0.243-0.364,0.579-0.336,0.92c0.128,1.534,0.612,4.102,2.356,5.846   C18.75,20.282,23.121,20.108,23.304,20.1z" />		<path d="M25.688,22.209c-1.926,1.928-2.314,4.859-2.384,6.293c-0.069-1.434-0.458-4.365-2.385-6.293   c-1.746-1.745-4.314-2.229-5.849-2.356c-0.341-0.028-0.678,0.095-0.92,0.337c-0.242,0.242-0.364,0.579-0.336,0.92   c0.128,1.534,0.612,4.103,2.356,5.846c2.579,2.579,6.949,2.404,7.133,2.396c0.182,0.009,4.554,0.184,7.133-2.396   c1.745-1.745,2.229-4.313,2.357-5.848c0.028-0.341-0.095-0.678-0.337-0.919c-0.242-0.242-0.579-0.365-0.921-0.336   C30.002,19.98,27.434,20.464,25.688,22.209z" />		<path d="M25.688,31.463c-1.926,1.928-2.314,4.858-2.384,6.293c-0.069-1.435-0.458-4.365-2.385-6.293   c-1.745-1.746-4.313-2.229-5.847-2.356c-0.342-0.028-0.678,0.095-0.92,0.336c-0.242,0.241-0.366,0.579-0.338,0.919   c0.128,1.533,0.611,4.104,2.356,5.847c1.764,1.765,4.368,2.24,5.895,2.362v6.668c0,0.756,0.524,1.369,1.281,1.369   c0.756,0,1.281-0.613,1.281-1.369v-6.675c1.537-0.132,4.076-0.622,5.809-2.354c1.744-1.744,2.229-4.312,2.357-5.847   c0.028-0.341-0.095-0.679-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336C30.002,29.233,27.434,29.717,25.688,31.463z" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg><span className="pxl-menu-title">Shop</span></a><span className="main-menu-toggle" />

                          </li>
                          
                          <li id="menu-item-29" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29"><a href="/contact"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Capa_1" x="0px" y="0px" width="46.607px" height="46.607px" viewBox="0 0 46.607 46.607" style={{enableBackground: 'new 0 0 46.607 46.607'}} xmlSpace="preserve"><g>	<g>		<path d="M22.408,12.013c0.221,0.261,0.546,0.412,0.888,0.412c0.343,0,0.668-0.149,0.89-0.411c0.994-1.175,2.469-3.333,2.469-5.802   c0-2.467-1.474-4.624-2.468-5.8C23.965,0.151,23.641,0,23.298,0c-0.342,0-0.668,0.149-0.889,0.411   c-0.995,1.175-2.468,3.333-2.469,5.801C19.941,8.68,21.413,10.838,22.408,12.013z" />		<path d="M23.304,20.1c0.182,0.008,4.554,0.182,7.133-2.396c1.744-1.745,2.229-4.313,2.357-5.847   c0.028-0.341-0.095-0.678-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336c-1.534,0.128-4.104,0.612-5.85,2.356   c-1.926,1.928-2.314,4.86-2.384,6.293c-0.069-1.433-0.458-4.365-2.385-6.293c-1.746-1.745-4.314-2.229-5.849-2.356   c-0.341-0.029-0.678,0.095-0.92,0.337c-0.242,0.243-0.364,0.579-0.336,0.92c0.128,1.534,0.612,4.102,2.356,5.846   C18.75,20.282,23.121,20.108,23.304,20.1z" />		<path d="M25.688,22.209c-1.926,1.928-2.314,4.859-2.384,6.293c-0.069-1.434-0.458-4.365-2.385-6.293   c-1.746-1.745-4.314-2.229-5.849-2.356c-0.341-0.028-0.678,0.095-0.92,0.337c-0.242,0.242-0.364,0.579-0.336,0.92   c0.128,1.534,0.612,4.103,2.356,5.846c2.579,2.579,6.949,2.404,7.133,2.396c0.182,0.009,4.554,0.184,7.133-2.396   c1.745-1.745,2.229-4.313,2.357-5.848c0.028-0.341-0.095-0.678-0.337-0.919c-0.242-0.242-0.579-0.365-0.921-0.336   C30.002,19.98,27.434,20.464,25.688,22.209z" />		<path d="M25.688,31.463c-1.926,1.928-2.314,4.858-2.384,6.293c-0.069-1.435-0.458-4.365-2.385-6.293   c-1.745-1.746-4.313-2.229-5.847-2.356c-0.342-0.028-0.678,0.095-0.92,0.336c-0.242,0.241-0.366,0.579-0.338,0.919   c0.128,1.533,0.611,4.104,2.356,5.847c1.764,1.765,4.368,2.24,5.895,2.362v6.668c0,0.756,0.524,1.369,1.281,1.369   c0.756,0,1.281-0.613,1.281-1.369v-6.675c1.537-0.132,4.076-0.622,5.809-2.354c1.744-1.744,2.229-4.312,2.357-5.847   c0.028-0.341-0.095-0.679-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336C30.002,29.233,27.434,29.717,25.688,31.463z" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg><span className="pxl-menu-title">Contact</span></a>
                          </li>
                          
                          <li id="menu-item-29" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29"><a href="/register"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Capa_1" x="0px" y="0px" width="46.607px" height="46.607px" viewBox="0 0 46.607 46.607" style={{enableBackground: 'new 0 0 46.607 46.607'}} xmlSpace="preserve"><g>	<g>		<path d="M22.408,12.013c0.221,0.261,0.546,0.412,0.888,0.412c0.343,0,0.668-0.149,0.89-0.411c0.994-1.175,2.469-3.333,2.469-5.802   c0-2.467-1.474-4.624-2.468-5.8C23.965,0.151,23.641,0,23.298,0c-0.342,0-0.668,0.149-0.889,0.411   c-0.995,1.175-2.468,3.333-2.469,5.801C19.941,8.68,21.413,10.838,22.408,12.013z" />		<path d="M23.304,20.1c0.182,0.008,4.554,0.182,7.133-2.396c1.744-1.745,2.229-4.313,2.357-5.847   c0.028-0.341-0.095-0.678-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336c-1.534,0.128-4.104,0.612-5.85,2.356   c-1.926,1.928-2.314,4.86-2.384,6.293c-0.069-1.433-0.458-4.365-2.385-6.293c-1.746-1.745-4.314-2.229-5.849-2.356   c-0.341-0.029-0.678,0.095-0.92,0.337c-0.242,0.243-0.364,0.579-0.336,0.92c0.128,1.534,0.612,4.102,2.356,5.846   C18.75,20.282,23.121,20.108,23.304,20.1z" />		<path d="M25.688,22.209c-1.926,1.928-2.314,4.859-2.384,6.293c-0.069-1.434-0.458-4.365-2.385-6.293   c-1.746-1.745-4.314-2.229-5.849-2.356c-0.341-0.028-0.678,0.095-0.92,0.337c-0.242,0.242-0.364,0.579-0.336,0.92   c0.128,1.534,0.612,4.103,2.356,5.846c2.579,2.579,6.949,2.404,7.133,2.396c0.182,0.009,4.554,0.184,7.133-2.396   c1.745-1.745,2.229-4.313,2.357-5.848c0.028-0.341-0.095-0.678-0.337-0.919c-0.242-0.242-0.579-0.365-0.921-0.336   C30.002,19.98,27.434,20.464,25.688,22.209z" />		<path d="M25.688,31.463c-1.926,1.928-2.314,4.858-2.384,6.293c-0.069-1.435-0.458-4.365-2.385-6.293   c-1.745-1.746-4.313-2.229-5.847-2.356c-0.342-0.028-0.678,0.095-0.92,0.336c-0.242,0.241-0.366,0.579-0.338,0.919   c0.128,1.533,0.611,4.104,2.356,5.847c1.764,1.765,4.368,2.24,5.895,2.362v6.668c0,0.756,0.524,1.369,1.281,1.369   c0.756,0,1.281-0.613,1.281-1.369v-6.675c1.537-0.132,4.076-0.622,5.809-2.354c1.744-1.744,2.229-4.312,2.357-5.847   c0.028-0.341-0.095-0.679-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336C30.002,29.233,27.434,29.717,25.688,31.463z" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg><span className="pxl-menu-title">Signup/Login</span></a>
                          </li>
                        </ul></div>  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-d5e3fd0 pxl-column-element-auto pxl-column-overflow-hidden-no" data-id="d5e3fd0" data-element_type="column">
              <div className="elementor-widget-wrap elementor-element-populated">
                <div className="elementor-element elementor-element-0ddf7f4 elementor-widget__width-auto elementor-hidden-laptop elementor-hidden-tablet_extra elementor-hidden-tablet elementor-hidden-mobile_extra elementor-hidden-mobile elementor-widget elementor-widget-pxl_button" data-id="0ddf7f4" data-element_type="widget" data-widget_type="pxl_button.default">
                  <div className="elementor-widget-container">
                    <div id="pxl_button-0ddf7f4-4251" className="pxl-button-wrapper d-flex align-items-center">
                      <a href="#" className="pxl-btn btn-primary icon-ps-right has-icon">
                        <span className="pxl-button-text">Get In Touch!</span>
                        <span className="pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M89.453 87.497L233.438 239.499C237.813 244.124 240 250.062 240 255.999C240 261.937 237.813 267.874 233.438 272.499L89.453 424.501C80.328 434.126 65.141 434.532 55.52 425.439C45.832 416.314 45.489 401.064 54.582 391.501L182.946 255.999L54.582 120.497C45.489 110.935 45.832 95.747 55.52 86.56C65.141 77.466 80.328 77.872 89.453 87.497Z" /></svg></span>  </a>
                    </div>		</div>
                </div>
                <div className="elementor-element elementor-element-b80806c elementor-widget__width-auto elementor-widget elementor-widget-pxl_anchor" data-id="b80806c" data-element_type="widget" data-widget_type="pxl_anchor.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-anchor-wrap d-flex-wrap align-items-center align-content-center style-none ">
                      <div className="pxl-anchor side-panel d-flex-wrap align-items-center relative" data-target=".pxl-hidden-template-9461">
                        <div className="pxl-anchor-icon d-inline-flex"><svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="#000000" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" /></svg></div>		</div>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-4298e7e elementor-widget__width-auto elementor-widget elementor-widget-pxl_anchor_cart" data-id="4298e7e" data-element_type="widget" data-widget_type="pxl_anchor_cart.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-anchor-cart d-inline-flex align-items-center align-content-center relative cart-page ">
                      <a className="cart-anchor d-flex align-items-center" href="#">
                        <div className="pxl-anchor-icon d-inline-flex transition relative"><svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="#000000" viewBox="0 0 256 256"><path d="M136,120v56a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0ZM239.86,98.11,226,202.12A16,16,0,0,1,210.13,216H45.87A16,16,0,0,1,30,202.12l-13.87-104A16,16,0,0,1,32,80H68.37L122,18.73a8,8,0,0,1,12,0L187.63,80H224a16,16,0,0,1,15.85,18.11ZM89.63,80h76.74L128,36.15ZM224,96H32L45.87,200H210.13Zm-51.16,23.2-5.6,56A8,8,0,0,0,174.4,184a7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.95-7.2l5.6-56a8,8,0,0,0-15.92-1.6Zm-89.68,0a8,8,0,0,0-15.92,1.6l5.6,56a8,8,0,0,0,8,7.2,7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.16-8.76Z" /></svg><span className="anchor-cart-count">0</span></div><div className="pxl-anchor-content d-inline-flex transition"><div className="content-inner" /></div>	</a>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-676ef13 elementor-widget__width-auto elementor-widget elementor-widget-pxl_anchor" data-id="676ef13" data-element_type="widget" data-widget_type="pxl_anchor.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-anchor-wrap d-flex-wrap align-items-center align-content-center style-none ">
                      <div className="pxl-anchor side-panel d-flex-wrap align-items-center relative" data-target=".pxl-hidden-template-5754">
                        <div className="pxl-anchor-icon d-inline-flex"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Layer_1" x="0px" y="0px" viewBox="0 0 500 500" xmlSpace="preserve"><path fill="#010101" d="M434.5,22.3L369,89.1v34.3h-53.4V89.1L250,22.3l-65.5,66.8v34.3h-53.4V89.1L65.5,22.3L0,89.1v388.6h131 v-32.1h53.4v32.1h131v-32.1H369v32.1h131V89.1L434.5,22.3z M65.5,439.9c-5,0-9.1-4-9.1-9.1c0-5,4-9.1,9.1-9.1s9.1,4,9.1,9.1 S70.6,439.9,65.5,439.9z M65.5,147.2c-5,0-9.1-4-9.1-9.1s4-9.1,9.1-9.1s9.1,4,9.1,9.1C74.6,143,70.6,147.2,65.5,147.2z M131.1,416.1 V152.8h53.4v263.3H131.1z M250,439.9c-5,0-9.1-4-9.1-9.1c0-5,4-9.1,9.1-9.1s9.1,4,9.1,9.1S255,439.9,250,439.9z M250,147.2 c-5,0-9.1-4-9.1-9.1s4-9.1,9.1-9.1s9.1,4,9.1,9.1C259,143,255,147.2,250,147.2z M315.6,416.1V152.8H369v263.3H315.6z M434.5,439.9 c-5,0-9.1-4-9.1-9.1c0-5,4-9.1,9.1-9.1c5,0,9.1,4,9.1,9.1S439.4,439.9,434.5,439.9z M434.5,147.2c-5,0-9.1-4-9.1-9.1s4-9.1,9.1-9.1 c5,0,9.1,4,9.1,9.1C443.5,143,439.4,147.2,434.5,147.2z" /></svg></div>		</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="elementor-section elementor-top-section elementor-element elementor-element-7a227d8 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default pxl-section-static-pos-no pxl-section-overflow-hidden-no pxl-container-margin-auto-no" data-id="7a227d8" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
          <div className="elementor-container elementor-column-gap-default ">
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-0d188f9 pxl-column-element-auto pxl-column-overflow-hidden-no" data-id="0d188f9" data-element_type="column">
              <div className="elementor-widget-wrap elementor-element-populated">
                <div className="elementor-element elementor-element-3bdbfd6 elementor-widget__width-auto elementor-widget elementor-widget-pxl_list_style" data-id="3bdbfd6" data-element_type="widget" data-widget_type="pxl_list_style.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-list-style bullet d-flex-wrap flex-row ">
                      <div className="list-item d-flex ">
                        <div className="list-content">
                          <p>Welcome to KropCart</p>
                        </div>
                      </div>
                      <div className="list-item d-flex ">
                        <div className="list-content">
                          <p>Agriculture &amp; Organic Farms</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-2830f40 pxl-column-element-grow pxl-column-overflow-hidden-no" data-id="2830f40" data-element_type="column">
              <div className="elementor-widget-wrap elementor-element-populated">
                <div className="elementor-element elementor-element-fefc51f elementor-widget__width-auto pxl-quick-contact-layout-1 elementor-widget elementor-widget-pxl_quickcontact" data-id="fefc51f" data-element_type="widget" data-widget_type="pxl_quickcontact.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-qc-wrap d-flex-wrap layout-1 link-hover-underline-false">
                      <div className="qc-item d-flex align-items-center elementor-repeater-item-774a37c "> 
                        <span className="col-auto pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.203 387L487.953 487.782C484.688 502.032 472.156 512.001 457.484 512.001C205.234 512.001 0 306.78 0 54.497C0 39.84 9.969 27.309 24.219 24.059L124.969 0.809C139.656 -2.598 154.734 5.027 160.828 18.934L207.359 127.497C212.797 140.279 209.125 155.154 198.375 163.935L144.547 208.029C178.531 277.249 234.828 333.531 304.078 367.531L348.125 313.718C356.813 302.937 371.828 299.218 384.609 304.749L493.094 351.25C507 357.25 514.578 372.406 511.203 387Z" /></svg></span>				<span className="col"><a href="tel:19786543210;">+91-123456789</a></span>
                      </div>
                      <div className="qc-item d-flex align-items-center elementor-repeater-item-6e600dc "> 
                        <span className="col-auto pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M432 64H244.875C290.25 95.875 320 148.5 320 208V448H544C561.625 448 576 433.625 576 416V208C576 128.5 511.5 64 432 64ZM512 272C512 280.836 504.838 288 496 288H464C455.164 288 448 280.836 448 272V224H400C391.201 224 384 216.801 384 208S391.201 192 400 192H496C504.838 192 512 199.164 512 208V272ZM144 64C64.5 64 0 128.5 0 208V416C0 433.625 14.375 448 32 448H288V208C288 128.5 223.5 64 144 64ZM208 224H80C71.164 224 64 216.836 64 208S71.164 192 80 192H208C216.838 192 224 199.164 224 208S216.838 224 208 224Z" /></svg></span>				<span className="col"><a href="mailto:donalfarms@gmail.com;">kropcart@gmail.com</a></span>
                      </div>
                      <div className="qc-item d-flex align-items-center elementor-repeater-item-5e5c3e8 "> 
                        <span className="col-auto pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 0C85.969 0 0 85.969 0 192.001C0 269.408 26.969 291.033 172.281 501.676C181.813 515.441 202.188 515.441 211.719 501.676C357.031 291.033 384 269.408 384 192.001C384 85.969 298.031 0 192 0ZM192 271.998C147.875 271.998 112 236.123 112 191.998S147.875 111.997 192 111.997S272 147.872 272 191.998S236.125 271.998 192 271.998Z" /></svg></span>				<span className="col">12 main road, marathalli, Banglore</span>
                      </div>
                    </div>		</div>
                </div>
                <div className="elementor-element elementor-element-6b58b49 elementor-widget__width-auto pxl-socials-layout-1 elementor-widget elementor-widget-pxl_socials" data-id="6b58b49" data-element_type="widget" data-widget_type="pxl_socials.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-socials-wrap layout-1 d-flex-wrap">
                      <div className="socials-inner">
                        <div className="socials-list d-flex-wrap align-items-center">
                          <a className="social-item" href="https://twitter.com" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" /></svg></a><a className="social-item" href="https://facebook.com" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" /></svg></a><a className="social-item" href="https://pinterest.com" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z" /></svg></a><a className="social-item" href="https://instagram.com/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg></a>		</div>
                      </div>
                    </div>		</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="elementor-section elementor-top-section elementor-element elementor-element-4676c66 elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default pxl-section-static-pos-no pxl-section-overflow-hidden-no pxl-container-margin-auto-no" data-id="4676c66" data-element_type="section">
          <div className="pxl-section-divider-bot-img" />        
          <div className="elementor-container elementor-column-gap-default ">
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-c24e6f1 pxl-column-element-grow pxl-column-overflow-hidden-no" data-id="c24e6f1" data-element_type="column">
              <div className="elementor-widget-wrap elementor-element-populated">
                <div className="elementor-element elementor-element-a905838 elementor-widget__width-auto elementor-widget elementor-widget-pxl_logo" data-id="a905838" data-element_type="widget" data-widget_type="pxl_logo.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-logo d-flex-wrap align-items-center">
                    <h2>KropCart</h2>
                      </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-7f427db elementor-widget__width-auto elementor-widget elementor-widget-pxl_menu" data-id="7f427db" data-element_type="widget" data-widget_type="pxl_menu.default">
                  <div className="elementor-widget-container">
                    <div id="pxl_menu-7f427db-3701" className="pxl-nav-menu pxl-nav-menu-main style-df is-arrow has-icon">
                      <div className="menu-main-menu-container">
                      <ul id="pxl-primary-menu-pxl_menu-7f427db-3701" className="pxl-primary-menu clearfix">
                      <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home current-menu-ancestor current-menu-parent menu-item-has-children menu-item-12">
                      <a href="#" aria-current="page">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Capa_1" x="0px" y="0px" width="46.607px" height="46.607px" viewBox="0 0 46.607 46.607" style={{enableBackground: 'new 0 0 46.607 46.607'}} xmlSpace="preserve"><g>	<g>		<path d="M22.408,12.013c0.221,0.261,0.546,0.412,0.888,0.412c0.343,0,0.668-0.149,0.89-0.411c0.994-1.175,2.469-3.333,2.469-5.802   c0-2.467-1.474-4.624-2.468-5.8C23.965,0.151,23.641,0,23.298,0c-0.342,0-0.668,0.149-0.889,0.411   c-0.995,1.175-2.468,3.333-2.469,5.801C19.941,8.68,21.413,10.838,22.408,12.013z" />		<path d="M23.304,20.1c0.182,0.008,4.554,0.182,7.133-2.396c1.744-1.745,2.229-4.313,2.357-5.847   c0.028-0.341-0.095-0.678-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336c-1.534,0.128-4.104,0.612-5.85,2.356   c-1.926,1.928-2.314,4.86-2.384,6.293c-0.069-1.433-0.458-4.365-2.385-6.293c-1.746-1.745-4.314-2.229-5.849-2.356   c-0.341-0.029-0.678,0.095-0.92,0.337c-0.242,0.243-0.364,0.579-0.336,0.92c0.128,1.534,0.612,4.102,2.356,5.846   C18.75,20.282,23.121,20.108,23.304,20.1z" />		<path d="M25.688,22.209c-1.926,1.928-2.314,4.859-2.384,6.293c-0.069-1.434-0.458-4.365-2.385-6.293   c-1.746-1.745-4.314-2.229-5.849-2.356c-0.341-0.028-0.678,0.095-0.92,0.337c-0.242,0.242-0.364,0.579-0.336,0.92   c0.128,1.534,0.612,4.103,2.356,5.846c2.579,2.579,6.949,2.404,7.133,2.396c0.182,0.009,4.554,0.184,7.133-2.396   c1.745-1.745,2.229-4.313,2.357-5.848c0.028-0.341-0.095-0.678-0.337-0.919c-0.242-0.242-0.579-0.365-0.921-0.336   C30.002,19.98,27.434,20.464,25.688,22.209z" />		<path d="M25.688,31.463c-1.926,1.928-2.314,4.858-2.384,6.293c-0.069-1.435-0.458-4.365-2.385-6.293   c-1.745-1.746-4.313-2.229-5.847-2.356c-0.342-0.028-0.678,0.095-0.92,0.336c-0.242,0.241-0.366,0.579-0.338,0.919   c0.128,1.533,0.611,4.104,2.356,5.847c1.764,1.765,4.368,2.24,5.895,2.362v6.668c0,0.756,0.524,1.369,1.281,1.369   c0.756,0,1.281-0.613,1.281-1.369v-6.675c1.537-0.132,4.076-0.622,5.809-2.354c1.744-1.744,2.229-4.312,2.357-5.847   c0.028-0.341-0.095-0.679-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336C30.002,29.233,27.434,29.717,25.688,31.463z" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg><span className="pxl-menu-title">Home</span></a><span className="main-menu-toggle" />

                          </li>
                          <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-24"><a href="/aboutus"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Capa_1" x="0px" y="0px" width="46.607px" height="46.607px" viewBox="0 0 46.607 46.607" style={{enableBackground: 'new 0 0 46.607 46.607'}} xmlSpace="preserve"><g>	<g>		<path d="M22.408,12.013c0.221,0.261,0.546,0.412,0.888,0.412c0.343,0,0.668-0.149,0.89-0.411c0.994-1.175,2.469-3.333,2.469-5.802   c0-2.467-1.474-4.624-2.468-5.8C23.965,0.151,23.641,0,23.298,0c-0.342,0-0.668,0.149-0.889,0.411   c-0.995,1.175-2.468,3.333-2.469,5.801C19.941,8.68,21.413,10.838,22.408,12.013z" />		<path d="M23.304,20.1c0.182,0.008,4.554,0.182,7.133-2.396c1.744-1.745,2.229-4.313,2.357-5.847   c0.028-0.341-0.095-0.678-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336c-1.534,0.128-4.104,0.612-5.85,2.356   c-1.926,1.928-2.314,4.86-2.384,6.293c-0.069-1.433-0.458-4.365-2.385-6.293c-1.746-1.745-4.314-2.229-5.849-2.356   c-0.341-0.029-0.678,0.095-0.92,0.337c-0.242,0.243-0.364,0.579-0.336,0.92c0.128,1.534,0.612,4.102,2.356,5.846   C18.75,20.282,23.121,20.108,23.304,20.1z" />		<path d="M25.688,22.209c-1.926,1.928-2.314,4.859-2.384,6.293c-0.069-1.434-0.458-4.365-2.385-6.293   c-1.746-1.745-4.314-2.229-5.849-2.356c-0.341-0.028-0.678,0.095-0.92,0.337c-0.242,0.242-0.364,0.579-0.336,0.92   c0.128,1.534,0.612,4.103,2.356,5.846c2.579,2.579,6.949,2.404,7.133,2.396c0.182,0.009,4.554,0.184,7.133-2.396   c1.745-1.745,2.229-4.313,2.357-5.848c0.028-0.341-0.095-0.678-0.337-0.919c-0.242-0.242-0.579-0.365-0.921-0.336   C30.002,19.98,27.434,20.464,25.688,22.209z" />		<path d="M25.688,31.463c-1.926,1.928-2.314,4.858-2.384,6.293c-0.069-1.435-0.458-4.365-2.385-6.293   c-1.745-1.746-4.313-2.229-5.847-2.356c-0.342-0.028-0.678,0.095-0.92,0.336c-0.242,0.241-0.366,0.579-0.338,0.919   c0.128,1.533,0.611,4.104,2.356,5.847c1.764,1.765,4.368,2.24,5.895,2.362v6.668c0,0.756,0.524,1.369,1.281,1.369   c0.756,0,1.281-0.613,1.281-1.369v-6.675c1.537-0.132,4.076-0.622,5.809-2.354c1.744-1.744,2.229-4.312,2.357-5.847   c0.028-0.341-0.095-0.679-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336C30.002,29.233,27.434,29.717,25.688,31.463z" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg><span className="pxl-menu-title">About Us</span></a><span className="main-menu-toggle" />
                            
                          </li>
                          
                          <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-24"><a href="/consumer/products"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Capa_1" x="0px" y="0px" width="46.607px" height="46.607px" viewBox="0 0 46.607 46.607" style={{enableBackground: 'new 0 0 46.607 46.607'}} xmlSpace="preserve"><g>	<g>		<path d="M22.408,12.013c0.221,0.261,0.546,0.412,0.888,0.412c0.343,0,0.668-0.149,0.89-0.411c0.994-1.175,2.469-3.333,2.469-5.802   c0-2.467-1.474-4.624-2.468-5.8C23.965,0.151,23.641,0,23.298,0c-0.342,0-0.668,0.149-0.889,0.411   c-0.995,1.175-2.468,3.333-2.469,5.801C19.941,8.68,21.413,10.838,22.408,12.013z" />		<path d="M23.304,20.1c0.182,0.008,4.554,0.182,7.133-2.396c1.744-1.745,2.229-4.313,2.357-5.847   c0.028-0.341-0.095-0.678-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336c-1.534,0.128-4.104,0.612-5.85,2.356   c-1.926,1.928-2.314,4.86-2.384,6.293c-0.069-1.433-0.458-4.365-2.385-6.293c-1.746-1.745-4.314-2.229-5.849-2.356   c-0.341-0.029-0.678,0.095-0.92,0.337c-0.242,0.243-0.364,0.579-0.336,0.92c0.128,1.534,0.612,4.102,2.356,5.846   C18.75,20.282,23.121,20.108,23.304,20.1z" />		<path d="M25.688,22.209c-1.926,1.928-2.314,4.859-2.384,6.293c-0.069-1.434-0.458-4.365-2.385-6.293   c-1.746-1.745-4.314-2.229-5.849-2.356c-0.341-0.028-0.678,0.095-0.92,0.337c-0.242,0.242-0.364,0.579-0.336,0.92   c0.128,1.534,0.612,4.103,2.356,5.846c2.579,2.579,6.949,2.404,7.133,2.396c0.182,0.009,4.554,0.184,7.133-2.396   c1.745-1.745,2.229-4.313,2.357-5.848c0.028-0.341-0.095-0.678-0.337-0.919c-0.242-0.242-0.579-0.365-0.921-0.336   C30.002,19.98,27.434,20.464,25.688,22.209z" />		<path d="M25.688,31.463c-1.926,1.928-2.314,4.858-2.384,6.293c-0.069-1.435-0.458-4.365-2.385-6.293   c-1.745-1.746-4.313-2.229-5.847-2.356c-0.342-0.028-0.678,0.095-0.92,0.336c-0.242,0.241-0.366,0.579-0.338,0.919   c0.128,1.533,0.611,4.104,2.356,5.847c1.764,1.765,4.368,2.24,5.895,2.362v6.668c0,0.756,0.524,1.369,1.281,1.369   c0.756,0,1.281-0.613,1.281-1.369v-6.675c1.537-0.132,4.076-0.622,5.809-2.354c1.744-1.744,2.229-4.312,2.357-5.847   c0.028-0.341-0.095-0.679-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336C30.002,29.233,27.434,29.717,25.688,31.463z" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg><span className="pxl-menu-title">Shop</span></a><span className="main-menu-toggle" />
                            
                          </li>
                          <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-25"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Capa_1" x="0px" y="0px" width="46.607px" height="46.607px" viewBox="0 0 46.607 46.607" style={{enableBackground: 'new 0 0 46.607 46.607'}} xmlSpace="preserve"><g>	<g>		<path d="M22.408,12.013c0.221,0.261,0.546,0.412,0.888,0.412c0.343,0,0.668-0.149,0.89-0.411c0.994-1.175,2.469-3.333,2.469-5.802   c0-2.467-1.474-4.624-2.468-5.8C23.965,0.151,23.641,0,23.298,0c-0.342,0-0.668,0.149-0.889,0.411   c-0.995,1.175-2.468,3.333-2.469,5.801C19.941,8.68,21.413,10.838,22.408,12.013z" />		<path d="M23.304,20.1c0.182,0.008,4.554,0.182,7.133-2.396c1.744-1.745,2.229-4.313,2.357-5.847   c0.028-0.341-0.095-0.678-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336c-1.534,0.128-4.104,0.612-5.85,2.356   c-1.926,1.928-2.314,4.86-2.384,6.293c-0.069-1.433-0.458-4.365-2.385-6.293c-1.746-1.745-4.314-2.229-5.849-2.356   c-0.341-0.029-0.678,0.095-0.92,0.337c-0.242,0.243-0.364,0.579-0.336,0.92c0.128,1.534,0.612,4.102,2.356,5.846   C18.75,20.282,23.121,20.108,23.304,20.1z" />		<path d="M25.688,22.209c-1.926,1.928-2.314,4.859-2.384,6.293c-0.069-1.434-0.458-4.365-2.385-6.293   c-1.746-1.745-4.314-2.229-5.849-2.356c-0.341-0.028-0.678,0.095-0.92,0.337c-0.242,0.242-0.364,0.579-0.336,0.92   c0.128,1.534,0.612,4.103,2.356,5.846c2.579,2.579,6.949,2.404,7.133,2.396c0.182,0.009,4.554,0.184,7.133-2.396   c1.745-1.745,2.229-4.313,2.357-5.848c0.028-0.341-0.095-0.678-0.337-0.919c-0.242-0.242-0.579-0.365-0.921-0.336   C30.002,19.98,27.434,20.464,25.688,22.209z" />		<path d="M25.688,31.463c-1.926,1.928-2.314,4.858-2.384,6.293c-0.069-1.435-0.458-4.365-2.385-6.293   c-1.745-1.746-4.313-2.229-5.847-2.356c-0.342-0.028-0.678,0.095-0.92,0.336c-0.242,0.241-0.366,0.579-0.338,0.919   c0.128,1.533,0.611,4.104,2.356,5.847c1.764,1.765,4.368,2.24,5.895,2.362v6.668c0,0.756,0.524,1.369,1.281,1.369   c0.756,0,1.281-0.613,1.281-1.369v-6.675c1.537-0.132,4.076-0.622,5.809-2.354c1.744-1.744,2.229-4.312,2.357-5.847   c0.028-0.341-0.095-0.679-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336C30.002,29.233,27.434,29.717,25.688,31.463z" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg><span className="pxl-menu-title">Services</span></a><span className="main-menu-toggle" />
                           
                          </li>

                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29"><a href="/contact"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Capa_1" x="0px" y="0px" width="46.607px" height="46.607px" viewBox="0 0 46.607 46.607" style={{enableBackground: 'new 0 0 46.607 46.607'}} xmlSpace="preserve"><g>	<g>		<path d="M22.408,12.013c0.221,0.261,0.546,0.412,0.888,0.412c0.343,0,0.668-0.149,0.89-0.411c0.994-1.175,2.469-3.333,2.469-5.802   c0-2.467-1.474-4.624-2.468-5.8C23.965,0.151,23.641,0,23.298,0c-0.342,0-0.668,0.149-0.889,0.411   c-0.995,1.175-2.468,3.333-2.469,5.801C19.941,8.68,21.413,10.838,22.408,12.013z" />		<path d="M23.304,20.1c0.182,0.008,4.554,0.182,7.133-2.396c1.744-1.745,2.229-4.313,2.357-5.847   c0.028-0.341-0.095-0.678-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336c-1.534,0.128-4.104,0.612-5.85,2.356   c-1.926,1.928-2.314,4.86-2.384,6.293c-0.069-1.433-0.458-4.365-2.385-6.293c-1.746-1.745-4.314-2.229-5.849-2.356   c-0.341-0.029-0.678,0.095-0.92,0.337c-0.242,0.243-0.364,0.579-0.336,0.92c0.128,1.534,0.612,4.102,2.356,5.846   C18.75,20.282,23.121,20.108,23.304,20.1z" />		<path d="M25.688,22.209c-1.926,1.928-2.314,4.859-2.384,6.293c-0.069-1.434-0.458-4.365-2.385-6.293   c-1.746-1.745-4.314-2.229-5.849-2.356c-0.341-0.028-0.678,0.095-0.92,0.337c-0.242,0.242-0.364,0.579-0.336,0.92   c0.128,1.534,0.612,4.103,2.356,5.846c2.579,2.579,6.949,2.404,7.133,2.396c0.182,0.009,4.554,0.184,7.133-2.396   c1.745-1.745,2.229-4.313,2.357-5.848c0.028-0.341-0.095-0.678-0.337-0.919c-0.242-0.242-0.579-0.365-0.921-0.336   C30.002,19.98,27.434,20.464,25.688,22.209z" />		<path d="M25.688,31.463c-1.926,1.928-2.314,4.858-2.384,6.293c-0.069-1.435-0.458-4.365-2.385-6.293   c-1.745-1.746-4.313-2.229-5.847-2.356c-0.342-0.028-0.678,0.095-0.92,0.336c-0.242,0.241-0.366,0.579-0.338,0.919   c0.128,1.533,0.611,4.104,2.356,5.847c1.764,1.765,4.368,2.24,5.895,2.362v6.668c0,0.756,0.524,1.369,1.281,1.369   c0.756,0,1.281-0.613,1.281-1.369v-6.675c1.537-0.132,4.076-0.622,5.809-2.354c1.744-1.744,2.229-4.312,2.357-5.847   c0.028-0.341-0.095-0.679-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336C30.002,29.233,27.434,29.717,25.688,31.463z" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg><span className="pxl-menu-title">Contact</span></a>
                          </li>

                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29"><a href="/register"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Capa_1" x="0px" y="0px" width="46.607px" height="46.607px" viewBox="0 0 46.607 46.607" style={{enableBackground: 'new 0 0 46.607 46.607'}} xmlSpace="preserve"><g>	<g>		<path d="M22.408,12.013c0.221,0.261,0.546,0.412,0.888,0.412c0.343,0,0.668-0.149,0.89-0.411c0.994-1.175,2.469-3.333,2.469-5.802   c0-2.467-1.474-4.624-2.468-5.8C23.965,0.151,23.641,0,23.298,0c-0.342,0-0.668,0.149-0.889,0.411   c-0.995,1.175-2.468,3.333-2.469,5.801C19.941,8.68,21.413,10.838,22.408,12.013z" />		<path d="M23.304,20.1c0.182,0.008,4.554,0.182,7.133-2.396c1.744-1.745,2.229-4.313,2.357-5.847   c0.028-0.341-0.095-0.678-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336c-1.534,0.128-4.104,0.612-5.85,2.356   c-1.926,1.928-2.314,4.86-2.384,6.293c-0.069-1.433-0.458-4.365-2.385-6.293c-1.746-1.745-4.314-2.229-5.849-2.356   c-0.341-0.029-0.678,0.095-0.92,0.337c-0.242,0.243-0.364,0.579-0.336,0.92c0.128,1.534,0.612,4.102,2.356,5.846   C18.75,20.282,23.121,20.108,23.304,20.1z" />		<path d="M25.688,22.209c-1.926,1.928-2.314,4.859-2.384,6.293c-0.069-1.434-0.458-4.365-2.385-6.293   c-1.746-1.745-4.314-2.229-5.849-2.356c-0.341-0.028-0.678,0.095-0.92,0.337c-0.242,0.242-0.364,0.579-0.336,0.92   c0.128,1.534,0.612,4.103,2.356,5.846c2.579,2.579,6.949,2.404,7.133,2.396c0.182,0.009,4.554,0.184,7.133-2.396   c1.745-1.745,2.229-4.313,2.357-5.848c0.028-0.341-0.095-0.678-0.337-0.919c-0.242-0.242-0.579-0.365-0.921-0.336   C30.002,19.98,27.434,20.464,25.688,22.209z" />		<path d="M25.688,31.463c-1.926,1.928-2.314,4.858-2.384,6.293c-0.069-1.435-0.458-4.365-2.385-6.293   c-1.745-1.746-4.313-2.229-5.847-2.356c-0.342-0.028-0.678,0.095-0.92,0.336c-0.242,0.241-0.366,0.579-0.338,0.919   c0.128,1.533,0.611,4.104,2.356,5.847c1.764,1.765,4.368,2.24,5.895,2.362v6.668c0,0.756,0.524,1.369,1.281,1.369   c0.756,0,1.281-0.613,1.281-1.369v-6.675c1.537-0.132,4.076-0.622,5.809-2.354c1.744-1.744,2.229-4.312,2.357-5.847   c0.028-0.341-0.095-0.679-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336C30.002,29.233,27.434,29.717,25.688,31.463z" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg><span className="pxl-menu-title">Signup/login</span></a>
                          </li>



                        </ul>
                        </div>  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-f0e05c4 pxl-column-element-auto pxl-column-overflow-hidden-no" data-id="f0e05c4" data-element_type="column">
              <div className="elementor-widget-wrap elementor-element-populated">
                <div className="elementor-element elementor-element-380ed60 elementor-widget__width-auto elementor-hidden-laptop elementor-hidden-tablet_extra elementor-hidden-tablet elementor-hidden-mobile_extra elementor-hidden-mobile elementor-widget elementor-widget-pxl_button" data-id="380ed60" data-element_type="widget" data-widget_type="pxl_button.default">
                  <div className="elementor-widget-container">
                    <div id="pxl_button-380ed60-3676" className="pxl-button-wrapper d-flex align-items-center">
                      <a href="#" className="pxl-btn btn-primary icon-ps-right has-icon">
                        <span className="pxl-button-text">Get In Touch!</span>
                        <span className="pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M89.453 87.497L233.438 239.499C237.813 244.124 240 250.062 240 255.999C240 261.937 237.813 267.874 233.438 272.499L89.453 424.501C80.328 434.126 65.141 434.532 55.52 425.439C45.832 416.314 45.489 401.064 54.582 391.501L182.946 255.999L54.582 120.497C45.489 110.935 45.832 95.747 55.52 86.56C65.141 77.466 80.328 77.872 89.453 87.497Z" /></svg></span>  </a>
                    </div>		</div>
                </div>
                
                <div className="elementor-element elementor-element-090cc5d elementor-widget__width-auto elementor-widget elementor-widget-pxl_anchor_cart" data-id="090cc5d" data-element_type="widget" data-widget_type="pxl_anchor_cart.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-anchor-cart d-inline-flex align-items-center align-content-center relative cart-page ">
                      <a className="cart-anchor d-flex align-items-center" href="/consumer/cart">
                        <div className="pxl-anchor-icon d-inline-flex transition relative"><svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="#000000" viewBox="0 0 256 256"><path d="M136,120v56a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0ZM239.86,98.11,226,202.12A16,16,0,0,1,210.13,216H45.87A16,16,0,0,1,30,202.12l-13.87-104A16,16,0,0,1,32,80H68.37L122,18.73a8,8,0,0,1,12,0L187.63,80H224a16,16,0,0,1,15.85,18.11ZM89.63,80h76.74L128,36.15ZM224,96H32L45.87,200H210.13Zm-51.16,23.2-5.6,56A8,8,0,0,0,174.4,184a7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.95-7.2l5.6-56a8,8,0,0,0-15.92-1.6Zm-89.68,0a8,8,0,0,0-15.92,1.6l5.6,56a8,8,0,0,0,8,7.2,7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.16-8.76Z" /></svg><span className="anchor-cart-count">0</span></div><div className="pxl-anchor-content d-inline-flex transition"><div className="content-inner" /></div>	</a>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-5c6ceee elementor-widget__width-auto elementor-widget elementor-widget-pxl_anchor" data-id="5c6ceee" data-element_type="widget" data-widget_type="pxl_anchor.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-anchor-wrap d-flex-wrap align-items-center align-content-center style-none ">
                      <div className="pxl-anchor side-panel d-flex-wrap align-items-center relative" data-target=".pxl-hidden-template-5754">
                        <div className="pxl-anchor-icon d-inline-flex"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Layer_1" x="0px" y="0px" viewBox="0 0 500 500" xmlSpace="preserve"><path fill="#010101" d="M434.5,22.3L369,89.1v34.3h-53.4V89.1L250,22.3l-65.5,66.8v34.3h-53.4V89.1L65.5,22.3L0,89.1v388.6h131 v-32.1h53.4v32.1h131v-32.1H369v32.1h131V89.1L434.5,22.3z M65.5,439.9c-5,0-9.1-4-9.1-9.1c0-5,4-9.1,9.1-9.1s9.1,4,9.1,9.1 S70.6,439.9,65.5,439.9z M65.5,147.2c-5,0-9.1-4-9.1-9.1s4-9.1,9.1-9.1s9.1,4,9.1,9.1C74.6,143,70.6,147.2,65.5,147.2z M131.1,416.1 V152.8h53.4v263.3H131.1z M250,439.9c-5,0-9.1-4-9.1-9.1c0-5,4-9.1,9.1-9.1s9.1,4,9.1,9.1S255,439.9,250,439.9z M250,147.2 c-5,0-9.1-4-9.1-9.1s4-9.1,9.1-9.1s9.1,4,9.1,9.1C259,143,255,147.2,250,147.2z M315.6,416.1V152.8H369v263.3H315.6z M434.5,439.9 c-5,0-9.1-4-9.1-9.1c0-5,4-9.1,9.1-9.1c5,0,9.1,4,9.1,9.1S439.4,439.9,434.5,439.9z M434.5,147.2c-5,0-9.1-4-9.1-9.1s4-9.1,9.1-9.1 c5,0,9.1,4,9.1,9.1C443.5,143,439.4,147.2,434.5,147.2z" /></svg></div>		</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div className="pxl-header-mobile d-xl-none"> 
      <div data-elementor-type="wp-post" data-elementor-id={677} className="elementor elementor-677">
        <section className="elementor-section elementor-top-section elementor-element elementor-element-582b99d elementor-section-boxed elementor-section-height-default elementor-section-height-default pxl-section-static-pos-no pxl-section-overflow-hidden-no pxl-container-margin-auto-no pxl-header-mobile-sticky" data-id="582b99d" data-element_type="section">
          <div className="pxl-section-divider-bot-img" />        
          <div className="elementor-container elementor-column-gap-default ">
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-0e7ff9e pxl-column-element-auto pxl-column-overflow-hidden-no" data-id="0e7ff9e" data-element_type="column">
              <div className="elementor-widget-wrap elementor-element-populated">
                <div className="elementor-element elementor-element-7aebfc5 elementor-widget elementor-widget-pxl_logo" data-id="7aebfc5" data-element_type="widget" data-widget_type="pxl_logo.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-logo d-flex-wrap align-items-center">
                      <a href="https://demo.7iquid.com/donalfarm/"><img src="https://demo.7iquid.com/donalfarm/wp-content/uploads/2024/05/logo.png" alt="Donalfarm" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-661ef22 pxl-column-element-grow pxl-column-overflow-hidden-no" data-id="661ef22" data-element_type="column">
              <div className="elementor-widget-wrap elementor-element-populated">
                <div className="elementor-element elementor-element-9f18e30 elementor-widget__width-auto elementor-widget elementor-widget-pxl_anchor" data-id="9f18e30" data-element_type="widget" data-widget_type="pxl_anchor.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-anchor-wrap d-flex-wrap align-items-center align-content-center style-none ">
                      <div className="pxl-anchor side-panel d-flex-wrap align-items-center relative" data-target=".pxl-hidden-template-9461">
                        <div className="pxl-anchor-icon d-inline-flex"><svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="#000000" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" /></svg></div>		</div>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-a007beb elementor-widget__width-auto elementor-hidden-mobile elementor-widget elementor-widget-pxl_anchor_cart" data-id="a007beb" data-element_type="widget" data-widget_type="pxl_anchor_cart.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-anchor-cart d-inline-flex align-items-center align-content-center relative cart-page ">
                      <a className="cart-anchor d-flex align-items-center" href="#">
                        <div className="pxl-anchor-icon d-inline-flex transition relative"><svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="#000000" viewBox="0 0 256 256"><path d="M136,120v56a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0ZM239.86,98.11,226,202.12A16,16,0,0,1,210.13,216H45.87A16,16,0,0,1,30,202.12l-13.87-104A16,16,0,0,1,32,80H68.37L122,18.73a8,8,0,0,1,12,0L187.63,80H224a16,16,0,0,1,15.85,18.11ZM89.63,80h76.74L128,36.15ZM224,96H32L45.87,200H210.13Zm-51.16,23.2-5.6,56A8,8,0,0,0,174.4,184a7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.95-7.2l5.6-56a8,8,0,0,0-15.92-1.6Zm-89.68,0a8,8,0,0,0-15.92,1.6l5.6,56a8,8,0,0,0,8,7.2,7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.16-8.76Z" /></svg><span className="anchor-cart-count">0</span></div><div className="pxl-anchor-content d-inline-flex transition"><div className="content-inner" /></div>	</a>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-8456017 elementor-widget__width-auto elementor-widget elementor-widget-pxl_anchor" data-id={8456017} data-element_type="widget" data-widget_type="pxl_anchor.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-anchor-wrap d-flex-wrap align-items-center align-content-center style-none ">
                      <div className="pxl-anchor side-panel d-flex-wrap align-items-center relative" data-target=".pxl-hidden-template-9473">
                        <div className="pxl-anchor-icon d-inline-flex"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Layer_1" x="0px" y="0px" viewBox="0 0 500 500" xmlSpace="preserve"><path fill="#010101" d="M434.5,22.3L369,89.1v34.3h-53.4V89.1L250,22.3l-65.5,66.8v34.3h-53.4V89.1L65.5,22.3L0,89.1v388.6h131 v-32.1h53.4v32.1h131v-32.1H369v32.1h131V89.1L434.5,22.3z M65.5,439.9c-5,0-9.1-4-9.1-9.1c0-5,4-9.1,9.1-9.1s9.1,4,9.1,9.1 S70.6,439.9,65.5,439.9z M65.5,147.2c-5,0-9.1-4-9.1-9.1s4-9.1,9.1-9.1s9.1,4,9.1,9.1C74.6,143,70.6,147.2,65.5,147.2z M131.1,416.1 V152.8h53.4v263.3H131.1z M250,439.9c-5,0-9.1-4-9.1-9.1c0-5,4-9.1,9.1-9.1s9.1,4,9.1,9.1S255,439.9,250,439.9z M250,147.2 c-5,0-9.1-4-9.1-9.1s4-9.1,9.1-9.1s9.1,4,9.1,9.1C259,143,255,147.2,250,147.2z M315.6,416.1V152.8H369v263.3H315.6z M434.5,439.9 c-5,0-9.1-4-9.1-9.1c0-5,4-9.1,9.1-9.1c5,0,9.1,4,9.1,9.1S439.4,439.9,434.5,439.9z M434.5,147.2c-5,0-9.1-4-9.1-9.1s4-9.1,9.1-9.1 c5,0,9.1,4,9.1,9.1C443.5,143,439.4,147.2,434.5,147.2z" /></svg></div>		</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="elementor-section elementor-top-section elementor-element elementor-element-bd2cabe elementor-section-boxed elementor-section-height-default elementor-section-height-default pxl-section-static-pos-no pxl-section-overflow-hidden-no pxl-container-margin-auto-no" data-id="bd2cabe" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
          <div className="elementor-container elementor-column-gap-default ">
            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-b5c1d0a pxl-column-element-default pxl-column-overflow-hidden-no" data-id="b5c1d0a" data-element_type="column">
              <div className="elementor-widget-wrap elementor-element-populated">
                <div className="elementor-element elementor-element-22578f1 pxl-quick-contact-layout-1 elementor-widget elementor-widget-pxl_quickcontact" data-id="22578f1" data-element_type="widget" data-widget_type="pxl_quickcontact.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-qc-wrap d-flex-wrap layout-1 link-hover-underline-false">
                      <div className="qc-item d-flex align-items-center elementor-repeater-item-774a37c "> 
                        <span className="col-auto pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.203 387L487.953 487.782C484.688 502.032 472.156 512.001 457.484 512.001C205.234 512.001 0 306.78 0 54.497C0 39.84 9.969 27.309 24.219 24.059L124.969 0.809C139.656 -2.598 154.734 5.027 160.828 18.934L207.359 127.497C212.797 140.279 209.125 155.154 198.375 163.935L144.547 208.029C178.531 277.249 234.828 333.531 304.078 367.531L348.125 313.718C356.813 302.937 371.828 299.218 384.609 304.749L493.094 351.25C507 357.25 514.578 372.406 511.203 387Z" /></svg></span>				<span className="col"><a href="tel:19786543210;">+1 987 654 3210</a></span>
                      </div>
                      <div className="qc-item d-flex align-items-center elementor-repeater-item-6e600dc "> 
                        <span className="col-auto pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M432 64H244.875C290.25 95.875 320 148.5 320 208V448H544C561.625 448 576 433.625 576 416V208C576 128.5 511.5 64 432 64ZM512 272C512 280.836 504.838 288 496 288H464C455.164 288 448 280.836 448 272V224H400C391.201 224 384 216.801 384 208S391.201 192 400 192H496C504.838 192 512 199.164 512 208V272ZM144 64C64.5 64 0 128.5 0 208V416C0 433.625 14.375 448 32 448H288V208C288 128.5 223.5 64 144 64ZM208 224H80C71.164 224 64 216.836 64 208S71.164 192 80 192H208C216.838 192 224 199.164 224 208S216.838 224 208 224Z" /></svg></span>				<span className="col"><a href="mailto:donalfarms@gmail.com;">Donalfarms@gmail.com</a></span>
                      </div>
                      <div className="qc-item d-flex align-items-center elementor-repeater-item-5e5c3e8 "> 
                        <span className="col-auto pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 0C85.969 0 0 85.969 0 192.001C0 269.408 26.969 291.033 172.281 501.676C181.813 515.441 202.188 515.441 211.719 501.676C357.031 291.033 384 269.408 384 192.001C384 85.969 298.031 0 192 0ZM192 271.998C147.875 271.998 112 236.123 112 191.998S147.875 111.997 192 111.997S272 147.872 272 191.998S236.125 271.998 192 271.998Z" /></svg></span>				<span className="col">Prinsengracht 250, Amsterdam Netherlands</span>
                      </div>
                    </div>		</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="elementor-section elementor-top-section elementor-element elementor-element-be1a0ca elementor-section-boxed elementor-section-height-default elementor-section-height-default pxl-section-static-pos-no pxl-section-overflow-hidden-no pxl-container-margin-auto-no" data-id="be1a0ca" data-element_type="section">
          <div className="pxl-section-divider-bot-img" />        
          <div className="elementor-container elementor-column-gap-default ">
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-c4337c5 pxl-column-element-auto pxl-column-overflow-hidden-no" data-id="c4337c5" data-element_type="column">
              <div className="elementor-widget-wrap elementor-element-populated">
                <div className="elementor-element elementor-element-9f388e4 elementor-widget elementor-widget-pxl_logo" data-id="9f388e4" data-element_type="widget" data-widget_type="pxl_logo.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-logo d-flex-wrap align-items-center">
                      <a href="https://demo.7iquid.com/donalfarm/"><img src="https://demo.7iquid.com/donalfarm/wp-content/uploads/2024/05/logo.png" alt="Donalfarm" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-7791607 pxl-column-element-grow pxl-column-overflow-hidden-no" data-id={7791607} data-element_type="column">
              <div className="elementor-widget-wrap elementor-element-populated">
                <div className="elementor-element elementor-element-b7cc18c elementor-widget__width-auto elementor-widget elementor-widget-pxl_anchor" data-id="b7cc18c" data-element_type="widget" data-widget_type="pxl_anchor.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-anchor-wrap d-flex-wrap align-items-center align-content-center style-none ">
                      <div className="pxl-anchor side-panel d-flex-wrap align-items-center relative" data-target=".pxl-hidden-template-9461">
                        <div className="pxl-anchor-icon d-inline-flex"><svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="#000000" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" /></svg></div>		</div>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-9bfa968 elementor-widget__width-auto elementor-hidden-mobile elementor-widget elementor-widget-pxl_anchor_cart" data-id="9bfa968" data-element_type="widget" data-widget_type="pxl_anchor_cart.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-anchor-cart d-inline-flex align-items-center align-content-center relative cart-page ">
                      <a className="cart-anchor d-flex align-items-center" href="#">
                        <div className="pxl-anchor-icon d-inline-flex transition relative"><svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="#000000" viewBox="0 0 256 256"><path d="M136,120v56a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0ZM239.86,98.11,226,202.12A16,16,0,0,1,210.13,216H45.87A16,16,0,0,1,30,202.12l-13.87-104A16,16,0,0,1,32,80H68.37L122,18.73a8,8,0,0,1,12,0L187.63,80H224a16,16,0,0,1,15.85,18.11ZM89.63,80h76.74L128,36.15ZM224,96H32L45.87,200H210.13Zm-51.16,23.2-5.6,56A8,8,0,0,0,174.4,184a7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.95-7.2l5.6-56a8,8,0,0,0-15.92-1.6Zm-89.68,0a8,8,0,0,0-15.92,1.6l5.6,56a8,8,0,0,0,8,7.2,7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.16-8.76Z" /></svg><span className="anchor-cart-count">0</span></div><div className="pxl-anchor-content d-inline-flex transition"><div className="content-inner" /></div>	</a>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-24dca93 elementor-widget__width-auto elementor-widget elementor-widget-pxl_anchor" data-id="24dca93" data-element_type="widget" data-widget_type="pxl_anchor.default">
                  <div className="elementor-widget-container">
                    <div className="pxl-anchor-wrap d-flex-wrap align-items-center align-content-center style-none ">
                      <div className="pxl-anchor side-panel d-flex-wrap align-items-center relative" data-target=".pxl-hidden-template-9473">
                        <div className="pxl-anchor-icon d-inline-flex"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Layer_1" x="0px" y="0px" viewBox="0 0 500 500" xmlSpace="preserve"><path fill="#010101" d="M434.5,22.3L369,89.1v34.3h-53.4V89.1L250,22.3l-65.5,66.8v34.3h-53.4V89.1L65.5,22.3L0,89.1v388.6h131 v-32.1h53.4v32.1h131v-32.1H369v32.1h131V89.1L434.5,22.3z M65.5,439.9c-5,0-9.1-4-9.1-9.1c0-5,4-9.1,9.1-9.1s9.1,4,9.1,9.1 S70.6,439.9,65.5,439.9z M65.5,147.2c-5,0-9.1-4-9.1-9.1s4-9.1,9.1-9.1s9.1,4,9.1,9.1C74.6,143,70.6,147.2,65.5,147.2z M131.1,416.1 V152.8h53.4v263.3H131.1z M250,439.9c-5,0-9.1-4-9.1-9.1c0-5,4-9.1,9.1-9.1s9.1,4,9.1,9.1S255,439.9,250,439.9z M250,147.2 c-5,0-9.1-4-9.1-9.1s4-9.1,9.1-9.1s9.1,4,9.1,9.1C259,143,255,147.2,250,147.2z M315.6,416.1V152.8H369v263.3H315.6z M434.5,439.9 c-5,0-9.1-4-9.1-9.1c0-5,4-9.1,9.1-9.1c5,0,9.1,4,9.1,9.1S439.4,439.9,434.5,439.9z M434.5,147.2c-5,0-9.1-4-9.1-9.1s4-9.1,9.1-9.1 c5,0,9.1,4,9.1,9.1C443.5,143,439.4,147.2,434.5,147.2z" /></svg></div>		</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div> 
  </header>
          <div id="pxl-pagetitle" className="pxl-pagetitle layout-df relative has-parallax overflow-hidden pxl-animate">
            <div className="pxl-page-title-bg pxl-absoluted" data-parallax="{&quot;y&quot;:&quot;80&quot;}" style={{transform: 'translate3d(0px, 80px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1)', WebkitTransform: 'translate3d(0px, 80px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1)'}} />
            <div className="pxl-page-title-overlay" />
            <div className="container relative">
              <div className="pxl-page-title-inner row align-content-center">
                <div className="pxl-page-title col-12">
                  <h1 className="main-title">Register</h1>
                </div>
                <div className="pxl-breadcrumb d-flex">
                  <div className="breadcrumb-inner">
                    <div className="br-item"><a className="br-link hover-underline" href="https://demo.7iquid.com/donalfarm/">Home</a><span className="br-divider"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z" /></svg></span></div><div className="br-item"><span className="br-text">Register</span><span className="br-divider"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z" /></svg></span></div>                                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="pxl-main" className="pxl-main">
            <div className="container pxl-content-container">
              <div className="row pxl-content-wrap no-sidebar">
                <div id="pxl-content-area" className="pxl-content-area content-page col-12">
                  <main id="pxl-content-main" className="pxl-content-main">
                    <article id="post-562" className="post-562 page type-page status-publish hentry">
                      <div className="pxl-entry-content clearfix">
                        <div className="woocommerce"><div className="woocommerce-notices-wrapper" /> 
                          <div className="pxl-myaccount-login-reg-form d-flex justify-content-center">
                            <div className="pxl-login-form active">
                              <h3>Register with Us</h3>
                              <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                
                <button type="submit">Register</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>Already Registered! <a href="/login">Do Login</a></p>
                            </div>
                          </div>
                        </div>  </div> 
                    </article> 
                  </main>
                </div>
              </div>
            </div>
          </div>{/* #main */}

<footer id="pxl-footer" className="pxl-footer footer-type-el footer-layout-463">
  <div data-elementor-type="wp-post" data-elementor-id={463} className="elementor elementor-463">
    <section className="elementor-section elementor-top-section elementor-element elementor-element-057fd17 elementor-section-boxed elementor-section-height-default elementor-section-height-default pxl-section-static-pos-no pxl-section-overflow-hidden-no pxl-container-margin-auto-no" data-id="057fd17" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
      <div className="pxl-section-bg-parallax-outer"><div className="pxl-section-bg-parallax" data-parallax="{&quot;x&quot;:-80}" /></div><div className="pxl-section-divider-top-img" />        
      <div className="elementor-container elementor-column-gap-no ">
        <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-336a32a pxl-column-element-default pxl-column-overflow-hidden-no" data-id="336a32a" data-element_type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <section className="elementor-section elementor-inner-section elementor-element elementor-element-94bb47f elementor-section-full_width elementor-section-height-default elementor-section-height-default pxl-section-static-pos-no pxl-section-overflow-hidden-no pxl-container-margin-auto-no" data-id="94bb47f" data-element_type="section">
              <div className="elementor-container elementor-column-gap-default ">
                <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-b192b7f pxl-column-element-default pxl-column-overflow-hidden-no" data-id="b192b7f" data-element_type="column">
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div className="elementor-element elementor-element-05df289 elementor-widget elementor-widget-pxl_logo" data-id="05df289" data-element_type="widget" data-widget_type="pxl_logo.default">
                      <div className="elementor-widget-container">
                        <div className="pxl-logo d-flex-wrap align-items-center">
                          <h1 style={{color:'#ffff'}}>KropCart</h1></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-bf30b94 elementor-hidden-tablet_extra elementor-hidden-tablet elementor-hidden-mobile_extra elementor-hidden-mobile pxl-column-element-default pxl-column-overflow-hidden-no" data-id="bf30b94" data-element_type="column">
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div className="elementor-element elementor-element-275fbb9 elementor-widget elementor-widget-pxl_heading" data-id="275fbb9" data-element_type="widget" data-widget_type="pxl_heading.default">
                      <div className="elementor-widget-container">
                        <div className="pxl-heading-wrap d-flex">
                          <div className="pxl-heading-inner center ">
                            <h3 className="heading-title">
                              Farm of laughter and happiness!       </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-65b4150 pxl-column-element-default pxl-column-overflow-hidden-no" data-id="65b4150" data-element_type="column">
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div className="elementor-element elementor-element-d8efbb9 pxl-socials-layout-1 elementor-widget elementor-widget-pxl_socials" data-id="d8efbb9" data-element_type="widget" data-widget_type="pxl_socials.default">
                      <div className="elementor-widget-container">
                        <div className="pxl-socials-wrap layout-1 d-flex-wrap">
                          <div className="socials-inner">
                            <div className="socials-list d-flex-wrap align-items-center">
                              <a className="social-item" href="https://facebook.com" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg></a><a className="social-item" href="https://twitter.com" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" /></svg></a><a className="social-item" href="https://instagram.com/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg></a><a className="social-item" href="https://pinterest.com" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z" /></svg></a>		</div>
                          </div>
                        </div>		</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="elementor-element elementor-element-84d439e elementor-widget elementor-widget-pxl_divider" data-id="84d439e" data-element_type="widget" data-widget_type="pxl_divider.default">
              <div className="elementor-widget-container">
                <div className="pxl-divider horizontal-dashed animated center normal"><div className="pxl-divider-separator" /></div>		</div>
            </div>
            <section className="elementor-section elementor-inner-section elementor-element elementor-element-3d9baca elementor-section-full_width elementor-section-height-default elementor-section-height-default pxl-section-static-pos-no pxl-section-overflow-hidden-no pxl-container-margin-auto-no" data-id="3d9baca" data-element_type="section">
              <div className="elementor-container elementor-column-gap-default ">
                <div className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-ea34bca pxl-column-element-default pxl-column-overflow-hidden-no" data-id="ea34bca" data-element_type="column">
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div className="elementor-element elementor-element-cb9830d elementor-widget elementor-widget-pxl_heading" data-id="cb9830d" data-element_type="widget" data-widget_type="pxl_heading.default">
                      <div className="elementor-widget-container">
                        <div className="pxl-heading-wrap d-flex">
                          <div className="pxl-heading-inner  ">
                            <h4 className="heading-title">
                              Contact Us!        </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-5d7b849 pxl-quick-contact-layout-2 elementor-widget elementor-widget-pxl_quickcontact" data-id="5d7b849" data-element_type="widget" data-widget_type="pxl_quickcontact.default">
                      <div className="elementor-widget-container">
                        <div className="pxl-qc-wrap d-flex-wrap flex-column layout-2 link-hover-underline-false">
                          <div className="qc-item d-flex align-items-center elementor-repeater-item-fa190db "> 
                            <span className="col-auto pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 0C85.969 0 0 85.969 0 192.001C0 269.408 26.969 291.033 172.281 501.676C181.813 515.441 202.188 515.441 211.719 501.676C357.031 291.033 384 269.408 384 192.001C384 85.969 298.031 0 192 0ZM192 271.998C147.875 271.998 112 236.123 112 191.998S147.875 111.997 192 111.997S272 147.872 272 191.998S236.125 271.998 192 271.998Z" /></svg></span>
                            				<span className="col">12 mainroad, marathalli, Banglore<br />
                              India</span>
                          </div>
                          <div className="qc-item d-flex align-items-center elementor-repeater-item-e0b5481 "> 
                            <span className="col-auto pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.203 387L487.953 487.782C484.688 502.032 472.156 512.001 457.484 512.001C205.234 512.001 0 306.78 0 54.497C0 39.84 9.969 27.309 24.219 24.059L124.969 0.809C139.656 -2.598 154.734 5.027 160.828 18.934L207.359 127.497C212.797 140.279 209.125 155.154 198.375 163.935L144.547 208.029C178.531 277.249 234.828 333.531 304.078 367.531L348.125 313.718C356.813 302.937 371.828 299.218 384.609 304.749L493.094 351.25C507 357.25 514.578 372.406 511.203 387Z" /></svg></span>				
                            <span className="col">Call us:  <a href="tel:123456789">+91-123456789</a><br />
                            </span>
                          </div>
                          <div className="qc-item d-flex align-items-center elementor-repeater-item-c71f46f "> 
                            <span className="col-auto pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M432 64H244.875C290.25 95.875 320 148.5 320 208V448H544C561.625 448 576 433.625 576 416V208C576 128.5 511.5 64 432 64ZM512 272C512 280.836 504.838 288 496 288H464C455.164 288 448 280.836 448 272V224H400C391.201 224 384 216.801 384 208S391.201 192 400 192H496C504.838 192 512 199.164 512 208V272ZM144 64C64.5 64 0 128.5 0 208V416C0 433.625 14.375 448 32 448H288V208C288 128.5 223.5 64 144 64ZM208 224H80C71.164 224 64 216.836 64 208S71.164 192 80 192H208C216.838 192 224 199.164 224 208S216.838 224 208 224Z" /></svg></span>				
                            <span className="col">Mail: <a href="mailto:donalfarms@gmail.com">kropcart@gmail.com</a></span>
                          </div>
                          <div className="qc-item d-flex align-items-center elementor-repeater-item-7d90cc8 "> 
                            <span className="col-auto pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 16C123.42 16 16 123.418 16 256C16 388.578 123.42 496 256 496S496 388.578 496 256C496 123.418 388.58 16 256 16ZM339.217 334.406C334.498 340.688 327.295 344 319.998 344C314.982 344 309.936 342.438 305.607 339.188L241.607 291.188C235.576 286.656 232.014 279.562 232.014 272V152C232.014 138.75 242.764 128 256.014 128S280.014 138.75 280.014 152V260L334.42 300.812C345.014 308.75 347.17 323.781 339.217 334.406Z" /></svg></span>				<span className="col">Mon  -  Sat: 8.00am  -   18.00pm</span>
                          </div>
                        </div>		</div>
                    </div>
                  </div>
                </div>

                <div className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-7db600f pxl-column-element-default pxl-column-overflow-hidden-no" data-id="7db600f" data-element_type="column">
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div className="elementor-element elementor-element-f5333cd elementor-widget elementor-widget-pxl_heading" data-id="f5333cd" data-element_type="widget" data-widget_type="pxl_heading.default">
                      <div className="elementor-widget-container">
                        <div className="pxl-heading-wrap d-flex">
                          <div className="pxl-heading-inner  ">
                            <h4 className="heading-title">
                              Quick Links       </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-d6d7b74 pxl-links-layout-2 elementor-widget elementor-widget-pxl_links" data-id="d6d7b74" data-element_type="widget" data-widget_type="pxl_links.default">
                      <div className="elementor-widget-container">
                        <ul className="pxl-links d-flex flex-column layout-2 divider-border-no list-unstyled">
                          <li className="has-icon">
                            <a href="/aboutus" target="_blank">
                              <span className="pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z" /></svg></span>                        <span>Learn About Us</span>
                            </a>
                          </li>
                          <li className="has-icon">
                            <a href="#" target="_blank">
                              <span className="pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z" /></svg></span>                        <span>Services We Provide</span>
                            </a>
                          </li>
                          <li className="has-icon">
                            <a href="#" target="_blank">
                              <span className="pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z" /></svg></span>                        <span>View Recent Projects</span>
                            </a>
                          </li>
                          <li className="has-icon">
                            <a href="#" target="_blank">
                              <span className="pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z" /></svg></span>                        <span>Meet The Farmers</span>
                            </a>
                          </li>
                          <li className="has-icon">
                            <a href="#" target="_blank">
                              <span className="pxl-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M264.547 70.633L440.547 238.633C445.297 243.164 447.984 249.445 447.984 256.008S445.297 268.852 440.547 273.383L264.547 441.383C254.953 450.508 239.766 450.164 230.609 440.57C221.453 431.07 221.797 415.82 231.422 406.633L364.09 280.008H24C10.75 280.008 0 269.258 0 256.008S10.75 232.008 24 232.008H364.09L231.422 105.383C221.797 96.227 221.453 80.977 230.609 71.445C239.766 61.852 254.953 61.508 264.547 70.633Z" /></svg></span>                        <span>Up Coming Events</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-8861a79 pxl-column-element-default pxl-column-overflow-hidden-no" data-id="8861a79" data-element_type="column">
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div className="elementor-element elementor-element-0fe9824 elementor-widget elementor-widget-pxl_heading" data-id="0fe9824" data-element_type="widget" data-widget_type="pxl_heading.default">
                      <div className="elementor-widget-container">
                        <div className="pxl-heading-wrap d-flex">
                          <div className="pxl-heading-inner  ">
                            <h4 className="heading-title">
                              Subscribe Newsletter       </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-53de25c elementor-widget elementor-widget-pxl_mailchimp" data-id="53de25c" data-element_type="widget" data-widget_type="pxl_mailchimp.default">
                      <div className="elementor-widget-container">
                        <div className="pxl-mailchimp relative layout-2">
                          <div className="mc-inner">
                            <form id="mc4wp-form-1" className="mc4wp-form mc4wp-form-277" method="post" data-id={277} data-name="Subscribe to Newsletter"><div className="mc4wp-form-fields"><div className="mailchimp-form relative">
                                  <input type="email" name="email" placeholder="Email address*" required />
                                  <button type="submit" value><span className="btn-text">Subscribe Now!</span><span className="pxl-icon pxli-paper-plane" /></button>
                                </div></div><label style={{display: 'none !important'}}>Leave this field empty if you're human: <input type="text" name="_mc4wp_honeypot" defaultValue tabIndex={-1} autoComplete="off" /></label><input type="hidden" name="_mc4wp_timestamp" defaultValue={1742291251} /><input type="hidden" name="_mc4wp_form_id" defaultValue={277} /><input type="hidden" name="_mc4wp_form_element_id" defaultValue="mc4wp-form-1" /><div className="mc4wp-response" /></form>		</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="elementor-element elementor-element-679f2f2 elementor-widget elementor-widget-pxl_divider" data-id="679f2f2" data-element_type="widget" data-widget_type="pxl_divider.default">
              <div className="elementor-widget-container">
                <div className="pxl-divider horizontal-dashed  "><div className="pxl-divider-separator" /></div>		</div>
            </div>
            <section className="elementor-section elementor-inner-section elementor-element elementor-element-d9cf64f elementor-section-full_width elementor-section-height-default elementor-section-height-default pxl-section-static-pos-no pxl-section-overflow-hidden-no pxl-container-margin-auto-no" data-id="d9cf64f" data-element_type="section">
              <div className="elementor-container elementor-column-gap-default ">
                <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-b224da8 pxl-column-element-default pxl-column-overflow-hidden-no" data-id="b224da8" data-element_type="column">
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div className="elementor-element elementor-element-4b5a599 elementor-widget elementor-widget-pxl_text_editor" data-id="4b5a599" data-element_type="widget" data-widget_type="pxl_text_editor.default">
                      <div className="elementor-widget-container">
                        <div id="pxl_text_editor-4b5a599-4146" className="pxl-text-editor-wrap d-flex ">
                          <div className="pxl-text-editor elementor-clearfix">
                            Copyright © 2025 Presidency by <a href="">TFS</a>. All Rights Reserved.		
                          </div>
                        </div>		</div>
                    </div>
                  </div>
                </div>
                <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-381c125 pxl-column-element-default pxl-column-overflow-hidden-no" data-id="381c125" data-element_type="column">
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div className="elementor-element elementor-element-8ca045b pxl-links-layout-1 elementor-widget elementor-widget-pxl_links" data-id="8ca045b" data-element_type="widget" data-widget_type="pxl_links.default">
                      <div className="elementor-widget-container">
                        <ul className="pxl-links d-flex layout-1  list-unstyled">
                          <li className="no-icon ">
                            <a href="#" target="_blank">
                              <span>Confidentiality &amp; Privacy</span>
                            </a>
                          </li>
                          <li className="has-icon ">
                            <a href="#" target="_blank">
                              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Capa_1" x="0px" y="0px" width="46.607px" height="46.607px" viewBox="0 0 46.607 46.607" style={{enableBackground: 'new 0 0 46.607 46.607'}} xmlSpace="preserve"><g>	<g>		<path d="M22.408,12.013c0.221,0.261,0.546,0.412,0.888,0.412c0.343,0,0.668-0.149,0.89-0.411c0.994-1.175,2.469-3.333,2.469-5.802   c0-2.467-1.474-4.624-2.468-5.8C23.965,0.151,23.641,0,23.298,0c-0.342,0-0.668,0.149-0.889,0.411   c-0.995,1.175-2.468,3.333-2.469,5.801C19.941,8.68,21.413,10.838,22.408,12.013z" />		<path d="M23.304,20.1c0.182,0.008,4.554,0.182,7.133-2.396c1.744-1.745,2.229-4.313,2.357-5.847   c0.028-0.341-0.095-0.678-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336c-1.534,0.128-4.104,0.612-5.85,2.356   c-1.926,1.928-2.314,4.86-2.384,6.293c-0.069-1.433-0.458-4.365-2.385-6.293c-1.746-1.745-4.314-2.229-5.849-2.356   c-0.341-0.029-0.678,0.095-0.92,0.337c-0.242,0.243-0.364,0.579-0.336,0.92c0.128,1.534,0.612,4.102,2.356,5.846   C18.75,20.282,23.121,20.108,23.304,20.1z" />		<path d="M25.688,22.209c-1.926,1.928-2.314,4.859-2.384,6.293c-0.069-1.434-0.458-4.365-2.385-6.293   c-1.746-1.745-4.314-2.229-5.849-2.356c-0.341-0.028-0.678,0.095-0.92,0.337c-0.242,0.242-0.364,0.579-0.336,0.92   c0.128,1.534,0.612,4.103,2.356,5.846c2.579,2.579,6.949,2.404,7.133,2.396c0.182,0.009,4.554,0.184,7.133-2.396   c1.745-1.745,2.229-4.313,2.357-5.848c0.028-0.341-0.095-0.678-0.337-0.919c-0.242-0.242-0.579-0.365-0.921-0.336   C30.002,19.98,27.434,20.464,25.688,22.209z" />		<path d="M25.688,31.463c-1.926,1.928-2.314,4.858-2.384,6.293c-0.069-1.435-0.458-4.365-2.385-6.293   c-1.745-1.746-4.313-2.229-5.847-2.356c-0.342-0.028-0.678,0.095-0.92,0.336c-0.242,0.241-0.366,0.579-0.338,0.919   c0.128,1.533,0.611,4.104,2.356,5.847c1.764,1.765,4.368,2.24,5.895,2.362v6.668c0,0.756,0.524,1.369,1.281,1.369   c0.756,0,1.281-0.613,1.281-1.369v-6.675c1.537-0.132,4.076-0.622,5.809-2.354c1.744-1.744,2.229-4.312,2.357-5.847   c0.028-0.341-0.095-0.679-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336C30.002,29.233,27.434,29.717,25.688,31.463z" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>                        <span>Legal Information</span>
                            </a>
                          </li>
                          <li className="has-icon ">
                            <a href="" target="_blank">
                              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Capa_1" x="0px" y="0px" width="46.607px" height="46.607px" viewBox="0 0 46.607 46.607" style={{enableBackground: 'new 0 0 46.607 46.607'}} xmlSpace="preserve"><g>	<g>		<path d="M22.408,12.013c0.221,0.261,0.546,0.412,0.888,0.412c0.343,0,0.668-0.149,0.89-0.411c0.994-1.175,2.469-3.333,2.469-5.802   c0-2.467-1.474-4.624-2.468-5.8C23.965,0.151,23.641,0,23.298,0c-0.342,0-0.668,0.149-0.889,0.411   c-0.995,1.175-2.468,3.333-2.469,5.801C19.941,8.68,21.413,10.838,22.408,12.013z" />		<path d="M23.304,20.1c0.182,0.008,4.554,0.182,7.133-2.396c1.744-1.745,2.229-4.313,2.357-5.847   c0.028-0.341-0.095-0.678-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336c-1.534,0.128-4.104,0.612-5.85,2.356   c-1.926,1.928-2.314,4.86-2.384,6.293c-0.069-1.433-0.458-4.365-2.385-6.293c-1.746-1.745-4.314-2.229-5.849-2.356   c-0.341-0.029-0.678,0.095-0.92,0.337c-0.242,0.243-0.364,0.579-0.336,0.92c0.128,1.534,0.612,4.102,2.356,5.846   C18.75,20.282,23.121,20.108,23.304,20.1z" />		<path d="M25.688,22.209c-1.926,1.928-2.314,4.859-2.384,6.293c-0.069-1.434-0.458-4.365-2.385-6.293   c-1.746-1.745-4.314-2.229-5.849-2.356c-0.341-0.028-0.678,0.095-0.92,0.337c-0.242,0.242-0.364,0.579-0.336,0.92   c0.128,1.534,0.612,4.103,2.356,5.846c2.579,2.579,6.949,2.404,7.133,2.396c0.182,0.009,4.554,0.184,7.133-2.396   c1.745-1.745,2.229-4.313,2.357-5.848c0.028-0.341-0.095-0.678-0.337-0.919c-0.242-0.242-0.579-0.365-0.921-0.336   C30.002,19.98,27.434,20.464,25.688,22.209z" />		<path d="M25.688,31.463c-1.926,1.928-2.314,4.858-2.384,6.293c-0.069-1.435-0.458-4.365-2.385-6.293   c-1.745-1.746-4.313-2.229-5.847-2.356c-0.342-0.028-0.678,0.095-0.92,0.336c-0.242,0.241-0.366,0.579-0.338,0.919   c0.128,1.533,0.611,4.104,2.356,5.847c1.764,1.765,4.368,2.24,5.895,2.362v6.668c0,0.756,0.524,1.369,1.281,1.369   c0.756,0,1.281-0.613,1.281-1.369v-6.675c1.537-0.132,4.076-0.622,5.809-2.354c1.744-1.744,2.229-4.312,2.357-5.847   c0.028-0.341-0.095-0.679-0.337-0.92c-0.242-0.242-0.579-0.365-0.921-0.336C30.002,29.233,27.434,29.717,25.688,31.463z" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>                        <span>Return and Refund Policy</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</footer>
        </div>
        
                </>
    );
}

export default Register;
