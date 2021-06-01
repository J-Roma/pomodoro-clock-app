import Clock from "./components/Clock";
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <Clock/>
    </ChakraProvider>
  );
}

export default App;
