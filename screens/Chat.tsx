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
  const { loading, error, data } = useQuery(GET_MESSAGES);
  const [createMessage] = useMutation(CREATE_MESSAGE)
  console.log('data', loading, error, data)
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    console.log('messages', messages)
    // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    createMessage({variables: {text: messages[0].text}})
  }, [])
  return (
      // <ChatApp />
      <GiftedChat
        messages={data && data.messages ? data.messages.map(x => ({...x, user: x._id, createdAt: new Date(Number(x.createdAt))})) : []}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: 'Fahad',
          avatar: 'https://placeimg.com/140/140/any'
        }}
      />
  )
}