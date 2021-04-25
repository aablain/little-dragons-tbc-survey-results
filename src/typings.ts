export namespace Survey {
  export type AgeRangeResp =
    | "Under 18"
    | "18 - 24"
    | "25 - 34"
    | "35 - 44"
    | "44 - 55"
    | "55+";
  export type FactionResp = "For the Alliance!" | "For the Horde!";
  export type ClassResp =
    | "Shaman"
    | "Rogue"
    | "Priest"
    | "Warrior"
    | "Paladin"
    | "Mage"
    | "Warlock"
    | "Hunter"
    | "Druid";
  export type CharacterGenderResp = "Male" | "Female";
  export type RoleResp = "DPS" | "Healer" | "Tank";
  export type ServerTypeResp = "PvP" | "PvE" | "RP" | "RP-PvP";
  export type RegionResp = "Americas" | "Oceanas" | "Europe" | "Asia";
  export type RaceResp =
    | "Human"
    | "Dwarf"
    | "Night Elf"
    | "Gnome"
    | "Orc"
    | "Undead"
    | "Tauren"
    | "Troll";
  export type Expansion =
    | "Vanilla"
    | "The Burning Crusade"
    | "Wrath of the Lich King"
    | "Cataclysm"
    | "Mists of Pandaria"
    | "Warlords of Draenor"
    | "Legion"
    | "Battle for Azeroth";
  export type Profession =
    | "Alchemy"
    | "Blacksmithing"
    | "Enchanting"
    | "Engineering"
    | "Herbalism"
    | "Leatherworking"
    | "Mining"
    | "Skinning"
    | "Tailoring";
  export type YesNo = "Yes" | "No";
  export type ClassComparisonResp =
    | "I will be rolling the same class as my previous main"
    | "I will be rolling a class I have played extensively, but did not main"
    | "I will be rolling a new class, or one that I played minimally";
  export type ExpectedTimeTo60Resp =
    | "< 1 week"
    | "1 - 2 weeks"
    | "2 - 4 weeks"
    | "1 - 2 months"
    | "2 - 4 months"
    | "4 - 6 months"
    | "6+ months";
  export type Content =
    | "Questing"
    | "Dungeons"
    | "World PvP"
    | "Battlegrounds"
    | "Raids"
    | "Role Playing"
    | "Colecting items/recipes/wealth"
    | "Barrens Chat";

  export type DailyPlayTimeResp = "1 - 2 hours" | "3 - 4 hours" | "5 - 6 hours" | "7 - 8 hours" | "9 - 10 hours" | "11 - 12 hours" | "12+ hours";

  export type TimeOffWorkResp = "Yes, I have taken a week or more off for Classic's launch" | "I have no other obligations" | "No, I do not plan to take time off";

  export type GuildResp = "Yes" | "No, and I am not currently looking" | "No, though I am currently looking";

  export type PhaseResp = "Phase 1" | "Phase 2" | "Phase 3" | "Phase 4" | "Phase 5" | "Phase 6";

  export type AllAnswers =
    | AgeRangeResp
    | CharacterGenderResp
    | ClassResp
    | ClassComparisonResp
    | ExpectedTimeTo60Resp
    | FactionResp
    | Expansion
    | YesNo
    | RaceResp
    | RegionResp
    | RoleResp
    | ServerTypeResp | DailyPlayTimeResp | TimeOffWorkResp | GuildResp | PhaseResp
    | string;
    
  export interface Response {
    ageRange: AgeRangeResp;
    characterGender: CharacterGenderResp;
    class: ClassResp;
    classComparison: ClassComparisonResp;
    contentInterest: string;
    expectedTimeTo60: ExpectedTimeTo60Resp;
    faction: FactionResp;
    firstRetailExpansionPlayed: Expansion;
    hasActiveSub: YesNo;
    hasPlayedPrivateServer: YesNo;
    mostRecentExpansionPlayed: Expansion;
    prof60: string;
    profLeveling: string;
    race: RaceResp;
    region: RegionResp;
    role: RoleResp;
    serverType: ServerTypeResp;
    dailyPlayTime: DailyPlayTimeResp;
    willTakeTimeOffWork: TimeOffWorkResp;
    hasFoundGuild: GuildResp;
    phaseMostExcitedFor: PhaseResp;
  }
}

