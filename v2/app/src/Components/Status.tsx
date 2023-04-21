
import { useEffect, useRef, useState } from 'react';

function Status({ user }:any) {

    const [envvars, setEnvVars] = useState([]);
    const mountFlag = useRef(false)

    useEffect(() => {
        const fetchData = async () => {
            if (user?.userDetails) {
                mountFlag.current = true;
                const data = await fetch(`/api/status`);
                const json = await data.json();
                setEnvVars(json);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
            <p>Hi {user?.userDetails.toLowerCase().split(' ').map(x=>x[0].toUpperCase()+x.slice(1)).join(' ')}</p>
            {JSON.stringify(envvars)}
            </header>
        </div>
    );
}
export default Status;