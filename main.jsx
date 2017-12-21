import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {

    class MathQuestionGame extends React.Component{
        shuffle(a) {
            for (let i = a.length; i; i--) {
                let j = Math.floor(Math.random() * i);
                [a[i - 1], a[j]] = [a[j], a[i - 1]];
            }
        }
        rndMinMax(min, max){
            return Math.floor(Math.random() * (max - min) + min );
        }
        rndItemFromAr(items){
            return items[Math.floor(Math.random()*items.length)];
        }

        calc(numA, numB, sign) {
            switch(sign){
                case '+': return numA + numB;
                case '-': return numA - numB;
                case '*': return numA * numB;
            }
        }

        constructor(props){
            super(props);

            this.state = {
                numA:0,
                numB:0,
                sign:'',
                result:0,
                answers:[],
                canAnswer : true,
                text : null,
                secsLeft : 10,
                scores : 0,
                friendCalled: false,
            };
        }

        handleFriendCallClick = () => {
            this.setState({
                secsLeft : this.state.secsLeft + 30,
                friendCalled : true,
            });
        };

        startGame(){
            const numA = this.rndMinMax(1, 10 + this.state.scores * 10);
            const numB = this.rndMinMax(1, 10 + this.state.scores * 10);
            const sign = this.rndItemFromAr(['+', '-', '*']);
            const result = this.calc(numA, numB, sign);

            let answers = [result];

            for(let i = 0; i < 3; i++){
                let newNumber;
                do {
                    newNumber = this.rndMinMax(result-5, result+5);
                } while(answers.indexOf(newNumber) > -1);

                answers.push(newNumber);
            }

            this.shuffle(answers);

            this.setState({
                numA,
                numB,
                sign,
                result,
                answers,
                canAnswer : true,
                text : null,
                secsLeft : 10,
            });
        }

        finishGame(text, canPlayAgain = false){
            if (!canPlayAgain) {
                clearInterval(this.intervalId);
            }

            this.setState({
                canAnswer : false,
                text,
            });

            if (canPlayAgain){
                this.setState({
                    scores : this.state.scores + 1,
                });
                this.startGame();
            }
        }

        handleAnsSelect = n => {
            if (n === this.state.result){
                this.finishGame('Brawo!', true);
            } else {
                this.finishGame('Nieprawidłowa odpowiedź!');
            }
        };

        componentDidMount(){
            this.startGame();

            this.intervalId = setInterval(() => {
                this.setState({
                    secsLeft: this.state.secsLeft - 1,
                });
                if (this.state.secsLeft === 0){
                    this.finishGame('Koniec czasu!');
                }
            }, 1000);
        }

        componentWillUnmount(){
            clearInterval(this.intervalId);
        }

        render(){
            const btns = this.state.answers.map( n => {
                return <button
                    disabled={!this.state.canAnswer}
                    onClick={e => this.handleAnsSelect(n)}>
                    {n}
                </button>;
            });

            const h1 = this.state.text === null ? <h1>
                {this.state.numA} {this.state.sign} {this.state.numB} =
            </h1> : <h1>
                {this.state.text}
            </h1>;

            return <div>
                {h1}
                <div>
                    {btns}
                </div>
                <h2>Pozostało {this.state.secsLeft} sekund</h2>
                <h3>Punkty: {this.state.scores}</h3>
            </div>;
        }
    }






    class App extends React.Component{
        render(){
            return <MathQuestionGame/>
        }
    }

    ReactDOM.render(
        <App />,
        document.querySelector('#app')
    );


});