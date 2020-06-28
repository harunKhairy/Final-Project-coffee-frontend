import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import '../footer/footer.css'

const FooterPage = () => {
  return (
    <footer className="footer-area footer--light">
        <div className="footer-big">
          {/* start .container */}
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-12">
                <div className="footer-widget">
                  <div className="widget-about">
                    <img src="http://placehold.it/250x80" alt="" className="img-fluid" />
                    <p>Что если тут написать другой текст на русском языке, для проверки шрифта Rubik )</p>
                    <ul className="contact-details">
                      <li>
                        <span className="icon-earphones" /> Call Us:
                        <a href="tel:344-755-111">344-755-111</a>
                      </li>
                      <li>
                        <span className="icon-envelope-open" />
                        <a href="mailto:support@aazztech.com">support@aazztech.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Ends: .footer-widget */}
              </div>
              {/* end /.col-md-4 */}
              <div className="col-md-3 col-sm-4">
                <div className="footer-widget">
                  <div className="footer-menu footer-menu--1">
                    <h4 className="footer-widget-title">Popular Category</h4>
                    <ul>
                      <li>
                        <a href="#">Wordpress</a>
                      </li>
                      <li>
                        <a href="#">Plugins</a>
                      </li>
                      <li>
                        <a href="#">Joomla Template</a>
                      </li>
                      <li>
                        <a href="#">Admin Template</a>
                      </li>
                      <li>
                        <a href="#">HTML Template</a>
                      </li>
                    </ul>
                  </div>
                  {/* end /.footer-menu */}
                </div>
                {/* Ends: .footer-widget */}
              </div>
              {/* end /.col-md-3 */}
              <div className="col-md-3 col-sm-4">
                <div className="footer-widget">
                  <div className="footer-menu">
                    <h4 className="footer-widget-title">Our Company</h4>
                    <ul>
                      <li>
                        <a href="#">About Us</a>
                      </li>
                      <li>
                        <a href="#">How It Works</a>
                      </li>
                      <li>
                        <a href="#">Affiliates</a>
                      </li>
                      <li>
                        <a href="#">Testimonials</a>
                      </li>
                      <li>
                        <a href="#">Contact Us</a>
                      </li>
                      <li>
                        <a href="#">Plan &amp; Pricing</a>
                      </li>
                      <li>
                        <a href="#">Blog</a>
                      </li>
                    </ul>
                  </div>
                  {/* end /.footer-menu */}
                </div>
                {/* Ends: .footer-widget */}
              </div>
              {/* end /.col-lg-3 */}
              <div className="col-md-3 col-sm-4">
                <div className="footer-widget">
                  <div className="footer-menu no-padding">
                    <h4 className="footer-widget-title">Help Support</h4>
                    <ul>
                      <li>
                        <a href="#">Support Forum</a>
                      </li>
                      <li>
                        <a href="#">Terms &amp; Conditions</a>
                      </li>
                      <li>
                        <a href="#">Support Policy</a>
                      </li>
                      <li>
                        <a href="#">Refund Policy</a>
                      </li>
                      <li>
                        <a href="#">FAQs</a>
                      </li>
                      <li>
                        <a href="#">Buyers Faq</a>
                      </li>
                      <li>
                        <a href="#">Sellers Faq</a>
                      </li>
                    </ul>
                  </div>
                  {/* end /.footer-menu */}
                </div>
                {/* Ends: .footer-widget */}
              </div>
              {/* Ends: .col-lg-3 */}
            </div>
            {/* end /.row */}
          </div>
          {/* end /.container */}
        </div>
        {/* end /.footer-big */}
        <div className="mini-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="copyright-text">
                  <p>© 2018
                    <a href="#">DigiPro</a>. All rights reserved. Created by
                    <a href="#">AazzTech</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}

export default FooterPage;