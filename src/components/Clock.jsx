import { HStack, Circle, Flex, Text, Box, Center } from '@chakra-ui/layout'
import { Icon } from "@chakra-ui/react"
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {FaPlay, FaPause } from 'react-icons/fa'
import {MdReplay} from 'react-icons/md'
import React, { useState, useEffect } from 'react'

const Clock = () => {

    const Timer = {
        initialMinutes: 25,
        initialSeconds: 0,
    }

    const [time, setTime] = useState({
        m: Timer.initialMinutes,
        s: Timer.initialSeconds,
    })
    console.log(time.m);
    const [session, setSession] = useState(25)
    const [breakTime, setBreakTime] = useState(5)
    const [breakState, setBreakState] = useState(true)
    const [timer, setTimer] = useState(null);

    const clipBreakTime = new Audio('https://jmotaylor.com/files/pomoclock/time-for-a-break.mp3')
    const clipSession = new Audio('https://jmotaylor.com/files/pomoclock/session-started.mp3')

    const startTimer = () => {
        let myInterval = setInterval(() => {
            setTime((time) => {
                const updatedTime = { ...time };
                if (time.s > 0) {
                    updatedTime.s--;
                }

                if (time.s === 0) {
                    if (time.m === 0) {
                        if (breakState) {
                            updatedTime.m = breakTime
                            setBreakState(false)
                            clipBreakTime.play()
                        } else {
                            updatedTime.m = Timer.initialMinutes                            
                            setBreakState(true)
                            clipSession.play()
                        }
                          
                    } else if (time.m > 0) {
                        updatedTime.m--;
                        updatedTime.s = 59;
                    }
                }

                
                return updatedTime;
            });
        }, 1000);
        setTimer(myInterval);
    };

    const pauseTimer = () => {
        clearInterval(timer);
    };

    const cancelTimer = () => {
        clearInterval(timer);
        setTime({
            m: Timer.initialMinutes,
            s: Timer.initialSeconds
        });
        setBreakTime(5)
        setSession(Timer.initialMinutes)
    };

    const increment = (e) => {
        if (e === 'session') {
            setSession(session + 1)
            // time.m > 1 && setTime({
            //     ...time,
            //     m: time.m + 1 
            // });
        }
        if (e === 'break') {
            setBreakTime(breakTime + 1);
        }
        
    };
    const decrement = (e) => {
        if (e === 'session') {
            session > 1 && setSession(session - 1)
            // time.m > 1 && setTime({
            //     ...time,
            //     m: time.m - 1 
            // });
        }
        if (e === 'break') {
            breakTime > 1 && setBreakTime(breakTime - 1);
        }
        
    };

    useEffect(() => {
        setTime({
            m: session,
            s: 0
        });
    }, [session])
    

    return (
        <Flex bgGradient="linear(to-l, #7928CA, #FF0080)" h="100vh" alignItems="center" justifyContent="center" direction="column" >
            <Flex direction="column" bg="white" p={12} rounded={6} textAlign="center">
                <Text bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text" fontSize="30px" fontWeight="extrabold">25 + 5 Clock</Text>
                <Flex mt={10} >  
                    <Flex direction="column">   
                    <Text bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text" fontSize="30px" fontWeight="extrabold">
                        Break Time
                    </Text>    
                    <HStack>
                        <Circle as="button" id="break"  onClick={(e) => increment(e.target.id)}  size="25px" bg="#FF0080" color="white">
                            <AddIcon w={3} h={3} />
                        </Circle>
                        <Text px={12} fontSize={25}>{breakTime}</Text>
                        <Circle as="button" pointerEvents id="break" onClick={(e) => decrement(e.target.id)} size="25px" bg="purple.700" color="white">
                            <MinusIcon id="break"  w={3} h={3} />
                        </Circle>
                    </HStack>
                    </Flex>

                    <Flex direction="column" ml={50}>   
     
                    <Text bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text" fontSize="30px" fontWeight="extrabold">
                        Session Time
                    </Text>    
                    <HStack>
                        <Circle as="button" id="session" onClick={(e) => increment(e.target.id)}  size="25px" bg="#FF0080" color="white">
                            <AddIcon w={3} h={3} />
                        </Circle>
                        <Text px={12} fontSize={25}>{session}</Text>
                        <Circle as="button" id="session" onClick={(e) => decrement(e.target.id)}  size="25px" bg="purple.700" color="white">
                            <MinusIcon w={3} h={3} />
                        </Circle>
                    </HStack>
                    </Flex>
                </Flex>
                <Box boxShadow="dark-lg" p="6" rounded="md" bg="white" borderColor="tomato" mt={10}>
                        <Text fontSize={45}>
                        {time.m < 10 && time.m !== 0 ? `0${time.m}`: time.m >= 10 && `${time.m}`} : {time.s < 10 ? `0${time.s}` : time.s}</Text>
                </Box>
                <Center mt={35}>
                    <Icon onClick={startTimer} as={FaPlay} color="#FF0080" w={35} h={35} />
                    <Icon onClick={pauseTimer} as={FaPause} color="#770f97" ml={10} w={35} h={35}/>
                    <Icon onClick={cancelTimer} as={MdReplay} color="#FF0080" ml={10} w={35} h={35}/>
                </Center>

            </Flex>

        </Flex>
    )
}

export default Clock
