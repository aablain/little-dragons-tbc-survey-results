import * as React from "react";
import PieChart from "react-minimal-pie-chart";
import BarGraph from "./bargraph";
import { objectEntries } from "../utils";
import Data from "../filters/data";
import { Survey } from "../typings";

interface Props {
  idx: number;
  isColorBlind: boolean;
  answerCounts: {
    [x: string]: number;
  };
  question: keyof Survey.Response;
  totalAnswers: number;
}

interface State {
  counts: {
    title: string;
    value: number;
    color: string;
  }[];
  otherCounts: {
    title: string;
    value: number;
    color: string;
  }[];
  countsArr?: [string, number][];
  showOtherAnswers: boolean;
}

export default class Result extends React.Component<Props, State> {
  public displayName = "Result";

  constructor(props: Props) {
    super(props);

    const [counts, otherCounts] = this._pullOtherAnswersOut(props.answerCounts);

    this.state = {
      // counts: this._getCountsAsArray(props.answerCounts),
      counts,
      otherCounts,
      showOtherAnswers: false,
      //   countsArr: this._getCountsAssARrayofArrays(props.answerCounts)
    };

    this._isOtherAnswer = this._isOtherAnswer.bind(this)
    this._pullOtherAnswersOut = this._pullOtherAnswersOut.bind(this)
    this.getColor = this.getColor.bind(this);
    this.getChartType = this.getChartType.bind(this);
    this.renderBarGraph = this.renderBarGraph.bind(this);
    this.renderPieChart = this.renderPieChart.bind(this);
  }

  _getCountsAsArray(answerCounts: {
    [x: string]: number;
  }): {
    title: string;
    value: number;
    color: string;
  }[] {
    return (objectEntries(answerCounts) as [string, number][]).map(
      ([key, value], idx) => ({
        title: key,
        value,
        color: this.getColor(idx, key)
      })
    );
  }

  _isOtherAnswer(question: string, answer: string) {
    if (!Data.hasOthers[question]) {
      return false;
    }

    return (Data.answers as { [x: string]: string[] })[question] && !(Data.answers as { [x: string]: string[] })[question].find(ans => ans === answer);
  }

