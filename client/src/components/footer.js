import React from "react";
import '../App.css';

const colors = {
  backgroundColor: "dodgerblue"
};

const Footer = props => (
  <footer className="page-footer" style={colors}>
  <div className="footer-copyright">
            <div className="container">
            Made By Team BLJD © 2018
            </div>
          </div>
       </footer>
);

export default Footer;