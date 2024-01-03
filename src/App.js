import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

// 수정 후 github.io 업데이트 하려면 npm run deploy
function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/" || `${process.env.PUBLIC_URL}/`} element={<Home />} />
        <Route
          path={"/movie/:id" || `${process.env.PUBLIC_URL}/movie/:id`}
          element={<Detail />}
        />
      </Routes>
    </Router>
  );
}

export default App;
