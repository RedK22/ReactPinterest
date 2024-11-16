import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./AuthContext.jsx"; // Import the AuthProvider
import Home from "./Components/Home";
import SignUpPage from "./Components/SignUpPage";
import SignInPage from "./Components/SignInPage";
import CreatePin from "./Components/CreatePin.jsx";
import ProfilePage from "./Components/ProfilePage.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/create" element={<CreatePin />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
