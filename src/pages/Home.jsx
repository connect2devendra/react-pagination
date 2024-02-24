import React from 'react'
import { Todo } from '../components/Todo'

export const Home = () => {
  return (  
    <div className='container'>
        <h1 className='text-center'>React pagination (Json Placeholder Fake Api)</h1>
        <Todo />
    </div>  
  )
}
