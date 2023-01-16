import React from "react";

const WidgetTags = () => {
  const tags = ['c','css','html','express','firebase','java','javascript','mern','mongodb','mySql','Next.js','Node.js','php','ReactJs','AngularJs','c#'];
  return (
    <div className="widget-tags">
      <h3>Watched Tags</h3>
      <div className="widget-tags-div">
        {tags.map((tag) => (
          <p key={tag}> {tag}</p>
          )
        )}
      </div>
    </div>
  );
};

export default WidgetTags;
