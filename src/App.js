import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import auth from "./authentication/firebase";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./Theme/ThemeContext";
import History from "./pages/History";
import NavBar from "./components/NavBar";

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
      <ThemeProvider>
        <Router>
          {user ? <NavBar /> : null}

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
            <Route path="/history">
              <History />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
