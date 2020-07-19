import React from "react";
import { List } from 'antd';
import images from "../../images";
const ListProjects = (props) => {

    const hoverImg = (e,mouse,votedByMe) => {
        if(mouse === "move") {
            e.target.src = !votedByMe ? images.votedByMe : images.unlike;
        }else if (mouse === "out") {
            e.target.src = votedByMe ? images.votedByMe : images.like;
        }
    }

    return (
        <div style={{'margin': '0 auto',
                    'width': '600px',
                    'display': 'block',
                    'height': '500px'}}>
            <List
                itemLayout="horizontal"
                dataSource={props.list}
                renderItem={item => (
                    <List.Item >
                        <List.Item.Meta
                            title={<span>{item.title}
                                        <span className="float-right">
                                            <img  onClick={() => props.votedMe(item)}
                                                  onMouseOver={(e) => hoverImg(e,"move",item.votedByMe)}
                                                  onMouseOut={(e) => hoverImg(e,"out",item.votedByMe)}
                                                  alt='smail' width="25" height="25" src={!item.votedByMe ? images.like : images.votedByMe} style={{cursor:"pointer"}}/>
                                        </span>
                                    </span>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </div>


    )
}

export default ListProjects