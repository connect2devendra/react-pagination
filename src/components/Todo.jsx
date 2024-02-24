import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";


export const Todo = () => {

    const [todos, setTodos] = useState([]);
    const [todosPerPage, setTodosPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(()=>{
       //Runs only on the first render to fetch all comments
       axios.get("https://jsonplaceholder.typicode.com/todos")
            .then((res)=>{
              setTodos(res.data);
            })
            .catch((err)=>{
              console.log(err);
            })

    },[]);

    const numOftotalPages = Math.ceil(todos.length/todosPerPage);
    //generate page range from 1 to n no. of total page.
    const pages = [...Array(numOftotalPages+1).keys()].slice(1); 
    // console.log(pages);

    const indexOfLastTodo = todosPerPage*currentPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    //fetch no. of todos to visible in current page
    const filteredTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const previousPageHandler = ()=>{
      if(currentPage !== 1){
        setCurrentPage(currentPage - 1);
      }
    }

    const nextPageHandler = ()=>{
      if(currentPage !== numOftotalPages){
        setCurrentPage(currentPage + 1);
      }
    }

    const todosPerPageHandler = (e)=>{
      e.preventDefault();
      setTodosPerPage(e.target.value);
      setCurrentPage(1);
    }

  return (
    <>
      <h2>Todos List &nbsp;
        <select onClick={(e)=>{todosPerPageHandler(e)}}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      </h2>
      
      <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Completed</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos && filteredTodos.map((item)=>{
              return (
                
                  <tr key={item.id}>
                    <th>{item.id}</th>
                    <td>{item.title}</td>
                    <td>{item.completed? <span className='text-success'>Yes</span> : <span className='text-danger'>No</span>}</td>
                  </tr>
              )
            })
          }
            
            </tbody>
        </table>

        <nav aria-label="Page navigation example" className=''>
          <ul className="pagination text-center">
            <li className="page-item"><Link className="page-link" to="#" onClick={previousPageHandler}>Previous</Link></li>
            {
              pages && pages.map((page, counter)=>{
                return (
                  <li key={counter} className={page===currentPage? 'page-item active' : 'page-item'}><Link className="page-link" to="#" onClick={()=>setCurrentPage(page)}>{page}</Link></li>
                )
              })
            }
            <li className="page-item"><Link className="page-link" to="#" onClick={nextPageHandler}>Next</Link></li>
          </ul>
        </nav>
    </>
  )
}
