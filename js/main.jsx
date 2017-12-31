import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {


    const divStyle = {
        position: "clear:both"
    };




    class App extends React.Component{
        render(){
            return (
                <div>
                    <div id={"pojemnik"}>
                        <div id={"plansza"}></div>
                        <div id={"szubienica"}>
                            <img src={"img/s0.jpg"} />
                        </div>
                        <div id={"alfabet"}></div>
                        <div style={divStyle}></div>
                    </div>
                </div>
            );
        }
    }

    ReactDOM.render(
        <App />,
        document.querySelector('#app')
    );


});

