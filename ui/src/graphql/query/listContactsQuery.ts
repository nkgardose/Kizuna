import gql from "graphql-tag";

export default gql`
  query ListContacts {
    listContacts {
        agent_id
    }
  }
`;
