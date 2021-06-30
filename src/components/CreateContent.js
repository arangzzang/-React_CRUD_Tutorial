import React, {Component} from 'react';

class CreateContent extends Component{
    render(){
      return(
        <article>
              <h2>Create</h2>
              <form action="/create_process" method="post"
                onSubmit={function(e){
                  e.preventDefault();
                  //debugger;//debugger를 통해 이벤트에 대한 값을 알 수 있다. f12 -> target -> title, value
                  this.props.onSubmit(
                    e.target.title.value,//name값을 통해 값을 가져오는듯하다.
                    e.target.desc.value
                  );
                  //alert('submit')
                }.bind(this)}
              >
                <p><input type="text" name='title' placeholder='title'></input></p>
                <p><textarea name="desc" placeholder="description"></textarea></p>
                <p><input type="submit"></input></p>
              </form>
          </article>
      );
    }
  }

  export default CreateContent;