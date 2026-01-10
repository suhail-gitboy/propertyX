import React from 'react'

const Searchsuggstion = ({data,dataKey,onSuggestionclick,Highlight


}) => {
console.log("rendering");
  const Gethighlight=(text,highlight)=>{

    const parts=text.split(new RegExp(`(${highlight})`,"gi"))

    return <span>{parts.map((part,ind)=>{
      return part.toLowerCase()===highlight.toLowerCase()?(<b>{part}</b>):(part)
})}</span>

  }


  
  return (
    <div className='w-full'>
      <ul className='border border-gray-500/20 p-3 shadow-xl'>
        {data?.map((item)=>{
            
        
    const currsugestion=dataKey?item[dataKey]:item
  return(  <li onClick={()=>onSuggestionclick(item)} className='mb-2' >{Gethighlight(currsugestion,Highlight)}</li>)
})}
      </ul>
    </div>
  )
}

export default Searchsuggstion
