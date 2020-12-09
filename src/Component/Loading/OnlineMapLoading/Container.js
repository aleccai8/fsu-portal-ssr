import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import View from "./View"



class OnlineMapLoading extends PureComponent{

    state  = {

    };

    constructor(props){
        super(props);
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


export default OnlineMapLoading;