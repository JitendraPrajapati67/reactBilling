import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { rgbToHex } from "@coreui/coreui/dist/js/coreui-utilities";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from "reactstrap";
class ThemeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bgColor: "rgb(255, 255, 255)"
    };
  }

  componentDidMount() {
    const elem = ReactDOM.findDOMNode(this).parentNode.firstChild;
    const color = window
      .getComputedStyle(elem)
      .getPropertyValue("background-color");
    this.setState({
      bgColor: color || this.state.bgColor
    });
  }

  render() {
    return (
      <table className="w-100">
        <tbody>
          <tr>
            <td className="text-muted">HEX:</td>
            <td className="font-weight-bold">{rgbToHex(this.state.bgColor)}</td>
          </tr>
          <tr>
            <td className="text-muted">RGB:</td>
            <td className="font-weight-bold">{this.state.bgColor}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class ThemeColor extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    // const { className, children, ...attributes } = this.props
    const { className, children } = this.props;

    const classes = classNames(className, "theme-color w-75 rounded mb-3");

    return (
      <Col xl="2" md="4" sm="6" xs="12" className="mb-4">
        <div className={classes} style={{ paddingTop: "75%" }} />
        {children}
        <ThemeView />
      </Col>
    );
  }
}

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: []
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost/reactBillingAdmin/api/public/api/getAllItemCategories"
      )
      .then(res => {
        const persons = res.data.data;
        this.setState({ persons });
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Category List
              </CardHeader>
              <CardBody>
                <ul>
                  {this.state.persons.map(person => (
                    <li>{person.name}</li>
                  ))}
                </ul>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Vishnu Serghei</td>
                      <td>2012/01/01</td>
                      <td>Member</td>
                      <td>
                        <Badge color="success">Active</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>Zbyněk Phoibos</td>
                      <td>2012/02/01</td>
                      <td>Staff</td>
                      <td>
                        <Badge color="danger">Banned</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>Einar Randall</td>
                      <td>2012/02/01</td>
                      <td>Admin</td>
                      <td>
                        <Badge color="secondary">Inactive</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>Félix Troels</td>
                      <td>2012/03/01</td>
                      <td>Member</td>
                      <td>
                        <Badge color="warning">Pending</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>Aulus Agmundr</td>
                      <td>2012/01/21</td>
                      <td>Staff</td>
                      <td>
                        <Badge color="success">Active</Badge>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink previous tag="button">
                        Prev
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink next tag="button">
                        Next
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Category;
