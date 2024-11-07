import {createClient} from "@supabase/supabase-js";
import SignUpPage from "./Components/SignUpPage";
import SignInPage from "./Components/SignInPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Components/Home";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home supabase={supabase} />} />
          <Route path="/signup" element={<SignUpPage supabase={supabase} />} />
          <Route path="/signin" element={<SignInPage supabase={supabase} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
