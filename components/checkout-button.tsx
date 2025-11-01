'use client'

import { useState } from 'react'

interface CheckoutButtonProps {
  priceId: string
  className?: string
  children: React.ReactNode
}

export function CheckoutButton({ priceId, className, children }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      console.log('Creating checkout session with priceId:', priceId)
      
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      })

      const data = await response.json()
      console.log('Checkout response:', data)

      if (data.error) {
        console.error('Checkout error:', data.error, data.details)
        alert(`Failed to create checkout session: ${data.details || data.error}`)
        setIsLoading(false)
        return
      }

      if (data.url) {
        console.log('Redirecting to:', data.url)
        window.location.href = data.url
      } else {
        console.error('No URL in response:', data)
        alert('No checkout URL received')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}

