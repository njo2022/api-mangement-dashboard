import { useState, useEffect } from 'react'

export function useApiKeys(userId) {
  const [apiKeys, setApiKeys] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchApiKeys = async () => {
    if (!userId) return
    
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/api-keys?userId=${userId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch API keys')
      }
      
      const result = await response.json()
      setApiKeys(result.data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching API keys:', err)
    } finally {
      setLoading(false)
    }
  }

  const createApiKey = async (name, type, keyValue) => {
    try {
      const response = await fetch('/api/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          type,
          keyValue,
          userId
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create API key')
      }

      const result = await response.json()
      setApiKeys(prev => [result.data, ...prev])
      return result.data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateApiKey = async (id, name, type) => {
    try {
      const response = await fetch(`/api/api-keys/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, type }),
      })

      if (!response.ok) {
        throw new Error('Failed to update API key')
      }

      const result = await response.json()
      setApiKeys(prev => 
        prev.map(key => key.id === id ? result.data : key)
      )
      return result.data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteApiKey = async (id) => {
    try {
      const response = await fetch(`/api/api-keys/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete API key')
      }

      setApiKeys(prev => prev.filter(key => key.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  useEffect(() => {
    fetchApiKeys()
  }, [userId])

  return {
    apiKeys,
    loading,
    error,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    refetch: fetchApiKeys
  }
}
