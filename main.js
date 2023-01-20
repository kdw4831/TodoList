//유저가 값을 입력한다.
// +버튼을 클릭하면 , 할일이 추가된다.
//delete 버튼을 누르면 할일이 삭제된다
//check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
//1. check 버튼을 클릭하는 순간 true  false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3.false이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남탭은 , 끝남 아이템만 , 진행중인탭은 진행중인 아이템만 나온다.
//전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton =document.getElementById("add-button");
let tabs=document.querySelectorAll(".task-tabs div") //조건에 만족하는 모든것을 가지고온다.
let taskList=[];
let mode='all';
let filterList=[]
addButton.addEventListener("click",addTask);

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)});

}

function addTask(){
    
    let task={
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false,
    };
    taskList.push(task);
    console.log(taskList)
    render();
    
}
function filter(event){
    mode=event.target.id
    console.log("클릭됨", event.target.id);
                    //event란 클릭을 했을때 발생되는 모든 상황에대해 알려줌
                    //그중 event.target은 정확한 컴포넌트를 클릭을 할 수 있게 
    filterList=[]     //현재 지역변수가 아니라 전역변수로 선언되어 가능하다. fuck

    document.getElementById("under-line").style.width =event.target.offsetWidth +"px";
    document.getElementById("under-line").style.top =event.target.offsetTop +event.target.offsetHeight+"px";
    document.getElementById("under-line").style.left =event.target.offsetLeft +"px";

    if(mode== "all"){
        render(); 
    }else if(mode=="ongoing"){
        for (let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete==false){
                filterList.push(taskList[i]);
            }
             
        }
        render(); 
        //taskList=filterList taskList로 하면 전체 출력이므로 함수 내에서 
               
                  //taskList를 filterlist로 바꿔준다.하지만 filterlist로 덮어쓰기가되어 값이 안바껴 더이상 
    }else if(mode=="done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete==true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }

}

function render(){
    let list=[];    
    if(mode == "all"){
        list=taskList;
    }else if(mode =="ongoing" || mode=="done"){
        list=filterList;
    }
    let resultHTML=""
    for(let i=0;i<list.length;i++){
            if(list[i].isComplete==true){
            resultHTML +=` <div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }else{
            resultHTML +=` <div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;

        }
    }


    document.getElementById("task-board").innerHTML= resultHTML
}

function toggleComplete(id){
    console.log("id: ",id);
    for(let i=0;i<taskList.length; i++){
        if(taskList[i].id ==id){
            taskList[i].isComplete=!taskList[i].isComplete;
            //현재 가지고 있는 값의 반대 true, false로 넣어주고 check를 했다 안했다 할 수 있는 로직
            break;
        }
    }
    render();
    console.log(taskList)
}

function deleteTask(id){
    
    for (let i=0; i<taskList.length; i++){
        if(taskList[i].id ==id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
    console.log(taskList)
    
   
}

function randomIDGenerate(){
    return '_' +  Math.random().toString(36).substr(2,9);
    // 정보에는 아이디가 필요하다.
}