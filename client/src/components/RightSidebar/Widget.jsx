import React from "react";
import "./RightSidebar.css";

import comment from "../../assets/comment-alt-solid.svg";
import pen from "../../assets/pen-solid.svg";
import blacklogo from "../../assets/blacklogo.svg";

const Widget = () => {
  return (
    <div className="widget">
      <h4 className="text-xl px-4 py-4">The Overflow Blog</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width="18" />
          <p>
            Observability is key to the future of your software and Devops
            career
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width="18" />
          <p>
         Podcast69: How valuable is your screen Name ?
          </p>
        </div>
      </div>
      <h4 className="text-xl px-4 py-4">Featured on Mars</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={comment} alt="pen" width="18" />
          <p>
          Review queue workflows Final Release ... 
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={comment} alt="pen" width="18" />
          <p>
          Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={blacklogo} alt="pen" width="18" />
          <p>
          Outdated Answers: accepted answer is now unpinned on Stack Overflow
          </p>
        </div>
      </div>
      <h4 className="text-xl px-4 py-4">Hot Meta Posts</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <p>38</p>
          <p>
          Why was this spam flag declined, yet the question marked as spam?
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <p>38</p>
          <p>
          Is a link to the "How to ask" help page a useful comment?
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <p>30</p>
          <p>
          Is a link to the "How to ask" help page a useful comment?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Widget;
