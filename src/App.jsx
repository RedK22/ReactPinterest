import {createClient} from "@supabase/supabase-js";
import SignUpPage from "./Components/SignUpPage";
import SignInPage from "./Components/SignInPage";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  return (
    <>
      <SignInPage supabase={supabase} />
      <SignUpPage supabase={supabase} />
    </>
  );
}

export default App;
