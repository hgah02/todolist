const $ = document.querySelector.bind(document)
const $$ = document.querySelector.bind(document)
const btnAddList = $('#btnAddList')
const newNote = $('#inputTag')
const noteList = $('#note-list')
const form = $('form')
let notes = JSON.parse(localStorage.getItem('todolist')) ? JSON.parse(localStorage.getItem('todolist')): []

// bien dem so lan bam delete
let countDelete = 0 

// xu ly output
function html([first,...strings],...value){
    return value.reduce(
        (acc,curr) => acc.concat(curr,strings.shift()),
        [first]
    )
    .filter(x => x && x != true || x === 0 )
    .join('')
}


// render lan dau tien sau khi chay dung dung
render()

// innnerHTMl ra ngoai man hinh
function render(){
    const output = notes.map((note,index)=>{
        return html`
        <li ${note.status && 'class = completed'}><span onclick=handleCompleted(this.parentElement,${index})>${note.note}</span>
            <button class="deleteBtn" onclick=deleteNote(this.parentElement,${index})><i class="fa-solid fa-trash"></i></button>
        </li>
        `
    }).join('')
    noteList.innerHTML = output

}

// them du lieu vao mang
form.addEventListener("submit",function addNote(e){
    e.preventDefault();
    let note = newNote.value;
    if(note != ''){ 
        notes.push({
            note,
            status: null
        })
        newNote.value = ''
    }
    handleData()
    render()
})

// xoa 1 note trong list
function deleteNote(element,index = 1){
    element.remove()
    notes.splice(index-countDelete,1)
    handleData()
    countDelete += 1
}

// xu ly them class = completed hoac bo di 
function handleCompleted(element,index = 1){
    if(notes[index].status){
        notes[index].status = null
        element.removeAttribute('class')
    }else{
        notes[index].status = 'completed'
        element.setAttribute('class',notes[index].status)
    }
    handleData()
}

// chuyen du lieu thanh dang chuoi va luu vao local host
function handleData(){
    localStorage.setItem('todolist', JSON.stringify(notes))
}

// xoa tat ca du lieu
function clearData(){
    localStorage.removeItem('todolist')
    notes = []
    noteList.innerHTML = ''
}


