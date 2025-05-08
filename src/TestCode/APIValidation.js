import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Validate() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    setIsError(false);
    setData(null);
    const fetchData = new Promise((resolve, reject) =>{
      axios.get('http://localhost:3001/Users')
          .then(resolve)
          .catch(reject)
    });
    fetchData.then((res) => {setData(res.data);
      setIsPending(false);})
        .catch((err) =>{setIsError(true);
          setIsPending(false);});
  }, []);

  return (
    <div>
      {isPending && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}
      {data && (
          <p>Successful</p>
      )}
    </div>
  );

}

export default Validate;
