import { Routes } from "./pages/Route";
import AppBar from "components/AppBar";
import "./global.css";

function App() {
  return (
    <div className="App">
      <AppBar /> {/* 앱bar */}
      <Routes /> {/* 라우팅컴포넌트 */}
    </div>
  );
}

export default App;
