import React from "react";
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

const GET_ADDRESS_GRAPH = gql`
  query listAddress($address: String) {
    Address(address: $address) {
      _id
      address
      amount_received
      sendTo {
        address
        amount_received
        sendTo {
          address
          amount_received
          sendTo {
            address
            amount_received
            #   sendTo {
            #     address
            #     amount_received
            #     sendTo {
            #       address
            #       amount_received
            #       sendTo {
            #         address
            #         amount_received
            #         sendTo {
            #           address
            #           amount_received
            #           sendTo {
            #             address
            #             amount_received
            #           }
            #         }
            #       }
            #     }
            #   }
          }
        }
      }
    }
  }
`;

const defaultData = {
  nodes: [{ id: "GENERATED" }],
  links: []
};

function UserList(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filterState, setFilterState] = React.useState({ usernameFilter: "" });

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

  function nodeHelper(node) {
    if (!node || !node.address) return;

    nodeMap.set(node.address, {
      id: node.address,
      amountReceived: node.amount_received
    });

    if (node.sendTo && node.sendTo.length > 0) {
      node.sendTo.forEach(sentToNode => {
        links.push({ source: node.address, target: sentToNode.address });
        nodeHelper(sentToNode);
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
    if (data.Address && data.Address.length > 0) nodeHelper(data.Address[0]);
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

  const renderGraph = parsedData => {
    return (
      <ForceGraph3D
        graphData={
          parsedData.nodes && parsedData.nodes.length > 0
            ? parsedData
            : defaultData
        }
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        nodeLabel="id"
        // nodeAutoColorBy="group"
        nodeAutoColorBy={d => parseInt(d.id.replace(/\D/g, "")) % 7}
      />
    );
  };

  return (
    <Paper>
      {(loading || parsing) && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {!parsing && !loading && !error && renderGraph(parsedData)}
    </Paper>
  );
}

export default UserList;
