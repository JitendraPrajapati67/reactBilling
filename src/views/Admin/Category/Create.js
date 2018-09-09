import React, { Component } from "react";
import API from "../../../api";
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row
} from "reactstrap";

class Create extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      description: "",
      orderLineTypeId: "",
      orderLineType: {
        1: "Items",
        2: "Tax",
        3: "Penalty"
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const description = {
      description: this.state.description
    };

    API.post("createItemCategory", {
      description
    }).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="8" sm="8">
            <Card>
              <CardHeader>
                <strong>Category</strong>
                <small> Form</small>
              </CardHeader>
              <form onSubmit={this.handleSubmit}>
                <CardBody>
                  <Row>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="name">description</Label>
                        <Input
                          type="text"
                          id="description"
                          placeholder="description"
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="ccmonth">Type</Label>
                        <Input
                          type="select"
                          name="orderLineTypeId"
                          id="orderLineTypeId"
                        >
                          <option>--select Type--</option>
                          <option value="1">Items</option>
                          <option value="2">Tax</option>
                          <option value="3">Penalty</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o" /> Submit
                  </Button>
                  <Button type="reset" size="sm" color="danger">
                    <i className="fa fa-ban" /> Reset
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Create;
