import Container from "./components/Container";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import PastTripsPage from "./pages/PastTripsPage";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Container>
          <PastTripsPage />
        </Container>
      </div>
    </>
  );
}

export default App;
