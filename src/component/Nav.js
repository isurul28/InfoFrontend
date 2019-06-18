import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';


class Nav extends Component{
    render(){
        return(
            <div>
                <nav className="blue darken-3">
    <div className="nav-wrapper">
    <a href="/" className="brand-logo center">CoursePortal</a>
     
     
      <ul id="nav-mobile" className="right hide-on-small-only">
        <li><Link to="/"><i className="fas fa-sign-in-alt"></i>  Log In</Link></li>
        <li><Link to="/register"><i className="fas fa-user-plus"></i>  Sign Up</Link></li>
      </ul>
    </div>
   
  </nav>

 
            </div>
        )
    }

}




export default Nav;