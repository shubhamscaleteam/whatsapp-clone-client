import { gql } from "@apollo/client";

// ***registerUser

export const REGISTER_USER = gql`
  mutation registerUser($input: inputRegister!) {
    registerUser(input: $input) {
      email
      phoneno
      userName
    }
  }
`;

// ***loginUser

export const LOGIN_USER = gql`
  mutation loginUser($input: inputLogin!) {
    loginUser(input: $input) {
      token
    }
  }
`;

// *** create message

export const CREATE_MESSAGE = gql`
  mutation createMessage($input: message) {
    createMessage(input: $input) {
      message
      reciverId {
        userName
        id
      }
      userId {
        id
        userName
      }
      createdAt
    }
  }
`;

// *** create group

export const CREATE_GROUP = gql`
  mutation CreateGroupOfUser($input: Group) {
    createGroupOfUser(input: $input) {
      member {
        userName
        id
      }
      userName
      creator {
        id
        userName
      }
    }
  }
`;

//  *** create group message

export const CREATE_GROUP_MESSAGE = gql`
  mutation CreateGroupMessage($input: messageOfgroup) {
    createGroupMessage(input: $input) {
      userId
      message
      groupId
    }
  }
`;
