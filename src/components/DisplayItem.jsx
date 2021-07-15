import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Link} from '@reach/router'
const DisplayItem = ({term,id}) => {

	const [data,setData] = useState();
	const [keys,setKeys] = useState();
	const [err,setErr] = useState(true);
	const [worldId,setWorldId] = useState()
	useEffect(() => {
		axios.get(`https://swapi.dev/api/${term}/${id}`)
		.then(response=>{

			if(term==="people"){
				axios.get(response.data.homeworld)
					.then((res) =>{
							let worldId = res.config.url.split("/")
							setWorldId(worldId)
							let copy = {...response.data}
							copy['homeworld'] = res.data.name
							setKeys(Object.keys(response.data))
							setData(copy)
							setErr(false)	
							})

					.catch(err => setErr(true))
			}
			else{
				setKeys(Object.keys(response.data))
				setData(response.data)
				setErr(false)	
			}
			
		})
		.catch(err=>setErr(true))
		
	},[term,id]);
	
  return (
    <div>
    	{
    		err===true ? <><h1>These aren't the droids you're looking for</h1>
    		<img style={{width:600,height:450}} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.esquireme.com%2Fpublic%2Fimages%2F2019%2F09%2F02%2Fobi-wan-show-1567178968.jpg&f=1&nofb=1"/></>
    		:keys.map(key =>{
    			if(key=="homeworld")return <p>{key}:<Link to={`/planets/${worldId[5]}`} >{data[key]}</Link></p>
    		 return <p>{key}:{data[key]}</p>})
    	}
    	
    </div>
  )
}

export default DisplayItem;