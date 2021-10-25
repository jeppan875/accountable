## Installation

    git clone https://github.com/jeppan875/accountable.git

Then install the dependencies inside of project root

    yarn && cd ios/ && pod install

## Running the project

Run project by running following command inside of project root

    yarn start

## Testing

    yarn test

Reducer tests https://redux.js.org/usage/writing-tests#reducers
are found within each reducer slice as test.spec.ts

react-test-renderer https://reactjs.org/docs/test-renderer.html

## Naming convention

- Place all top-level/higher-order navigation files in `screens`
- Place all lower-level and design components used in screens in `components`
- Utility functions are placed in `Utils`

## State management

State management are using redux and everything is defined inside `store` folder

Structure

> Name of redux slice
>
> > action.ts
> >
> > reducer.ts
> >
> > selector.ts
> >
> > types.ts
> >
> > test.spec.ts

Redux additional tools:
For normalizing data https://www.npmjs.com/package/normalizr

- for example the data filed in list reducer is normalized to:

```
{
    entities: {
        items: {
            [uuid: string]: Item;
        }
    }
    result: string[]
}
```

- For asynchronous dispatch https://www.npmjs.com/package/redux-thunk
- For selector memoization https://redux.js.org/usage/deriving-data-selectors#writing-memoized-selectors-with-reselect

## Navigation

For navigation react-navigation is used https://reactnavigation.org/
The navigation tree is defined in RootNavigator.tsx
import screens from the `screen` folder

## Theme

General styling theme is defined in theme.ts

## Test error

Uncomment on line 21 and 22 n action.ts
````
