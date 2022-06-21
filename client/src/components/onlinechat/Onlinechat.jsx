import "./onlinechat.css";
export default function Onlinechat(){
  return (
    <div className="onlinechat">
      <div className="onlinechatFri">
        <div className="imgContainer" >
          <img
          className="ocImg"
          src="https://images.unsplash.com/photo-1589661654496-f5222b481fe0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
          <div className="ocBadge"></div>
        </div>
        <span className="onlinechatName">Jin</span>
      </div>
    </div>

  )
}