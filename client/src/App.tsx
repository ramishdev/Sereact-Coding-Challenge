import { useState } from 'react';
import ThreeSphere from './components/ThreeSphere';
import SphereControls from './components/SphereControls';

function App() {
  const [radius, setRadius] = useState<number>(1); // Default radius

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Three.js Sphere in React</h1>
      <SphereControls radius={radius} setRadius={setRadius} />
      <ThreeSphere radius={radius} />
    </div>
  );
}

export default App;
