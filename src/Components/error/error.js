import React from "react";

export const Error = (props) => {
    return (
        <div className="col-sm-4">
                <div style={{margin: "0 auto"}}
                     className="height--1-1 l-flex--col l-flexer soft-quad--sides soft-double--top">
                    <div
                        className="height--1-1 flex flex--column flex-justified--center text--center soft-quad push-quad--top">
                        <img src="https://app.optimizely.com/static/img/p13n/page-list-empty-state.svg"
                             className="anchor--middle push--ends" alt="zxc" width="600"/>
                        <h1 align="center" className="push-half--bottom">{props.msg}</h1>
                    </div>
                </div>
            </div>

    )
}