import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {AuthProvider} from "./AuthContext.jsx";
import Home from "./Components/Home";
import SignUpPage from "./Components/SignUpPage";
import SignInPage from "./Components/SignInPage";
import CreatePin from "./Components/CreatePin.jsx";
import ProfilePage from "./Components/ProfilePage.jsx";
import Nav from "./Components/Nav.jsx";
import {AnimatePresence, motion} from "framer-motion";
import PostPage from "./Components/PostPage.jsx";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/create" element={<CreatePin />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
