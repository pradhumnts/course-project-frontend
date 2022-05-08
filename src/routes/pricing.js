import React from 'react'
import NavBar from '../components/NavBar'

const Pricing = () => {
  return (
    <div>
        <NavBar />
        <section class="slice slice-lg pb-0 bg-section-secondary">
            <div class="container position-relative zindex-100">
                <div class="row mb-3 justify-content-center text-center">
                    <div class="col-lg-7 col-md-9">
                        <h3 class="h2 lh-170">Welcome to the new generation of <strong>Learning</strong></h3>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="pricing-container">
                            <div class="text-center mb-7">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-primary active" data-pricing="monthly">Monthly</button>
                                    <button type="button" class="btn btn-primary" data-pricing="yearly">
                                        <span>Yearly</span>
                                        <span class="badge badge-success badge-pill badge-floating">-10%</span>
                                    </button>
                                </div>
                            </div>
                            <div class="row pricing shadow-none">
                                <div class="col-lg-4">
                                    <div class="card card-pricing border-0 text-center px-3">
                                        <div class="card-header py-5 border-0 delimiter-bottom">
                                            <div class="h1 text-center mb-0" data-pricing-value="196">$<span class="price font-weight-bolder">49</span></div>
                                            <span class="h6 text-muted">Standard License</span>
                                        </div>
                                        <div class="card-body">
                                            <ul class="list-unstyled text-sm mb-4">
                                                <li>1 end product</li>
                                                <li>Use for personal or a client</li>
                                                <li>Use in a free end product</li>
                                                <li>6 months technical support</li>
                                            </ul>
                                            <a href="#" class="btn btn-sm btn-warning hover-translate-y-n3 hover-shadow-lg mb-3">Purchase now</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="card card-pricing text-center px-3 shadow border-0">
                                        <div class="card-header py-5 border-0 delimiter-bottom">
                                            <div class="h1 text-center mb-0" data-pricing-value="294">$<span class="price font-weight-bolder">98</span></div>
                                            <span class="h6 text-muted">Developer License</span>
                                        </div>
                                        <div class="card-body">
                                            <ul class="list-unstyled text-sm mb-4">
                                                <li>3 end products</li>
                                                <li>Use for personal or a client</li>
                                                <li>Use in a free end product</li>
                                                <li>10.000 page views</li>
                                                <li>6 months technical support</li>
                                            </ul>
                                            <a href="#" class="btn btn-sm btn-warning hover-translate-y-n3 hover-shadow-lg mb-3">Purchase now</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="card card-pricing bg-primary border-0 text-center px-3">
                                        <div class="card-header py-5 border-0 delimiter-bottom">
                                            <div class="h1 text-white text-center mb-0" data-pricing-value="2360">$<span class="price font-weight-bolder">590</span></div>
                                            <span class="h6 text-white">Extended License</span>
                                        </div>
                                        <div class="card-body">
                                            <ul class="list-unstyled text-white text-sm opacity-8 mb-4">
                                                <li>1 end product</li>
                                                <li>Use for personal or a client</li>
                                                <li>Use in a free end product</li>
                                                <li>Use in a product that is <strong class="text-success text-underline--dashed">sold</strong></li>
                                                <li>Third-party integration</li>
                                                <li>12 months technical support</li>
                                            </ul>
                                            <a href="#" class="btn btn-sm btn-white hover-translate-y-n3 hover-shadow-lg mb-3">Purchase now</a>
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