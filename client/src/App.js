import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navigationbar from "./Components/Navbar/Navigationbar";
import { AuthRoute } from "./Components/RouterGuard/routerGuard";
import Footer from "./Components/Footer/Footer";

import Profile from "./Pages/Profile/Profile";
import UpdateProfile from "./Pages/Profile/UpdateProfile";
import Login from "./Pages/Login/Login";
import LogOut from "./Pages/Login/LogOut";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Tutorial from "./Pages/Tutorial/Tutorial";
import UploadFile from "./Pages/UploadFile/UploadFile";
import Docs from "./Pages/Docs/Documentation";
import Community from "./Pages/Community/Community";
import QuestionDetail from "./Pages/Community/QuestionDetail";
import Download from "./Pages/Download/Download";

import Overview from "./Pages/Docs/Doc_Subsections/Overview";
import Interface from "./Pages/Docs/Doc_Subsections/Interface";
import Objects from "./Pages/Docs/Doc_Subsections/Objects";
import ObjectBehaviours from "./Pages/Docs/Doc_Subsections/Object_behaviours";

import Forgot from "./Pages/Login/Forgot";
import ResetPassword from "./Pages/Login/ResetPassword";

//Advanced tutorials imports
import GettingStarted from "./Pages/Tutorial/Tutorial_Subsections/GettingStarted";
import CreateProject from "./Pages/Tutorial/Tutorial_Subsections/CreateProject";
import CreateScene from "./Pages/Tutorial/Tutorial_Subsections/CreateScene";
import AddObjects from "./Pages/Tutorial/Tutorial_Subsections/AddObjects";
import EntitiesComponents from "./Pages/Tutorial/Tutorial_Subsections/EntitiesComponents";
import Physics from "./Pages/Tutorial/Tutorial_Subsections/Physics";
import Scripting from "./Pages/Tutorial/Tutorial_Subsections/Scripting";

//game tutorials imports
import GameGettingStarted from "./Pages/Tutorial/tutorial_game_subsections/GameGettingStarted";
import GameCreateProject from "./Pages/Tutorial/tutorial_game_subsections/GameCreateProject";
import GameCreateScene from "./Pages/Tutorial/tutorial_game_subsections/GameCreateScene";

//css
import "./App.css";

function App() {
  return (
    <>
      <main className="body-container">
        <Router>
          <Navigationbar />
          <Routes>
            {/* Page Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/download" element={<Download />} />
            <Route path="/uploadFile" element={<UploadFile />} />

            {/* Routers for Tutorial Pages */}
            <Route
              path="/tutorial/advanced/getting-started"
              element={<GettingStarted />}
            />
            <Route
              path="/tutorial/advanced/create-project"
              element={<CreateProject />}
            />
            <Route
              path="/tutorial/advanced/create-scene"
              element={<CreateScene />}
            />
            <Route
              path="/tutorial/advanced/adding-objects"
              element={<AddObjects />}
            />
            <Route
              path="/tutorial/advanced/ecs"
              element={<EntitiesComponents />}
            />
            <Route path="/tutorial/advanced/physics" element={<Physics />} />
            <Route path="/tutorial/advanced/scripts" element={<Scripting />} />
            {/*<Route path='tutorial/sprite-sheet' element={<SpriteSheet />} />*/}

            {/* Game Tutorial pages */}
            <Route
              path="/tutorial/beginner/game-getting-started"
              element={<GameGettingStarted />}
            />
            <Route
              path="/tutorial/beginner/game-create-project"
              element={<GameCreateProject />}
            />
            <Route
              path="/tutorial/beginner/game-create-scene"
              element={<GameCreateScene />}
            />
            {/*<Route path='tutorial/game-adding-objects' element={<GameAddObjects />} /> */}
            {/* End routes for game tutorial pages */}

            {/* Routes for Docuemtation Pages*/}
            <Route path="/docs/overview" element={<Overview />} />
            <Route path="/docs/interface" element={<Interface />} />
            <Route path="/docs/objects" element={<Objects />} />
            <Route
              path="/docs/object-behaviours"
              element={<ObjectBehaviours />}
            />

            {/* Community and Question Routes  */}
            <Route path="/community" element={<Community />} />
            <Route exact path="/question/:id" element={<QuestionDetail />} />

            {/* Profile Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/user/reset-password" element={<ResetPassword />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <AuthRoute>
                  <Profile />
                </AuthRoute>
              }
            />
            <Route
              path="/updateProfile"
              element={
                <AuthRoute>
                  <UpdateProfile />
                </AuthRoute>
              }
            />
            <Route
              path="*"
              element={
                <p style={{ padding: "16px", textAlign: "center" }}>
                  404 Page Not Found
                </p>
              }
            />
          </Routes>
        </Router>
      </main>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
