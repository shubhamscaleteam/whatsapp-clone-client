import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    user(email: $email) {
      id
      email
      userName
      profilePicture
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($userById: ID!) {
    userById(id: $userById) {
      id
      userName
      profilePicture
    }
  }
`;

export const GET_ALL_USER = gql`
  query getAllUser {
    allUser {
      id
      userName
      profilePicture
    }
  }
`;

// user message

export const GET_ALL_MESSAGE = gql`
  query UserMessage($filter: filterData) {
    userMessage(filter: $filter) {
      id
      message
      createdAt
      deleted
      isread
      __typename
      reciverId {
        id
        userName
      }
      userId {
        id
        email
      }
    }
  }
`;

// *** user all group

export const USER_GROUP = gql`
  query UserAllGroup($userId: ID!) {
    userAllGroup(userId: $userId) {
      member {
        id
        userName
      }
      id
      userName
      creator {
        id
        userName
      }
    }
  }
`;

// *** find group by id

export const GROUP_BY_ID = gql`
  query GroupbyId($reciverId: ID!) {
    groupbyId(reciverId: $reciverId) {
      userName
      member {
        id
        userName
      }
      id
      creator {
        id
        userName
      }
    }
  }
`;

// *** group all messsage

export const GROUP_ALL_MESSAGE = gql`
  query Query($reciverId: ID!) {
    groupAllMessage(reciverId: $reciverId) {
      id
      message
      reciverId {
        id
        userName
      }
      userId {
        id
        userName
      }
      deleted
      createdAt
      __typename
    }
  }
`;

// *** group and user single message

export const USER_AND_GROUP_SINGLE_MESSAGE = gql`
  query Query($singleMessageId: ID) {
    singleMessage(id: $singleMessageId) {
      id
      message
      createdAt
      userId {
        id
        userName
      }
      reciverId {
        id
        userName
      }
    }
  }
`;

// *** forgot password

export const FORGOT_PASSWORD = gql`
  mutation ForgetPassword($email: String!) {
    forgetPassword(email: $email) {
      id
      email
      password
    }
  }
`;
