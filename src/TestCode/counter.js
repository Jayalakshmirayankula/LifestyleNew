/*
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
/!*
import {decrement, fetchTodos, increment, setFirstName} from './Redex/createSlice'
import Sample from "./sample";
import PaginatedTable from "./pagination";
*!/

export function Counter() {
    /!*const count = useSelector((state) => state.counter.value)
    const isPending = useSelector((state) => state.counter.isPending)
    const isError = useSelector((state) => state.counter.isError)
    const data = useSelector((state) => state.counter.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTodos())
    }, [])
    return (
        <div>
            <div>
                {/!*   <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
                <input type="text" onChange={e => dispatch(setFirstName(e.target.value))}/>
                <Sample></Sample>*!/}
            </div>
            {
                isPending && <p>Loading...</p>
            }
            {
                isError && <p>Error</p>
            }
            {data && (
                <PaginatedTable data={data}/>
            )}
        </div>
    )
}*!/*/
