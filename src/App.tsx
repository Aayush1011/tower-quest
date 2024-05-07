import Game from "./core/components/Game";
import { PersistGates } from "./core/redux/persistGate";
import { Providers } from "./core/redux/provider";
import "./globals.css";

function App() {
  return (
    <Providers>
      <PersistGates>
        <Game />
      </PersistGates>
    </Providers>
  );
}

export default App;
