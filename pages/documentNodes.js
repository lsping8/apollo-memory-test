import { gql } from "@apollo/client";

const FRAG_TEST = gql`
  fragment FragTest on Test {
    id
    key1 {
      value1
      value2
      value3
      value4
      value5
      value6
      value7
      value8
      value9
      value0
    }
    key2 {
      value1
      value2
      value3
      value4
      value5
      value6
      value7
      value8
      value9
      value0
    }
    key3 {
      value1
      value2
      value3
      value4
      value5
      value6
      value7
      value8
      value9
      value0
    }
    key4 {
      value1
      value2
      value3
      value4
      value5
      value6
      value7
      value8
      value9
      value0
    }
    key5 {
      value1
      value2
      value3
      value4
      value5
      value6
      value7
      value8
      value9
      value0
    }
    key6 {
      value1
      value2
      value3
      value4
      value5
      value6
      value7
      value8
      value9
      value0
    }
    key7 {
      value1
      value2
      value3
      value4
      value5
      value6
      value7
      value8
      value9
      value0
    }
    key8 {
      value1
      value2
      value3
      value4
      value5
      value6
      value7
      value8
      value9
      value0
    }
    key9 {
      value1
      value2
      value3
      value4
      value5
      value6
      value7
      value8
      value9
      value0
    }
    key0 {
      value1
      value2
      value3
      value4
      value5
      value6
      value7
      value8
      value9
      value0
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


