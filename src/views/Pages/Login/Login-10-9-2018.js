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
   
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form name="contactform" className="contactform" onSubmit= {this.contactSubmit.bind(this)}>
                      <h1>Login</h1>
                      <span> {localStorage.getItem('message')}</span>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          onChange={this.handleChange.bind(this, "username")} value={this.state.fields["username"]}
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Username"
                          autoComplete="username"
                        />
                        <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          onChange={this.handleChange.bind(this, "password")} 
                          value={this.state.fields["password"]}
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                        <span style={{color: "red"}}>{this.state.errors["password"]}
                        </span>
                      </InputGroup>

                      <Row>
                        <Col xs="6">
                          <button type="submit" className="px-4 btn btn-primary">Login</button>
                        </Col>
                        
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: 44 + "%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        This system is intended for use by aBilling Services
                        customers. Unauthorized use of this system is strictly
                        prohibited. All information contained within this system
                        is confidential to aBilling Services and it's customers.
                      </p>
                      <Button color="primary" className="mt-3" active onClick= {this.register.bind(this)}>
                        Register Now!
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
