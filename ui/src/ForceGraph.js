import React, { useRef, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./UserList.css";
// import { ForceGraph3D } from "react-force-graph";
import ForceGraph3D from "react-force-graph-3d";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  TableSortLabel,
  Typography,
  TextField,
  FormHelperText
} from "@material-ui/core";
const { GET_ADDRESS_GRAPHS } = require("./queries");

const GET_ADDRESS_GRAPH = GET_ADDRESS_GRAPHS["level5"];

const defaultData = {
  nodes: [{ id: "GENERATED", address: "GENERATED", desc: "GENERATED" }],
  links: []
};

function ForceGraph(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [filterState, setFilterState] = React.useState({ usernameFilter: "" });
  const fgRef = useRef();

  const getFilter = () => {
    return filterState.usernameFilter.length > 0
      ? { name_contains: filterState.usernameFilter }
      : {};
  };

  console.log("props.searchText", props.searchText);
  const { loading, data, error } = useQuery(GET_ADDRESS_GRAPH, {
    variables: {
      address: props.searchText
      // offset: rowsPerPage * page,
      // orderBy: orderBy + "_" + order,
      // filter: getFilter()
    }
  });

  function nodeHelper(node, level) {
    if (!node || !node.address) return;

    nodeMap.set(node.address, {
      id: node.address,
      level,
      amountReceived: node.amount_received,
      desc: !node.amount_received
        ? `address: ${node.address}`
        : `address: ${node.address}, received: ${node.amount_received}BTC`
    });

    if (node.sendTo && node.sendTo.length > 0) {
      node.sendTo.forEach(sentToNode => {
        links.push({
          source: node.address,
          target: sentToNode.address,
          desc: `from: ${node.address}, to: ${sentToNode.address}`
        });
        nodeHelper(sentToNode, level + 1);
      });
    }

    if (node.receiveFrom && node.receiveFrom.length > 0) {
      node.receiveFrom.forEach(receiveFromNode => {
        links.push({
          source: receiveFromNode.address,
          target: node.address,
          desc: `from: ${receiveFromNode.address}, to: ${node.address}`
        });
        nodeHelper(receiveFromNode, level - 1);
      });
    }
  }

  /**
   * Parse data
   */
  let parsing = false;
  const nodeMap = new Map();
  const links = [];
  let parsedData = { nodes: [] };
  if (!loading) {
    parsing = true;
    if (data.Address && data.Address.length > 0) nodeHelper(data.Address[0], 0);
    const nodes = nodeMap.size > 0 ? Array.from(nodeMap.values()) : [];
    parsing = false;
    parsedData = { nodes, links };
  }

  console.log("parsedData", parsedData);

  const handleSortRequest = property => {
    const newOrderBy = property;
    let newOrder = "desc";

    if (orderBy === property && order === "desc") {
      newOrder = "asc";
    }

    setOrder(newOrder);
    setOrderBy(newOrderBy);
  };

  const handleFilterChange = filterName => event => {
    const val = event.target.value;

    setFilterState(oldFilterState => ({
      ...oldFilterState,
      [filterName]: val
    }));
  };

  const handleNodeClick = useCallback(
    node => {
      // Aim at node from outside it
      console.log("node", node);
      const distance = 40;
      const distRatio =
        1 + distance / Math.max(Math.hypot(node.x, node.y, node.z), 1);
      console.log("distRatio", distRatio);
      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );
    },
    [fgRef]
  );

  const renderGraph = parsedData => {
    return (
      <ForceGraph3D
        graphData={
          parsedData.nodes && parsedData.nodes.length > 0
            ? parsedData
            : defaultData
        }
        ref={fgRef}
        // linkDirectionalParticles={1}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        // linkCurvature={0.25}
        enableNodeDrag={false}
        nodeLabel="desc"
        linkLabel="desc"
        // onNodeClick={handleNodeClick}
        onNodeClick={node => {
          props.handleSearch(node.id);
        }}
        nodeAutoColorBy={d => parseInt(d.id.replace(/\D/g, "")) % 7}
        // nodeAutoColorBy="level"
        // nodeAutoColorBy={address => {
        //   console.log("address", address);
        //   return parseInt(address.amountReceived / 10);
        // }}
      />
    );
  };

  return (
    <Paper>
      {(loading || parsing) && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {((!parsing && !loading && !error) || parsedData) &&
        renderGraph(parsedData)}
    </Paper>
  );
}

export default ForceGraph;
