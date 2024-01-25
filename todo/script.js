let Input=document.querySelector(".In");
let addbutton=document.querySelector(".add");
let maintodo=document.querySelector(".maintodo");
let Filter=document.querySelector(".filter");

addbutton.addEventListener("click",Add);
Filter.addEventListener("click",filterlist);
document.addEventListener("DOMContentLoaded",restoree);

function Add(event){
  event.preventDefault();
  const tododiv=document.createElement("div");
  tododiv.classList.add("tododiv");

  const list=document.createElement("li");
  tododiv.classList.add("todoli");
  list.innerText=Input.value;
  
  const done = document.createElement("button");
  done.innerHTML = '<i class="fas fa-check"></i>';
  done.classList.add("donebutton");
  done.addEventListener("click",donelist);
  
  const trash=document.createElement("button");
  trash.classList.add("trashbutton");
  trash.innerHTML='<i class="fas fa-trash"></i>';
  trash.addEventListener("click",deleted);

  const edit=document.createElement("button");
    edit.classList.add("edited")
    edit.innerHTML='<i class="fas fa-edit"></i>';
    edit.addEventListener("click",edited);
  
  tododiv.appendChild(list);
  tododiv.appendChild(done);
  tododiv.appendChild(trash);
  tododiv.appendChild(edit);

  maintodo.appendChild(tododiv);
  localstorage(Input.value);
  Input.value="";
}

function donelist(e){
  let item=e.target;
  var val=item.parentElement;
  if(item.classList[0]==='donebutton'){
 
  val.classList.add("red");
}
}
function deleted(e){
  let item=e.target;
  var val=item.parentElement;
 if(item.classList[0]==='trashbutton'){
  
  dellocal(val);
  val.remove();
}
}

function edited(e){
  let item=e.target;
  const i=item.parentElement;
    let change=i.children[0].innerText;
    Input.value=change;
    dellocal(i);
    i.remove();
}

function filterlist(e){
  let a=maintodo.childNodes;
  
  a.forEach((ch)=>{
    
   switch(e.target.value){
    
    
    case "all":
     
      ch.style.display="flex";
      break;
      
    case "compl":
      
      if(ch.classList.contains("red")){
        
        ch.style.display="flex";
      }
      else{
      ch.style.display="none";
}
      break;
      
      
    case "pending":
      if(!ch.classList.contains("red")){
        ch.style.display="flex";
       }
      else{
       ch.style.display="none";
        }
      break;
      
     
  }
})

}

function localstorage(e){
  let todo;
  if(localStorage.getItem("todo")===null){
      todo=[];
  }
  else{
    todo=JSON.parse(localStorage.getItem("todo"));
  }
  todo.push(e);
  localStorage.setItem("todo",JSON.stringify(todo));
}

function restoree(){
  let todo;
  if(localStorage.getItem("todo")===null){
      todo=[];
  }
  else{
    todo=JSON.parse(localStorage.getItem("todo"));
  todo.forEach(function(inside){
  const tododiv=document.createElement("div");
  tododiv.classList.add("tododiv");

  const list=document.createElement("li");
  tododiv.classList.add("todoli");
  list.innerText=inside;
  
  const done = document.createElement("button");
  done.innerHTML = '<i class="fas fa-check"></i>';
  done.classList.add("donebutton");
  done.addEventListener("click",donelist);
  
  const trash=document.createElement("button");
  trash.classList.add("trashbutton");
  trash.innerHTML='<i class="fas fa-trash"></i>';
  trash.addEventListener("click",deleted);

  const edit=document.createElement("button");
    edit.classList.add("edited")
    edit.innerHTML='<i class="fas fa-edit"></i>';
    edit.addEventListener("click",edited);
  
  tododiv.appendChild(list);
  tododiv.appendChild(done);
  tododiv.appendChild(trash);
  tododiv.appendChild(edit);

  maintodo.appendChild(tododiv);})
  }
}

function dellocal(val){
  if(localStorage.getItem("todo")===null){
    todo=[];
}
else{
  todo=JSON.parse(localStorage.getItem("todo"));
}

const del=val.children[0].innerText;
todo.splice(todo.indexOf(del),1);
localStorage.setItem("todo",JSON.stringify(todo));
}

