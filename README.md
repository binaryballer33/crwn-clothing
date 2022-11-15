# React Notes

### Renders & Re-renders in React w/ Class components
React only re-renders under certain conditions  
>- `State Change` ( just because you update a key, value in the state, doesn't mean the state changes, it's still the same object in memory )  
When you use this.setState it forces the javascript to create a new object in memory, therefore changing the state, causing a re-render  
>- `Properties Change` Whenever a prop is change, React will re-render  

- Constructor runs first, all you really need to do initialize the state in the ctor
- render() method runs second, mounts the jsx to the DOM determines how the UI will look
- componentDidMount() Lifecycle method will run 3rd
- state changes so render() re-renders  

### Renders & Re-renders in React w/ Functional components
- unlike with Class components, you can't expect a re-render just be using this.setState
- With Functional components the setStateValue() method doesn't cause a re-render, only re-renders if the value is actually different
- There is no Render() method inside of a Functional component, you can look at the whole function as the Render() method
- When state or props change, it will caused a re-render just like with Class components
- When a re-render happens in a Functional component, it runs all the code in the Functional component 'top down'

### Class Components V.S. Functional Components

#### Class Components: 
- Uses Contructors, Lifecycle methods  
- has a render() method, with a return statement inside of the render() method  
- this.state is created usually inside of the Constructor as a json object  

#### Functional Components: 
- Uses arrow functions, hooks( replaces Lifecycle methods )  
- Functional components can take in props as Arg 1 and forwardRef as Arg 2
```
// functional components can take in props as Arg 1 and forwardRef as Arg 2
const CardList = (props, forwardRef) => {
  // 1st way of destructuring props, you can also do it from the props arg
  const { monsters } = props;

  return (
      <div className="card-list">
        {monsters.map((monster) => {
          return <Card monster={monster} />;
        })}  
      </div>
  )
}
```    
- doesn't have a render() method or Lifecycle methods  
- Need to understand functions, pure functions, impure functions and side effects to completely understand the way React handles functional components
- We will be writing Impure Functions in React by using Hooks
- Pure Function ( the return value is determines solely by calculations done inside of the function )
  - returns the same thing, everytime if given the same arguments
  - ``` 
    const pureFunction = (a, b) => {
      return a + b;
    }
    ```  
- Impure Function ( the return value isn't determines solely by calculations done inside of the function, there's outside interference )
  - relies on some external value so there's a POSSIBILITY that it won't return the same thing event with the same arguments
  - ``` 
    // what if c changes, then this function will not return the same thing even though the args haven't changed
    const c = 3
    const impureFunction = (a, b) => {
      return a + b + c;
    }
    ```  
- Side Effects ( This is when a function creates some kind of effect outside of its scope )
  - could change a value of something that lives outside of its scope
  - ``` 
    const c = 3
    const sideEffects = (a, b) => {
      // this function changes the value of c ( a variable that lives outside of its scope )
      c = a + b
      return a * b;
    }
    ```
- You don't store whole state objects in memory anymore for functional components, you use the useState() hook 
    - const [searchField, setSearchField] = useState(''); // [ value, setValue]

### Render method and Javascript and XML(Jsx) for Class Components
Class Components use `render()` method and `extend Component`
returns jsx inside of the `render()` method 

you can create state for class components by creating a json object and setting its key, value properties  

you can assess the state by using `{}` and inside of the curly brackets `{this.state.keyName}`  

### Strict equality with objects in javascript example
```
const obj1 = { name: 'Shaquille' }\
const obj2 = obj1\
obj1 === obj2 --> ( This is true, because they point to the same place in memory )


const obj3 = Object.assign({}, obj1)\
obj1 === obj3 --> ( This is false, because Object.assign() created a completely different object in memory )

same thing as doing    
const obj4 = { name: 'Shaquille' }\
obj1 === obj4 --> ( This is false, because you created a completely different object in memory )

this.state.name = 'Shaquille' --> ( this will not update the state )  
this.setState({ name: 'Shaquille' }) --> ( this will update the state )
```  

### Using object destructuring with setState  
> this.state = { name: { firstName: 'Shaquille', lastName: 'Mandy' }, company: 'Amazon'}  
>this.setState({ name : { firstName: 'Shaq', lastName: 'Mand'} });  

