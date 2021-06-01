import {useState} from 'react'

const useClock = () => {

    const initialState = { min: 25, seg: '00'}

    const [sessionTime, setsessionTime] = useState(initialState);
    const [breakTime, setbreakTime] = useState(5);
    const [state, setstate] = useState(true);


    const increment = (item) => {
        item === 'break' && setbreakTime(breakTime + 1);
        item === 'session' && setsessionTime({...sessionTime, min: sessionTime.min + 1});
    };

    const decrement = (item) => {
        if (breakTime > 1) {
            item === 'break' && setbreakTime(breakTime - 1) ;
        }
        if (sessionTime.min > 1) {
            item === 'session' && setsessionTime({...sessionTime, min: sessionTime.min - 1});
        }
    };

    const playTo = () => {     
        sessionTime.seg === '00' && setsessionTime({...sessionTime, seg: 59})
        // const interval = setInterval(() => {
        //     setsessionTime(prevsessionTime => {
        //         return {...prevsessionTime, seg: prevsessionTime.seg - 1}
        //     })
        // }, 1000);
        // e === 'pause' && clearInterval(interval)
        if ( state ){
            setstate(false)
            var interval = setInterval(() => {
                setsessionTime(prevsessionTime => {
                    return {...prevsessionTime, seg: prevsessionTime.seg - 1}
                })
            }, 1000);
        } else {
            setstate(true)
        }        
    }

    const pause = () => {
        
    }

    const reset = () => {
        setsessionTime(initialState)
    }

    return [
        sessionTime,
        breakTime,
        increment,
        decrement,
        playTo,
        pause,
        reset
    ]
}

export default useClock
