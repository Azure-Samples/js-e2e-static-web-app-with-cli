import logo from '../logo.svg';

function PublicHome() {

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Please login with a provider above
                </p>
                <img src={logo} className="App-logo" alt="logo" />

            </header>
        </div>
    );
}
export default PublicHome;