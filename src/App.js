import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import { useEffect, useState } from "react";
import auth from "./firebase";
import NotFound from "./NotFound";

function App() {
  const [user, setUser] = useState(null);

  // Check user auth, invalid then require login
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email,
      };
      if (userAuth) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="app">
      {/* React-router */}
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Main /> : <Login />}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
