/* eslint-disable global-require */
import React, { useEffect, useState } from "react";
import { Chat } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";

import "stream-chat-react/dist/css/index.css";

import "./App.css";

import { useChecklist } from "./ChecklistTasks";
import { AgentApp } from "./AgentApp";
import { AgentHeader } from "./components/AgentHeader/AgentHeader";
import { AgentLoading } from "./components/AgentLoading/AgentLoading";
import { CustomerApp } from "./CustomerApp";

const urlParams = new URLSearchParams(window.location.search);
const apiKey = "dt775crxd3mq";
const agentChannelId = `agent-demo-`;
const customerChannelId = `customer-demo1`;
const targetOrigin =
  urlParams.get("target_origin") || process.env.REACT_APP_TARGET_ORIGIN;
const theme = "light";

const agentUserId = "ltntamdev";
const agentUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibHRudGFtZGV2In0.py0JHOuByEz4XM0O-SQ9deqyoKXW30nRRAexuJpv1Ms";

const customerUserId = "user-test-1";
const customerUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlci10ZXN0LTEifQ.0SY046VbeXFN11xPklMRYEQ-ticQfNbRRoOTaG_K_cU";

const customerClient = StreamChat.getInstance(apiKey);
customerClient.connectUser(
  {
    id: customerUserId,
    name: "Kevin Rosen",
    image: require("./assets/kevin-avatar.png"),
    phone: "+1 (303) 555-1212",
    email: "kevin@example.com"
  },
  customerUserToken
);

const App = () => {
  const [agentClient, setAgentClient] = useState();
  const [initialClient, setInitialClient] = useState();
  const [initialChannel, setInitialChannel] = useState();

  /**
   * Creates and watches a channel with a mock customer as the user
   */
  useEffect(() => {
    const getInitialChannel = async () => {
      const client = new StreamChat(apiKey); // since app is dual client need to construct an additional instance
      await client.connectUser(
        {
          id: "john",
          name: "John Doe",
          image: "https://getstream.io/random_svg/?name=John"
        },
        client.devToken("john")
      );

      setInitialClient(client);

      const newChannel = await client.channel("commerce", agentChannelId, {
        image: require("./assets/jen-avatar.png"),
        name: "Jen Alexander",
        issue: "Enterprise Inquiry",
        subtitle: "#572 Enterprise Inquiry"
      });

      if (newChannel.state.messages.length) {
        newChannel.state.clearMessages();
      }

      await newChannel.watch();

      setInitialChannel(newChannel);
    };

    getInitialChannel();
  }, []);
  // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Sends messages to mock channel, disconnects mock channel, and sets
   * support agent as current user
   */
  useEffect(() => {
    const sendMessages = async () => {
      await initialChannel.sendMessage({
        text: "Hey there"
      });
      await initialChannel.sendMessage({
        text: "What Can I help you with"
      });
      // await initialChannel.stopWatching();
      // await initialClient.disconnect();
      const client = new StreamChat(apiKey); // since app is dual client need to construct an additional instance
      await client.connectUser(
        {
          id: agentUserId,
          name: "Daniel Smith",
          image: require("./assets/user1.png")
        },
        agentUserToken
      );

      const [existingChannel] = await client.queryChannels({
        id: agentChannelId
      });

      await existingChannel.watch();

      setAgentClient(client);
    };

    if (initialChannel && !initialChannel.state.messages.length) {
      sendMessages();
    }
  }, [initialChannel]); // eslint-disable-line react-hooks/exhaustive-deps

  useChecklist(customerClient, targetOrigin);

  return (
    <>
      <div className="agent-wrapper">
        <AgentHeader />
        {agentClient ? (
          <Chat client={agentClient}>
            <AgentApp {...{ agentChannelId, customerChannelId }} />
          </Chat>
        ) : (
          <AgentLoading />
        )}
      </div>
      {/* {customerClient && (
        <Chat client={customerClient} theme={`commerce ${theme}`}>
          <CustomerApp {...{ customerChannelId }} />
        </Chat>
      )} */}
    </>
  );
};

export default App;
