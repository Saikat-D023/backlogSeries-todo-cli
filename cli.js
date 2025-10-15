import axios from "axios"
const baseURL = "http://localhost:3000/todos"

const args = process.argv.slice(2)
const command = args[0]

async function runCLI(){
    switch(command){
        case "list":
            const todos = await axios.get(baseURL)
            console.log("Todos List:")
            todos.data.todos.forEach(t => {
                console.log(`${t.id}. ${t.todo} ${t.completed ? "✅" : "❌"}`)
            })
            break
        case "add":
            const addText = args[1]
            await axios.post(`${baseURL}/add`, { todo: addText })
            console.log("Todo added")
            break
        case "delete":
            const deleteText = args[1]
            await axios.delete(`${baseURL}/delete`, { data: { todo: deleteText } })
            console.log("Todo deleted")
            break
        case "done":
            const doneText = args[1]
            await axios.post(`${baseURL}/done`, { todo: doneText })
            console.log("Todo marked as done")
            break
        default:
            console.error("Unknown command")
    }
}

runCLI().catch(error => {
    console.error("Error occurred:", error.message)
})
