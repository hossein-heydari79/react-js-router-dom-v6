import './App.css';
import { useState } from "react";
import { Routes, Route, NavLink, Outlet, useParams, useNavigate, Link, useRoutes, Navigate, useSearchParams, useLocation } from "react-router-dom";

/*======================================================================================================================*/

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

/*======================================================================================================================*/


function App() {

  const Custom = CustomRoutes();

  return (
    <div className="App">

      <div style={{ width: "30%", display: "flex", justifyContent: "space-evenly", alignItems: "center", marginBottom: "20px" }}>
        <NavLink style={({ isActive }) => isActive ? { color: "blue", fontWeight: "600" } : { color: "black" }} to="/">Home</NavLink>
        <NavLink style={({ isActive }) => isActive ? { color: "blue", fontWeight: "600" } : { color: "black" }} to="/product">Product</NavLink>
        <NavLink style={({ isActive }) => isActive ? { color: "blue", fontWeight: "600" } : { color: "black" }} to="/contactus">Contact Us</NavLink>
      </div>

      <CustomRoutes />

    </div >
  );
}

export default App;


/*======================================================================================================================*/



const Home = () => {

  return (

    <h1>Home Page</h1>

  )

}


/*======================================================================================================================*/


const Product = () => {

  return (

    <div style={{ width: "30%" }}>
      <h1>Product Page</h1>
      <Outlet />
    </div>

  )

}

/*======================================================================================================================*/


const ProductList = ({ products }) => {

  const navigate = useNavigate();

  const [query, setQuery] = useSearchParams();

  return (

    <ul style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
      {
        products.map(item => (
          <li onClick={() => {
            navigate(`/product/detail?name=${item.name}`)
          }} key={item.id}>{item.name}</li>
        ))
      }
    </ul>

  )

}


/*======================================================================================================================*/


const ProductDetail = ({ products }) => {

  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const name = query.get("name")

  const navigate = useNavigate();


  return (

    <>
      <h3>Product Detail</h3>
      <p>{name}</p>
      <button onClick={() => navigate("/product")}>go back</button>
    </>

  )

}

/*======================================================================================================================*/


const ContactUs = () => {

  return (

    <h1>Contact Us</h1>

  )

}


/*======================================================================================================================*/


const CustomRoutes = () => {

  const [products, setProducts] = useState(data);


  const Custom = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/contactus",
      element: <ContactUs />
    },
    {
      path: "/product",
      element: <Product />,
      children: [
        {
          index: true,
          element: <ProductList products={products} />
        },
        {
          path: "detail",
          element: <ProductDetail products={products} />
        }
      ]
    },
    {
      path: "*",
      element: <Navigate to="/" />
    }
  ])

  return Custom;

}