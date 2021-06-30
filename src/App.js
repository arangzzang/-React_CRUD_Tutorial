//import logo from './logo.svg'; // eslint-disable-next-line 사용하지 않는 파일은  is defined but never used  no-unused-vars 이런에러 발생시킴
import './App.css';
import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Control from "./components/Control";
import Subject from "./components/Sub";

class App extends Component{
  constructor(props){//state값 초기화시키고 초기의 값으로 <Subject>이 태그를값들을 셋팅함.
    super(props);//어떤 컴포넌트가 실행될 때, render()라는 함수보다 먼저 실행되면서 그 컴포넌트를 초기화시켜주고 싶은 코드는 constructor안에다가 코드를 작성한다
    this.max_content_id = 3;
    this.state={//state정리 : App이라는 클래스는 내부적으로 사용할 상태는 state라는 형태를 통해 사용한다
      mode:'welcome',
      selected_content_id:2,//content중 2번이 선택되게 할려고함.
      subject:{title:'WEBserver', sub:'World Wide Web!'},
      welcome:{title: 'Welcome',desc:'Hello, React!!'},
      contents:[//data가 여러항목이 들어갈땐 이런식으로 만듬.
        {id:1,title:'HTML',desc:'HTML is for information'},
        {id:2,title:'CSS',desc:'CSS is for information'},
        {id:3,title:'JavaScript',desc:'JavaScript is for information'}
      ]
    }
  }
  getReadContent(){//점심시간이라 졸리심
    var i = 0;//filter?
      while(i < this.state.contents.length){
        var data = this.state.contents[i]
        if(data.id === this.state.selected_content_id){
          return data;
          break;
        }
        i += 1;
      }
  }
  getContent(){
    var _title, _desc, _article = null;

    if(this.state.mode === 'welcome'){//-----------------state -> welcome
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article=<ReadContent title={_title} desc={_desc}></ReadContent>
    }else if (this.state.mode === 'read'){//-----------------state -> read
      var _content = this.getReadContent();//refactoring함 https://nesoy.github.io/articles/2018-05/Refactoring
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }else if (this.state.mode === 'create'){//-----------------state -> create
      _article = <CreateContent onSubmit={function(_title,_desc){
        // add content to this.state.contents
        console.log(_title,_desc)
        this.max_content_id = this.max_content_id+1;
        //push() 사용1
        // this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc});//이사용법은 권장하지 않는다. 추후 유지/보수에 어려움이있다. 특히 데이터가 많아질 때 성능개선이 굉장히 까다로움
        
        
        //push() 사용2 배열 사용 경우
        // var newContents = Array.from(this.state.contents);
        // newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        
        //assign() 객체 사용 경우
        // var a = {name:'hyeon'};
        // var newContents2 = Object.assign({},{left:1, right:2},a)
        // newContents2.name = 'joKun'
        // console.log(newContents2) -> {left:1, right:2, name:'joKun'}
        
        //concat() 사용
        // var _contents = this.state.contents.concat(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        var _contents = Array.from(this.state.contents);
        _contents.push({id:this.max_content_id, title:_title, desc:_desc})
        this.setState({//push()는 원본을 바꾸고 concat()은 원본을 바꾸지 않는다
          //만일 state값을 추가할시 원본의 값을 건드는 push()보다 concat()을 사용하는것을 권장한다.
          contents:_contents, // push1 -> this.state.contents / concat -> _contents / push2 -> newContents
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    }else if(this.state.mode === 'update'){//-----------------state -> update
      var _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id,_title,_desc){
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc}
              break;
            }
            i+=1;
          }        
          this.setState({
            contents:_contents,
            mode:'read'
          });
        }.bind(this)}></UpdateContent>
      }
    return _article;
  }
  render(){//리액트에선 props,state의 값이 바뀌면 해당되는 컴포넌트의 render함수가 호출되도록 되어있다. 즉, props나 state의 값이 바뀌면 화면이 다시 그려짐.
    // render()는 해당 컴포넌트의 '표현식'
    console.log("App render");
    
    console.log('render App : ', this)// bind1 : 여기서 this는 render()의 컴포넌트 자신을 가르킨다
    return (//App의 하위컴포넌트
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'})
          }.bind(this)}
        ></Subject> 
        {/* <Subject title="React" sub="For UI"></Subject> */}
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)//강제로 문자를 숫자로 바꿔줌.
            });
          }.bind(this)}
          data={this.state.contents}/* content라는 state를 data라는 이름으로 자식 컴포넌트로 보냄 */
        ></TOC>
        <Control onChangeMode={function(_mode){//onChangeMode라는 이벤트를 컴포넌트에 정의함
          if(_mode === 'delete'){
            if(window.confirm('really??')){
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);
                  break;
                }
                i += 1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
            }
            alert('delete!')
          }else{
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}//이벤트가 실행됬을때 실행되어야 하는 이벤트를 핸들러라고도 함.
        ></Control>
        {this.getContent()}
      </div>
    )
  }
}
//App이라는 Componente는 내부적으로 사용할 상태는 state라는 형태를 통해 사용함.
//그렇게 만들어진 state값을 subject의 컴포넌트에porps의 값으로 넘겨줌
//상위 컴포넌트인 App이 하위 컴포넌트로 전달 할 때는 상위컴포넌트의 state값을 하위컴포넌트에 props의값으로 전달하는것은 얼마든지 가능하다

console.log("App render ex");//jsx문법 바깥에 있는 스크립트문법이 가장 먼저 실행된다.



export default App;

//함수형 형식
// function App() {
//   return (
//     <div className="App">
//       <Subject title="WEB" sub="world wide web!"></Subject>
//       <Subject title="React" sub="For UI"></Subject>
//       <TOC></TOC>
//       <Content></Content>
//     </div>
//   );
// }
// export default App;


//과도기적인 소스 (subject태그)
/* <header>
          <h1><a href='/' onClick={function(e){//React의 href는 해당 HTML로 이동하는 기본적인 속성이있음. -> 리로드된다는 뜻.
            console.log('event in : ',this) // bind2 : 해당 함수에는 this가 존재하지않다 의문점 왜 render()에는 this값이 존재하며 해당 태그 함수에는 왜 this값이 존재하지않는가? 원리가 무엇인가??
            
            console.log(e)
            e.preventDefault()//이 함수를 적용하면 리로드되지않음
            //this.state.mode='welcome'// 이것만 사용 시 2가지의 문제가 있음
            // 문제 1 이벤트가 호출됬을때 실행되는 함수안에서는 this의값이 component 자기 자신을 가르키지않고 아무값도 셋팅되어있지 않다. -> 해결 : 함수가 끝난 직후에 .bind(this)를 해주면된다.(Component를 가르킴)
            // 문제 2 하지만 이런식으로 로직을 짜면 state값이 바뀐걸 React는 알지못함 -> 해결 : this.setState({객체주입})함수 추가
            this.setState({
              mood:'welcome'
            })
          }.bind(this)} >{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header> */