### Using this.setState
`this.setState` only updates the keys that you pass it `setState({ name: 'Shaquille' })`, it will keep all the other keys the same  

The first argument is the updater callback function. You update the object(the state)   
You can also pass a callback to this.setState as the second argument callback function, this callback will run after the 1st callback   

for the first callback function, the first argument is state, the second is properties when you pass in the object  
```
Example 1:
this.setState((state, props) => {  
    return {  
        name : { firstName: 'Shaquille', lastName: 'Mandy'}  
    }  
}, () => {});


Example 2:
this.setState(
    (state, props) => {  
        return {  
            name : { firstName: 'Shaquille', lastName: 'Mandy'}  
        }  
    }, 
    () => {
       // this callback will only run after the first callback finishes
       console.log(this.state) 
    }
);
```

### Using Array.map()
Array.map() takes a callback function, the 1st argument of the callback is the current element of the array  
The callback function applys itself to every element in the array  
In this case it creates a H1 element with the monsters name for each monster
```
class App extends Component {
  constructor() {
    // calling ctor for Component
    super();

    // state is always a json object
    this.state = {
      // the elements have a id(key), so react can re-render, recognize different components and optimize better
      monsters: [
        { name: 'Linda', id: '12ae33ca' },
        { name: 'Frank', id: '12ae33cb' },
        { name: 'Jacky', id: '12ae33cc' },
        { name: 'Lizzy', id: '12ae33cd' },
      ],
    };

  }

  render () {
    return (
      <div className="App">
        {this.state.monsters.map((monster) => {
            return <h1 key={monster.id}>{monster.name}</h1>;
        })}
      </div>
    );
  }
}
```

### React and key elements for HTML elements
the elements have a id(key), so react can re-render, recognize different components and optimize better

### Single Page Applications (SPAs) w/ React
Reacts only changes what it needs to change and it does it w/o having to constantly refresh the entire webpage  
Once the webpage load, React has all the code and can intelligently CRUD components

### Lifecycle Method: componentDidMount
mounted is when the component is first placed(mounted) on the DOM  
this is a good place to add api fetches that need to be there on page load

### Hooks: useEffect
- Don't use setStateValue inside of a Fetch call because it will cause a `INFINITE RE-RENDER LOOP`
  - RETURNING AN ARRAY W/ A DIFFERENT MEMORY LOCATION EVERYTIME IT FETCHES  
    EVEN THOUGH THE VALUES ARE THE SAME IN THE ARRAY IT UPDATES STATE BC THE MEMORY LOCATION IS DIFFERENT

#### To Fix This Side Effect Caused By The Fetch Call We Use useEffect Hook
- ```
    // The 1st Arg is a Callback function, and it runs onces automatically upon mounting the component
    // 2nd Arg is a Array of Dependencies Array of Dependencies is usually a state or prop value
    // and if it changes it will run the 1st Arg Callback Function
    // because we don't ever want this Fetch call to re-run we won't put anything in the array of dependencies
    // this way the Fetch will never get re-ran from the 1st arg callback function, because there are no values
    // to update in the array of dependencies, if you only want something to run once, set array of dependencies to a empty array []

    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>  setMonsters(users));
    }, []);
  ```

### Input Search Box Component and Array.filter()
filter loops through each element, if the condition is true it keeps the element in the array  
if the condition is false it removes the element from the array  
Because Array.filter() modifies the array in place it's best practice to create a new array  

Example of using Array.filter()
```
<input 
    className='search-box' 
    type='search' 
    placeholder='search monsters' 
    onChange={(event) => {
    // event.target.value contains the text inside of the search box
    // make the search case insensitive
    const searchString = event.target.value.toLocaleLowerCase();
    
    // filter loops through each element, if the condition is true it keeps the element in the array
    // if the condition is false it removes the element from the array
    // array.filter() returns a new array
    const filteredMonsters = this.state.monsters.filter((monster) => {
        return monster.name.toLocaleLowerCase().includes(searchString);
    });

    this.setState((state, props) => {
        return { monsters: filteredMonsters };
    })
    
    }}
/>
```

