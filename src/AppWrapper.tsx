import * as React from "react";
import Filters from "./filters/";
import Results from "./results/";
import Data from "./filters/data";
import { FilterTypes, Survey } from "./typings";
import { getSurveyData, objectEntries } from "./utils";

interface Props {}

interface State {
  // activeFilters?: [keyof Survey.Response, Survey.AllAnswers[]][];
  // answerCounts: FilterTypes.AnswersCounts;
  // answers: FilterTypes.SelectedAnswers;
  activeFilters?: [string, string[]][];
  answerCounts: {
    [x: string]: {
      [x: string]: number;
    };
  };
  answers: {
    [x: string]: {
      [x: string]: boolean;
    };
  };
  computedResponsesLength: number;
  failedToLoad?: boolean;
  filtering: boolean;
  innerHeight: number;
  isMobile: boolean;
  isColorBlind: boolean;
  loaded: boolean;
  // questionsShowing: FilterTypes.QuestionsShowing;
  questionsShowing: {
    [x: string]: boolean;
  };
  responses: {
    [x: string]: string | number;
  }[];
  responsesByPersonName: {
    [x: string]: any;
  };
  showFilters: boolean;
}

const QUESTIONS_KEYS = [
  // "timestamp",
    "naxx_interest",
    "naxx_cont_class_choice",
    "should_people_roll_different_spec",
    "which_raids_interest",
    "plan_to_take_break",
    "character_name",
    "tryhard_rating",
    "tryhard_rating_explaination",
    "ideal_spec_choices",
    "ideal_prof_choices",
    "secondary_spec_choices",
    "loot_systems_okay_with",
    "ideal_loot_system",
    "raid_days_per_week_count",
    "raid_day_time_slots",
    "interested_in_raid_leading",
    "content_interests",
    "leadership_interests",
    "tbc_guild_wants",
    "tbc_guild_concerns"
];

const answersBlank = QUESTIONS_KEYS.reduce((accum: { [x: string]: Object; }, key) => {
  accum[key] = {};

  return accum;
}, {});

const defaultShowingQuestions = QUESTIONS_KEYS.reduce((accum: { [x: string]: boolean; }, key) => {
  accum[key] = true;

  if (key === "timestamp" || key === "plan_to_take_break" || key === "character_name" || key === "tryhard_rating_explaination" || key === "tbc_guild_wants" || key === "tbc_guild_concerns") {
    accum[key] = false;
  }

  return accum;
}, {})

export default class Wrapper extends React.Component<Props, State> {
  public displayName = "Wrapper";

  constructor(props: Props) {
    super(props);

    this.state = {
      answers: {
        ...answersBlank
      } as any,
      answerCounts: this._calcAnswerQuantities([]) as any,
      computedResponsesLength: 0,
      filtering: false,
      innerHeight: window.innerHeight,
      isMobile: window.innerWidth < 480,
      isColorBlind: false,
      loaded: false,
      questionsShowing: {
        ...defaultShowingQuestions
      },
      responses: [],
      responsesByPersonName: [],
      showFilters: window.innerWidth > 480
    };

    this._calcAnswerQuantities = this._calcAnswerQuantities.bind(this);
    this._filterResults = this._filterResults.bind(this);
    this._isOtherAnswer = this._isOtherAnswer.bind(this)
    this._getAnswersTemplate = this._getAnswersTemplate.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.resetQuestionsShowing = this.resetQuestionsShowing.bind(this);
    this.toggleAnswerFilter = this.toggleAnswerFilter.bind(this);
    this.updateQuestionShowing = this.updateQuestionShowing.bind(this);
    this.updateFilterLive = this.updateFilterLive.bind(this);
  }

  _calcAnswerQuantities(responses: Survey.Response[]) {
    const answerCounts = responses.reduce((accum, response) => {
      // debugger;
      const respAsArray = objectEntries(response);

      respAsArray.forEach(([questionKey, ans]: string[]) => {
        if (questionKey === "timestamp") {
          return accum;
        }

        const answer = `${ans}`;

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

          subAnswers.forEach(subAnswer => {
            if (Data.hasOthers[questionKey] && subAnswer && subAnswer !== "Other" && this._isOtherAnswer(questionKey, subAnswer)) {
              if (!(accum as any)[questionKey]["Other"]) {
                (accum as any)[questionKey]["Other"] = 1;
              } else {
                (accum as any)[questionKey]["Other"]++;
              }
            }

            if (!accum[questionKey as keyof Survey.Response][subAnswer]) {
              accum[questionKey as keyof Survey.Response][subAnswer] = 1;
            } else {
              accum[questionKey as keyof Survey.Response][subAnswer]++;
            }
          });
        } else {
          if (Data.hasOthers[questionKey] && answer && answer !== "Other" && this._isOtherAnswer(questionKey, answer)) {
            if (!(accum as any)[questionKey]["Other"]) {
              (accum as any)[questionKey]["Other"] = 1;
            } else {
              (accum as any)[questionKey]["Other"]++;
            }
          }

          if (!accum[questionKey as keyof Survey.Response][answer]) {
            accum[questionKey as keyof Survey.Response][answer] = 1;
          } else {
            accum[questionKey as keyof Survey.Response][answer]++;
          }
        }

        return accum;
      });

      return accum;
    }, this._getAnswersTemplate());

