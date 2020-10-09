import React, { Component } from 'react';
import {Navbar as BootstrapNav} from 'react-bootstrap';
import UserProvider from '../providers/UserProvider'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {NavLink} from 'react-router-dom';

export default class Navbar extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            expanded:false
        }
    }

    toggleNav()
    {
        this.setState((prev)=>{
            return {expanded:!prev.expanded}
        })
    }

    renderUsername(context)
    {
        return (
            <span>
                {context.username}
            </span>
        );
    }
    render()
    {
        return(

            <BootstrapNav sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark" expanded={this.state.expanded} onToggle={()=>this.toggleNav.bind(this)()}>
                <Link to="/game/">
                <BootstrapNav.Brand>ᑌᑎᒪOᑕKᗩTᕼOᑎ </BootstrapNav.Brand>
                </Link>

                <BootstrapNav.Toggle/>
                
                <BootstrapNav.Collapse  style={{float:'right'}} onClick={()=>this.toggleNav.bind(this)()}>
                    
                        <ul className="nav navbar-nav ml-auto navbar-left">
                        <li className="nav-item">
                            <NavLink activeClassName="active" exact to="/game/" className="nav-link">GAME</NavLink>
                        
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active"  exact to="/game/rules" className="nav-link">RULES</NavLink>
                        
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active"  exact to="/game/leaderboard"  className="nav-link">LEADERBOARD</NavLink>
                        
                        </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                        <a  href="/logout"  className="nav-link"  >LOGOUT</a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav ml-auto navbar-right">
                        <li className="nav-item">
                        <a href="/" onClick={(event)=>event.preventDefault()} className="nav-link" >
                            <UserProvider.Consumer>
                                {(context)=><span>YOUR SCORE: {context.points}</span>}
                            </UserProvider.Consumer>
                        </a>
                        </li>
                        {/* <a  href="/" className="nav-link blink" >OTHER EVENTS</a> */}
                        <li className="nav-item">
                        <NavLink activeClassName="active"  exact to="/contactus"  className="nav-link">CONTACT US</NavLink>
                        </li>
                    </ul>
                
           </BootstrapNav.Collapse>


            </BootstrapNav>

        );
    }
}