### useReducer() 
Once state starts getting more complicated and you have multiple things being updating at once,
that is a good time to start using useReducer() instead of useState()

to use useReducer() you need a reducer function that takes as a argument a 'state object' and 'action object'
```
// reducers only store readable values, not functions(setters)
const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type ${action.type} in userReducer`)
  }
}
```

to use useReducer() you also need a INITIAL_STATE object
```
const INITIAL_STATE =  {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}
```

once you have both of these you can call the useReducer() function  
the useReducer() function return a array with the 1st element being a state object, the 2nd element is a dispatch() function
```
const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

// you can destructure from the state variable sense it's a object
  const { cartItems, isCartOpen, cartCount, cartTotal } = state;

// when you call the dispatch() function, it takes a 'ACTION object' as its only argument 
// everytime the dispatch() function is called, it executes the SWITCH logic in the reducer() function 
// the ACTION object has a key called 'type' and a optional 2nd key called 'payload'
dispatch({ 
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: { 
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal
    }
})
```

### Redux
#### you don't want useContext() and redux working together
This could make the state storage more complicated, because state would be stored in 2 different places

#### in Redux, when dispatch() is called, every reducer gets invoked. This does not happen with useReducer()
meaning that every reducer should return the previous state at the end of the switch statement

#### createSelector from reselect
using createSelector will mitigate some of the unnecessary re-renders and improve performance caused by redux sending out a dispatch to every reducer

#### Redux Folder Organizational Structure  
usually you will have the code split up into 3 - 4 files    
* reducer  
    - contains the const for INITIAL_STATE, the INITIAL_STATE will build upon the state that the rootReducer has
    - contains a start empty action object
    - contains the switch statement or other conditional logic that allows state to be altered based on a specific action.type  
* actions
    - everything in this file should return a action object with the properties 'type' and a optional property 'payload'
* types
    - just a object that we create so that we can utilize dot notation for the ACTION_TYPES, less prone to human error if done this way
* selector
    - this is where we pull the data off of the state from. The data can be transformed inside of this file, so that when you call useSelector and give it this selector, you get the data the way that you are expecting.


#### How to update the state
dispatch() along with a reducer will update the state  
you call dispatch and give it a action object with a 'type' and optional 'payload'  
dispatch calls every reducer and sends this action object to the reducers  
the state gets updated with the logic that you have inside of your reducer for that specific action.type  
#### using a selector  
```
// it's getting the state from the rootReducers state obj then going deeper into that specific 
// reducer's state object defined in that specific reducers INITIAL_STATE
export const selectCategoriesMap = (state) => (state.categories.categoriesMap)

// then when you need to access that specific state, you can use the useSelector hook
import { useSelector } from "react-redux";

// then choose the selector that has the state that you want access to
import { selectCategoriesMap } from "../../store/categories/categories.selector"

// now you have access to this state
const categoriesMap = useSelector(selectCategoriesMap)
```

#### using a action
```
// this action returns a action object with the 'type' and optional 'payload' properties
  export const setIsCartOpen = (boolean) => ({
    type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
    payload: boolean,
  });
  ```

#### using a type
```
// just a object that was created in order to help prevent human error when typing out the types that will be dispatched
export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "cart/SET_IS_CART_OPEN",
  SET_CART_ITEMS: "cart/SET_CART_ITEMS",
};
```

#### using a reducer
The reducer will need a INITIAL_STATE and action
```
import { CART_ACTION_TYPES } from './cart.types';

export const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      return state;
  }
};
```

#### Redux Persist
This will allow you to save state temporarily to user's browser using localStorage  
Can be very helpful with keeping users cart data without having to store that in a database  

Docs:
* https://www.npmjs.com/package/redux-persist  

```
// the 3 imports that you will need
import { persistStore, persistReducer } from "redux-persist";
import storage  from "redux-persist/lib/storage";
```
      
* persistReducer(config, reducer) -> takes in a persist config with required properties of key and storage, 2nd arg is a reducer, typically root  

```
const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
```  

* persistStore(store, [config, callback]) -> takes in a `store` object that you want to be persisted, the other array of args is optional  


* Now when you create the store you are going to use the persisted objects
```
// create the store with the persisted reducer
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
```
