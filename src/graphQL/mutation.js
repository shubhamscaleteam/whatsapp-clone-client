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

// delete user Message
export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($input: inputDeleteMessage) {
    deleteMessage(input: $input) {
      info
    }
  }
`;

// delete group message
export const DELETE_GROUP_MESSAGE = gql`
  mutation DeleteGroupMessage($input: inputGroupDeleteMessage) {
    deleteGroupMessage(input: $input) {
      info
    }
  }
`;
