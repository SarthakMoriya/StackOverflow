import React from 'react'

const Avatar = ({children,backgroundColor,borderRadius,color,px,py}) => {
    const styles={
        backgroundColor: backgroundColor ,
        color:color || 'white',
        textDecoration:'none',
        textAlign:'center'
    }
  return (
    <div className='rounded-sm px-2 py-1 mr-3' style={styles}>{children}</div>
  )
}

export default Avatar