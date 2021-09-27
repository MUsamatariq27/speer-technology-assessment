import React, {useState} from 'react';
import Feed from './Feed.js';
import Archive from './Archive.js';
import "./Tabs.css"


const Tabs = () => {
    
    const [activeTab, setActiveTab] = useState("feedTab");

    const handleFeed = () => {
        setActiveTab("feedTab");
      };
    const handleArchive = () => {
        setActiveTab("archiveTab");
    };

  return (
    <div className="Tabs">
      
      <ul className="nav">
        <li className={activeTab === "feedTab" ? "active" : ""}   onClick={handleFeed} >Activity Feed</li>
        <li className={activeTab === "archiveTab" ? "active" : ""}  onClick={handleArchive} >Archive</li>
      </ul>
      <div className="outlet">
        
        {activeTab === "feedTab" ? <Feed/> : <Archive/>}
      </div>
    </div>
  );
};
export default Tabs;
