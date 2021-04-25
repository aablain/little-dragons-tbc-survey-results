import * as React from 'react';
import Data from "../filters/data";
import { getSurveyData, objectEntries } from "../utils";

interface Props {
    response: any;
};

export default (props: Props) => {
    const [responseAsArr, updateAsArr] = React.useState(objectEntries(props.response));

    React.useEffect(() => {
        updateAsArr(objectEntries(props.response));
    }, [props.response]);

    if (!responseAsArr) {
        return (
            <h3>Data not found??</h3>
        );
    }

    return (
      <div className='result-person-response'>
          <h2 className="result-person-response-name">{props.response && props.response.character_name}</h2>
          <ul className='result-person-response-questions-list'>
            {responseAsArr.map(([question, answer]) => (
                <li className='result-person-response-question-item'>
                    <span  className='result-person-response-question-title'>{Data.titles[question]}</span>
                    {answerText(question, answer)}
                </li>
            ))}
          </ul>
      </div>
  )
}

function answerText(questionKey: string, answer: string) {
    if (
        questionKey === "which_raids_interest" ||
        questionKey === "ideal_prof_choices" ||
        questionKey === "ideal_spec_choices" ||
        questionKey === "secondary_spec_choices" ||
        questionKey === "loot_systems_okay_with" ||
        questionKey === "raid_day_time_slots" ||
        questionKey === "content_interests" ||
        questionKey === "leadership_interests"
      ) {
          const subAnswers = answer.split(";");

          return (
              <ul>
                  {subAnswers.map(subAnswer => (
                    <li className="result-person-response-question-answer">{subAnswer || "(No Answer)"}</li>
                  ))}
              </ul>
          );
      } else {
          return (
              <ul>
                  <li className="result-person-response-question-answer">{answer || "(No Answer)"}</li>
              </ul>
          );
      }
}