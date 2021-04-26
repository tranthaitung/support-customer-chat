import React from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window
} from "stream-chat-react";

import "stream-chat-react/dist/css/index.css";

const chatClient = StreamChat.getInstance("uv7wut8865fg");
const userToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicHJvdWQtd29vZC0zIn0.0uGSrgOlHJx0BY_7vvXpXiW9CmbDJxLLXlvuEtSr56c";

chatClient.connectUser(
  {
    id: "proud-wood-3",
    name: "proud-wood-3",
    image: "https://getstream.io/random_png/?id=proud-wood-3&name=proud-wood-3"
  },
  userToken
);

const channel = chatClient.channel("messaging", "proud-wood-3", {
  // add as many custom fields as you'd like
  image: "https://www.drupal.org/files/project-images/react.png",
  name: "Talk about React",
  members: ["proud-wood-3"]
});

const App = () => (
  <Chat client={chatClient} theme="messaging light">
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default App;
