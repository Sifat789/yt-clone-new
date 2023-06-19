import React from 'react'

const LeftSideBarOptions = (props) => {

    const { img } = props.img
    const { name } = props.name
    console.log(props)
    return (
        <div className='flex items-center'>
            {img}
            <h3 className='ml-5 text-lg font-semibold'>{name}</h3>
        </div>
    )
}

export default LeftSideBarOptions