import React, {useEffect, useState} from "react";
import axios from "axios" ;
import Popup from "./Popup.jsx"
import inbound from "./images/inbound.png"
import outbound from "./images/outbound.png"
import dateFormat from 'dateformat';
import "./css/feed.css"
const Feed = () => {

  const [calls, setCalls] = useState(null);
  const [details, setDetails] = useState(false);
  const [callDets, setcallDetails] = useState(null);

  const[loadRef, setLoad] = useState(true); 

  //getting Calls List on load
  if (loadRef === true)
  {
    const getCalls = () => {

      axios("https://aircall-job.herokuapp.com/activities")
      .then( resp => {
        setCalls(resp.data.filter( function (el) {
          return el.is_archived === false;
        }));
        
      })
      .catch(error => {
        console.error("Error Getting Calls!", error);
      })
      setLoad(false);
      return;
    }
    getCalls();
  }
  const handleDetails = (e, call) => {
    
    e.preventDefault();
    setDetails(!details);
    setcallDetails(call);
  };

  const closeDetails = () => {
    setDetails(!details);
    setDetails(null);
  };

  const handleArchive = (call, e) => {
    
    e.preventDefault();

    const url = `https://aircall-job.herokuapp.com/activities/${call.id}`;

    const body = {is_archived: true}
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
    <div className="FeedTab">
       
       { (calls ) ? 

        <div className="callsDisplay">
          <div className="title"> Activity Calls</div>
          {calls && calls.length === 0 ? <div>No Call Activity</div> : null }
          
          { calls.map(call => (
            <div className="callBox" key={call.id} >

              <div className="iconDate"> 

                <div className="date"><p>Date: { dateFormat(call.created_at, "mmmm dS, yyyy ")}</p></div>
                
              </div>
              <div className="desc">
                <div className="callDescrip"> {call.direction === "inbound" ?
                <span>{call.to} {call.call_type} {call.call_type === "missed" || call.call_type === "answered" ?
                <p>call</p> : null } from {call.from}</span> :
                <span>{call.from} 
                {call.type === "answered" ? <p>called</p> : <p>tried to call</p>}  
                {call.to}</span> } 
                </div>
              </div>

              <div className="BottomFields">
                <div className="time"><p> Time: { dateFormat(call.created_at, "hh:mm:ss " )}</p></div>
                <div className="direction"><p> Direction: { call.direction}</p></div>
                <div className="Buttons">
                  <button className="btn" onClick={(e) => handleDetails(e, call)}>Details</button>
                  <button className="btn" onClick={(e) => handleArchive(call, e)} >Archive</button>
                </div>
               
              </div>
              
            </div> ))
          }
        
        </div>
        
        : <div className="error!">Error Getting Calls!</div> 
       }

      {  details && <Popup
      content = {
        <div className = "popupBox">
          <div className="title">Call Details</div>
          <div className="popupcontentBox">
            <div className="popupcontent"><b>Id:</b> {callDets.id}</div>
            <div className="popupcontent"><b>Call Type:</b> {callDets.call_type}</div>
            <div className="popupcontent"><b>Occured:</b> {callDets.created_at}</div>
            <div className="popupcontent"><b>Direction:</b> {callDets.direction}</div>
            <div className="popupcontent"><b>Duration:</b> {callDets.duration}</div>
            <div className="popupcontent"><b>From:</b> {callDets.from}</div>
            <div className="popupcontent"><b>To:</b> {callDets.to}</div>
            <div className="popupcontent"><b>Via:</b> {callDets.via}</div>
          </div>
        </div>
      }
      handleClose={closeDetails}/> }


    </div>
  );
};

export default Feed;