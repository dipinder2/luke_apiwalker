import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router'

const Search = (props) => {
	const [options,setOptions] = useState([]);
	
	useEffect(() => {
		axios.get("https://swapi.dev/api/")
		.then(response => {
			setOptions(Object.keys(response.data));
		}).catch(error => console.error(error))
	},[])


	
	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/${e.target.term.value}/${e.target.id.value}`)
	}

  return (
    <form onSubmit={handleSubmit}>
    	Search for:
		<select  name="term">
		<option></option>
		  {
		  	options.map(opt=><option value={opt}>{opt}</option>)
		  }
		</select>
    	id: <input name="id" type="number"/>
    	<input className="btn btn-primary" type="submit" value="Search"/>
    </form>
  )
}

export default Search;