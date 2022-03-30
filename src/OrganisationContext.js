import React, { useContext, useState } from 'react';

const OrganisationContext = React.createContext();
const OrganisationUpdateContext = React.createContext();

export const useOrganisation = () => {
    return useContext(OrganisationContext);
}

export const useOrganisationUpdate = () => {
    return useContext(OrganisationUpdateContext);
}

function OrganisationProvider({children}) {
    const [ organisation, setOrganisation ] = useState(null);

    const updateOrganisation = (orgObject) => {
        setOrganisation(orgObject);
    }

    return (
        <OrganisationContext.Provider value={organisation}>
            <OrganisationUpdateContext.Provider value={updateOrganisation}>
                {children}
            </OrganisationUpdateContext.Provider>
        </OrganisationContext.Provider>
    )

}

export default OrganisationProvider