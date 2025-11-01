import { createClient } from '@liveblocks/client';
import { createRoomContext } from '@liveblocks/react';

if (!process.env.LIVEBLOCKS_SECRET_KEY) {
  throw new Error('LIVEBLOCKS_SECRET_KEY is not defined');
}

const client = createClient({
  authEndpoint: '/api/liveblocks/auth',
});

// Define your Liveblocks types
// https://liveblocks.io/docs/api-reference/liveblocks-react#RoomProvider
type Presence = {
  cursor: { x: number; y: number } | null;
  name: string;
};

type Storage = {
  // Your storage structure
  // Example: notes: LiveList<{ id: string; text: string }>;
};

type UserMeta = {
  id: string;
  info: {
    name: string;
    avatar?: string;
  };
};

type RoomEvent = {};

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);