    return answerCounts;
  }

  _getAnswersTemplate() {
    return objectEntries(Data.answers).reduce(
      (accum, [q, answers]) => {
        accum[q as keyof FilterTypes.AnswersCounts] = {};
        answers.forEach((a: string) => {
          accum[q as keyof FilterTypes.AnswersCounts][a] = 0;
        });
        return accum;
      },
      {} as FilterTypes.AnswersCounts
    );
  }

  _filterResults(results: Survey.Response[]) {
    return results.filter(
      item =>
        Data.factions[item.faction][item.class] &&
        Data.races[item.race][item.class] &&
        Data.factionRaces[item.faction][item.race]
    );
  }

  _getSurveyResults() {
    getSurveyData((error: Error | null, responses: Survey.Response[]) => {
      if (error) {
        this.setState({ failedToLoad: true });
        return;
      }

      // debugger;

      // const filteredResps = this._filterResults(responses);
      const filteredResps = responses;
      const responsesByPersonName = responses.reduce((accum: any, resp: any) => {
        if (!resp.character_name) {
          return accum;
        }

        accum[resp.character_name] = resp;

        return accum;
      }, {});

      const answerCounts: any = this._calcAnswerQuantities(filteredResps);
      this.setState({
        answerCounts,
        computedResponsesLength: filteredResps.length,
        responses: filteredResps as any,
        responsesByPersonName,
        loaded: true
      });
    });
  }

  _isOtherAnswer(question: string, answer: string) {
    if (!Data.hasOthers[question]) {
      return false;
    }

    return (Data.answers as { [x: string]: string[] })[question] && !(Data.answers as { [x: string]: string[] })[question].find(ans => ans === answer);
  }

  _setHeight() {
    // @ts-ignore
    if (this.timeoutID) {
      // @ts-ignore
      clearTimeout(this.timeoutID);
    }

    // @ts-ignore
    this.timeoutID = setTimeout(() => {
      this.setState({ innerHeight: window.innerHeight });
    }, 300);
  }

  componentDidMount() {
    this._getSurveyResults();
    window.addEventListener("resize", () =>
      this.setState({ innerHeight: window.innerHeight })
    );
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () =>
      this.setState({ innerHeight: window.innerHeight })
    );
  }

  public render() {
    if (this.state.failedToLoad) {
      return (
        <div className="main-wrapper">Survey Results Failed to load :(</div>
      );
    }

    if (!this.state.loaded) {
      return (
        <div className="loading-cont ">
          <h1 className="loading-message">Loadin' that sweet, sweet data...</h1>
          <h4 className="loading-message-sub">That means Survey Results</h4>
        </div>
      );
    }

    return (
      <div className="main-wrapper">
        {this.state.isMobile && (
          <button
            className="filters-toggle"
            onClick={() =>
              this.setState({ showFilters: !this.state.showFilters })
            }
          >
            {this.state.showFilters ? "Hide" : "Filters"}
          </button>
        )}

        {this.state.showFilters && (
          <Filters
            applyFilter={this.applyFilter}
            clearFilter={this.clearFilter}
            innerHeight={this.state.innerHeight}
            isColorBlind={this.state.isColorBlind}
            questionsShowing={this.state.questionsShowing as any}
            resetQuestionsShowing={this.resetQuestionsShowing}
            selectedAnswers={this.state.answers as any}
            toggleAnswer={this.toggleAnswerFilter}
            updateColorBlind={() =>
              this.setState({ isColorBlind: !this.state.isColorBlind })
            }
            updateQuestionsShowing={this.updateQuestionShowing}
          />
        )}

        {this.state.answerCounts && (
          <Results
            answerCounts={this.state.answerCounts as any}
            activeFilters={this.state.activeFilters as any}
            computedResponsesLength={this.state.computedResponsesLength}
            allResponsesCount={this.state.responses.length}
            innerHeight={this.state.innerHeight}
            isColorBlind={this.state.isColorBlind}
            questionsShowing={this.state.questionsShowing as any}
            responsesByPersonName={this.state.responsesByPersonName}
            updateFilterLive={this.updateFilterLive}
          />
        )}
      </div>
    );
  }

  applyFilter() {
    this.setState({ filtering: true }, () => {
      const { answers } = this.state;

      debugger;
      const questionsWithFilters = this.getFilters(answers as any);

      if (!questionsWithFilters.length) {
        return this.setState({
          activeFilters: [],
          filtering: false,
          answerCounts: this._calcAnswerQuantities(this.state
            .responses as any[]) as any,
          computedResponsesLength: (this.state.responses as any[])
            .length
        });
      }

      const computedResponses = this.getFilteredResponses(
        (this.state.responses as any[]) || [],
        questionsWithFilters
      );
      const answerCounts: any = this._calcAnswerQuantities(computedResponses);

      this.setState({
        activeFilters: questionsWithFilters,
        answerCounts,
        filtering: false,
        computedResponsesLength: computedResponses.length
      });
    });
  }

  clearFilter() {
    this.setState({
      answers: {
        ageRange: {},
        characterGender: {},
        class: {},
        classComparison: {},
        contentInterest: {},
        expectedTimeTo60: {},
        faction: {},
        firstRetailExpansionPlayed: {},
        hasActiveSub: {},
        hasPlayedPrivateServer: {},
        mostRecentExpansionPlayed: {},
        prof60: {},
        profLeveling: {},
        race: {},
        region: {},
        role: {},
        serverType: {},
        dailyPlayTime: {},
        willTakeTimeOffWork: {},
        hasFoundGuild: {},
        phaseMostExcitedFor: {}
      }
    });
  }

  getFilters(
    answers: FilterTypes.SelectedAnswers
  ): [keyof Survey.Response, Survey.AllAnswers[]][] {
    return objectEntries(answers).reduce(
      (accum, [questionKey, selectedAnswers]) => {
        const filteredAnswers = objectEntries(selectedAnswers as {
          [x: string]: boolean;
        })
          .filter(([__, isSelected]) => isSelected)
          .map(([answer]) => answer);

        if (filteredAnswers.length) {
          // @ts-ignore
          return accum.concat([[questionKey, filteredAnswers]]);
        }

        return accum;
      },
      []
    );
  }

  getFilteredResponses(
    responses: Survey.Response[],
    filters: [keyof Survey.Response, Survey.AllAnswers[]][]
  ) {
    return responses.filter(response => {
      return filters.every(([questionKey, selectedAnswers]) => {
        return (selectedAnswers as string[]).some(selectedAnswer => {
          if (
            (questionKey as string) === "which_raids_interest" ||
            (questionKey as string) === "ideal_spec_choices" ||
          (questionKey as string) === "ideal_prof_choices" ||
          (questionKey as string) === "secondary_spec_choices" ||
          (questionKey as string) === "loot_systems_okay_with" ||
          (questionKey as string) === "raid_day_time_slots" ||
          (questionKey as string) === "content_interests" ||
          (questionKey as string) === "leadership_interests"
          ) {
            // @ts-ignore
            return response[questionKey].includes(selectedAnswer);
          } else if ((questionKey as string) === "naxx_interest" || (questionKey as string) === "tryhard_rating" || (questionKey as string) === "raid_days_per_week_count") {
            if ((questionKey as string) === "naxx_interest") {
              if (selectedAnswer === "3") {
                return (response[questionKey] as any as number) >= 3;
              }
            }

            return `${response[questionKey]}` === selectedAnswer
          }

          return response[questionKey] === selectedAnswer;
        });
      });
    });
  }

  resetQuestionsShowing() {
    this.setState({
      questionsShowing: {
        ageRange: true,
        characterGender: true,
        class: true,
        classComparison: true,
        contentInterest: true,
        expectedTimeTo60: true,
        faction: true,
        firstRetailExpansionPlayed: true,
        hasActiveSub: true,
        hasPlayedPrivateServer: true,
        mostRecentExpansionPlayed: true,
        prof60: true,
        profLeveling: true,
        race: true,
        region: true,
        role: true,
        serverType: true,
        dailyPlayTime: true,
        willTakeTimeOffWork: true,
        hasFoundGuild: true,
        phaseMostExcitedFor: true
      }
    });
  }

  toggleAnswerFilter(
    answer: string,
    isSelected: boolean,
    type: keyof Survey.Response,
    callback?: () => void
  ) {
    const updatedSection = {
      ...this.state.answers[type],
      [answer]: !isSelected
    };

    this.setState(
      {
        answers: { ...this.state.answers, [type]: updatedSection }
      },
      () => {
        if (callback) {
          callback();
        }
      }
    );
  }

  updateQuestionShowing(question: string) {
    this.setState({
      questionsShowing: {
        ...this.state.questionsShowing,
        [question]: !this.state.questionsShowing[
          question as keyof FilterTypes.QuestionsShowing
        ]
      }
    });
  }

  updateFilterLive(category: keyof Survey.Response, filter: string) {
    this.toggleAnswerFilter(filter, true, category, () => this.applyFilter());
  }
}
