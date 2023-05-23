import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    user(email: $email) {
      id
      email
      phoneno
      userName
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($userById: ID!) {
    userById(id: $userById) {
      email
      id
      phoneno
      userName
    }
  }
`;

export const GET_ALL_USER = gql`
  query getAllUser {
    allUser {
      userName
      id
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
  query Query($groupId: ID!) {
    groupbyId(groupId: $groupId) {
      member {
        id
        userName
      }
      userName
      creator {
        id
        userName
      }
    }
  }
`;

// *** group all messsage

export const GROUP_ALL_MESSAGE = gql`
  query groupAllMessage($groupId: ID!) {
    groupAllMessage(groupId: $groupId) {
      id
      message
      deleted
      createdAt
      userId {
        id
        userName
      }

      groupId {
        id
        userName
      }
    }
  }
`;
