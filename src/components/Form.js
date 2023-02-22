import React, { Component } from 'react';
import ListRender from './ListRender';
import uniqid from "uniqid"

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputMessage : {
                text : "",
                id: uniqid(),// for uniq key in the list
                isSubmitted : true,
            },
            taskArray : [],
            
        }

        this.editTask = this.editTask.bind(this) // for the children component to delete task from main state
    }

    editTask(newTaskArray){
        this.setState({ 
            taskArray : newTaskArray
        })
    }

    
    renderInputDisplay = (event)=>{// displaying everything the user is typing
        this.setState({
            inputMessage: {
                text: event.target.value,
                id: this.state.inputMessage.id,
                isSubmitted : this.state.inputMessage.isSubmitted
            }
        })
    }

    addToTaskArray = (e)=>{
        e.preventDefault();
        // no repeated task or blanks
        const tasks = this.state.taskArray.map(x=>x.text)
        if(this.state.inputMessage.text === "" ||
        tasks.includes(this.state.inputMessage.text)) return false;
        this.state.taskArray.push(this.state.inputMessage);
        this.setState({
            inputMessage: {
                text: "",// empties input bar and prepares new id
                id: uniqid(),
                isSubmitted : this.state.inputMessage.isSubmitted
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <form>
                    <input value={this.state.inputMessage.text} onChange={this.renderInputDisplay}/>
                    <button onClick={this.addToTaskArray}>Add</button>
                </form>
                <ListRender list={this.state} editTask={this.editTask} />
            </React.Fragment>
        );
    }
}

export default Form;