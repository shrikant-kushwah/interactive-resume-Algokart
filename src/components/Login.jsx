import React, { useState } from 'react'

const VALID = { email: 'shrikant20052001@gmail.com', password: 'Shri123' }

const Login = ({ onLogin }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // use regex to validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Invalid email format.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (email === VALID.email && password === VALID.password) {
      onLogin({ email })
    } else {
      setError('Incorrect email or password.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        aria-label="Login form"
        noValidate
      >
        <h1 className="text-2xl font-semibold text-center mb-2 text-gray-900">Interactive Resume</h1>
        <p className="text-gray-600 text-center mb-6">Login to continue</p>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              id="email"
              type="email"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              value={email}
              onChange={handleEmailChange}
              aria-required="true"
              aria-invalid={error && error.includes('email') ? 'true' : 'false'}
              aria-describedby={error ? 'error-message' : undefined}
              autoComplete="email"
            />
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              id="password"
              type="password"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              value={password}
              onChange={handlePasswordChange}
              aria-required="true"
              aria-invalid={error && error.includes('password') ? 'true' : 'false'}
              aria-describedby={error ? 'error-message' : undefined}
              autoComplete="current-password"
            />
          </label>
        </div>

        {error && (
          <div
            id="error-message"
            className="text-red-600 text-sm mb-4 p-2 bg-red-50 rounded-lg border border-red-200"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none transition font-medium"
          aria-label="Submit login form"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login