import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { QUERY_TEST, SUB_TEST, MUTATE_TEST } from './documentNodes'

export default function Home() {
  const { data, loading } = useQuery(QUERY_TEST);
  const [startTest] = useMutation(MUTATE_TEST)
  useSubscription(SUB_TEST)

  if (loading) return null
  return (
    <div>
      <div><button onClick={() => startTest()}>start test</button></div>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}
