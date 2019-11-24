import gql from "graphql-tag";

export const GET_ADDRESS_GRAPHS = {
  level1: gql`
    query listAddress($address: String) {
      Address(address: $address) {
        _id
        address
        amount_received
        sendTo {
          address
          amount_received
        }
        receiveFrom {
          address
          amount_received
        }
      }
    }
  `,
  level2: gql`
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
          }
        }
        receiveFrom {
          address
          amount_received
          receiveFrom {
            address
            amount_received
          }
        }
      }
    }
  `,
  level3: gql`
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
            }
          }
        }
        receiveFrom {
          address
          amount_received
          receiveFrom {
            address
            amount_received
            receiveFrom {
              address
              amount_received
            }
          }
        }
      }
    }
  `,
  level4: gql`
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
              sendTo {
                address
                amount_received
              }
            }
          }
        }
        receiveFrom {
          address
          amount_received
          receiveFrom {
            address
            amount_received
            receiveFrom {
              address
              amount_received
              receiveFrom {
                address
                amount_received
              }
            }
          }
        }
      }
    }
  `,
  level5: gql`
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
              sendTo {
                address
                amount_received
                sendTo {
                  address
                  amount_received
                }
              }
            }
          }
        }
        receiveFrom {
          address
          amount_received
          receiveFrom {
            address
            amount_received
            receiveFrom {
              address
              amount_received
              receiveFrom {
                address
                amount_received
                receiveFrom {
                  address
                  amount_received
                }
              }
            }
          }
        }
      }
    }
  `
};
