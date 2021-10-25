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

## Naming convention

- Place all top-level/higher-order navigation files in `screens`
- Place all lower-level and design components used in screens in `components`

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
