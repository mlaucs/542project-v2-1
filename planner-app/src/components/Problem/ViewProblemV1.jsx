import React, { Component } from 'react';
import ProblemFormComponent from './ProblemFormComponent';

// not used for now

function renderChildComponent() {
    const {problems} = this.state;

    if (problems) {
        return <ProblemFormComponent data={problems[0]}></ProblemFormComponent>
    }

    return <p>Loading</p>
}

class ViewProblemV1 extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            problems: [],
            problem: undefined,
            isDeleted: undefined,
            openDetailModal: false
         }
        //this.toggleContent = this.toggleContent.bind(this);
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

    render() { 
        return (
            <div>
                {renderChildComponent.call(this)}
            </div>
        );
    }
}
 

export default ViewProblemV1;