  _pullOtherAnswersOut(answerCounts: {
    [x: string]: number;
  }) {
    if (!Data.hasOthers[this.props.question as any]) {
      return [
        this._getCountsAsArray(answerCounts),
        []
      ];
    }

    const [answers, otherAnswers] = (objectEntries(answerCounts) as [string, number][]).reduce(
      ([answrs, othAnswrs]: any[][], [key, value], idx) => {
        if (this._isOtherAnswer(this.props.question, key)) {
          othAnswrs.push({
            title: key,
            value,
            color: this.getColor(othAnswrs.length, key)
          } as any);
        } else {
          answrs.push({
            title: key,
            value,
            color: this.getColor(answrs.length, key)
          } as any);
        }
      //   return {
      //   title: key,
      //   value,
      //   color: this.getColor(idx, key)
      // }

      return [answrs, othAnswrs];
    }, [[], []] as any[][]
    );

    return [answers, otherAnswers];
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.answerCounts !== prevProps.answerCounts ||
      this.props.isColorBlind !== prevProps.isColorBlind
    ) {
      const [counts, otherCounts] = this._pullOtherAnswersOut(this.props.answerCounts);

      this.setState({
        // counts: this._getCountsAsArray(this.props.answerCounts)
        counts,
        otherCounts
      });
    }
  }

  public render() {
    const hasOtherAnswers = Data.hasOthers[this.props.question as any];

    return (
      <div className={`result-cont ${!this.props.totalAnswers && "no-answers"}`} id={this.props.question}>
        <h4 className="result-title">{Data.titles[this.props.question]}?</h4>
        <div className="info-cont">
          {this.props.totalAnswers ? (
            this.getChartType() === "BarChart"
              ? this.renderBarGraph()
              : this.renderPieChart()
          ) : (
            <div>
              <h3>No Answers</h3>
            </div>
          )}

          <ul className="stats-list-cont">
            {!!this.state.counts.length &&
              this.state.counts.map(({ color, title, value }) => (
                <li
                  className={`result-text${!value ? " none-match" : ""}`}
                  key={title}
                  style={{
                    color
                    // textDecoration: !value ? "line-through" : ""
                  }}
                >
                  <span className="result-text-title">{title || "(No Answer)"}:</span>{" "}
                  <span className="result-text-value">
                    {value} -{" "}
                    <span
                      className="result-text-value-percentage"
                      style={{
                        borderColor: color
                        // backgroundColor: color
                      }}
                    >
                      {((value / this.props.totalAnswers) * 100).toFixed(2)}%
                    </span>
                  </span>
                </li>
              ))}
          </ul>

          {hasOtherAnswers && <div>
            <button className="result-showother-button" onClick={() => this.setState({ showOtherAnswers: !this.state.showOtherAnswers })}>Show "Other" Answers</button>
          </div>}

          {this.state.showOtherAnswers && (
            <>
              {!!this.state.otherCounts.length ? (
                 <ul className="stats-list-cont">
                 {this.state.otherCounts.map(({ color, title, value }) => (
                     <li
                       className={`result-text${!value ? " none-match" : ""}`}
                       key={title}
                       style={{
                         color
                         // textDecoration: !value ? "line-through" : ""
                       }}
                     >
                       <span className="result-text-title">{title || "(No Answer)"}:</span>{" "}
                       <span className="result-text-value">
                         {value} -{" "}
                         <span
                           className="result-text-value-percentage"
                           style={{
                             borderColor: color
                             // backgroundColor: color
                           }}
                         >
                           {((value / this.props.totalAnswers) * 100).toFixed(2)}%
                         </span>
                       </span>
                     </li>
                   ))}
               </ul>
              ) : (
                <div>
                  <h3>No Answers Fit This Description passing the filter</h3>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  getColor(idx: number, key: string): string {
    if (this.props.isColorBlind) {
      return Data.colorBlindColors[idx];
    }

    return this.props.question === "class"
      ? (Data.colorsObj as { [x: string]: string })[key]
      : Data.colors[idx];
  }

  getChartType(): "PieChart" | "BarChart" {
    // "naxx_interest",
    // "naxx_cont_class_choice",
    // "should_people_roll_different_spec",
    // "which_raids_interest",
    // "plan_to_take_break",
    // "character_name",
    // "tryhard_rating",
    // "tryhard_rating_explaination",
    // "ideal_spec_choices",
    // "ideal_prof_choices",
    // "secondary_spec_choices",
    // "loot_systems_okay_with",
    // "ideal_loot_system",
    // "raid_days_per_week_count",
    // "raid_day_time_slots",
    // "interested_in_raid_leading",
    // "content_interests",
    // "leadership_interests",
    // "tbc_guild_wants",
    // "tbc_guild_concerns"
    switch (this.props.question as string) {
      case "which_raids_interest":
      case "ideal_spec_choices":
      case "ideal_prof_choices":
      case "secondary_spec_choices":
      case "loot_systems_okay_with":
      case "raid_day_time_slots":
      case "leadership_interests":
        return "BarChart";
      default:
        return "PieChart";
    }
  }

  renderBarGraph() {
    return (
      <BarGraph
        answers={this.state.counts}
        totalAnswers={this.props.totalAnswers}
      />
    );
  }

  renderPieChart() {
    const props = {
      data: this.state.counts,
      label: label,
      labelPosition: 114,
      labelStyle: {
        fontSize: "8x"
      }
    };

    // @ts-ignore
    return <PieChart {...props} />;
  }
}

const label = (labelProps: {
  dx: number;
  dy: number;
  data: { color: string; percentage: number }[];
  dataIndex: number;
  key: string;
  textAnchor: string;
  x: number;
  y: number;
}) => {
  const percent = labelProps.data[labelProps.dataIndex].percentage;
  return (
    <text
      className="chart-result-percent"
      textAnchor={labelProps.textAnchor}
      alignmentBaseline="middle"
      dx={labelProps.dx}
      dy={labelProps.dy}
      fill={labelProps.data[labelProps.dataIndex].color}
      key={labelProps.key}
      x={labelProps.x}
      y={labelProps.y}
    >
      {percent ? `${percent.toFixed(2)}%` : ""}
    </text>
  );
};
