import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {
  useQuery,
  gql,
  useMutation
} from "@apollo/client";

const GET_MESSAGES = gql`
  query {
    messages {
      _id
      text
      createdAt
    }
  }
`
const CREATE_MESSAGE = gql`
mutation ($text: String!){
  createMessage(text: $text){
    _id,
  }
}
`
const CHATS_SUBSCRIPTION = gql`
  subscription OnNewChat {
    messageSent {
      _id
      text
      createdAt
    }
  }
`

const Messages = ({user}) => {
  if(!data) {
    return null
  } else {
    console.log('data', data)
  }
  return <div>{JSON.stringify(data)}</div>
}

const ChatApp = () => <div><Messages user="Fahad" /></div>

export default function Chat() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES);
  const [createMessage] = useMutation(CREATE_MESSAGE)
  const msgs = data && data.messages && data.messages.length > 0 ? data.messages.slice().sort((a, b) => b.createdAt - a.createdAt) : []
  console.log('messages', msgs)
  console.log('data', loading, error, data)
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: 'Hello!',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])

  useEffect(() => {
    subscribeToMore({
      document: CHATS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageSent;

        return {
          messages: [...prev.messages, newMessage],
        };
      },
    });
  }, [])

  const onSend = useCallback((message) => {
    console.log('messages', message)
    // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    createMessage({variables: {text: message[0].text}})
  }, [])
  return (
      // <ChatApp />
      <GiftedChat
        messages={msgs.map(x => ({...x, user: x._id, createdAt: new Date(Number(x.createdAt))}))}
        onSend={message => onSend(message)}
        user={{
          _id: 1,
          name: 'Fahad',
          avatar: 'https://placeimg.com/140/140/any'
        }}
      />
  )
}