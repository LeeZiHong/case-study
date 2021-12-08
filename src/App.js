import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Main/Main";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { useEffect, useState } from "react";
import auth from "./authentication/firebase";
import NotFound from "./NotFound/NotFound";

function App() {
  const [user, setUser] = useState(null);

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
