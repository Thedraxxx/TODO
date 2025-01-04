const arrayList = JSON.parse(localStorage.getItem("task"))||[];
//to checkk the if there is task or not in the task div....
function checkifEmpty() {
  const no_task = document.querySelector("#task");
  const message = document.querySelector("#task p");
  const ul = document.querySelector("#task ul");
  if (ul.children.length === 0) {
    if (!message) {
      const newMessage = document.createElement("p");
      newMessage.textContent = `Nothing to do `;
      no_task.appendChild(newMessage);
    }
  } else {
    if (message) {
      message.remove();
    }
  }
}
//to save teh item onto the localstorage
function save_to_localStorage(){
  localStorage.setItem("task",JSON.stringify(arrayList));
}
//function that show teh value whent eh reload occurt
function loadTasks(){
  const ul = document.querySelector("#task ul");
    ul.innerHTML = "";
    arrayList.forEach((item, index) => {
      const newItem = document.createElement("li");
      newItem.textContent = item.task;

      const deleteButton = document.createElement("i");
      deleteButton.className = "fa-solid fa-trash";
      deleteButton.addEventListener("click", function () {
        arrayList.splice(index, 1);
        newItem.remove();
        save_to_localStorage();
        checkifEmpty();
        loadTasks();
      });
      newItem.appendChild(deleteButton);
      ul.appendChild(newItem);
    });
   
    checkifEmpty();
      
   };
   //function to add a task to the list
function addTask() {
  const input_Task = document.getElementById("input_task").value;
  if (input_Task.trim() !== "") {
    arrayList.push({ task: input_Task });
    save_to_localStorage();
    loadTasks();
    document.getElementById('input_task').value = "";
  } else {
    alert("enter a task first");
  }
}
// handels the event listeners 
document.getElementById("icon").addEventListener("click", addTask);
document
  .getElementById("input_task")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
  //for the search terms
 document.querySelector("#search_bar input").addEventListener("input",function(event){
    const searchValue = event.target.value.toLowerCase();
    const tasks = document.querySelectorAll("#task ul li");
    tasks.forEach(item => {
      const taskText = item.textContent.toLowerCase();
      if(taskText.includes(searchValue)){
          item.style.display ="";
      }
      else{
          item.style.display = "none";
      }
      
    });
 })

  loadTasks();
  checkifEmpty();