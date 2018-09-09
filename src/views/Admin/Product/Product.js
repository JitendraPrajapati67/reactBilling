import React, { Component } from "react";
import axios from "axios";

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
  Table,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

function CategoryRow(props) {}

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      loading: true
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost/reactBillingAdmin/api/public/api/getAllProduct")
      .then(res => {
        const categories = res.data.data;
        this.setState({
          categories,
          loading: false
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    const createLink = "#/admin/category/create";
    const getorderLineType = status => {
      return status === "1"
        ? "Items"
        : status === "2"
          ? "Tax"
          : status === "3"
            ? "Penalty"
            : "-";
    };
    if (this.state.loading) {
      return (
        <div>
          <i className="fa fa-spinner fa-spin" /> Loading...
        </div>
      );
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Product
                  <small className="text-muted"> List</small>
                  <a
                    href={createLink}
                    className="btn btn-sm btn-primary float-right"
                  >
                    <i className="fa fa-plus" /> Add New Product
                  </a>
                </CardHeader>
                <CardBody>
                  <Table hover bordered striped responsive size="sm">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Number</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.categories.map(product => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.number}</td>
                          <td>{product.description}</td>
                          <td>{getorderLineType(product.orderLineTypeId)}</td>
                          <td>
                            <a
                              href={createLink}
                              className="btn btn-sm btn-info mr-1"
                            >
                              <i className="fa fa-pencil" />
                            </a>
                            <a
                              href={createLink}
                              className="btn btn-sm btn-danger"
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </td>
                        </tr>
                      ))}
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
}

export default Product;
