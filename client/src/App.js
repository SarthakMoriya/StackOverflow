import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home'
import About from './Pages/About'
import Auth from './Pages/Auth/Auth'
import Users from './Pages/Users/Users';
import UserProfile from './Pages/UserProfile/UserProfile'
import Posts from './Pages/Posts/Posts';
import Tags from './Pages/Tags/Tags';
import Question from './Pages/Questions/Question';
import AskQuestion from './Pages/AskQuestion/AskQuestion';
import DisplayQuestion from './Pages/Questions/DisplayQuestion';
import { fetchAllQuestions } from './actions/Question';
import { fetchAllUsers } from './actions/Users';
import { fetchAllPosts, fetchAllBlogs } from './actions/Posts'
import CreatePost from './Pages/Posts/CreatePost';
import CreatePostOption from './Pages/Posts/CreatePostOption';
import CreateBlogPost from './Pages/Posts/CreateBlogPost';
import DisplayPosts from './Pages/Posts/DispalyPostBlogs/DisplayPosts';
import DisplayBlogs from './Pages/Posts/DispalyPostBlogs/DisplayBlogs';
import PaymentMain from './Pages/Payment/PaymentMain';
import EditAccount from './Pages/Auth/EditAccount';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }));
  }

  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}


function App() {
  const User = useSelector((state) => state.currentUserReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
    dispatch(fetchAllPosts())
    dispatch(fetchAllBlogs())
    // if(User)
    // {
    //   localStorage.setItem("quesLeft", User?.user?.noOfQuestions)
    // }

    // console.log(User.user)
  }, [dispatch])

  return (
    <BrowserRouter>
      {/* <Payment/> */}
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/payment" element={<PaymentMain />} />
          <Route path="/posts/createPost" element={<CreatePost />} />
          <Route path="/posts/createBlogPost" element={<CreateBlogPost />} />
          <Route path="/posts/createPostForCommunity" element={<CreatePostOption />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/questions" element={<Question />} />
          <Route path="/askquestion" element={<AskQuestion />} />
          <Route path="/questions/:id" element={<DisplayQuestion />} />
          <Route path="/post/:id" element={<DisplayPosts />} />
          <Route path="/blog/:id" element={<DisplayBlogs />} />
          <Route path='/users/:id' element={<UserProfile />} />
          <Route path='/editaccount/:id' element={<EditAccount />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
