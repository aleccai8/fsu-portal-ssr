import React, {PureComponent} from 'react';
import View from "./View"

class Modal extends PureComponent{

    render() {
        return(
            <View
                {...this.state}
                {...this.props}
            />
        )
    }
}

export default Modal