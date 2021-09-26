import React, {useState} from 'react';
import Feed from './Feed.jsx';
import Archive from './Archive.jsx';
import "./css/tabs.css"


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
      {/* Tab nav */}
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
