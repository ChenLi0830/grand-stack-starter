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
