import React from 'react';

const HeaderMenu = () => {
    return (
        <div className="main-container">
            <div className="main">
                <header>
                    <div className="overlay">
                        <div className="inner">
                            <h2 className="titleMenu">Autogestionate</h2>
                            <p>
                                Ten conciencia de cómo se mueve tu dinero, 
                                para ahorrar dándole un buen uso.
                            </p>
                            <button className="btnMenu">Read more</button>
                        </div>
                    </div>
                </header>
            </div>

            <div className="shadow one"></div>
            <div className="shadow two"></div>
        </div>
    );
}
export default HeaderMenu;