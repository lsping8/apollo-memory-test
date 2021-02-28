import { gql } from "@apollo/client";

const FRAG_TEST = gql`
  fragment FragTest on Test {
    id
    key1 {
      value1
      value2
      value3
    }
    key2 {
      value1
      value2
      value3
    }
    key3 {
      value1
      value2
      value3
    }
    key4 {
      value1
      value2
      value3
    }
    key5 {
      value1
      value2
      value3
    }
    key6 {
      value1
      value2
      value3
    }
    key7 {
      value1
      value2
      value3
    }
    key8 {
      value1
      value2
      value3
    }
    key9 {
      value1
      value2
      value3
    }
    key0 {
      value1
      value2
      value3
    }
  }
`

export const QUERY_TEST = gql`
  query test {
    test {
      ...FragTest
    }
  }
  ${FRAG_TEST}
`;

export const MUTATE_TEST = gql`
  mutation startTest {
    startTest {
      ...FragTest
    }
  }
  ${FRAG_TEST}
`

export const SUB_TEST = gql`
  subscription subTest {
    subTest {
      ...FragTest
    }
  }
  ${FRAG_TEST}
`;


