import React, { createContext, ReactElement, useState } from 'react';
import { State } from 'react-burger-menu';

// make a new context
export const BurgerContext = createContext({
  isMenuOpen: false,
  toggleMenu: () => {},
  stateChangeHandler: (state: State) => {},
});

// create the provider
export const BurgerProvider = (props: { children: ReactElement }) => {
  const [menuOpenState, setMenuOpenState] = useState(false);

  return (
    <BurgerContext.Provider
      value={{
        isMenuOpen: menuOpenState,
        toggleMenu: () => setMenuOpenState(!menuOpenState),
        stateChangeHandler: (newState: State) => setMenuOpenState(newState.isOpen),
      }}
    >
      {props.children}
    </BurgerContext.Provider>
  );
};
