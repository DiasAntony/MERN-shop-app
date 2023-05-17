// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import products from "../products";
// import { Col, Row } from "react-bootstrap";
// import Product from "../components/Product";
// import { listProducts } from "../actions/productActions";
// import Loader from "../components/Loader";
// import Message from "../components/Message";

// // import axios from "axios";

// const Home = () => {
//   const dispatch = useDispatch();
//   // const products = useSelector((state) => state.productList.products);
//   const productList = useSelector((state) => state.productList);

//   const { loading, error, products } = productList;

//   // const[products,setProducts]=useState([])

//   useEffect(() => {
//     // const fetchProducts=async()=>{
//     //   // const res=await axios.get('/api/products')
//     //   const {data}=await axios.get('/api/products')

//     //   // setProducts(res.data)
//     //   setProducts(data)
//     // }
//     // fetchProducts();

//     dispatch(listProducts());
//   }, [dispatch]);

//   return (
//     <>
//       <h1>Latest products</h1>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <Row>
//           {products.map((product) => (
//             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//               <Product product={product} />
//             </Col>
//           ))}
//         </Row>
//       )}
//     </>
//   );
// };

// export default Home;


import React, { useEffect } from 'react'
import { Link,  useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const Home = () => {
  const params=useParams()
  const keyword = params.keyword

  const pageNumber = params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default Home