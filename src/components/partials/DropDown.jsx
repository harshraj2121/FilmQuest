import React from 'react'

function DropDown({title, opt , func}) {

  return (
    <div className='select'>
      <select onChange={func} className='h-8 w-44 border-none rounded bg-zinc-500 font-semibold' defaultValue="0" name="format" id="format">
        <option className='text-white font-semi' value="0" disabled>
         {title}
        </option>
        {opt.map((o, i) =>(
         <option className='text-white font-semibold' key={i} value={o}>
          {o.toUpperCase()}
         </option>
        ))}
      </select>
    </div>
  )
}

export default DropDown