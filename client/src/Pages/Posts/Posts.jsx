import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import PostMainBar from './PostMainBar'

const Posts = () => {
  return (  
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <PostMainBar />
      </div>

    </div>
  )
}   

export default Posts