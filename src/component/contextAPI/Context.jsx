
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const productContext = createContext();

const Context = ({ children }) => {
  const [favProList, setFavProductList] = useState([]);
  const [cartProduct, setCartProducts] = useState([]);
  const [token, setToken] = useState('');

  const getTokenFromLocalStorage = () => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
    return savedToken;
  };

  const getFav = async () => {
    try {
      const savedToken = localStorage.getItem('token');

      if (savedToken) {
        const headers = {
          Authorization: `Bearer ${savedToken}`,
        };

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/addfav`,
          { headers }
        );

        setFavProductList(response.data);
      }
    } catch (error) {
      console.log('Error fetching favourites:', error);
    }
  };

  const getcart = async () => {
    try {
      const savedToken = localStorage.getItem('token');

      if (savedToken) {
        const headers = {
          Authorization: `Bearer ${savedToken}`,
        };

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/addcart`,
          { headers }
        );

        setCartProducts(response.data);
      }
    } catch (error) {
      console.log('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    getTokenFromLocalStorage();
  }, []);

  useEffect(() => {
    if (token) {
      getFav();
      getcart();
    }
  }, [token]);

  return (
    <productContext.Provider
      value={{
        favProList,
        setFavProductList,
        cartProduct,
        setCartProducts,
        token,
        setToken,
        getcart,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default Context;