import React, { Component,PropTypes } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from "axios";

//public/css/customstyle.css
// public/css/bootstrap.min.css
// public/vendors/bower_components/jasny-bootstrap/dist/css/jasny-bootstrap.min.css
// public/vendors/bower_components/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css
// public/dist/css/style.css
// public/css/customstyle.css

//jquery.min.jspublic/vendors/bower_components/jquery/dist/jquery.min.js
//public/js/jquery-ui.min.js
//public/vendors/bower_components/bootstrap/dist/js/bootstrap.min.js
//public/vendors/bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min.js
//public/vendors/bower_components/bootstrap-validator/dist/validator.min.js
//public/dist/js/jquery.slimscroll.js


class Register extends Component {
  render() {
    return (
      <div className="wrapper box-layout pa-0">
  <header className="sp-header">
    <div className="sp-logo-wrap pull-left">
      <a href="">
         <img className="brand-img" src="img/abilllogo.gif" alt="brand" width="30px" height="30px"/>
        <span className="brand-text">aBill</span>
      </a>
    </div>
    <div className="form-group mb-0 pull-right">
      <span className="inline-block pr-10">Already have an account?</span>
      <a className="inline-block btn btn-warning btn-rounded btn-outline" href="/#/login">Sign In</a>
    </div>
    <div className="clearfix"></div>
  </header>
  <div className="page-wrapper pa-0 ma-0 auth-page">
    <div className="container-fluid">
      <div className="table-struct full-width full-height">
        <div className="table-cell auth-form-wrap">
          <div className="ml-auto mr-auto no-float">
            <div className="row">
              <div className="col-sm-12 col-xs-12">
                <div className="mb-30">
                    <h3 className="text-center txt-dark mb-10">Sign up to aBill</h3>
                    <h6 className="text-center nonecase-font txt-grey">Enter your details below</h6>
                </div>
                <div className="form-wrap">
                  <form id="msform" action="" method="post" novalidate data-toggle="validator" role="form">
                      <ul id="progressbar">
                        <li className="active" id="per">Personal Details</li>
                        <li id="acc">Account Information</li>
                     
                      </ul>
                      
                      <fieldset id="personalinfo">
                       
                        <h3 className="fs-subtitle">This is step 1</h3>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12"> 
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <div className="form-group">
                              <label className="control-label ">First Name <font color="red">*</font></label>
                              <input type="text" className="form-control" name="firstname" id="firstname" placeholder="First Name" onkeypress="return isAlpha(event);" value="" required />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <div className="form-group">
                              <label className="control-label ">Last Name <font color="red">*</font></label>
                              <input type="text" className="form-control" name="lastname" id="lastname" placeholder="Last Name" onkeypress="return isAlpha(event);" required />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <div className="form-group">
                              <label className="control-label ">Email Address <font color="red">*</font></label>
                              <input type="email" className="form-control" name="email" id="email" data-pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/" placeholder="Email Address"  required/>
                                <div className="help-block with-errors"></div>
                            </div>
                          </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12"> 
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <div className="form-group">
                              <label className="control-label ">Phone Number <font color="red">*</font></label>
                              <input type="text" className="form-control" name="phonenumber" id="phonenumber" placeholder="Phone Number" onkeypress="return isNumeric(event);" required/>
                              <div className="help-block with-errors" ></div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <div className="form-group">
                                <label className="control-label ">Enter Address1 <font color="red">*</font></label>
                               
                          </div>
                            
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <div className="form-group">
                              <label className="control-label ">Enter Address2</label>
                                
                          </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12"> 
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <div className="form-group">
                              <label className="control-label ">Select Country</label>
                              <select name="country" id="country">
                                <option value="AF">Afghanistan</option>
                                <option value="AL">Albania</option>
                                <option value="DZ">Algeria</option>
                                <option value="AS">American Samoa</option>
                                <option value="AD">Andorra</option>
                                <option value="AO">Angola</option>
                                <option value="AI">Anguilla</option>
                                <option value="AQ">Antarctica</option>
                                <option value="AG">Antigua and Barbuda</option>
                                <option value="AR">Argentina</option>
                                <option value="AM">Armenia</option>
                                <option value="AW">Aruba</option>
                                <option value="AU">Australia</option>
                                <option value="AT">Austria</option>
                                <option value="AZ">Azerbaijan</option>
                                <option value="BS">Bahamas</option>
                                <option value="BH">Bahrain</option>
                                <option value="BD">Bangladesh</option>
                                <option value="BB">Barbados</option>
                                <option value="BY">Belarus</option>
                                <option value="BE">Belgium</option>
                                <option value="BZ">Belize</option>
                                <option value="BJ">Benin</option>
                                <option value="BM">Bermuda</option>
                                <option value="BT">Bhutan</option>
                                <option value="BO">Bolivia</option>
                                <option value="BA">Bosnia and Herzegowina</option>
                                <option value="BW">Botswana</option>
                                <option value="BV">Bouvet Island</option>
                                <option value="BR">Brazil</option>
                                <option value="IO">British Indian Ocean Territory</option>
                                <option value="BN">Brunei Darussalam</option>
                                <option value="BG">Bulgaria</option>
                                <option value="BF">Burkina Faso</option>
                                <option value="BI">Burundi</option>
                                <option value="KH">Cambodia</option>
                                <option value="CM">Cameroon</option>
                                <option value="CA">Canada</option>
                                <option value="CV">Cape Verde</option>
                                <option value="KY">Cayman Islands</option>
                                <option value="CF">Central African Republic</option>
                                <option value="TD">Chad</option>
                                <option value="CL">Chile</option>
                                <option value="CN">China</option>
                                <option value="CX">Christmas Island</option>
                                <option value="CC">Cocos (Keeling) Islands</option>
                                <option value="CO">Colombia</option>
                                <option value="KM">Comoros</option>
                                <option value="CG">Congo</option>
                                <option value="CD">Congo, the Democratic Republic of the</option>
                                <option value="CK">Cook Islands</option>
                                <option value="CR">Costa Rica</option>
                                <option value="CI">Cote d'Ivoire</option>
                                <option value="HR">Croatia (Hrvatska)</option>
                                <option value="CU">Cuba</option>
                                <option value="CY">Cyprus</option>
                                <option value="CZ">Czech Republic</option>
                                <option value="DK">Denmark</option>
                                <option value="DJ">Djibouti</option>
                                <option value="DM">Dominica</option>
                                <option value="DO">Dominican Republic</option>
                                <option value="TP">East Timor</option>
                                <option value="EC">Ecuador</option>
                                <option value="EG">Egypt</option>
                                <option value="SV">El Salvador</option>
                                <option value="GQ">Equatorial Guinea</option>
                                <option value="ER">Eritrea</option>
                                <option value="EE">Estonia</option>
                                <option value="ET">Ethiopia</option>
                                <option value="FK">Falkland Islands (Malvinas)</option>
                                <option value="FO">Faroe Islands</option>
                                <option value="FJ">Fiji</option>
                                <option value="FI">Finland</option>
                                <option value="FR">France</option>
                                <option value="FX">France, Metropolitan</option>
                                <option value="GF">French Guiana</option>
                                <option value="PF">French Polynesia</option>
                                <option value="TF">French Southern Territories</option>
                                <option value="GA">Gabon</option>
                                <option value="GM">Gambia</option>
                                <option value="GE">Georgia</option>
                                <option value="DE">Germany</option>
                                <option value="GH">Ghana</option>
                                <option value="GI">Gibraltar</option>
                                <option value="GR">Greece</option>
                                <option value="GL">Greenland</option>
                                <option value="GD">Grenada</option>
                                <option value="GP">Guadeloupe</option>
                                <option value="GU">Guam</option>
                                <option value="GT">Guatemala</option>
                                <option value="GN">Guinea</option>
                                <option value="GW">Guinea-Bissau</option>
                                <option value="GY">Guyana</option>
                                <option value="HT">Haiti</option>
                                <option value="HM">Heard and Mc Donald Islands</option>
                                <option value="VA">Holy See (Vatican City State)</option>
                                <option value="HN">Honduras</option>
                                <option value="HK">Hong Kong</option>
                                <option value="HU">Hungary</option>
                                <option value="IS">Iceland</option>
                                <option value="IN" selected>India</option>
                                <option value="ID">Indonesia</option>
                                <option value="IR">Iran (Islamic Republic of)</option>
                                <option value="IQ">Iraq</option>
                                <option value="IE">Ireland</option>
                                <option value="IL">Israel</option>
                                <option value="IT">Italy</option>
                                <option value="JM">Jamaica</option>
                                <option value="JP">Japan</option>
                                <option value="JO">Jordan</option>
                                <option value="KZ">Kazakhstan</option>
                                <option value="KE">Kenya</option>
                                <option value="KI">Kiribati</option>
                                <option value="KP">Korea, Democratic People's Republic of</option>
                                <option value="KR">Korea, Republic of</option>
                                <option value="KW">Kuwait</option>
                                <option value="KG">Kyrgyzstan</option>
                                <option value="LA">Lao People's Democratic Republic</option>
                                <option value="LV">Latvia</option>
                                <option value="LB">Lebanon</option>
                                <option value="LS">Lesotho</option>
                                <option value="LR">Liberia</option>
                                <option value="LY">Libyan Arab Jamahiriya</option>
                                <option value="LI">Liechtenstein</option>
                                <option value="LT">Lithuania</option>
                                <option value="LU">Luxembourg</option>
                                <option value="MO">Macau</option>
                                <option value="MK">Macedonia, The Former Yugoslav Republic of</option>
                                <option value="MG">Madagascar</option>
                                <option value="MW">Malawi</option>
                                <option value="MY">Malaysia</option>
                                <option value="MV">Maldives</option>
                                <option value="ML">Mali</option>
                                <option value="MT">Malta</option>
                                <option value="MH">Marshall Islands</option>
                                <option value="MQ">Martinique</option>
                                <option value="MR">Mauritania</option>
                                <option value="MU">Mauritius</option>
                                <option value="YT">Mayotte</option>
                                <option value="MX">Mexico</option>
                                <option value="FM">Micronesia, Federated States of</option>
                                <option value="MD">Moldova, Republic of</option>
                                <option value="MC">Monaco</option>
                                <option value="MN">Mongolia</option>
                                <option value="MS">Montserrat</option>
                                <option value="MA">Morocco</option>
                                <option value="MZ">Mozambique</option>
                                <option value="MM">Myanmar</option>
                                <option value="NA">Namibia</option>
                                <option value="NR">Nauru</option>
                                <option value="NP">Nepal</option>
                                <option value="NL">Netherlands</option>
                                <option value="AN">Netherlands Antilles</option>
                                <option value="NC">New Caledonia</option>
                                <option value="NZ">New Zealand</option>
                                <option value="NI">Nicaragua</option>
                                <option value="NE">Niger</option>
                                <option value="NG">Nigeria</option>
                                <option value="NU">Niue</option>
                                <option value="NF">Norfolk Island</option>
                                <option value="MP">Northern Mariana Islands</option>
                                <option value="NO">Norway</option>
                                <option value="OM">Oman</option>
                                <option value="PK">Pakistan</option>
                                <option value="PW">Palau</option>
                                <option value="PA">Panama</option>
                                <option value="PG">Papua New Guinea</option>
                                <option value="PY">Paraguay</option>
                                <option value="PE">Peru</option>
                                <option value="PH">Philippines</option>
                                <option value="PN">Pitcairn</option>
                                <option value="PL">Poland</option>
                                <option value="PT">Portugal</option>
                                <option value="PR">Puerto Rico</option>
                                <option value="QA">Qatar</option>
                                <option value="RE">Reunion</option>
                                <option value="RO">Romania</option>
                                <option value="RU">Russian Federation</option>
                                <option value="RW">Rwanda</option>
                                <option value="KN">Saint Kitts and Nevis</option> 
                                <option value="LC">Saint LUCIA</option>
                                <option value="VC">Saint Vincent and the Grenadines</option>
                                <option value="WS">Samoa</option>
                                <option value="SM">San Marino</option>
                                <option value="ST">Sao Tome and Principe</option> 
                                <option value="SA">Saudi Arabia</option>
                                <option value="SN">Senegal</option>
                                <option value="SC">Seychelles</option>
                                <option value="SL">Sierra Leone</option>
                                <option value="SG">Singapore</option>
                                <option value="SK">Slovakia (Slovak Republic)</option>
                                <option value="SI">Slovenia</option>
                                <option value="SB">Solomon Islands</option>
                                <option value="SO">Somalia</option>
                                <option value="ZA">South Africa</option>
                                <option value="GS">South Georgia and the South Sandwich Islands</option>
                                <option value="ES">Spain</option>
                                <option value="LK">Sri Lanka</option>
                                <option value="SH">St. Helena</option>
                                <option value="PM">St. Pierre and Miquelon</option>
                                <option value="SD">Sudan</option>
                                <option value="SR">Suriname</option>
                                <option value="SJ">Svalbard and Jan Mayen Islands</option>
                                <option value="SZ">Swaziland</option>
                                <option value="SE">Sweden</option>
                                <option value="CH">Switzerland</option>
                                <option value="SY">Syrian Arab Republic</option>
                                <option value="TW">Taiwan, Province of China</option>
                                <option value="TJ">Tajikistan</option>
                                <option value="TZ">Tanzania, United Republic of</option>
                                <option value="TH">Thailand</option>
                                <option value="TG">Togo</option>
                                <option value="TK">Tokelau</option>
                                <option value="TO">Tonga</option>
                                <option value="TT">Trinidad and Tobago</option>
                                <option value="TN">Tunisia</option>
                                <option value="TR">Turkey</option>
                                <option value="TM">Turkmenistan</option>
                                <option value="TC">Turks and Caicos Islands</option>
                                <option value="TV">Tuvalu</option>
                                <option value="UG">Uganda</option>
                                <option value="UA">Ukraine</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="GB">United Kingdom</option>
                                <option value="US">United States</option>
                                <option value="UM">United States Minor Outlying Islands</option>
                                <option value="UY">Uruguay</option>
                                <option value="UZ">Uzbekistan</option>
                                <option value="VU">Vanuatu</option>
                                <option value="VE">Venezuela</option>
                                <option value="VN">Viet Nam</option>
                                <option value="VG">Virgin Islands (British)</option>
                                <option value="VI">Virgin Islands (U.S.)</option>
                                <option value="WF">Wallis and Futuna Islands</option>
                                <option value="EH">Western Sahara</option>
                                <option value="YE">Yemen</option>
                                <option value="YU">Yugoslavia</option>
                                <option value="ZM">Zambia</option>
                                <option value="ZW">Zimbabwe</option>
                            </select>
                            <div className="help-block with-errors"></div>
                          </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <div className="form-group">
                              <label className="control-label ">State <font color="red">*</font></label>
                              <input type="text" className="form-control" name="state" id="state" placeholder="State" onkeypress="return isAlpha(event);" required/>
                              <div className="help-block with-errors" ></div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <div className="form-group">
                              <label className="control-label ">City <font color="red">*</font></label>
                              <input type="text" className="form-control" name="city" id="city" placeholder="City" onkeypress="return isAlpha(event);" required />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12"> 
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <div className="form-group">
                              <label className="control-label ">Pincode <font color="red">*</font></label>
                              <input type="text" className="form-control" name="pincode" onkeypress="return isNumeric(event);" id="pincode" placeholder="Pincode" required />
                              <div className="help-block with-errors" ></div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <div className="form-group">
                              <label className="control-label ">Organization Name</label>
                              <input type="text" name="organizationname" id="organizationname"placeholder="Organization Name" onkeypress="return isAlpha(event);"/>
                              <div className="help-block with-errors" ></div>
                            </div>
                          </div>
                          <div className="ccol-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <div className="form-group">
                              <label className="control-label">Select Contact Type</label>
                              <select name="contactType" id="contactType">
                              <option value="20" selected="selected">Primary</option>
                              <option value="40">Secondary</option>
                            </select>
                          </div>
                          </div>
                      </div>
                        
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <input type="button" name="next" className="next action-button" value="Next" id="nextpersonalinfo" />
                      </div>
                      </div>
                      </fieldset>
                      <fieldset id="accountinfo">
                        <h3 className="fs-subtitle">This is step 2</h3>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12"> 
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <div className="form-group">
                              <label for="inputEmail" className="control-label ">Login Name <font color="red">*</font></label>
                              <input type="text" name="loginname" id="loginname"placeholder="Login Name" data-error="Enter Login Name" required minlength="6" data-minlength-error="Minimum Login name character 6" />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <div className="form-group">
                              <label for="inputEmail" className="control-label ">Password <font color="red">*</font></label>
                              <input type="password" name="password" id="password"placeholder="Password" data-minlength-error="Minimum Password character 6" data-error="Enter Password" required minlength="6" />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                          <div className="form-group">
                              <label className="control-label ">Verify Password <font color="red">*</font></label>
                              <input type="password" className="form-control" data-match="#password" data-match-error="Whoops, password don't match " name="verifypassword" id="verifypassword" placeholder="Verify Password" required/>
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12"> 
                        
                        
                       
                          <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                            <label>Select Payment Type</label>
                              <select name="prefered_type" id="prefered_type"><option>Select Payment Type</option><option value="1">Credit Card</option>
                            <option value="2">ACH</option><option value="1">Cheque</option></select>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-sm-12">
                          <div className="checkbox mt-25">
                            <input type="checkbox" name="include_in_noti" id="include_in_noti" checked="" />
                            <label for="include_in_noti">
                              Include in Notifications
                            </label>
                          </div>

                          </div>
                      </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <input type="button" name="previous" className="previous action-button" value="Previous" id="prevaccountinfo"/>
                            <input type="submit" name="submit" className="action-button" value="Submit" />
                        </div>
                      </fieldset>
                  </form>
                </div>
              </div>  
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    );
  }
}

export default Register;
