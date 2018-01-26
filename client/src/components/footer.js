import React from "react";
import '../App.css';

const colors = {
  backgroundColor: "#31708E",
  paddingBottom: "20px",
  marginTop:"160px"
};

const footerNames = {
  color: "inherit"
};

const Footer = props => (
        <div className="page-footer" style={colors}>
        	<div className='center'>
        		Copyright © 2018   
        		<a style={footerNames} target="_blank" href="https://github.com/lmm47766">  Luis  </a> | 
        		<a style={footerNames} target="_blank" href="https://github.com/Spectrolyte">  Diana  </a> | 
        		<a style={footerNames} target="_blank" href="https://github.com/JesusColoyan89">  Jesus  </a> | 
        		<a style={footerNames} target="_blank" href="https://github.com/G-rant88">  Ben  </a>	
        	</div>
        </div>
);

export default Footer;