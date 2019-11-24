import React, { Component } from "react";
import { Input, Slider, InputNumber, Row, Col } from "antd";

import ForceGraph from "./ForceGraph";

const { Search } = Input;

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
              onSearch={this.onSearch}
              enterButton
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <ForceGraph
              searchText={this.state.searchText}
              handleSearch={this.onSearch}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default App;
