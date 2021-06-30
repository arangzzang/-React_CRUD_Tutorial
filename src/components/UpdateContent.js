import React, {Component} from 'react';

class UpdateContent extends Component{
  constructor(props){
    super(props);
    this.state = {
      //update를 하기위해선 식별자가 필요함.
      id : this.props.data.id,
      title:this.props.data.title,
      desc:this.props.data.desc
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value})//이렇게하면 onChange함수를 매번 안써줘도 되지만 title값이 바뀌면 다같이 바뀌므로 title -> [e.target.name]으로 변경
    //이건 최신화된 리액트의 기술
  }
  render(){
    console.log(this.props.data);
    console.log('UpdateContent render')
    return(
      <article>
            <h2>Update</h2>
            <form action="/create_process" method="post"
              onSubmit={function(e){
                e.preventDefault();
                //debugger;//debugger를 통해 이벤트에 대한 값을 알 수 있다. f12 -> target -> title, value
                this.props.onSubmit(
                  this.state.id,
                  this.state.title,//name값을 통해 값을 가져오는듯하다.
                  this.state.desc
                );
                //alert('submit')
              }.bind(this)}
            >
              <input type="hidden" name="id" value={this.state.id}></input>
              <p>
                <input
                  type="text" 
                  name='title' 
                  placeholder='title'
                  value={this.state.title}//이것만 있으면 경고문구가 생김 props를 직접 value(변수)에 넣고 
                  //onChange라고 하는 핸들러를 사용하지않으면 리드온리가 된다는 경고창이뜸.
                  //현재 props의 데이터는 리드온리상태임.
                  onChange={this.inputFormHandler}
                  ></input>
              </p>
              <p><textarea 
                  onChange={this.inputFormHandler}
                  name="desc" 
                  placeholder="description"
                  value={this.state.desc}></textarea></p>
              <p><input type="submit"></input></p>
            </form>
        </article>
    );
  }
}

  export default UpdateContent;