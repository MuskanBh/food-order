import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';


// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailablleMeals=()=>{
  const [meals, setMeals]= useState([]);
  const [isLoading,setisLodaing] = useState(true);
  const [hasError, setHasError]= useState();
  useEffect(()=>{
    const fetchMeal = async ()=>{
      const response = await fetch("https://food-order-9ffa8-default-rtdb.firebaseio.com/meals.json");
      const responseData = await response.json();
      if(!response.ok){
        throw new Error('Something Went Wrong')
      }

      const loadedMeals =[];

      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price
        })
      }
      setMeals(loadedMeals);
      setisLodaing(false)
    };
      fetchMeal().catch((error)=>{
        setisLodaing(false);
        setHasError(error.message);

      })

  },[])
  if(isLoading === true){
    return(
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
      
    )
  }
  if(hasError){
    return(
      <section className={classes.MealsLoading}>
        <p>{hasError}</p>
      </section>
      
    )
  }
  const mealsList= meals.map(meal =><MealItem
  id={meal.id}
  key={meal.id}
  name={meal.name}
  description={meal.description}
  price={meal.price}/>);
  return (
    <section className={classes.meals}>
      <Card>
      <ul>
        {mealsList}
      </ul>
      </Card>
    </section>
  );
}

export default AvailablleMeals