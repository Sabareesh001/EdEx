import React, { useEffect, useState } from "react";
import './comments.css';
import profilePic from '../assets/icons/man.png'
import Like from '../assets/icons/heart.png'
import RedLike from '../assets/icons/red-heart.png'
import WriteReply from "./writeReply";
import Reply from "./reply";
import axios from "axios";
import Moment from "moment";
const api_host = import.meta.env.VITE_API_HOST
function comments({user,comment,datetime,like_count,getComments,profilePicture,id,sessionUserId,userId}){
    const [profile,setProfile] = useState(profilePic)
    const [liked,setLiked]=useState(Like)
    const [toggleReply,setToggleReply]=useState(false)
    const [toggleWriteReply,setToggleWriteReply]=useState(false)
    const [replies,setReplies]=useState([])
    useEffect(()=>{
        
      axios.get(`${api_host}/checkLikedGlobalComment`,{
        params:{
            id:id,
            userId:sessionUserId
        }
      }).then((response)=>{
        console.log(response.data)
        if(response.data === true){
            setLiked(RedLike)
        }
        else{
            setLiked(Like)
        }
      })
      getReplys()
    },[id,sessionUserId])
    useEffect(()=>{
      console.log(profilePicture)
      if(profilePicture !== "nil"){
        setProfile(api_host+"/"+profilePicture)
      }
      
    },[profilePicture])
    async function handleLike(){
         if(liked===Like){
            await axios.patch(`${api_host}/addGlobalCommentLike`,{id:id,userId:sessionUserId})
            setLiked(RedLike)
         }
         else{
            await axios.patch(`${api_host}/removeGlobalCommentLike`,{id:id,userId:sessionUserId})
            setLiked(Like)
         }
         getComments()
    }
    function toggleReplyFun(){
        
    setToggleReply((prev)=>!prev)
    }
    function toggleWriteReplyFun(){
       setToggleWriteReply((prev)=>!prev)
    }
    async function getReplys(){
        await axios.get(`${api_host}/globalCommentReplies`,{
            params:{
                comment:id,
                reply:null
            }
        }).then((res)=>{
          setReplies(res.data)  
        })
    }
    Moment.locale('en', {
        relativeTime: {
          future: 'in %s',
          past: '%s',
          s:  '%ds',
          ss: '%ds',
          m:  '%dm',
          mm: '%dm',
          h:  '%dh',
          hh: '%dh',
          d:  '%dd',
          dd: '%dd',
          M:  '%dm',
          MM: '%dM',
          y:  '%dY',
          yy: '%dY'
        }
      });
return(
    <div className="comment">
        <div className="profileAndComment">
        <a style={{color:"white",display:'flex',alignItems:"center",gap:"10px"}} href={`http://${window.location.host}/user?id=${userId}`} >
        <img style={{borderRadius:"100px"}} height={"30px"} width={"30px"} src={profile}></img>
       </a>
        <div>
        <a style={{color:"white",display:'flex',alignItems:"center",gap:"10px"}} href={`http://${window.location.host}/user?id=${userId}`} >
            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <p style={{fontWeight:"bold"}}>{user}</p>
            <p>·</p>
        <p>{datetime}</p>
            </div>
            </a>
        <p>{comment}</p>
        </div>

        </div>
        <div style={{display:"flex",alignItems:"center",gap:"50px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
        
        <img onClick={handleLike} height={"10px"} width={"10px"} src={liked}></img>
        <p>{like_count}</p>
        </div>
        {replies.length!=0&&<p onClick={toggleReplyFun} style={{color:"white",backgroundColor:"rgb(53, 0, 128,0.2)",padding:"2px 4px",borderRadius:"5px"}}>see Replies</p>}
        <p onClick={toggleWriteReplyFun} style={{color:"white",backgroundColor:"rgb(0, 58, 173,0.2)",padding:"2px 4px",borderRadius:"5px"}}>Reply</p>
        </div>
        <div className="ReplySection">
        {   toggleWriteReply&&<WriteReply setToggleReply={setToggleReply} setToggleWriteReply={setToggleWriteReply} getReplys={getReplys} comment_id={id} id={id} userId={sessionUserId}></WriteReply>
           
        }
        {
             toggleReply&&<>
             
             {replies.map((data)=>(<><div style={{ width: "100%", borderBottom: "0.5px solid grey" }}></div><Reply profilePicture={data.profilePic}  sessionUserId={sessionUserId} like_count={data.like_count} getReplyInfoForComponent={getReplys} id={data.id} user={data.username} userId={data.userId} datetime={Moment(data.datetime).fromNow()} reply={data.reply}></Reply></>))}
             </>
        }
        {
          console.log(replies)
        }
        </div>
     
        

    </div>
)
}

export default comments;