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

export const DELETE_MESSAGE_SUBSRIPTION = gql`
  subscription SubscriptionDeleteMessage {
    deleteMessage {
      info
    }
  }
`;

export const CREATE_GROUP_MESSAGE_SUBSCRIPATION = gql`
  subscription subscripationGroupMessageCreate {
    groupMessageCreated {
      id
      message
      groupId
      deleted
    }
  }
`;
export const DELETE_GROUP_MESSAGE_SUBSCRIPATION = gql`
  subscription deleteGroupMessgeSubscription {
    groupDeleteMessage {
      info
    }
  }
`;

export const READ_MESSAGE_SUBSCRIPATION = gql`
  subscription readMessageSubscription {
    readMessage {
      isread
    }
  }
`;
