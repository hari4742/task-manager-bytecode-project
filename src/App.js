import React from 'react';
import './style.css';

function Navbar(props) {
  return (
    <div id="navBar">
      <h1>To Do List</h1>
      <p onClick={props.addTask}>
        <span className="material-icons">add_task </span>
        Add Task
      </p>
    </div>
  );
}




class Task extends React.Component {
  isDone = true;
  state = {
    checkMarkStyle: {
      display: 'none'
    },
    checkStyle: { backgroundColor: 'red' },
    checkContent: 'close',
    toolTipContent: 'Mark as Done',
    inputClass: ''
  };
  markDone = () => {
    if (this.isDone) {
      this.setState({
        checkContent: 'check_circle_outline',
        checkStyle: { backgroundColor: '#54ca7d' },
        toolTipContent: 'Mark as Undone',
        inputClass: 'taskDone'
      });
      this.isDone = false;
    } else {
      this.setState({
        checkContent: 'close',
        checkStyle: { backgroundColor: 'red' },
        toolTipContent: 'Mark as Done',
        inputClass: ''
      });
      this.isDone = true;
    }
  };
  displayToolTip = () => {
    this.setState({ checkMarkStyle: { display: 'inline' } });
  };
  hideToolTip = () => {
    this.setState({ checkMarkStyle: { display: 'none' } });
  };
  render() {
    return (
      <div className="tasks">
        <span className="checkToolTip" style={this.state.checkMarkStyle}>
          {this.state.toolTipContent}
        </span>
        <span
          style={this.state.checkStyle}
          onClick={this.markDone}
          onMouseOver={this.displayToolTip}
          onMouseOut={this.hideToolTip}
          className="material-icons check"
        >
          {this.state.checkContent}
        </span>
        <input
          type="text"
          className={this.state.inputClass}
          placeholder="Enter Task"
        />
        <span onClick={this.props.onDelete} className="material-icons delete">
          delete
        </span>
      </div>
    );
  }
}



// App Component

export default class App extends React.Component {
  listOfTasks = [0];
  state = {
    taskList: this.listOfTasks
  };
  handleAddTask = () => {
    this.listOfTasks.unshift(
      Math.random().toFixed(3) * Math.random().toFixed(3)
    );
    this.setState({
      taskList: this.listOfTasks
    });
  };
  handleDelete = id => {
    this.listOfTasks.splice(this.listOfTasks.indexOf(id), 1);
    this.setState({
      taskList: this.listOfTasks
    });
  };
  render() {
    return (
      <div id="appContainer">
        <Navbar addTask={this.handleAddTask} />
        <div id="taskContainer">
          {this.state.taskList.map(task => {
            return (
              <Task
                key={task}
                onDelete={() => {
                  this.handleDelete(task);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
