import React, {Component} from 'react';

class Control extends Component{
    render(){
      console.log("Control render");
      return (
        <ul>
          <li><a href="/create" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('create');
          }.bind(this)}>create</a></li>
            {/* this.props.onChangeMode(실행되는 함수의 인자)
                여기서 보내는 인자값을 App.js 하위컴포넌트가 _mode로 받아 실행한다
            */}
          <li><a href="/update"onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('update');
          }.bind(this)}>update</a></li>
          
          <li><input onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('delete');
          }.bind(this)} type='button' value='delete'></input></li>
        </ul>
      );
    }
  }

  export default Control;