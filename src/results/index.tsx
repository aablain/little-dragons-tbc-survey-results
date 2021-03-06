import * as React from "react";
import Modal from "react-modal";
import Data from "../filters/data";
import Result from "./result";
import SurveyResponse from "./surveyResponse";
import { FilterTypes, Survey } from "../typings";
import { objectEntries } from "../utils";

Modal.setAppElement("#modal-anchor");

import "./styles.scss";
import data from "../filters/data";

interface Props {
  activeFilters?: [keyof Survey.Response, Survey.AllAnswers[]][];
  answerCounts: FilterTypes.AnswersCounts;
  computedResponsesLength: number;
  allResponsesCount: number;
  innerHeight: number;
  isColorBlind: boolean;
  questionsShowing: FilterTypes.QuestionsShowing;
  responsesByPersonName: {
    [x: string]: any;
  };
  updateFilterLive: (category: keyof Survey.Response, filter: string) => void;
}

export default (props: Props) => {
  const [showResultDialogue, updateShowResultDialogue] = React.useState(false);
  const [surveyResponse, updateSurveyResponse] = React.useState<any>(undefined);

  const filtersLength = !!props.activeFilters ? props.activeFilters.length : 0;
  const characterNames = objectEntries((props.answerCounts as any).character_name).filter(([name, count]) => !!count && !!name && name !== "Other").map(([name]) => name);

  return (
    <div className="results-main-cont" style={{ height: props.innerHeight }}>
      <h1 className="results-title">Results</h1>
      <h3 className="results-subtitle">
        {props.computedResponsesLength} Responses match your filters,
        Representing{" "}
        {(
          (props.computedResponsesLength / props.allResponsesCount) *
          100
        ).toFixed(2)}
        % of respondees
      </h3>
      {props.activeFilters && !!props.activeFilters.length && (
        <p>
          Filtering for{" "}
          {props.activeFilters.map(([category, catFilters], catIdx) => {
            return (
              <React.Fragment key={category}>
                <span
                  style={{
                    color: props.isColorBlind
                      ? data.colorBlindColors[catIdx]
                      : data.colors[catIdx]
                  }}
                >
                  {catFilters.map((filter, idx) => <React.Fragment key={filter}>{" "}<span className="results-subtitle-filter-opt" style={{
                    backgroundColor: props.isColorBlind
                      ? data.colorBlindColors[catIdx]
                      : data.colors[catIdx]
                  }}>{filter} <span className="results-subtitle-filter-remove-btn" role="button" onClick={() => props.updateFilterLive(category, filter)}>x</span></span></React.Fragment>
                  )}{" "}
                </span>{" "}
                {catIdx + 1 !== filtersLength ? " and " : ""}
              </React.Fragment>
            );
          })}
        </p>
      )}
      <div className="results-results-cont">
        {Data.questions.map((questionKey, idx) =>
          props.questionsShowing[
            questionKey as keyof FilterTypes.QuestionsShowing
          ] ? (
            <Result
              idx={idx}
              isColorBlind={props.isColorBlind}
              key={questionKey}
              question={questionKey as keyof Survey.Response}
              answerCounts={
                props.answerCounts[questionKey as keyof Survey.Response]
              }
              totalAnswers={props.computedResponsesLength}
            />
          ) : (
            <span key={questionKey} />
          )
        )}

        <section className="results-results-people-list-cont">
          <ul className="results-results-people-list">
            {characterNames.map(personName =>  (
              <li className="results-results-people-list-name" key={`peoplelist-${personName}`}>
                <button className="results-results-people-list-name-btn" onClick={() => {
                  const response = props.responsesByPersonName[personName];

                  updateSurveyResponse(response);
                  updateShowResultDialogue(true);
                }}>
                  {personName}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Modal
        isOpen={showResultDialogue}
        onRequestClose={() => updateShowResultDialogue(false)}
        contentLabel="Survey Response"
        className="result-survey-response-modal"
      >
        <SurveyResponse response={surveyResponse} />
      </Modal>
    </div>
  );
};
