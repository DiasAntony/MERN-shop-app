import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import UserList from "./pages/UserList";
import EditUser from "./pages/EditUser";
import ProductList from "./pages/ProductList";
import EditProduct from "./pages/EditProduct";
import OrderList from "./pages/OrderList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/product/:id" Component={ProductDetails} />
            {/* question(?) mark give a different logic if it not that route not work=> when use ----  /cart  ----- */}
            <Route path="/cart/:id?" Component={Cart} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/profile" Component={Profile} />
            <Route path="/shipping" Component={Shipping} />
            <Route path="/payment" Component={Payment} />
            <Route path="/placeorder" Component={PlaceOrder} />
            <Route path="/order/:id" Component={Order} />
            <Route path="/admin/userlist" Component={UserList} />
            <Route path="/admin/productlist" Component={ProductList} />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductList}
              exact
            />
            <Route path="/admin/orderlist" Component={OrderList} />
            <Route path="/admin/user/:id/edit" Component={EditUser} />
            <Route path="/admin/product/:id/edit" Component={EditProduct} />
            <Route path="/page/:pageNumber" component={Home} />
            <Route path="/search/:keyword/page/:pageNumber" component={Home} />
            <Route path="/" Component={Home} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
