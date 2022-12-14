import  { useState, useEffect } from 'react'
import axios, { Canceler } from 'axios'
export interface Book {
  title: string
}
function useSearchBook(query: string, pageNum: number) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [books, setBooks] = useState<string[]>([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setBooks([])
  }, [query])

  useEffect(() => {
    const CancelToken = axios.CancelToken
    let cancel: Canceler

    setIsLoading(true)
    setError(false)

    axios
      .get(`https://openlibrary.org/search.json?q=${query}&page=${pageNum}`, {
        cancelToken: new CancelToken((c) => (cancel = c))
      })
      .then((res) => {
        setBooks((prev) => {
          const newData: string[] = res.data.docs.map((d: Book) => d.title)
          const allData = [...prev, ...newData]
          const set = new Set(allData)
          const uniqueArray = Array.from(set)
          return [...uniqueArray]
        })
        setHasMore(res.data.docs.length > 0)
        setIsLoading(false)
      })
      .catch((err) => {
        if (axios.isCancel(err)) return
        setError(err)
      })

    return () => cancel()
  }, [query, pageNum])

  return { isLoading, error, books, hasMore }
}

export default useSearchBook
