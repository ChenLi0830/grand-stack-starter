import React, { useRef, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import ForceGraph3D from "react-force-graph-3d";

const { GET_ADDRESS_GRAPHS } = require("./queries");

// TODO:
const GET_ADDRESS_GRAPH = GET_ADDRESS_GRAPHS["level5"];

const defaultData = {
  nodes: [{ id: "GENERATED", address: "GENERATED", desc: "GENERATED" }],
  links: []
};

function ForceGraph(props) {
  const fgRef = useRef();

  const { loading, data, error } = useQuery(GET_ADDRESS_GRAPH, {
    variables: {
      address: props.searchText
    }
  });

  function traverseNodeHelper(node, level) {
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
        traverseNodeHelper(sentToNode, level + 1);
      });
    }

    if (node.receiveFrom && node.receiveFrom.length > 0) {
      node.receiveFrom.forEach(receiveFromNode => {
        links.push({
          source: receiveFromNode.address,
          target: node.address,
          desc: `from: ${receiveFromNode.address}, to: ${node.address}`
        });
        traverseNodeHelper(receiveFromNode, level - 1);
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
    if (data.Address && data.Address.length > 0)
      traverseNodeHelper(data.Address[0], 0);
    const nodes = nodeMap.size > 0 ? Array.from(nodeMap.values()) : [];
    parsing = false;
    parsedData = { nodes, links };
  }

  const handleNodeClick = node => {
    props.handleSearch(node.id);
  };

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
        enableNodeDrag={false}
        nodeLabel="desc"
        linkLabel="desc"
        onNodeClick={handleNodeClick}
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
    <div>
      {/* {(loading || parsing) && !error && <p>Loading...</p>} */}
      {error && !loading && <p>Error</p>}
      {((!parsing && !loading && !error) || parsedData) &&
        renderGraph(parsedData)}
    </div>
  );
}

export default ForceGraph;
