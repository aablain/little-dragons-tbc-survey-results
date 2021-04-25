import * as React from "react";

import "./bargraph.scss";

interface Props {
  answers: { color: string; title: string; value: number }[];
  totalAnswers: number;
}

interface State {}

export default class BarGraph extends React.Component<Props> {
  public displayName = "BarGraph";

  constructor(props: Props) {
    super(props);

    this._getLargestNumber = this._getLargestNumber.bind(this)
    this.getAnswerWidth = this.getAnswerWidth.bind(this);
  }

  _getLargestNumber(): number {
    if (!this.props.answers) {
      return this.props.totalAnswers;
    }

    const largestNumber = this.props.answers.reduce((curLargestNumber: number, answer) => {
      return curLargestNumber >= answer.value ? curLargestNumber : answer.value;
    }, 0);

    return largestNumber + 2 > this.props.totalAnswers ? this.props.totalAnswers : largestNumber + 2;
  }

  public render() {
    const topEndNumber = this._getLargestNumber();

    return (
      <div className="bar-graph">
        {this.props.answers &&
          this.props.answers.map(
            answer =>
              !!answer.value && (
                <p
                  className="answer-bar"
                  data-content={`${answer.title || "(No Answer)"}: ${
                    answer.value
                  } (${this.getAnswerWidth(answer, topEndNumber)}%)`}
                  key={answer.title}
                  style={{
                    width: `${this.getAnswerWidth(answer, topEndNumber)}%`,
                    backgroundColor: answer.color
                  }}
                />
              )
          )}
        <p className="bar-graph-range">
          <span>0</span>
          <span>{topEndNumber}</span>
        </p>
      </div>
    );
  }

  getAnswerWidth(answer: { color: string; title: string; value: number }, topEndNumber: number) {
    return ((answer.value / topEndNumber) * 100).toFixed(2);
  }
}
