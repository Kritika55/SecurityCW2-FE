import React from 'react';

const StepForm = () => {
  return (
    <section className="signup-step-container">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <div className="wizard">
              <div className="wizard-inner">
                <div className="connecting-line"></div>
                <ul className="nav nav-tabs" role="tablist">
                  <li role="presentation" className="active">
                    <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" aria-expanded="true">
                      <span className="round-tab">1 </span> <i>Step 1</i>
                    </a>
                  </li>
                  <li role="presentation" className="disabled">
                    <a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" aria-expanded="false">
                      <span className="round-tab">2</span> <i>Step 2</i>
                    </a>
                  </li>
                  <li role="presentation" className="disabled">
                    <a href="#step3" data-toggle="tab" aria-controls="step3" role="tab">
                      <span className="round-tab">3</span> <i>Step 3</i>
                    </a>
                  </li>
                  <li role="presentation" className="disabled">
                    <a href="#step4" data-toggle="tab" aria-controls="step4" role="tab">
                      <span className="round-tab">4</span> <i>Step 4</i>
                    </a>
                  </li>
                </ul>
              </div>

              <form role="form" className="login-box">
                <div className="tab-content" id="main_form">
                  {/* Step 1 */}
                  <div className="tab-pane active" role="tabpanel" id="step1">
                    <h4 className="text-center">Step 1</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>First and Last Name *</label>
                          <input className="form-control" type="text" name="firstName" placeholder="First and Last Name" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone Number *</label>
                          <input className="form-control" type="text" name="phoneNumber" placeholder="Phone Number" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Email Address *</label>
                          <input className="form-control" type="email" name="email" placeholder="Email Address" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Password *</label>
                          <input className="form-control" type="password" name="password" placeholder="Password" />
                        </div>
                      </div>
                    </div>
                    <ul className="list-inline pull-right">
                      <li><button type="button" className="default-btn next-step">Continue to next step</button></li>
                    </ul>
                  </div>
                  {/* Step 2 */}
                  <div className="tab-pane" role="tabpanel" id="step2">
                    <h4 className="text-center">Step 2</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Address 1 *</label>
                          <input className="form-control" type="text" name="address1" placeholder="Address 1" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>City / Town *</label>
                          <input className="form-control" type="text" name="cityTown" placeholder="City / Town" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Country *</label>
                          <select name="country" className="form-control" id="country">
                            <option value="NG" selected="selected">Nigeria</option>
                            <option value="NU">Niue</option>
                            <option value="NF">Norfolk Island</option>
                            <option value="KP">North Korea</option>
                            <option value="MP">Northern Mariana Islands</option>
                            <option value="NO">Norway</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Registration No.</label>
                          <input className="form-control" type="text" name="registrationNo" placeholder="Registration No." />
                        </div>
                      </div>
                    </div>
                    <ul className="list-inline pull-right">
                      <li><button type="button" className="default-btn prev-step">Back</button></li>
                      <li><button type="button" className="default-btn next-step skip-btn">Skip</button></li>
                      <li><button type="button" className="default-btn next-step">Continue</button></li>
                    </ul>
                  </div>
                  {/* Step 3 */}
                  <div className="tab-pane" role="tabpanel" id="step3">
                    <h4 className="text-center">Step 3</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Account Name *</label>
                          <input className="form-control" type="text" name="accountName" placeholder="Account Name" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Demo</label>
                          <input className="form-control" type="text" name="demo" placeholder="Demo" />
                        </div>
                      </div>
                      {/* Add more fields as needed */}
                    </div>
                    <ul className="list-inline pull-right">
                      <li><button type="button" className="default-btn prev-step">Back</button></li>
                      <li><button type="button" className="default-btn next-step skip-btn">Skip</button></li>
                      <li><button type="button" className="default-btn next-step">Continue</button></li>
                    </ul>
                  </div>
                  {/* Step 4 */}
                  <div className="tab-pane" role="tabpanel" id="step4">
                    <h4 className="text-center">Step 4</h4>
                    <div className="all-info-container">
                      {/* Collapsible sections */}
                    </div>
                    <ul className="list-inline pull-right">
                      <li><button type="button" className="default-btn prev-step">Back</button></li>
                      <li><button type="button" className="default-btn next-step">Finish</button></li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StepForm;
