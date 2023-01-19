import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home'
import About from './Pages/About'
import Auth from './Pages/Auth/Auth'
import Users from './Pages/Users/Users';
import UserProfile from './Pages/UserProfile/UserProfile'
import Posts from './Pages/Posts/Posts';
// import Payment from './Pages/Payment/Payment';


import Tags from './Pages/Tags/Tags';
import Question from './Pages/Questions/Question';
import AskQuestion from './Pages/AskQuestion/AskQuestion';
import DisplayQuestion from './Pages/Questions/DisplayQuestion';
import { fetchAllQuestions } from './actions/Question';
import { fetchAllUsers } from './actions/Users';
import {getAllPosts} from './actions/Posts'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("In App");
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
    dispatch(getAllPosts())
  }, [dispatch])

  return (
    <BrowserRouter>
      {/* <Payment/> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/users" element={<Users />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/askquestion" element={<AskQuestion />} />
        <Route path="/questions/:id" element={<DisplayQuestion />} />
        <Route path='/users/:id' element={<UserProfile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
