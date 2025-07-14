import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const FruitContext = createContext();

export const FruitProvider = ({ children }) => {
  const [fruits, setFruits] = useState([]);

  const fetchFruits = async () => {
    const res = await axios.get("api/fruit");
    setFruits(res.data);
  };

  useEffect(() => {
    fetchFruits();
  }, []);

  return (
    <FruitContext.Provider value={{ fruits, fetchFruits }}>
      {children}
    </FruitContext.Provider>
  );
};
