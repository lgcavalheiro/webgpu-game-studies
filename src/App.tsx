import { Link } from 'react-router';
import { Application } from "@pixi/react";
import AppRoutes from './AppRoutes';

function Layout() {
  return (
    <div>
      <nav>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: '1rem', background: '#f0f0f0' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/game">Game</Link></li>
        </ul>
      </nav>
      <main>
        <Application background={"#1099bb"} resizeTo={window}>
          <AppRoutes />
        </Application>
      </main>
    </div>
  );
}

export default function App() {
  return <Layout />;
}
