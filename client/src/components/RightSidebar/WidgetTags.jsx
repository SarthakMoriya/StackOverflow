import React from "react";

const WidgetTags = () => {
  const tags = ['css','html','express','firebase','java','javascript','mern','mongodb','mySql','Next.js','Node.js','php','ReactJs','AngularJs','c#'];
  return (
    <div className="widget-tags pb-4">
      <h3 className="text-xl px-4 py-2">Watched Tags</h3>
      <div className="flex  justify-around flex-wrap">
        {tags.map((tag) => (
          <p className="w-[25%]  text-center bg-[#e1ecf4] mx-[1px] my-[1px] p-1 text-sm rounded" key={tag}> {tag}</p>
          )
        )}
      </div>
    </div>
  );
};

export default WidgetTags;
