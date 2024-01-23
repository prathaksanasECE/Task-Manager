const Input=document.querySelector(".Input");
const todoButton = document.querySelector(".todo-button");
const todolist=document.querySelector(".todolist");
const filter=document.querySelector(".filter");

//eventlistners
document.addEventListener("DOMContentLoaded",getodo);
todoButton.addEventListener("click", addTodo);
todolist.addEventListener("click",delcheck);
filter.addEventListener("click",Filter);

function addTodo(event){
    event.preventDefault();
    
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("tododiv");

    const newtodo=document.createElement("li");
    newtodo.innerText=Input.value;
    newtodo.classList.add("todoitem");

    //append
    todoDiv.appendChild(newtodo);

    const compl=document.createElement("button");
    compl.classList.add("compl");
    compl.innerHTML='<i class="fas fa-check"></i>';
    todoDiv.appendChild(compl);

    const delbutton=document.createElement("button");
    delbutton.innerHTML='<i class="fas fa-trash"></i>';
    delbutton.classList.add("delbtn");
    todoDiv.appendChild(delbutton);
   

    todolist.appendChild(todoDiv);


    //localstorage

    savetolocal(Input.value);

    //clear input val
    Input.value="";
}

function delcheck(e){
    let item=e.target;
    //delete
    if(item.classList[0]==="delbtn"){
        const del=item.parentElement;
        removelocal(del);
        del.remove();
    }

    //checkamrk
    
    if(item.classList[0]==="compl"){
        const check=item.parentElement;
        check.classList.toggle('completed');
    }

   
}

function Filter(e){
    
    const todo=todolist.childNodes;
    todo.forEach(function(dos){
        switch(e.target.value){
            case "all":
                dos.style.display='flex';
                break;
            case "completed":
                if(dos.classList.contains("completed")){
                    dos.style.display="flex";
                }
                else{
                    dos.style.display="none";
                }
                break;
             case "pending":
           
                if(!dos.classList.contains("completed")){
                    dos.style.display="flex";
                }
                else{
                    dos.style.display="none";
                }
                break;
        }
    })

    }

    function savetolocal(todo){
        let todoset;
        if(localStorage.getItem("todoset")===null){
            todoset=[];
        }
        else{
            todoset=JSON.parse(localStorage.getItem("todoset"));

        }
        todoset.push(todo);
       localStorage.setItem("todoset",JSON.stringify(todoset))
    }

    function getodo(){
        let todoset;
        if(localStorage.getItem("todoset")===null){
            todoset=[];
        }
        else{
            todoset=JSON.parse(localStorage.getItem("todoset"));

        }

        todoset.forEach(function(todo)
        {
            const todoDiv=document.createElement("div");
    todoDiv.classList.add("tododiv");

    const newtodo=document.createElement("li");
    newtodo.innerText=todo;
    newtodo.classList.add("todoitem");

    //append
    todoDiv.appendChild(newtodo);

    const compl=document.createElement("button");
    compl.classList.add("compl");
    compl.innerHTML='<i class="fas fa-check"></i>';
    todoDiv.appendChild(compl);

    const delbutton=document.createElement("button");
    delbutton.innerHTML='<i class="fas fa-trash"></i>';
    delbutton.classList.add("delbtn");
    todoDiv.appendChild(delbutton);
   

    todolist.appendChild(todoDiv);})
    }

    function removelocal(todo){
        let todoset;
        if(localStorage.getItem("todoset")===null){
            todoset=[];
        }
        else{
            todoset=JSON.parse(localStorage.getItem("todoset"));

        }

        const name=(todo.children[0].innerText);
        todoset.splice(todoset.indexOf(name),1);
        localStorage.setItem("todoset",JSON.stringify(todoset))
    }