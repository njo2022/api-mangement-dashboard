import { useState, useEffect } from 'react'

export function useSubscription(userId) {
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSubscription = async () => {
    if (!userId) return
    
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/user/subscription?userId=${userId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscription')
      }
      
      const result = await response.json()
      setSubscription(result.data)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching subscription:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateSubscription = async (planId, isPayAsYouGo) => {
    try {
      const response = await fetch('/api/user/subscription', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          planId,
          isPayAsYouGo
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update subscription')
      }

      const result = await response.json()
      setSubscription(result.data)
      return result.data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  useEffect(() => {
    fetchSubscription()
  }, [userId])

  return {
    subscription,
    loading,
    error,
    updateSubscription,
    refetch: fetchSubscription
  }
}
