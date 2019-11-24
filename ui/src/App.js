import React, { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import { Input, Slider, InputNumber, Row, Col } from "antd";

import ForceGraph from "./ForceGraph";

const { Search } = Input;

const GET_ADDRESS_GRAPH = gql`
  query listAddress($address: String) {
    Address(address: $address) {
      _id
      address
      amount_received
      sendTo(first: 10) {
        address
        amount_received
        sendTo(first: 10) {
          address
          amount_received
        }
      }
    }
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      loading: false
    };
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(value) {
    this.setState({ searchText: value });
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col span={12} offset={6}>
            <Search
              placeholder="input search text"
              onSearch={value => this.onSearch(value)}
              enterButton
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <ForceGraph searchText={this.state.searchText} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default App;