// "timestamp",
//     "naxx_interest",
//     "naxx_cont_class_choice",
//     "should_people_roll_different_spec",
//     "which_raids_interest",
//     "plan_to_take_break",
//     "character_name",
//     "tryhard_rating",
//     "tryhard_rating_explaination",
//     "ideal_spec_choices",
//     "ideal_prof_choices",
//     "secondary_spec_choices",
//     "loot_systems_okay_with",
//     "ideal_loot_system",
//     "raid_days_per_week_count",
//     "raid_day_time_slots",
//     "interested_in_raid_leading",
//     "content_interests",
//     "leadership_interests",
//     "tbc_guild_wants",
//     "tbc_guild_concerns"

export namespace FilterTypes {
  export interface SelectedAnswers {
    ageRange: {
      [x: string]: boolean;
    };
    characterGender: {
      [x: string]: boolean;
    };
    class: {
      [x: string]: boolean;
    };
    classComparison: {
      [x: string]: boolean;
    };
    contentInterest: {
      [x: string]: boolean;
    };
    expectedTimeTo60: {
      [x: string]: boolean;
    };
    faction: {
      [x: string]: boolean;
    };
    firstRetailExpansionPlayed: {
      [x: string]: boolean;
    };
    hasActiveSub: {
      [x: string]: boolean;
    };
    hasPlayedPrivateServer: {
      [x: string]: boolean;
    };
    mostRecentExpansionPlayed: {
      [x: string]: boolean;
    };
    prof60: {
      [x: string]: boolean;
    };
    profLeveling: {
      [x: string]: boolean;
    };
    race: {
      [x: string]: boolean;
    };
    region: {
      [x: string]: boolean;
    };
    role: {
      [x: string]: boolean;
    };
    serverType: {
      [x: string]: boolean;
    };
    dailyPlayTime: {
      [x: string]: boolean;
    };
    willTakeTimeOffWork: {
      [x: string]: boolean;
    };
    hasFoundGuild: {
      [x: string]: boolean;
    };
    phaseMostExcitedFor: {
      [x: string]: boolean;
    };
    leadership_interests: {
      [x: string]: boolean;
    };
    tbc_guild_wants: {
      [x: string]: boolean;
    };
    tbc_guild_concerns: {
      [x: string]: boolean;
    };
  }

  export interface AnswersCounts {
    ageRange: {
      [x: string]: number;
    };
    characterGender: {
      [x: string]: number;
    };
    class: {
      [x: string]: number;
    };
    classComparison: {
      [x: string]: number;
    };
    contentInterest: {
      [x: string]: number;
    };
    expectedTimeTo60: {
      [x: string]: number;
    };
    faction: {
      [x: string]: number;
    };
    firstRetailExpansionPlayed: {
      [x: string]: number;
    };
    hasActiveSub: {
      [x: string]: number;
    };
    hasPlayedPrivateServer: {
      [x: string]: number;
    };
    mostRecentExpansionPlayed: {
      [x: string]: number;
    };
    prof60: {
      [x: string]: number;
    };
    profLeveling: {
      [x: string]: number;
    };
    race: {
      [x: string]: number;
    };
    region: {
      [x: string]: number;
    };
    role: {
      [x: string]: number;
    };
    serverType: {
      [x: string]: number;
    };
    dailyPlayTime: {
      [x: string]: number;
    },
    willTakeTimeOffWork: {
      [x: string]: number;
    },
    hasFoundGuild: {
      [x: string]: number;
    },
    phaseMostExcitedFor: {
      [x: string]: number;
    }
    leadership_interests: {
      [x: string]: number;
    }
    tbc_guild_wants: {
      [x: string]: number;
    }
    tbc_guild_concerns: {
      [x: string]: number;
    }
  }

  export interface QuestionsShowing {
    ageRange: boolean;
    characterGender: boolean;
    class: boolean;
    classComparison: boolean;
    contentInterest: boolean;
    expectedTimeTo60: boolean;
    faction: boolean;
    firstRetailExpansionPlayed: boolean;
    hasActiveSub: boolean;
    hasPlayedPrivateServer: boolean;
    mostRecentExpansionPlayed: boolean;
    prof60: boolean;
    profLeveling: boolean;
    race: boolean;
    region: boolean;
    role: boolean;
    serverType: boolean;
    dailyPlayTime: boolean;
    willTakeTimeOffWork: boolean;
    hasFoundGuild: boolean;
    phaseMostExcitedFor: boolean;
    leadership_interests: boolean;
    tbc_guild_wants: boolean;
    tbc_guild_concerns: boolean;
  }
}
