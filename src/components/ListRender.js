import React, { Component} from 'react';

class ListRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editInput : ""
        }
    }

    editInput = (e)=>{// for displaying written
        this.setState({
            editInput : e.target.value
        })
    }

    deleteButton(list, id){ // deletion of a task
        this.props.editTask(list.taskArray.filter(x => x.id !== id));
    }
    
    editButton(list, task){
        // changing submit to false of selected so re-renders to be a form
        list.taskArray.map(x =>(x.id === task.id) ? x.isSubmitted = false : 0);
        // updates in parent state
        this.props.editTask(list.taskArray);
        // sets the new forms input as the task being changed
        this.setState({
            editInput : task.text
        })
        // disables all existing button (dont effect edit forms button)
        const buttons = document.querySelectorAll("button")
        buttons.forEach((btn)=>btn.disabled=true)
    }

    editTask(list, task){
        if(this.state.editInput === "") return false;
        list.taskArray.map(x =>{ // updates input and changes submit to true so list can be rendered
            if(x.id === task.id){
                x.text = this.state.editInput;
                x.isSubmitted = true;
            }
            return 0;
        })

        this.setState({
            editInput : ""
        })
        // update the Parent state
        this.props.editTask(list.taskArray);
        // enables button back
        const buttons = document.querySelectorAll("button")
        buttons.forEach((btn)=>btn.disabled=false)
    }
        
       
    render() {
        const list = this.props.list;
        const taskDisplay = list.taskArray.map((task, index) => { // when renders maps thru all element to display
            if(!task.isSubmitted){
                return(
                    <React.Fragment key={task.id}>
                    <p>{index+1}</p>
                        <form >
                            <input value={this.state.editInput} onChange={this.editInput}/>
                            <button onClick={(e)=>{
                                e.preventDefault()
                                this.editTask(list, task)
                            }}>Edit Task</button>
                        </form>
                    </React.Fragment>
                )
            }
            return(
                <div key={task.id}>
                <p>{index+1}. {task.text}</p>
                <button onClick={()=>this.deleteButton(list, task.id)}>Delete</button>
                <button onClick={()=>this.editButton(list, task)}>Edit</button>
            </div>  
            )
        })
        return (
            <div>
                {taskDisplay}
            </div>
        );
    }
}

export default ListRender;