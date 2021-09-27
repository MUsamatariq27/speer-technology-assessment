import React , {useState, useEffect} from 'react';
import axios from "axios" ;
import dateFormat from 'dateformat';
import "./Archive.css";


const Archive = () => {

  const [calls, setCalls] = useState(null);
  //const [details, setDetails] = useState(false);

  useEffect (() => {
    axios("https://aircall-job.herokuapp.com/activities")
    .then( resp => {
      setCalls(resp.data.filter( function (el) {
        return el.is_archived === true;
      }));
      
    })
    .catch(error => {
      console.error("Error Getting Calls!", error);
    })
  }, []);


  const handleUnArchive = (call, e) => {
    
    e.preventDefault();

    const url = `https://aircall-job.herokuapp.com/activities/${call.id}`;

    const body = {is_archived: false}
    axios.post(url, body)
    .then( resp => {
      console.log(resp)
    })
    .catch(error => {
      console.error("Error Updating Call!", error);
      return;
    })

    const newList = calls.filter((item) => item.id !== call.id);
    setCalls(newList);
    return;
  };


  return (
    <div className="ArchiveTab">

      { (calls ) ? 

      <div className="callsDisplay">
        <div className="title"> ArchiveCalls</div>
        {calls && calls.length === 0 ? <div>No Archived Calls</div> : null }
        
        { calls.map(call => (
          <div className="callBox" key={call.id} >

            <div className="iconDate"> 
              <div className="date"><p>Date: { dateFormat(call.created_at, "mmmm dS, yyyy ")}</p></div>
            </div>
            
            <div className="desc">

              <div className="callDescrip"> {call.direction === "inbound" ?
              <div>{call.to} {call.call_type} {call.call_type === "missed" || call.call_type === "answered" ?
              <div>call</div> : null } from {call.from}</div> :
              <div>{call.from} 
              {call.type === "answered" ? <div>called</div> : <div>tried to call</div>}  
              {call.to}</div> } 
              </div>
            </div>

            <div className="BottomFields">
                <div className="time"><p> Time: { dateFormat(call.created_at, "hh:mm:ss " )}</p></div>
                <div className="direction"><p> Direction: { call.direction}</p></div>
                <div className="Buttons">
                  <button className="btn" onClick={(e) => handleUnArchive(call, e)} >UnArchive</button>
                </div>
            </div>
            
          </div> ))
        }

      </div>

      : <div className="error!">Error Getting Calls!</div> 
      }

    </div>
  );
};

export default Archive;