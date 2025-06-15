import { Routes, Route, Link } from 'react-router';
import { Application } from "@pixi/react";
import Grid from "./components/Grid";

function Layout() {
  return (
    <div>
      <nav>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: '1rem', background: '#f0f0f0' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/grid">Grid Demo</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grid" element={<GridDemo />} />
        </Routes>
      </main>
    </div>
  );
}

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to WebGPU Game Studies</h1>
      <p>Navigate to the Grid Demo to see the WebGPU in action!</p>
    </div>
  );
}

function GridDemo() {
  return (
    <Application background={"#1099bb"} resizeTo={window}>
      <Grid />
    </Application>
  );
}

export default function App() {
  return <Layout />;
}
