import React, {Component} from 'react';


class TOC extends Component{
    shouldComponentUpdate(newProps, newState){
      console.log('===> TOC render shouldComponentUpdate'
      ,newProps.data//이값을 통해 바뀐값을 알 수 있다.
      ,this.props.data//원래 값을 알수 있다.
      );
      if(this.props.data === newProps.data){
        return false;
      }
      return true;
    }
    render(){//표현식 작성 부분
      var lists = [];
      var data = this.props.data;//여기서 부모 컴포넌트의 porps데이터를 받음
      var i = 0;
      while(i < data.length){//<li key={data[i].id}>데이터를 key형식으로 나타내지 않으면 에러발생함
        lists.push(
          <li key={data[i].id}>
            <a 
              href={"/content/"+data[i].id}
              // data-velue={data[i].id}
              //현재는 속성값 없이 하는방법임.
              onClick={function(id, e){// 속성으로 하는방법은 인자값(id) 빼야함
                e.preventDefault();
                this.props.onChangePage(id);// 속성값이 있게 하려면 e.target.dataset.velue 바꿔야함.
              }.bind(this, data[i].id)}//여기도 마찬가지로 속성으로하는법은 data[i].id 빼야함.
            >{data[i].title}</a>
          </li>)
        i += 1;
      }
      return(
        <nav>
          <ul>
            {lists/* 받은 데이터를 출력함 */}
          </ul>
        </nav>
      );
    }
  }
//alert("testTOC")
//만일 TOC라는 파일에서 혹은 태그에서 사용할 함수나 변수가 있다고 한다면 하단 로직 작성
export default TOC;