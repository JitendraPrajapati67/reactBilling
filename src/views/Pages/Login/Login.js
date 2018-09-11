import React, { Component ,PropTypes } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from "axios";

class Login extends Component {
  constructor(props){
       super(props);

       this.state = {
           fields: {},
           errors: {},
           login: []
       }
       this.type="";
    }

   
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["username"]){
           formIsValid = false;
           errors["name"] = "Cannot be empty";
        }

        //Name
        if(!fields["password"]){
           formIsValid = false;
           errors["password"] = "Cannot be empty";
        }
        // if(typeof fields["name"] !== "undefined"){
        //    if(!fields["name"].match(/^[a-zA-Z]+$/)){
        //       formIsValid = false;
        //       errors["name"] = "Only letters";
        //    }        
        // }

        // //Email
        // if(!fields["email"]){
        //    formIsValid = false;
        //    errors["email"] = "Cannot be empty";
        // }

       //  if(typeof fields["email"] !== "undefined"){
       //     let lastAtPos = fields["email"].lastIndexOf('@');
       //     let lastDotPos = fields["email"].lastIndexOf('.');

       //     if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
       //        formIsValid = false;
       //        errors["email"] = "Email is not valid";
       //      }
       // }  

       this.setState({errors: errors});
       return formIsValid;
   }
 
  register(e){
    this.props.history.push("/register");
  }
  contactSubmit(e){
        e.preventDefault();
        let fields = this.state.fields;
        if(this.handleValidation()){
          e.preventDefault();
          const URL ="http://67.205.185.159/reactBillingAdmin/api/public/api/doLogin";
          const formData = new FormData();
            formData.append("username", fields["username"]);
            formData.append("password", fields["password"]);

            const data = {
              headers: {
                "Content-Type": "multipart/form-data; charset=utf-8;"
              }
            };
              // axios.post(URL, formData, data).then(
              //   response => {
              //     console.log({ response });
              //   },
              //   error => {
              //     console.log({ error });
              //   },
                
              // );
            
            // axios.post(URL,formData,data)
            // .then(function (response) {
            //   console.log({ response });
            // })
            // .catch(function (error) {
            //   console.log({ error });
            // });
            localStorage.setItem('message',"");
            axios({
              method: 'post',
              url: URL,
              timeout: 20000, // Let's say you want to wait at least 8 seconds
              data: formData,
              headers: {
                "Content-Type": "multipart/form-data; charset=utf-8;"
              }
            })
            .then(function (res) {
                  // console.log('type : '+res.data.data.type);
                  // console.log('id : '+res.data.data.id);
                  // alert(res.data.data.type);
                  // alert(res.data.message);
                  if(res.data.data.type=="error"){
                    
                    // localStorage.setItem('message', res.data.message);
                    // this.props.history.push("/login");
                     window.location.reload();
                  }else{
                    // localStorage.setItem('message', res.data.message);
                    localStorage.setItem('type', res.data.data.type);
                    localStorage.setItem('id',res.data.data.id );
                    localStorage.setItem('name',fields["username"]);
                    window.location.href="dashboard";
                  }
                 
                  
            })
            .catch(function (error) {
                console.log(error);
            });
            // alert();
            // alert(localStorage.getItem('message'));
            // if(localStorage.getItem('message')!=""){
            //   localStorage.setItem('message',"");
             
            //   this.props.history.push("/dashboard");
            // }

             
            
            // alert(localStorage.getItem('id'));
            // alert(localStorage.getItem('name'));
            // alert(localStorage.getItem('type'));
            // if(localStorage.getItem('type')=="Customer"){
            //    localStorage.setItem('myData', 1);
            //   this.props.history.push("/register");
            // }
            
            // JSON.parse(JSON.stringify(resdata), (key, value) => {
             
            //  alert(value);
            // });
           
          return false;
      }
    }

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
  render() {
     var divStyle = {
     borderBottom:none,
     marginTop:90
    };
    return (
      <body className="login-body login-fonts">
           <Container>
                <Row className="row no-gutter row-eq-height-xs">
                    <Col md="5" offset-md-1 className="left-box">
                      <div className="login-electricity-and-gas">

                            <a href="/#/register" className="btn btn-primary signup_btn"><i class="zmdi zmdi-assignment"></i> Sign Up Now!</a>
                      </div>
                    </Col>
                    <Col md="5" className="right-box">
                        <Row className="no-gutter">
                          <Col md="10" className="col-md-offset-1">
                               <img src="images/login-logo.png" className="login-logo" alt="" />
                               <Form name="contactform" className="contactform" onSubmit= {this.contactSubmit.bind(this)}>
                                    <ul className="list-unstyled form-style">
                                        <li>
                                            <i className="zmdi zmdi-account user-pass"></i>
                                             <div className="form-group " id="eusername">
                                              <input id="username" type="text" className="form-control login-form-control" name="username" value=""  autofocus placeholder="Enter Username"/>
                                              <span id="errusername" ></span>   
                                            </div>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-lock user-pass"></i>
                                            <div className="form-group " id="epassword">
                                                <input id="password" type="password" className="form-control login-form-control" name="password"  placeholder="Enter Password"/>
                                            </div>
                                        </li>
                                        <li style="{divStyle}">

                                            <button className="btn btn-primary login-btn" type="submit">Login <i class="zmdi zmdi-arrow-right" ></i></button>
                                            <a href="#" className="pull-right forgot-password">Forgot Password?</a>
                                        </li>
                                    </ul>
                               </Form>
                          </Col>
                        </Row>
                    </Col>
                </Row>
           </Container>
      </body>
    );
  }
}

export default Login;
