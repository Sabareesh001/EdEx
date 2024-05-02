import React, { useEffect, useState } from "react";
import './comments.css';
import profilePic from '../assets/icons/man.png'
import Like from '../assets/icons/heart.png'
import RedLike from '../assets/icons/red-heart.png'
import WriteReply from "./writeReply";
import axios from "axios";
import Moment from "moment";
import './reply.css'
const api_host = import.meta.env.VITE_API_HOST
function Reply({user,reply,datetime,like_count,profilePicture,id,sessionUserId,getReplyInfoForComponent,userId,getPrevReply}){
    const [profile,setProfile] = useState(profilePic)
    const [liked,setLiked]=useState(Like)
    const [toggleReply,setToggleReply]=useState(false)
    const [replies,setReplies]=useState([])
    const [toggleWriteReply,setToggleWriteReply]=useState(false)
    useEffect(()=>{
        checkLikedReply()
    
    },[id,sessionUserId])
    useEffect(()=>{
        getReplys()
        if(getPrevReply){
            getPrevReply()
        }
    },[id,liked])
    useEffect(()=>{
       if(profilePicture){
        setProfile(profilePicture)
       }
    },[profilePicture])
    async function checkLikedReply(){
        axios.get(`${api_host}/checkLikedGlobalCommentReplies`,{
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
    }
    async function getReplys(){
        console.log("Im called and "+id)
        await axios.get(`${api_host}/globalCommentReplies`,{
            params:{
                reply:id,
                comment:null
            }
        }).then((res)=>{
            console.log(res.data)
            setReplies(res.data)
        })
    }
    async function handleLike(){
         if(liked===Like){
            await axios.patch(`${api_host}/addLikeGlobalCommentReply`,{id:id,userId:sessionUserId})
            setLiked(RedLike)
         }
         else{
            await axios.patch(`${api_host}/removeLikeGlobalCommentReply`,{id:id,userId:sessionUserId})
            setLiked(Like)
         }
         getReplyInfoForComponent()
        
        
    }
    function toggleWriteReplyFun(){
        setToggleWriteReply((prev)=>!prev)
     }
    function toggleReplyFun(){
        
    setToggleReply((prev)=>!prev)
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
    <div className="reply">
        <div className="profileAndReply">
        <a style={{color:"white",display:'flex',alignItems:"center",gap:"10px"}} href={`http://${window.location.host}/user?id=${userId}`} >
        <img style={{borderRadius:"100px"}} height={"20px"} width={"20px"} src={profile}></img>
        </a>
        <div>
        <a style={{color:"white",display:'flex',alignItems:"center",gap:"10px"}} href={`http://${window.location.host}/user?id=${userId}`} >
            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            
            <p style={{fontWeight:"bold"}}>{user}</p>
            <p>·</p>
        <p>{datetime}</p>
            </div>
            </a>
        <p>{reply}</p>
        </div>
        
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"50px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
        
        <img onClick={handleLike} height={"10px"} width={"10px"} src={liked}></img>
        <p>{like_count}</p>
        </div>
        {
         replies.length!=0&&<p onClick={toggleReplyFun} style={{color:"white",backgroundColor:"rgba(53, 0, 128, 0.2)",padding:"2px 4px",borderRadius:"5px"}}>see Replies</p>
        }
        <p onClick={toggleWriteReplyFun} style={{color:"white",backgroundColor:"rgb(0, 58, 173,0.2)",padding:"2px 4px",borderRadius:"5px"}}>Reply</p>
        </div>
        <div className="replySection">
            {
               toggleWriteReply&&<WriteReply setToggleReply={setToggleReply} setToggleWriteReply={setToggleWriteReply} getReplys={getReplys} id={id} reply_id={id} userId={sessionUserId}></WriteReply>
            }
        {
            toggleReply&&<>
             
            {
               
                replies.map((data)=>(<> <div style={{ width: "100%", borderBottom: "0.5px solid grey" }}></div><Reply profilePicture={api_host+"/"+data.profilePic} userId={userId} user={data.user} like_count={data.like_count} id={data.id} getPrevReply={getReplys} reply={data.reply} sessionUserId={sessionUserId} getReplyInfoForComponent={getReplyInfoForComponent} datetime={Moment(data.datetime).fromNow()}></Reply></>))
            }
            
            </>
        }
        </div>
    
       
        

    </div>
)
}

export default Reply;