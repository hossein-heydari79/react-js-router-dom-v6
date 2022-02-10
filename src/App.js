import './App.css';
import { useState } from "react";
import { Routes, Route, NavLink, Outlet, useParams, useNavigate, Link } from "react-router-dom";

const data = [
  { id: 1, name: "Mouse" },
  { id: 2, name: "Monitor" },
  { id: 3, name: "Keyboard" },
  { id: 4, name: "Mobile" },
  { id: 5, name: "Tablet" },
  { id: 6, name: "Speaker" },
  { id: 7, name: "Handsfree" },
  { id: 8, name: "Adaptor" },
  { id: 9, name: "Battery" },
  { id: 10, name: "Case" },
]

function App() {


  const [products, setProducts] = useState(data);

  return (
    <div className="App">

      <div style={{ width: "30%", display: "flex", justifyContent: "space-evenly", alignItems: "center", marginBottom: "20px" }}>
        <NavLink style={({ isActive }) => isActive ? { color: "blue", fontWeight: "600" } : { color: "black" }} to="/">Home</NavLink>
        <NavLink style={({ isActive }) => isActive ? { color: "blue", fontWeight: "600" } : { color: "black" }} to="/product">Product</NavLink>
        <NavLink style={({ isActive }) => isActive ? { color: "blue", fontWeight: "600" } : { color: "black" }} to="/contactus">Contact Us</NavLink>
      </div>

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/product' element={<Product />}>
          <Route index element={<ProductList products={products} />} />
          <Route path=':id' element={<ProductDetail products={products} />} />
        </Route>

        <Route path='/contactus' element={<ContactUs />} />

      </Routes>

    </div >
  );
}

export default App;



const Home = () => {

  return (

    <h1>Home Page</h1>

  )

}

const Product = () => {

  return (

    <div style={{ width: "30%" }}>
      <h1>Product Page</h1>
      <Outlet />
    </div>

  )

}

const ProductList = ({ products }) => {

  const navigate = useNavigate();


  return (

    <ul style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
      {
        products.map(item => (
          <li onClick={() => navigate(`/product/${item.id}`)} key={item.id}>{item.name}</li>
        ))
      }
    </ul>

  )

}


const ProductDetail = ({ products }) => {

  const { id } = useParams();

  const navigate = useNavigate();


  const item = products.find(item => +id === item.id);

  return (

    <>
      <h3>Product Detail</h3>
      <p>{item.name}</p>
      <button onClick={() => navigate("/product")}>go back</button>
    </>

  )

}

const ContactUs = () => {

  return (

    <h1>Contact Us</h1>

  )

}