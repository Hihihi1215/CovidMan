import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <div>
        <Link to='/SignIn'>
            <Button variant="outline-primary">To Sign In</Button>
        </Link>
    </div>
  )
}

export default Home