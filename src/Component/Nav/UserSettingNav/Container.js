import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import View from "./View"


class UserSettingNav extends PureComponent{

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


export default UserSettingNav;