import type { FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';

const LikeButton: FunctionalComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      style={{
        padding: '0.3rem 0.6rem',
        marginLeft: '0.5rem',
        cursor: 'pointer',
      }}
    >
      👍 Like {count}
    </button>
  );
};

export default LikeButton;
