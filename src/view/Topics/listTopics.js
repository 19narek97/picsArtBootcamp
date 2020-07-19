import React from "react";
import {ListGroup} from "react-bootstrap";
import classes from "./topics.module.css";
import images from "../../images";
import {notification, Spin} from "antd";
import {Popconfirm} from "antd";

const ListTopics = (props) => {

    const hoverImg = (e,mouse,image,votedByMe) => {
        if(image === "like") {
            if(mouse === "move") {
                e.target.src = !votedByMe ? images.votedByMe : images.unlike;
            }else if (mouse === "out") {
                e.target.src = votedByMe ? images.votedByMe : images.like;
            }
        }else if (image === "delete"){
            if(mouse === "move") {
                e.target.src = images.redDeleteTopic;
            }else if (mouse === "out") {
                e.target.src = images.deleteTopic;
            }
        }
    }

    const onDelete = (id,canDelete) => {
        if(!canDelete){
            notification.info({
                message: `Notification`,
                description: 'You cannot delete this Topic!!',
                placement: "topRight",
            });
        }else{
            props.onDeleteTopic(id);
            notification.info({
                message: `Notification`,
                description: 'You removed this this Topic!!',
                placement: "topRight",
            });

        }
    }

    const topics = props.list.map((el) => {
        return (
            <ListGroup.Item key={Math.random()} className={classes["itemTopic"]} >
                {el.title}
                <span className={`${classes["topics"]} float-right `}>
                    <span className={classes["vote"]}>{el.votingsCount}</span>
                    <img alt='smail' width="25" height="25"
                         onClick={() => props.votedMe(el)}
                         onMouseOver={(e) => hoverImg(e,"move","like",el.votedByMe)}
                         onMouseOut={(e) => hoverImg(e,"out","like",el.votedByMe)}
                         className={`${classes["voteLikeImage"]}`}
                         src={!el.votedByMe ? images.like : images.votedByMe} />
                          <Popconfirm title="Confirm delete" onConfirm={() => onDelete(el.id,el.canDelete)}>
                    <img alt='smail' width="25" height="25"
                                     className={`${classes["voteDeleteImage"]} ml-2`}
                                     onMouseOver={(e) => hoverImg(e,"move","delete",null)}
                                     onMouseOut={(e) => hoverImg(e,"out","delete",null)}
                                     src={images.deleteTopic} />
                          </Popconfirm>
                </span>
            </ListGroup.Item>
        )
    })

    return (
        <ListGroup className={classes["listTopics"]} >
            {props.isLoading ? <Spin /> : topics}
        </ListGroup>
    )
}

export default ListTopics