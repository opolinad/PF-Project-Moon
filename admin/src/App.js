import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UsersList from "./pages/usersList/UsersList";
import PostsList from "./pages/postsList/PostsList";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import "./theme/dark.scss";
import OrdersList from "./pages/ordersList/OrdersList";
import { useSelector } from "react-redux";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    !user && navigate("/login");
  }, [user]);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path="/login" element={<Login />} />
        {user?.admin && (
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<New title="Add New User" />} />
            </Route>
            <Route path="products">
              <Route index element={<PostsList />} />
              <Route path=":productId" element={<Single />} />
              <Route path="new" element={<New title="Add New Product" />} />
            </Route>
            <Route path="orders">
              <Route index element={<OrdersList />} />
              <Route path=":productId" element={<Single />} />
              <Route path="new" element={<New title="Add New Product" />} />
            </Route>
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
