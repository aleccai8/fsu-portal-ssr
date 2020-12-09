import React from 'react'
import style from "./Style.css"
function View(props) {
    return (
        <div className="modal fade" id={props.id}>
            <div className="modal-dialog">
                <div
                    className={"modal-content "+style.functionBox}
                    style={{backgroundColor:"rgb(49, 49, 49)",color:"white",  borderRadius: 0 + "px",marginTop:300 + "px"}}
                >
                    <p
                        style={{fontSize:16 + "px",padding:10+"px"}}
                        className="text-center"
                    >{props.content}</p>
                    <div className="text-center">
                        <button
                            type="button"
                            className="wuhupoo-botton-black"
                            data-dismiss="modal"
                            style={{width:"30%",margin:10 + "px"}}
                        >
                            确定
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default React.memo(View);
