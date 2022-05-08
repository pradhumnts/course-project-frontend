import React from 'react'

const Footer = () => {
  return ( 
    <footer className="position-relative" id="footer-main">
    <div className="footer footer-dark bg-dark pt-0">
        <div className="container">
            <hr className="divider divider-fade divider-dark my-4" />
            <div className="row align-items-center justify-content-md-between pb-4">
                <div className="col-md-6">
                    <div className="copyright text-sm font-weight-bold text-center text-md-left">
                        &copy; 2020 <a href="https://webpixels.io" className="font-weight-bold" target="_blank">Webpixels</a>. All rights reserved
                    </div>
                </div>
                <div className="col-md-6">
                    <ul className="nav justify-content-center justify-content-md-end mt-3 mt-md-0">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Terms
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Privacy
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Cookies
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer