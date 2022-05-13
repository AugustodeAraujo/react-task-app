import { useState, useEffect } from 'react'
import { Container } from './components/Container'
import { ListPlus, Trash, CheckSquare, Square } from 'phosphor-react'
import { Popover } from '@headlessui/react'



function App(props: any) {

  const [taskList, setTaskList] = useState([] as any)
  const [task, setTask] = useState("")
  const [totalTasks, setTotalTasks] = useState(0)
  const [message, setMessage] = useState(true)


  function handleChangeInput(event: any) {
    let inputTask = event.target.value;
    setTask(inputTask);
  }

  function addTaskToList(event: any) {
    event.preventDefault()

    if (task) {

      const taskFromInput = {}
      Object.assign(taskFromInput, {
        id: taskList.length + 1,
        text: task
      })

      setTaskList([...taskList, taskFromInput])
      setTask("")
    }
  }

  function completeTask(id: number) {
    const completeTask = taskList.map((task: any) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete
      }
      return task
    })
    setTaskList(completeTask)
  }

  function removeTaskList(id: number) {
    const removeTask = [...taskList].filter(task => task.id !== id)
    setTaskList(removeTask)
  }

  useEffect(() => {
    const total = [...taskList].filter(task => task.isComplete === true)
    setTotalTasks(total.length)
  }, [taskList])




  return (

    <Container>
      <div className='flex justify-center items-center h-screen'>
        <div className='m-4 p-4 bg-white rounded-lg w-full h-auto shadow relative justify-center'>

          <div className="flex justify-between place-items-center my-2">
            <h1 className="text-1xl md:text-2xl text-indigo-700 font-bold">DailyTask.app</h1>

            {
              totalTasks !== 0 ? <p className=' text-indigo-700 text-sm italic '>Total completed tasks: {totalTasks}</p> : <></>
            }
          </div>

          {
            taskList.length === 0 ? <><hr /> <p className=' text-indigo-700 text-sm italic my-2'>Add a task to begin your day!</p></> : <hr />
          }


          <div className="flex flex-col justify-center place-items-center min-h-full  mt-4">


            <div>
              {taskList.map((item: any, index: any) => {
                return (
                  <div className="flex  rounded space-x-2 text-right px-4 py-1 my-1 place-items-center bg-slate-300 w-fit" key={index} >
                    {item.isComplete === true ?

                      <span onClick={() => { completeTask(item.id) }}>
                        <CheckSquare className='cursor-pointer text-indigo-600' weight="fill" size={20} />
                      </span>

                      : <span onClick={() => { completeTask(item.id) }}>
                        <Square className='cursor-pointer text-gray-400' weight="fill" size={20} />
                      </span>
                    }


                    <p className={item.isComplete === true ? ' text-indigo-700 font-light line-through italic' : 'text-indigo-700 font-medium '} >{item.text} </p>
                    <span onClick={() => { removeTaskList(item.id) }}>
                      <Trash size={16} weight="fill" className='cursor-pointer text-gray-700' />
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
          <Popover className="flex place-items-center">

            <span>
              {taskList.length === 0 ?
                <span className="absolute animate-ping bg-indigo-200 rounded-full h-10 w-10"></span>
                : <></>
              }
              <Popover.Button className=' relative bg-indigo-900 hover:bg-indigo-700 rounded-full h-10 w-10  border border-white flex place-items-center justify-center text-white mr-2'>
                <ListPlus size={24} />
              </Popover.Button>
            </span>

            <Popover.Panel >
              <div id="panel" className="z-10 ">
                <form>
                  <input type="text" name="inputToDo" id="inputToDo" value={task} placeholder='Add task' onChange={handleChangeInput} className='focus:outline-none focus:ring-0 bg-indigo-700 rounded-l px-3 py-2 text-white text-sm' />
                  <button type='submit' onClick={addTaskToList} className='bg-indigo-900 hover:bg-indigo-800 px-3 py-2  rounded-r text-white text-sm' >Add</button>
                </form>
              </div>
            </Popover.Panel>

          </Popover>
        </div>
      </div>
    </Container>

  )
}

export default App
