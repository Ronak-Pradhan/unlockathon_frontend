import React, { Component } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import { css } from "@emotion/core";
import {Switch,Route} from 'react-router-dom'


import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/home.css';
import './assets/others.css'

import Navbar from './components/Navbar'
import Question from './components/Question';
import Leaderboard from './components/Leaderboard'
import Contactus from './components/Contactus';
import Rules from './components/Rules';

import UserProvider from './providers/UserProvider';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';





export default class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            loading:true,
            first_name:'',
            last_name:'',
            registration_number:'',
            email:'',
            phone:'',
            points:'',
            current_question:'',
            skips:'',
            csrf:this.getCookie('csrftoken')

        }

        this.go_to_next_question=this.go_to_next_question.bind(this);
        this.update_points=this.update_points.bind(this);
        this.setSkips=this.setSkips.bind(this);
    }

    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    componentDidMount()
    {
        fetch('/api/get_logged_in_user')
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({
                first_name:json.first_name,
                last_name:json.last_name,
                registration_number:json.registration_number,
                email:json.email,
                phone:json.phone,
                points:json.points,
                current_question:json.current_question,
                skips:json.skips,
                loading:false,
                next_question:this.go_to_next_question,
                update_points:this.update_points,
                setSkips:this.setSkips

            })
        })
        .catch((err)=>alert(err))
    }

    go_to_next_question()
    {
        this.setState((prev)=>{
            return{
                current_question:prev.current_question+1
            }
        })
    }

    update_points(points)
    {
        this.setState({points:points});
    }

    setSkips(skips)
    {
        this.setState({skips:skips});
    }



    render()
    {
        const override = css`
        position: fixed;
        z-index: 999;
        height: 2em;
        width: 2em;
        overflow: visible;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
`;
        if (!this.state.loading){
            return(
                    <UserProvider.Provider value={this.state}>
                        <Navbar/>
                        <Switch>
                            <Route exact path="/game/" render={(props)=><Question {...props}/>}/>
                            <Route exact path="/game/leaderboard" render={(props)=><Leaderboard {...props}/>} />
                            <Route exact path="/contactus" render={(props)=> <Contactus/>}/>
                            <Route exact path="/game/rules" render={()=><Rules/>}/>
                            <Redirect to="/game/"/>
                        </Switch>
                    </UserProvider.Provider> 
                    
            );
        }

        return(
            
          <div css={override}>
            <PuffLoader css={override}
          size={100}
          color={"white"}/>
          </div>

        );
    }
}