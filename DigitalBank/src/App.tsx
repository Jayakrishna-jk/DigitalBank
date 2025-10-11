import { ToastContainer } from 'react-toastify'
import './App.css'
import {BrowserRouter as Router } from 'react-router-dom'
import { Suspense } from 'react'
import Layout from './Layout/Layout'
import { Loader } from 'lucide-react'
import ErrorBoundary from './components/ErrorBoundary'

function App() {

  return (
     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 font-sans">
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <ErrorBoundary>
          <Suspense
            fallback={<Loader />}
          >
            <Layout />
          </Suspense>
          {/* <BuggyComponent /> */}
        </ErrorBoundary>
      </Router>
    </div>
  )
}

export default App
