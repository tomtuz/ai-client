import { createContext, ReactNode, useContext, useReducer } from 'react';

interface State {
  count: number;
  user: string | null;
}

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_USER'; payload: string }
  | { type: 'CLEAR_USER' };

const initialState: State = {
  count: 0,
  user: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'CLEAR_USER':
      return { ...state, user: null };
    default:
      return state;
  }
}

const StateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export function StateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // return (
  //   <Provider value={{ state, dispatch }}>
  //     {children}
  //   </Provider>
  // );
}

export function useState() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useState must be used within a StateProvider');
  }
  return context;
}
