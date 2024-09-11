'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setNotFound(false)

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_PASSWORD_ROUTE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (response.status === 404) {
        setNotFound(true)
      } else if (response.ok) {
        setSuccess(true)
      } else {
        setError('There was an error processing your request. Please try again.')
      }
    } catch (error) {
      setError('Server error. Please try again later.')
      console.log(error.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    (<Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Enter your email to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            {notFound && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Email address not found. Please check your email and try again.
                </AlertDescription>
              </Alert>
            )}
            {error && (
              <div className="flex items-center space-x-2 text-red-500">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Reset Password'}
            </Button>
          </form>
        ) : (
          <div className="flex items-center space-x-2 text-green-500">
            <CheckCircle2 size={20} />
            <span>Password reset link sent to your email!</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="link" onClick={() => window.history.back()}>
          Back to Login
        </Button>
      </CardFooter>
    </Card>)
  );
}
