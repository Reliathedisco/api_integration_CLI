'use client';

import { useMyPresence, useOthers } from '@/lib/liveblocks/client';
import { PointerEvent } from 'react';

export function CollaborativeCursor() {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const cursor = { x: e.clientX, y: e.clientY };
    updateMyPresence({ cursor });
  };

  const handlePointerLeave = () => {
    updateMyPresence({ cursor: null });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative h-screen w-full"
    >
      {/* Render other users' cursors */}
      {others.map(({ connectionId, presence }) => {
        if (!presence.cursor) return null;

        return (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
            name={presence.name}
          />
        );
      })}

      {/* Your content here */}
      <div className="p-8">
        <h1 className="text-2xl font-bold">Collaborative Space</h1>
        <p className="mt-4 text-gray-600">
          {others.length} other user{others.length !== 1 ? 's' : ''} online
        </p>
      </div>
    </div>
  );
}

function Cursor({ x, y, name }: { x: number; y: number; name: string }) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673L11.6794 2.23163C12.2048 1.33243 13.5374 1.32779 14.0689 2.22265L20.3511 12.3673C20.8795 13.2566 20.2499 14.3968 19.2019 14.3968H6.50214C5.45413 14.3968 4.82447 13.2566 5.65376 12.3673Z"
          fill="currentColor"
          className="text-blue-500"
        />
      </svg>
      <div className="mt-1 rounded bg-blue-500 px-2 py-1 text-xs text-white">
        {name}
      </div>
    </div>
  );
}

