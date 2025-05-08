import React, {Component} from "react";
import {connect} from "react-redux";
import {decrement, increment} from "../Reducer/createSlice";
import {bindActionCreators} from "@reduxjs/toolkit";

class Sample extends Component {
        constructor(props) {
            super();
            }
render()
{
    return(
        <>
            <div>
            <button
                aria-label="Increment value"
                onClick={() => this.props.actions.increment()}
            >
                Increment
            </button>
            <span>{this.props.count}</span>
            <button
                aria-label="Decrement value"
                onClick={() => this.props.actions.decrement()}
            >
                Decrement
            </button>
            </div>
            <div>
                <p>{this.props.firstName}</p>
            </div>
        </>

    )
}
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({increment,decrement}, dispatch)
});
const mapStateToProps = (state) => {
    const firstName = state.counter.firstName;
    const count = state.counter.value;
    return {firstName,count}
}

export default connect(mapStateToProps,mapDispatchToProps)(Sample);

