'use client';

import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <p>Data from Server: {data}</p> */}
      <button onClick={() => setCount(count + 1)}>my Count: {count}</button>
    </div>
  );
}
