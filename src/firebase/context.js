import React from "react"

export const FireBaseContext = React.createContext(null);

export const WithUserContextFireBase = (Component) => props => (
    <FireBaseContext.Consumer>
        {
            (firebase) => <Component {...props} fireBase={firebase} />
        }
    </FireBaseContext.Consumer>
);