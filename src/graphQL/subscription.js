import { gql } from "@apollo/client";

export const CREATE_MESSAGE_SUBCRIPTION = gql`
  subscription crateMessageSubscripation {
    messageCreated {
      userId {
        id
        userName
      }
      reciverId {
        id
        userName
      }
      message
      id
      deleted
      createdAt
    }
  }
`;
