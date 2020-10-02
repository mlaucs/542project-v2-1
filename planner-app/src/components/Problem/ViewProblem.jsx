import React, { Component, useEffect } from 'react';
import './Problem.css';
import {Button, Modal, Form, Col} from 'react-bootstrap';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { FaBookReader } from 'react-icons/fa';
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { Redirect } from 'react-router-dom';
import ProblemFormComponent from './ProblemFormComponent';

function renderChildComponent() {
    const {problem} = this.state;

    if (problem) {
        return <ProblemFormComponent data={problem}></ProblemFormComponent>
    }

    return <p>Loading</p>
}

class ViewProblem extends Component {
    constructor(props){
        super(props);
        this.state = {  
            problems: [],
            problem: undefined,
            updatedProblem: undefined,
            isDeleted: undefined,
            openDetailModal: false
        };
    }


    componentDidMount() {
        fetch('/problem/all')
          .then(response => response.json())
          .then(data => {
            this.setState({ 
                problems: JSON.parse(data)
            });
            //console.log(this.state.problems);
          });
    }

    viewDetail(id){
        const data = this.state.problems.find(p => {
          return p._id.$oid === id
        });
        if(data){
            this.setState({
                openDetailModal: true,
                problem : data
            });
        }
        else{
            this.setState({
                openDetailModal: false,
                problem : null
            });
        }
        //console.log(data);
        // this.state.posts.splice(index, 1);
        // this.setState({posts: this.state.posts});
    }

    closeDetailModal(){
        this.setState({
            openDetailModal: false
        });
    }

    remove(id){
        const url = '/problem/delete/' + id;
        const index = this.state.problems.findIndex(p => {
            return p._id.$oid === id
          });
        this.state.problems.splice(index, 1);
        this.setState({
            problems: this.state.problems
        });
        const response = fetch(url,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
        });
        if (response.ok){
            console.log("data is deleted");
            this.setState({
                isDeleted : true
            });
        }
    }

    render() { 
        const columns = [
            {Header: "Problem Description", accessor: "description"},
            {Header: "Category", accessor: "category"},
            {Header: "Sub Category", accessor: "sub_category"},
            {Header: "Last Review Date", accessor: "review_dates[0]"},
            {
                Header: "Actions",
                filterable: false,
                sortable: false,
                resizable: false,
                Cell: porps =>{
                  return(
                      <div>
                        <Button
                        onClick={(e)=> {
                            this.viewDetail(porps.original._id.$oid);
                        }}><FaBookReader /></Button>

                        <span style={{"paddingLeft": "20px"}} >
                            <Button
                            variant="danger"
                            onClick={(e)=> {
                                this.remove(porps.original._id.$oid);
                            }}><IoMdRemoveCircleOutline /></Button>
                        </span>

                      </div>
                )},
            }
        ];

        let p = this.state.problem;
        let problemModal;
        let answer;
        if(p){
            answer=<div style={{"white-space": "pre-line"}} > {p.answer} </div>;
        }
        if(p){
            problemModal=
            <Modal show={this.state.openDetailModal} size="lg">
                <Modal.Header>
                    <Modal.Title>{p.category} - {p.sub_category}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {renderChildComponent.call(this)}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={(e)=>{ this.closeDetailModal() }}>Close</Button>
                </Modal.Footer>
            </Modal>;
        }


        return ( 
            <div>
                <div style={{
                    "width" : "80%", 
                    "padding": "20px", 
                    "margin":"auto"}} >
                    <ReactTable
                        data={this.state.problems}
                        columns={columns}
                        filterable
                        defaultPageSize={10}> 
                    </ReactTable>
                </div>
                {problemModal}
            </div>
            
         );
    }
}
 
export default ViewProblem;