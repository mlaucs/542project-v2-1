import React, { Component, useEffect } from 'react';
//import { Button, Form, Input, Container } from "semantic-ui-react";
import {Form, Toast, Button, Card, Col} from 'react-bootstrap';
import './Problem.css';
import { Redirect } from 'react-router-dom';

class AddProblem extends Component {
    state = { 
        questionNo: 0,
        question: '',
        description: '',
        answer:'',
        note:'',
        importance:'',
        category:'',
        sub_category:'',
        lastReviewDate:'',
        isAdded: undefined
    };

    onChange = event =>{
        const {name, value} = event.target;
        this.setState({
            [name]:value
        });
    }

    onSubmit = async() =>{
        const p = this.state;
        const response = await fetch('/problem/add',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(p)
        });
        //console.log(response);
        if (response.ok){
            console.log("data is added");
            this.setState({
                isAdded : true
            });
        }
    };

    onSubmitTest = async() =>{
        const p = this.state;
        console.log(p);
    };


    render() { 
        const {
            questionNo,
            question,
            description,
            answer,
            note,
            importance,
            category,
            sub_category,
            lastReviewDate
        } = this.state;

        const isAdded = this.state.isAdded;
        if (isAdded === true) {
            return (
                <div>
                    <Redirect to='/problem/all' />
                </div>
            );
        }

        return (  
            <Card body>
                <Form>
                    <Form.Group controlId="question">
                        <Form.Label>Question</Form.Label>
                        <Form.Control as="textarea" rows={1} placeholder="Question" name="question" onChange={this.onChange} value={question}/>
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Question Description</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Question Description" name="description" onChange={this.onChange} value={description}/>
                    </Form.Group>

                    <Form.Group controlId="answer">
                        <Form.Label>Answer</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Answer" name="answer" onChange={this.onChange} value={answer}/>
                    </Form.Group>

                    <Form.Group controlId="note">
                        <Form.Label>Note</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Note" name="note" onChange={this.onChange} value={note}/>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="importance">
                            <Form.Label>Importance</Form.Label>
                            <Form.Control type="text" placeholder="Importance (1-10)" name="importance" onChange={this.onChange} value={importance}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Category" name="category" onChange={this.onChange} value={category}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="sub_category">
                            <Form.Label>Sub Category</Form.Label>
                            <Form.Control type="text" placeholder="Sub Category" name="sub_category" onChange={this.onChange} value={sub_category}/>
                        </Form.Group>
                        
                        {/* <Form.Group as={Col} controlId="lastReviewDate">
                            <Form.Label>Last Review Date</Form.Label>
                            <Form.Control type="text" placeholder="Last Review Date" name="lastReviewDate" onChange={this.onChange} value={lastReviewDate}/>
                        </Form.Group> */}
                    </Form.Row>

                    <Button variant="primary" onClick={this.onSubmit}>
                        Submit
                    </Button>

                </Form>
            </Card>
        );
    }
}
 

export default AddProblem;