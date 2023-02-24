import { useRef } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

export default function MealItemForm(props){
  const amountInpuRef = useRef();
  const onSubmitHandler =(event)=>{
    event.preventDefault();
// current value is always a string
    const enteredAmount = amountInpuRef.current.value;
// to make it a number
    const enteredAmountNumber = + enteredAmount;

  }
  return(
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input label='Amount'
      input={{
          ref:{amountInpuRef},
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
      }}/>
      <button>+ Add</button>
    </form>
  );

}