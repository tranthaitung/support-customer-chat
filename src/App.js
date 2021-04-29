/* eslint-disable global-require */
import React, { useEffect, useState } from "react";
import { Chat } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";

import "stream-chat-react/dist/css/index.css";

import "./App.css";

import { AgentApp } from "./AgentApp";
import { AgentHeader } from "./components/AgentHeader/AgentHeader";
import { AgentLoading } from "./components/AgentLoading/AgentLoading";

const apiKey = "dt775crxd3mq";
//const agentChannelId = `agent-demo-${uuidv4()}`;
// const customerChannelId = `customer-demo-${uuidv4()}`;

const agentChannelId = `agent-demo-`;
const customerChannelId = `customer-demo`;

const agentUserId = "ltntamdev";
const agentUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibHRudGFtZGV2In0.py0JHOuByEz4XM0O-SQ9deqyoKXW30nRRAexuJpv1Ms";

const agentClient = new StreamChat(apiKey); // since app is dual client need to construct an additional instance
agentClient.connectUser(
  {
    id: agentUserId,
    name: "Daniel Smith",
    image: require("./assets/user1.png")
  },
  agentUserToken
);

const App = () => {
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
    </>
  );
};

export default App;
