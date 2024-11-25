import { Route, Routes } from 'react-router-dom'
import Notifications from './component/Notifications'
import CreateNotification from './component/CreateNotification'
import "./App.css";

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Notifications></Notifications>}></Route>
        <Route path='/create-notification' element={<CreateNotification></CreateNotification>}></Route>
      </Routes>

    </>
  )
}

export default App
