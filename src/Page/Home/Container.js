import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import View from "./View"
import {getTimeRankData} from "../../Redux/Action/Page/Home";

const mapStateToProps = state =>{
    return {...state.pageData.home};
};

const mapDispatchToProps = dispatch => {
    return{
        getOnlineTimeRank:()=>dispatch(getTimeRankData()),
    }
};

class Home extends PureComponent{

    constructor(props){
        super(props);
    }

     static async asyncData(store) {
        const { getOnlineTimeRank } = mapDispatchToProps(store.dispatch);
         await getOnlineTimeRank();
    }



    componentDidMount() {
        console.log(this);
    }


    componentWillUnmount() {

    }

    render() {
        return (
            <View
                {...this.state}
                {...this.props}
            />
        );
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);