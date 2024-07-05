"use client"
import React, { useState } from 'react'
import axios from 'axios'


const page = () => {
 
  const [inputvalue,setinputvalue] = useState('')
  const [recipes, setRecipes] = useState([]);
  
  const api = async (query) => {
    
    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = res.data.meals;
      setRecipes(data)
      console.log("API response:", data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    
    <>

    <header className='flex justify-between p-5 bg-blue-100 md:flex-row flex-col items-center shadow-md '>
     <div className=''>

      <h1 className=' text-4xl family-e tracking-widest mt-2 '>TASTEBITE</h1>
   
     </div>

     <div className='flex md:mt-0 mt-6 '>
      <input type='search' placeholder='Search recipe' className='outline-none p-3 rounded-md text-xl mr-4 text-black w-52'

      value={inputvalue}
      onChange={(e) => {
        e.preventDefault()
        setinputvalue(e.target.value)
        console.log( e.target.value)
        api(e.target.value)
      }} >
      
      

      </input>

      <button className='bg-white p-3 text-black font-medium rounded-md  text-xl' onClick={() => {
        api(inputvalue)
      }}> Enter</button>

    </div>
   </header>


    <div className=' text-black text-2xl mt-5 overflow-hidden bg-white '>
      <ul className='grid lg:grid-cols-4 p-5 md:grid-cols-3 grid-cols-2 '>
        
    {recipes && recipes.map((elem, i) => (
          <li key={i} 
          className='p-5 m-2 bg-blue-100 rounded-lg grid place-items-center '>
            <img src={elem.strMealThumb}></img>

            <h2 className='lg:text-3xl md:text-2xl sm:text-xl text-xl font-semibold mt-4'>{elem.strMeal}</h2>

            <a href={elem.strYoutube} target='_blank'><button className='bg-red-400 rounded-md p-2 lg:text-2xl md:text-xl sm:text-xs text-xs font-medium mt-4 text-white'>
               How to make</button></a>
          </li>
        ))}
        
        </ul> 

    </div>

    </>

  )
}

export default page
