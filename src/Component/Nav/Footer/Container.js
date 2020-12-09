import React, {PureComponent} from 'react';
import View from "./View"
import {getAvatarApi, logoutApi} from "../../../Api/FSU";
import {loadUserInfo,setUserAvatar} from "../../../Redux/Action/UserInfo";
import {connect} from "react-redux";


class Footer extends PureComponent{

    state = {
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        function footerPosition(){
            $("footer").removeClass("fixed-bottom");
            let contentHeight = document.body.scrollHeight,//网页正文全文高度
                winHeight = window.innerHeight;//可视窗口高度，不包括浏览器顶部工具栏
            if(!(contentHeight > winHeight)){
                //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
                $("footer").addClass("fixed-bottom");
            }
        }
        footerPosition();
        $(window).resize(footerPosition);
        $('html').on('DOMSubtreeModified',()=>{
            footerPosition()
        });

    }


    render() {
        return(
            <View
                {...this.state}
                {...this.props}
            />
        )
    }
}

export default Footer