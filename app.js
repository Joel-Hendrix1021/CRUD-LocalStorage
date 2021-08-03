
const renderForm=()=>{
    document.querySelector('body').innerHTML = `
    <h1 style="text-align: center;">tasks</h1>
    <div class="container-sm">
        <form id="form" >
            <div class="mb-3">
                <input type="text" name="task" required autofocus class="form-control" placeholder="tasks">
            </div>
            <div class="mb-3">
                <textarea class="form-control" name="description" required placeholder="task description" rows="3"></textarea>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-success" type="submit">Aceptar</button>
            </div>
        </form>
    </div>

    <table class="table table mt-4" style="color: #61DAFB;">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Task</th>
        <th scope="col">Description</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody> 

    </tbody>
  </table>
   
    `
    $tbody = document.querySelector('tbody')
}


let $form 
let $tbody 
let $template 

const formEvent=()=>{
    $form = document.getElementById('form')
    $form.addEventListener('submit', (e)=>{
        e.preventDefault() 
        if(e.target[2].dataset.id){
            updateTask(e.target)
        }else {
            let tasks =[{
                id: getRandom(),
                name : e.target.task.value,
                description: e.target.description.value
            }]
        
            localStorage.setItem(tasks[0].id, JSON.stringify(tasks))
        }
       
        renderTasks()
        e.target.reset()
    })
    
}


const renderTasks=()=>{

    $tbody.innerHTML = ''
    const $frag = document.createDocumentFragment()
    const tasks = Object.keys(localStorage)
    console.log(tasks)
    const $td = $template.content.querySelectorAll('td')
    const $th = $template.content.querySelectorAll('th')
     tasks.forEach((el, index) => {  
         task = JSON.parse(localStorage.getItem(el));
         $th[0].textContent = index + 1
         $td[0].textContent = task[0].name
         $td[1].textContent = task[0].description
         $td[2].dataset.id = task[0].id
         let clone =  document.importNode($template.content, true);
         $frag.appendChild(clone)
     });
     $tbody.appendChild($frag)
}

const getRandom=()=>{
    const random= Math.random(100)
    return random
}

    
$template = document.getElementById('template')

document.addEventListener('click', (e)=>{
  
   if(e.target.id == 'delete'){
      const id =  parseFloat(e.target.parentElement.dataset.id)
       localStorage.removeItem(id)
       renderTasks()
   }else if(e.target.id == 'update'){
       const id =  parseFloat(e.target.parentElement.dataset.id)
       const task =JSON.parse( localStorage.getItem(id))
       editTask(task)
   }
})

const editTask=(task)=>{
    $form[0].value = task[0].name
    $form[1].value = task[0].description
    $form[2].dataset.id = task[0].id
}

const updateTask=(n)=>{
    let task = [{
        id: parseFloat(n[2].dataset.id),
        name: n.task.value,
        description: n.description.value
    }]
    localStorage.setItem(task[0].id, JSON.stringify(task))

}


window.addEventListener('DOMContentLoaded', (event) => {
     
    renderForm()
    renderTasks()
    formEvent()
  
});
