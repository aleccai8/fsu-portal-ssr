import React, {PureComponent} from 'react';
import View from "./View"


class Error401 extends PureComponent{

    constructor(props){
        super(props);
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


export default Error401;