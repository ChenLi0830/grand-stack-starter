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

export const GET_USER_BY_ID_GRAPHS = {
  level1: gql`
    query queryUserById($userId: String) {
      User(_id: $userId) {
        _id
        cluster_id
        amount_received
        sendTo {
          cluster_id
          amount_received
        }
        receiveFrom {
          cluster_id
          amount_received
        }
      }
    }
  `
};
