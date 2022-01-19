import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchmeals = async () => {
      const response = await fetch(
        "https://react-http-162a8-default-rtdb.firebaseio.com/meals.json"
      );

      if(!response.ok){
        throw new Error('something went wrong')
      }
      const resData = await response.json();

      const loadedMeals = [];

      for (const key in resData) {
        loadedMeals.push({
          id: key,
          name: resData[key].name,
          price: resData[key].price,
          description: resData[key].description,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false)
    };

    fetchmeals().catch((error)=>{
      setIsLoading(false);
      setHttpError(error.message);
    })
 
    
  }, []);

  if(isLoading){
    return <section className={classes.mealsloading}>
      <p>Loading....</p>
    </section>
  }

  if(httpError){
    return <section className={classes.mealserror}>
      <p>{httpError}</p>
    </section>
  }

  const mealslist = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>{mealslist}</Card>
    </section>
  );
};

export default AvailableMeals;
