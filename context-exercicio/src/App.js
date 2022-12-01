import { GlobalContext } from "./context/GlobalContext";
import axios from "axios"
import { useEffect, useState } from "react";
import Card from "./components/Card";
import { ChakraProvider } from "@chakra-ui/react"


function App() {
  const [users, setUsers] = useState([])

  const headers = {
    Authorization: "fabio-couto-ammal"
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", { headers });
      setUsers(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }
  const context = {
    users: users
  }

  return (
    <ChakraProvider>
      <GlobalContext.Provider value={{ context }}>
        {users.map((user) => (
          <Card key={user.id} name={user.name} />
        ))}
      </GlobalContext.Provider>
    </ChakraProvider>
  );
}

export default App;
