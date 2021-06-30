import React, {Component} from 'react';

class Subject extends Component{
    render(){
      console.log("Sub render");//부모 컴포넌트에 존재하는 자식 컴포넌트 갯 수 만큼 불러옴
      return (
        <header>
          <h1><a href='/' onClick={function(e){
            e.preventDefault();         
            this.props.onChangePage();//onChangePage()를 통해 App컴포넌트로 현재 컴포넌트의 함수를 넘겨줌.
          }.bind(this)}>{this.props.title}</a></h1>
          {this.props.sub}
        </header>
      );
    }
  }
  console.log("sub render ex");

  export default Subject;