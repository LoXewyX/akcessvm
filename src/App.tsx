import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Settings from './components/Settings';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Schedule from './components/Schedule';
import Welcome from './components/Welcome';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import User from './components/User';
import { Routes, Route } from 'react-router-dom';

import ROLES from './api/roles.json';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='welcome' element={<Welcome />} />
        <Route path='unauthorized' element={<Unauthorized />} />
        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path='/' element={<Home />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/user/:id' element={<User />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path='editor' element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path='admin' element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path='schedule' element={<Schedule />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;