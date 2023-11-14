import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  


  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await axios.get(`/api/products?search=${search}`, {
          signal:controller.signal
        });
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if(axios.isCancel(error)) {
          console.log("request cancel", error.message);
          return;
        }
        setError(true);
        setLoading(false);
      }
     
    })();
    return ()=> {
      controller.abort()
    }
  },[search]);

// fetch request using axios

  useEffect(()=> {
     (async()=> {
      const response = await axios.post('/api/users', {
        "name":"Ritesh",
        "email":"ritesh@gmail.com"
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log("users", response.data);
     })()
  },[]);

  if(error) {
    return <h1>Something went wrong!</h1>
  }

  if(loading) {
    return <h1>Loading...</h1>
  }
  return (
    <div className="App">
      <h1 style={{ textAlign: "center", color: "blue" }}>
        Chai aur api in react
      </h1>
      <input style={{display:'block', margin:'auto', textAlign:'center', padding:'10px 30px', fontSize:'3vw'}} type="text" placeholder="Search" value={search} onChange={(e)=> setSearch(e.target.value)} />
      
      
      <h2 style={{ textAlign: "center" }}>Number of product are:{products.length}</h2>

      <ul>
        {products.map((product)=> {
          return (
            <>
            <li>{product.name}</li>
            <li>{product.price}</li>
            <li><img style={{width:'200px'}}src={product.img}/></li>
            </>
            
            
          )
        })}
      </ul>
    </div>
  );
}

export default App;
