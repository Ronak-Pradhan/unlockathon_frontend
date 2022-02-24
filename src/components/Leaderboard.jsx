import React, { Component } from 'react'
import UserProvider from '../providers/UserProvider'

import PulseLoader from 'react-spinners/PulseLoader';
import { css } from "@emotion/core";

import CustomPagination from './Pagination';


const override = css`
  display: block;
  text-align: center;
  border-color: red;
  background: linear-gradient(308deg,#d34020,#3b2ee7);
  margin-top:25px;
`;

export default class Leaderboard extends Component
{

    constructor(props)
    {
        super(props);
        this.state={
            fetching:true,
            leaderboard:[],
            page:1
        }
        this.NUMBER_OF_ITEMS=10;
    }

    componentDidMount()
    {
        fetch('/api/leaderboard')
        .then((res)=>res.json())
        .then((data)=>{
            this.setState({
                leaderboard:data.leaderboard,
                fetching:false
            })
        })
        .catch((err)=>console.log(err));
        

    }

    change_page(page)
    {
        this.setState({page:page})
    }

    render_leaderbord()
    {
        if(this.state.fetching)
        {
            return(
                <PulseLoader css={override}/>
            );
        }

        else
        {
            let leaderboard=this.state.leaderboard.map((topper,index)=>{
                if (topper.registration_number!==this.context.registration_number)
                {
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            {/* <td>{topper.first_name} {topper.last_name}</td> */}
                            <td>{topper.registration_number}</td>
                            <td>{topper.points}</td>
                        </tr>
                    );
                }
                else
                {
                    
                    return(
                        <tr className="table-danger" key={index}>
                            <td>{index+1}</td>
                            {/* <td>{topper.first_name} {topper.last_name}</td> */}
                            <td>{topper.registration_number}</td>
                            <td>{topper.points}</td>
                        </tr>
                    );
                }
            });

            leaderboard=leaderboard.slice((this.state.page-1)*this.NUMBER_OF_ITEMS,(this.state.page-1)*this.NUMBER_OF_ITEMS+this.NUMBER_OF_ITEMS);

            return(
                <div className="table-responsive">
                <table className="table">
                    
                    <thead className="thead-light">
                              <tr>
                                    <th scope="col">Rank</th>
                                    {/* <th scope="col">Name</th> */}
                                    <th scope="col">Registration Number</th>
                                    <th scope="col">Points</th>
                              </tr>
                    </thead>

                    <tbody>
                        {leaderboard}
                    </tbody>
                    
                </table>
                <div className="text-center">
                                <CustomPagination changePage={this.change_page.bind(this)} page={this.state.page} number_of_pages={this.state.leaderboard.length/this.NUMBER_OF_ITEMS}/>
                            </div>
                
                </div>

            );

        }
    }

    reloadLeaderboard()
    {
        
        this.setState({
            fetching:true,
            leaderboard:[]
        },()=>{
            fetch('/api/leaderboard')
            .then((res)=>res.json())
            .then((data)=>{
                this.setState({
                    leaderboard:data.leaderboard,
                    fetching:false
                });

                



                
            })
            .catch((err)=>console.log(err));
        })
    }


    render()
    {
        return(
            <div id="main" className="mt-4">
                <div className="container">
                    <div className="row">
                        {/* <!-- <div className="col-lg-2 col-md-2"></div> --> */}
                        <div className="col-12 text-center">
                        <div className="question-back text-center" style={{opacity: 0.7}}>
                            <button className="btn btn-primary float-right" onClick={()=>this.reloadLeaderboard()}><span>&#8634;</span></button>
                            {this.render_leaderbord.bind(this)()}
                            
                        </div>
                        
                           
                        </div>
                        
                            
                    </div>
                    
                           
                  
                </div>
                    
            </div>
        )
    }
}
Leaderboard.contextType=UserProvider;