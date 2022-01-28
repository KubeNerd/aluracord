import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState, useEffect } from 'react';
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQzMTYwNjA2LCJleHAiOjE5NTg3MzY2MDZ9.BWT_O5xjNcFGNup91ZmYRpBSw0_CwK3vahokgFJvcw0';
const SUPABASE_URL='https://aqvvrmtsxywnvwtxxnto.supabase.co';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);




export default function ChatPage() {
    const [message, setMessage] = useState('');
    const [messageOfList, setmessageOfList] = useState([])

    useEffect(() =>{
        supabaseClient
        .from("messages")
        .select("*")
        .then((dados)=>{
            console.log(dados.data);
            setmessageOfList(dados.data);
        })

    }, [])




  

    function handleNewMessage(newMessage) {
        const message = {
            id: messageOfList.length + 1,
            text: newMessage,
            from: 'shabazzBr'
        }
        supabaseClient
        .from("messages")
        .insert([
            message
        ]).then(({ data }) =>{

            setmessageOfList([ data[0], ...messageOfList]);
            // window.location.reload();
        })
       
        
        setMessage('');
    }


    return (

        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://get.wallhere.com/photo/artwork-Keanu-Reeves-John-Wick-Chapter-3-gun-pistol-fan-art-men-pink-background-John-Wick-1950455.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={messageOfList} />
                    {/* Mensagens:{messageOfList.map((currentMessage) => {
                        return (
                            <li key={currentMessage.id}>
                                FROM:{currentMessage.from}<br />
                                MESSAGE:{currentMessage.text}
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key == 'Enter') {
                                    e.preventDefault();
                                    handleNewMessage(message);

                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.from}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.text}
                    </Text>
                );
            })}
        </Box>
    )
}
