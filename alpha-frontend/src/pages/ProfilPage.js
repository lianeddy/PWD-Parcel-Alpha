import React, { Component } from 'react';
// import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'
import { logoutAction } from '../redux/actions/userAction';
import {connect} from 'react-redux'

class ProfilPage extends Component {
    state = {  }
    render() { 
        const {
            //   username,
            logoutAction} = this.props
        return ( 
            <div>
                ProfilPage
                <div>
                    <Button onClick={logoutAction}>
                        LOGOUT
                    </Button>
                </div>
            </div>
         );
    }
}

const mapStatetoProps = ({ user: { username } }) => {
    return {
      username,
    };
  };
 
export default connect(mapStatetoProps, {logoutAction}) (ProfilPage);