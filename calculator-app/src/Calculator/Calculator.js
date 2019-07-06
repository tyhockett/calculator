import React, { PureComponent } from "react";
import styles from "./Calculator.module.scss";

class Calculator extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            output: "0",
            operator: "",
            previousValue: 0,
            operatorEntered: false
        };
      }

    appendValue(value) {
        if (this.state.output === "0" || this.state.operatorEntered) {
            this.setState({
                output: value,
                operatorEntered: false
            });
        } else {
            this.setState({
                output: this.state.output + value
            });
        }
    }

    clearValue() {
        this.setState({
            output: "0"
        });
    }

    setPreviousValue() {
        if (this.state.output.includes(".")) {
            this.setState({
                previousValue: parseFloat(this.state.output)
            });
        } else {
            this.setState({
                previousValue: parseInt(this.state.output)
            });
        }
    }

    getCurrentValue() {
        let result = 0;
        if (this.state.output.includes(".")) {
            result = parseFloat(this.state.output);
        } else {
            result = parseInt(this.state.output);
        }
        return result;
    }

    setOperator(operator) {
        this.setPreviousValue();
        this.setState({
            operator: operator,
            operatorEntered: true
        });
    }

    solve() {
        let result = 0;

        switch (this.state.operator) {
            default:
            case "+":
                result = this.state.previousValue + this.getCurrentValue();
                break;

            case "-":
                result = this.state.previousValue - this.getCurrentValue();
                break;

            case "/":
                result = this.state.previousValue / this.getCurrentValue();
                break;

            case "*":
                result = this.state.previousValue * this.getCurrentValue();
                break;
        }

        this.setState({
            output: result.toString()
        });
    }

    changePolarity() {
        this.setState({
            output: (this.getCurrentValue() * -1).toString()
        });
    }

    changeToPercent() {
        this.setState({
            output: (this.getCurrentValue() / 100).toString()
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.readout}>
                        <div className={styles.output}>{this.state.output}</div>
                    </div>
                    <div className={styles.buttons}>
                        <div
                            onClick={() => this.clearValue()}
                            className={styles.grayButton}
                        >
                            C
                        </div>
                        <div
                            onClick={() => this.changePolarity()}
                            className={styles.grayButton}
                        >
                            +/-
                        </div>
                        <div
                            onClick={() => this.changeToPercent()}
                            className={styles.grayButton}
                        >
                            %
                        </div>
                        <div
                            onClick={() => this.setOperator("/")}
                            className={styles.orangeButton}
                        >
                            ÷
                        </div>
                        <div onClick={() => this.appendValue("7")}>7</div>
                        <div onClick={() => this.appendValue("8")}>8</div>
                        <div onClick={() => this.appendValue("9")}>9</div>
                        <div
                            onClick={() => this.setOperator("*")}
                            className={styles.orangeButton}
                        >
                            ×
                        </div>
                        <div onClick={() => this.appendValue("4")}>4</div>
                        <div onClick={() => this.appendValue("5")}>5</div>
                        <div onClick={() => this.appendValue("6")}>6</div>
                        <div
                            onClick={() => this.setOperator("-")}
                            className={styles.orangeButton}
                        >
                            −
                        </div>
                        <div onClick={() => this.appendValue("1")}>1</div>
                        <div onClick={() => this.appendValue("2")}>2</div>
                        <div onClick={() => this.appendValue("3")}>3</div>
                        <div
                            onClick={() => this.setOperator("+")}
                            className={styles.orangeButton}
                        >
                            +
                        </div>
                        <div
                            className={styles.zero}
                            onClick={() => this.appendValue("0")}
                        >
                            0
                        </div>
                        <div onClick={() => this.appendValue(".")}>.</div>
                        <div
                            onClick={() => this.solve()}
                            className={styles.orangeButton}
                        >
                            =
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator;
