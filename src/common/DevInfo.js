import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "../core/Base";
import imagedp from '../assets/images/devinfo.jpg';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import IconButton from '@material-ui/core/IconButton';

const DevInfo = () => {

  

  
  return (
    <Base title="Hello, I'm Veeresh" descrption="I'm a Full-stack web developer">
      <div className="row text-center center" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <h1 className="text-white text-center container center"></h1>
        {/* <div className="row"> */}
        
            <div className="col-md-6 center">
            <div className={`card text-white bg-dark border border`}>
          <div className="card-header lead"></div>
          <div className="card-body">
            
          <div className="rounded border border-success p-2 img-wrapper">
              <img
                src={imagedp}
                alt="photo"
                style={{ height: "50%", width: "50%",border:'1px solid black',borderRadius:"50%" }}
                className="mb-3 hover-zoom"
              />
            </div>
              {/* <p className="lead bg-success font-weight-normal text-wrap">
              //description
            </p> */}
            
            <div className="row">
              <div className="col-12">
              <IconButton aria-label="Linkedin.com" onClick={() => window.open('https://www.linkedin.com/in/veeresh-m-078892142/')}>
                <LinkedInIcon   style={{fontSize:100,color:'#ffff'}} />
                </IconButton>
              </div>
              <div className="col-12">
              <IconButton aria-label="Linkedin.com" onClick={() => window.open('https://www.facebook.com/veeresh.veer/')}>
                <FacebookIcon   style={{fontSize:100,color:'#ffff'}} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        </div>
          
        {/* </div> */}
        
        
      </div>
    </Base>
  );
};

export default DevInfo;
