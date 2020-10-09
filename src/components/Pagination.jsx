import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination'

export default class CustomPagination extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            page:this.props.page
        }
    }


    render()
    {
        let items=[];
        for(let i=1;i<=this.props.number_of_pages;i++)
        {
            items.push(
            <Pagination.Item active = {i===this.props.page} onClick={()=>this.props.changePage(i)} key={i}>
                {i}
            </Pagination.Item>)
        }


        return(
            <Pagination className="justify-content-center">
                {items}
            </Pagination>
        );
    }
}