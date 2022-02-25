import React, { Component } from 'react'
import Events from './Events';
import UserProvider from '../providers/UserProvider'
import PulseLoader from 'react-spinners/PulseLoader';


import { css } from "@emotion/core";
import Swal from 'sweetalert2';


const override = css`
  display: block;
  text-align: center;
  border-color: red;
  margin-top:25px;
`;




export default class Question extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            stuck_open:false,
            hint_open:false,
            fetching:true,
            submitted:false,
            question:'',
            hint:'',
            image:'',
            answer:'',
            message:'',
        }

        this.answerSubmitHandler=this.answerSubmitHandler.bind(this);
        
    }

    componentDidMount()
    {
        fetch(`/api/get_question`)
        .then((res)=>res.json())
        .then((data)=>{
            if(data.question)
            {
                this.setState({
                    question:data.question.question,
                    hint:data.question.hint,
                    image:data.question.image,
                    fetching:false
                })
            }
            else
            {

                this.setState({
                    question:null,
                    hint:null,
                    image:null,
                    message:data.message,
                    fetching:false
                })

            }
        })
        .catch((err)=>console.log(err));
    }

    toggle_stuck()
    {
        this.setState((prev)=>{
            return {
                stuck_open:!prev.stuck_open
            }
        })
    }

    skip()
    {
        if(this.context.skips>0)
        {    Swal.fire({
                title: 'Are you sure you want to skip this question ?',
                text: "You won't get any points for if you do so!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            })
            .then((res)=>{
                if(res.isConfirmed)
                {
                    fetch('/api/skip',{
                        method:'POST',
                        headers:{'X-CSRFToken':this.context.csrf}
                    })
                    .then((resp)=>resp.json())
                    .then((data)=>{
                        if(data.next_question)
                        {
                            let question=data.next_question;
                            this.setState({
                                question:question.question,
                                hint:question.hint,
                                image:question.image
            
                            },()=>{
                                this.context.setSkips(data.skips);
                                this.context.next_question();
                            })
            
            
                        }
            
                        else
                        {
                            console.log(data);
                            this.setState({
                                question:null,
                                hint:null,
                                image:null,
                                message:data.message
                            },()=>{
                                this.context.setSkips(data.skips);
                                this.context.next_question();
                            })
                        }
                    })

                }
            });
        }

        else
        {
            Swal.fire({
                title:'Oops, You do not have enough skips remaining!',
                icon:'error'
            })
        }
        
    }

        

        render_skip()
        {
                if (this.state.stuck_open)
                {
                    return (
                        <form id="skip_form" onSubmit={(event)=>event.preventDefault()}>
                                {/* {%csrf_token%} */}
                    
                        
                            <button className="btn btn-danger" onClick={()=>this.skip()} disabled={this.state.submitted || this.context.skips===0}>
                                
                            <span>{this.context.skips} skips remaining</span>
                            
                            </button>
                        
                        
                        </form>
                    );
                }
                else{
                    return(
                        <div>
                        
                        </div>
                    );
                }
    }

    render_hint()
    {
        if(this.state.hint_open)
        {
            return(
                <div id="hint" >
                    <h4 style={{color: 'black'}}>{this.state.hint}</h4>
                    <br />  
                </div>
            );
        }

        else
        {
            return(
                <div></div>
            );
        }
    }

    answerSubmitHandler(event)
    {
        event.preventDefault();
        this.setState({submitted:true});
        let data=new FormData();

        data.append('answer',event.target.ans.value);

        fetch('/api/check_answer',{
            method:'POST',
            body:data,
            headers:{'X-CSRFToken':this.context.csrf}
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.status==='correct')
            {
                
                
                Swal.fire({
                    title:'Correct Answer!',
                    icon:'success',

                })
                .then(()=>{
                    if(data.next_question!=null)
                    {
                        this.context.next_question();
                        this.context.update_points(data.points);

                        this.setState({
                            question:data.next_question.question,
                            hint:data.next_question.hint,
                            image:data.next_question.image,
                            answer:'',
                            submitted:false
                        })
                    }

                    else
                    {
                        this.context.next_question();
                        this.context.update_points(data.points);

                        this.setState({
                            question:null,
                            hint:null,
                            image:null,
                            answer:null,
                            message:data.message,
                            submitted:false
                        })
                    
                    }

                })
                
                
            }
            else if(data.status==='wrong')
            {
                Swal.fire({
                    title:'Wrong Answer!',
                    icon:'error',
                })
                this.setState({submitted:false});
            }
            else
            {
                Swal.fire({
                    title:data.status,
                    icon:'warning',
                    footer:'Please contact the organizers to report the error'
                })
            }
        })
        .catch((err)=>console.log(err));

    }

    button_text()
    {
    
            if(this.state.submitted) return (<span>CHECKING</span>);
            else return (<span>SUBMIT</span>);
    }

    render_question()
    {
        if(!this.state.fetching)
        {
            if(this.state.question)
            {    
                return(
                    <React.Fragment>
                    <div className="question">
                    <h2>Level {this.context.current_question} </h2>
                    <p style={{fontSize: '22px', textAlign: 'center', width: '100%', height: '20%', overflowWrap: 'break-word',WordWrap: 'break-word', hyphens: 'auto', padding: '10px'}}>{this.state.question}</p>
                    <br/>
                    
                    <img src={this.state.image} height='300' width='400' alt=''/>
                        
                                                
                    </div>
                    <center>
                                    
                    <button className="button mt-2" onClick={()=>this.setState({hint_open:!this.state.hint_open})}>HINT</button>
                    {this.render_hint.bind(this)()}
                    
                    </center>
                    <div className="answer">
                            <div className="ans">
                                <h2>Answer</h2>
                            </div>
                            <form method="POST" id="answer_form" onSubmit={this.answerSubmitHandler}>
                                    
                                    <div className="form-group field col-lg-12">
                                    <input onChange={(event)=>this.setState({answer:event.target.value})} value={this.state.answer} type="text" className="form-control" id="answer" placeholder="Enter Answer" name="ans"/>
                                </div>
                                <button  disabled={this.state.answer.length===0 || this.state.submitted} className="btn btn-info" type="submit" name="submit" value="SUBMIT">{this.button_text.bind(this)()}</button>
                            </form>
                                            
                                    {/* <!-- <button type="submit" className="btn btn-default" ><b>Submit</b></button> --> */}
                    </div>
                    <center>
                        <p className="btn btn-primary mt-2" onClick={()=>this.toggle_stuck.bind(this)()}>Stuck?</p>
                        {this.render_skip.bind(this)()}
                    </center>
                    </React.Fragment>
            
                );
            }

            else
            {
                return(
                    <div className="question">
                        <h2>{this.state.message}</h2>
                        <br/>
                    </div>
                );
            }
        }

        else
        {
            return (
                <div>
                    <PulseLoader css={override}/>

                </div>
            );
        }
    }
    render()
    {
        return(
                <div id="main">
                <div className="container-fluid">
                    <div className="row row1">
                        {/* <!-- <div className="col-lg-2 col-md-2"></div> --> */}
                        <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                        <div className="question-back" >
                            {this.render_question.bind(this)()}
                        </div>
                           
                        </div>
                    <div className="col-lg-1 col-md-1"></div> 
                        <Events/>
                
                            
                    </div>
                </div>    
            </div>
            );

    }
}

Question.contextType=UserProvider;