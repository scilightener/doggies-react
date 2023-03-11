import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardPage from "./pages/card/CardPage";
import MainPage from "./pages/main/MainPage";
import ReviewPage from "./pages/review/ReviewPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/dog/:id" element={<CardPage />} />
          <Route path="/review" element={<ReviewPage />} />
        </Routes>
      </Router>
    </>
  )
}
export default App;