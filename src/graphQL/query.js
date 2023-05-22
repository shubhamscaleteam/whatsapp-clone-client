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

export const GET_ALL_MESSAGE = gql`
  query getAllMessage($filter: filterData) {
    userMessage(filter: $filter) {
      message
      reciverId {
        id
        userName
      }
      userId {
        id
        email
      }
      createdAt
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
