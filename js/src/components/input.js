import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { Input } from 'semantic-ui-react'

const InputExampleFluid = () => {
	 return <Input fluid icon='search' placeholder='Search...' />
}
 
	// constructor(currentValue, params) {
	// 	super(container);

 //        this.dispatcher = dispatcher || (() => null);

	// 	this.value = currentValue;
	// 	this.initEvents();
	// 	this.render();
//     initEvents() {
// 		this.Input.addEventListener('keydown', (e) => {
// 			const {target, keyCode} = e;
// 			if (target.classList.contains('input') || target.closest('input')) {
// 				this.updateValue(target.value, keyCode);
// 			}
// 		});
// 	}
//     refreshProps(newObj) {
// 		this.value = newObj;
//         this.render();
//     }
	
// }
// 	updateValue(value, keyCode) {
// 		if (keyCode === 13) {
//             console.log('dispatching', value)

//             this.dispatcher('SEARCH_QUERY', {
//                 newTodoText: value, 
//             });
// 		}
// 	}
// }

export default InputExampleFluid;
// export function Input(...args) {
// 	return new Input(...args);
// }
