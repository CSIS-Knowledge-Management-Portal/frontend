import Container from "./components/Container";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import PastTripsPage from "./pages/PastTripsPage";
import CreatePostPage from "./pages/CreatePostPage";
import PendingApprovalPage from "./pages/PendingApprovalPage";
import MyAccountPage from "./pages/MyAccountPage";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Container>
          <Homepage />
          {/* <CreatePostPage /> */}
          {/* <PendingApprovalPage /> */}
          {/* <MyAccountPage /> */}
        </Container>
      </div>
    </>
  );
}

export default App;
