import React from 'react'
import NavBar from '../components/NavBar'

const Pricing = () => {
  return (
    <div>
        <NavBar />
        <section className="slice slice-lg pb-0 bg-section-secondary">
            <div className="container position-relative zindex-100">
                <div className="row mb-3 justify-content-center text-center">
                    <div className="col-lg-7 col-md-9">
                        <h3 className="h2 lh-170">Welcome to the new generation of <strong>Learning</strong></h3>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="pricing-container">
                            <div className="text-center mb-7">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-primary active" data-pricing="monthly">Monthly</button>
                                    <button type="button" className="btn btn-primary" data-pricing="yearly">
                                        <span>Yearly</span>
                                        <span className="badge badge-success badge-pill badge-floating">-10%</span>
                                    </button>
                                </div>
                            </div>
                            <div className="row pricing shadow-none">
                                <div className="col-lg-4">
                                    <div className="card card-pricing border-0 text-center px-3">
                                        <div className="card-header py-5 border-0 delimiter-bottom">
                                            <div className="h1 text-center mb-0" data-pricing-value="196">$<span className="price font-weight-bolder">49</span></div>
                                            <span className="h6 text-muted">Standard License</span>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-unstyled text-sm mb-4">
                                                <li>1 end product</li>
                                                <li>Use for personal or a client</li>
                                                <li>Use in a free end product</li>
                                                <li>6 months technical support</li>
                                            </ul>
                                            <a href="#" className="btn btn-sm btn-warning hover-translate-y-n3 hover-shadow-lg mb-3">Purchase now</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card card-pricing text-center px-3 shadow border-0">
                                        <div className="card-header py-5 border-0 delimiter-bottom">
                                            <div className="h1 text-center mb-0" data-pricing-value="294">$<span className="price font-weight-bolder">98</span></div>
                                            <span className="h6 text-muted">Developer License</span>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-unstyled text-sm mb-4">
                                                <li>3 end products</li>
                                                <li>Use for personal or a client</li>
                                                <li>Use in a free end product</li>
                                                <li>10.000 page views</li>
                                                <li>6 months technical support</li>
                                            </ul>
                                            <a href="#" className="btn btn-sm btn-warning hover-translate-y-n3 hover-shadow-lg mb-3">Purchase now</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card card-pricing bg-primary border-0 text-center px-3">
                                        <div className="card-header py-5 border-0 delimiter-bottom">
                                            <div className="h1 text-white text-center mb-0" data-pricing-value="2360">$<span className="price font-weight-bolder">590</span></div>
                                            <span className="h6 text-white">Extended License</span>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-unstyled text-white text-sm opacity-8 mb-4">
                                                <li>1 end product</li>
                                                <li>Use for personal or a client</li>
                                                <li>Use in a free end product</li>
                                                <li>Use in a product that is <strong className="text-success text-underline--dashed">sold</strong></li>
                                                <li>Third-party integration</li>
                                                <li>12 months technical support</li>
                                            </ul>
                                            <a href="#" className="btn btn-sm btn-white hover-translate-y-n3 hover-shadow-lg mb-3">Purchase now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Pricing