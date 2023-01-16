import React from 'react'

const Avatar = ({children,backgroundColor,borderRadius,color,px,py}) => {
    const styles={
        backgroundColor: backgroundColor ,
        borderRadius: borderRadius,
        color:color || 'white',
        padding:`${px} ${py}`,
        textDecoration:'none',
        textALign:'center'
    }
  return (
    <div style={styles}>{children}</div>
  )
}

export default Avatar