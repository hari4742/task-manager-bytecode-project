import React from 'react';
import './style.css';
import React, { useState } from 'react';

function Navbar(props) {
  return (
    <div id="navBar">
      <h1>To Do List</h1>
      <div id="taskInput">
        <input
          onChange={props.setTaskName}
          placeholder="Enter Task Name"
          type="text"
        />
        <p
          onClick={(el) => {
            props.addTask();
            el.target.previousSibling.value = '';
          }}
        >
          <span className="material-icons">add_task </span>
          Add Task
        </p>
      </div>
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
    inputClass: '',
    taskName: this.props.taskName
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
  handleRename = el => {
    this.setState({ taskName: el.target.value });
    console.log(el.target.value);
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
          onChange={this.handleRename}
          value={this.state.taskName}
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
  listOfTasks = [];
  state = {
    taskList: this.listOfTasks,
    taskName: ''
  };
  handleChange = el => {
    this.setState({
      taskName: el.target.value
    });
    el.preventDefault;
  };
  handleAddTask = () => {
    if (this.state.taskName == '') {
      alert('Please Enter a Task to add.');
      return;
    }
    this.listOfTasks.unshift({
      id: Math.random().toFixed(3) * Math.random().toFixed(3),
      value: this.state.taskName
    });
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
        <Navbar addTask={this.handleAddTask} setTaskName={this.handleChange} />
        <div id="taskContainer">
          {this.state.taskList.map(task => {
            return (
              <Task
                key={task.id}
                taskName={task.value}
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
