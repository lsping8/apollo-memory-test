import { useMutation, useQuery } from '@apollo/client'
import Head from 'next/head'

import { QUERY_TEST, SUB_TEST, MUTATE_TEST } from './documentNodes'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react';

export default function Home() {
  const { data, loading, subscribeToMore } = useQuery(QUERY_TEST);
  const [startTest] = useMutation(MUTATE_TEST)

  useEffect(() => {
    subscribeToMore({
      document: SUB_TEST,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const data = subscriptionData.data.subTest;

          return {
            test: data,
          };
        },
    })
  },[])

  if (loading) return null
  return (
    <div>
      <div><button onClick={() => startTest()}>start test</button></div>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}
