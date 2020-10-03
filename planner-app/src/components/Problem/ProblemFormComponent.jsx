import React, { Component } from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import Moment from 'moment';

class ProblemFormComponent extends Component {

    constructor(props) {
        super(props);
        // this.state = { 
        //     description: 'fake description',
        //     answer: '1+1=2',
        //     hint: 'math 101',
        //     note: 'the math you leanred when you were 3',
        //     importance: '1',
        //     category: 'math101',
        //     sub_category: 'elementery',
        //     review_date: '09/03/1994',
        //     mode: '',
        //     showAnswer: false,
        //     showHint: false
        //  }
        this.state = { 
            description: 'fake description',
            answer: '1+1=2',
            hint: 'math 101',
            note: 'the math you leanred when you were 3',
            importance: '1',
            category: 'math101',
            sub_category: 'elementery',
            review_date: '09/03/1994',
            mode: '',
            showAnswer: false,
            showHint: false
         }
        this.toggleContent = this.toggleContent.bind(this);
      }

      toggleContent(ctrl){
        if(ctrl == 'a'){
            this.setState({ showAnswer: !this.state.showAnswer });
        }
        if(ctrl == 'n'){
            this.setState({ showHint: !this.state.showHint });
        }
      }


     componentDidMount(){
        let pageMode = 'unknown';
        if (window.location.pathname.includes('/problem/add')){
            pageMode = 'add'
        }
        if (window.location.pathname.includes('/problem/view')){
            pageMode = 'view'
        }
        if (window.location.pathname.includes('/problem/edit')){
            pageMode = 'edit'
        }
        if (window.location.pathname.includes('/problem/review')){
            pageMode = 'review'
        }
        this.setState({
            mode: pageMode
        });
     }

    answerFormControl(answer){
        let a = '';
        const show = (this.state.showAnswer) ? true : false ;
        if(show===true){
            a = answer;
        }
        return <Form.Control as="textarea" rows={3} placeholder="Answer" name="answer" value={a}/>;
    }

    noteFormControl(hint){
        let h = '';
        const show = (this.state.showHint) ? true : false ;
        if(show==true){
            h = hint;
        }
        return <Form.Control as="textarea" rows={3} placeholder="Note" name="note" value={h}/>
    }
     
    renderForm(){
        if (this.props.data){
            var newDate = Moment(new Date(this.props.data.last_review_date * 1000)).format('MM/DD/YYYY hh:MM');
            return (                
                <Form>
                    <Form.Group controlId="question">
                        <Form.Label>Question</Form.Label>
                        <Form.Control as="textarea" rows={1} placeholder="Question" name="question" value={this.props.data.question}/>
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Description" name="description" value={this.props.data.description}/>
                    </Form.Group>
                    
                    <Form.Group controlId="note">
                        <Form.Label><Button variant="outline-info" onClick={e => this.toggleContent('n')}>Note</Button></Form.Label>
                        {this.noteFormControl(this.props.data.note)}
                    </Form.Group>
        
                    <Form.Group controlId="answer">
                        <Form.Label> <Button variant="outline-info" onClick={e => this.toggleContent('a')}>Answer</Button> </Form.Label>
                        {this.answerFormControl(this.props.data.answer)}
                    </Form.Group>
        
                    <Form.Row>
                        <Form.Group as={Col} controlId="importance">
                            <Form.Label>Importance</Form.Label>
                            <Form.Control type="text" placeholder="Importance (1-10)" name="importance"  value={this.props.data.importance}/>
                        </Form.Group>
        
                        {/* <Form.Group as={Col} controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Category" name="category"  value={this.props.data.category}/>
                        </Form.Group> */}
        
                        <Form.Group as={Col} controlId="subCategory">
                            <Form.Label>Sub Category</Form.Label>
                            <Form.Control type="text" placeholder="Sub Category" name="subCategory" value={this.props.data.sub_category}/>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="lastReviewDate">
                            <Form.Label>Last Review Date</Form.Label>
                            <Form.Control type="text" placeholder="Last Review Date" name="lastReviewDate" value={newDate}/>
                        </Form.Group>
                    </Form.Row>
        
                    <Button variant="primary" >
                        Submit
                    </Button>
        
                </Form> );
        }
        else{
            return <p>Loading</p>
        }
    }

    render() { 
        return (                 
            <div>
                {this.renderForm()}
            </div>
        );
    }



}
 
export default ProblemFormComponent;