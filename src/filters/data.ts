const colors = [
  "#C0392B", // dark-red
  "#2980B9", // dark-blue
  "#9B59B6", // dark-purple
  "#D35400", // dark-orange
  "#1E8449", // Dark Green
  // "#D4AC0D", // Lighter Dark Yellow
  "#B7950B", // Dark Yellow
  "#D98880", // light-red
  "#7FB3D5", // light-blue
  "#C39BD3", // light-purple
  "#F0B27A", // light-orange
  "#7DCEA0", // light-green
  "#B3B6B7", // light-grey

  "#C0392B", // dark-red
  "#2980B9", // dark-blue
  "#9B59B6", // dark-purple
  "#D35400", // dark-orange
  "#1E8449", // Dark Green
  // "#D4AC0D", // Lighter Dark Yellow
  "#B7950B", // Dark Yellow
  "#D98880", // light-red
  "#7FB3D5", // light-blue
  "#C39BD3", // light-purple
  "#F0B27A", // light-orange
  "#7DCEA0", // light-green
  "#B3B6B7", // light-grey

  "#C0392B", // dark-red
  "#2980B9", // dark-blue
  "#9B59B6", // dark-purple
  "#D35400", // dark-orange
  "#1E8449", // Dark Green
  // "#D4AC0D", // Lighter Dark Yellow
  "#B7950B", // Dark Yellow
  "#D98880", // light-red
  "#7FB3D5", // light-blue
  "#C39BD3", // light-purple
  "#F0B27A", // light-orange
  "#7DCEA0", // light-green
  "#B3B6B7" // light-grey
];

const colorBlindColors = [
  "#154360",
  "#1A5276",
  "#1F618D",
  "#1F618D",
  "#2980B9",
  "#5499C7",
  "#5DADE2",
  "#7FB3D5",
  "#85C1E9",
  
  "#154360",
  "#1A5276",
  "#1F618D",
  "#1F618D",
  "#2980B9",
  "#5499C7",
  "#5DADE2",
  "#7FB3D5",
  "#85C1E9",
  
  "#154360",
  "#1A5276",
  "#1F618D",
  "#1F618D",
  "#2980B9",
  "#5499C7",
  "#5DADE2",
  "#7FB3D5",
  "#85C1E9",
];

const colorsObj = {
  Druid: "#FF7D0A",
  Hunter: "#ABD473",
  Mage: "#40C7EB",
  Paladin: "#F58CBA",
  Priest: "#858585",
  Rogue: "#F1C40F",
  Shaman: "#0070DE",
  Warlock: "#8787ED",
  Warrior: "#C79C6E",
  DK: "#C41F3B",
  DH: "#A330C9",
  Monk: "#00FF96",
  alt1: "tomato",
  alt2: "blanchedalmond"
};

const questions = [
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

const hasOthers: { [x: string]: boolean; } = {
  naxx_interest: false,
  naxx_cont_class_choice: true,
  should_people_roll_different_spec: false,
  which_raids_interest: false,
  plan_to_take_break: true,
  character_name: true,
  tryhard_rating: false,
  tryhard_rating_explaination: true,
  ideal_spec_choices: false,
  ideal_prof_choices: false,
  secondary_spec_choices: false,
  loot_systems_okay_with: true,
  ideal_loot_system: true,
  raid_days_per_week_count: false,
  raid_day_time_slots: false,
  interested_in_raid_leading: false,
  content_interests: false,
  leadership_interests: true,
  tbc_guild_wants: true,
  tbc_guild_concerns: true
};

const titles: { [x: string]: string } = {
  // timestamp: "",
  naxx_interest: "How interested are you in continuing to raid Naxxramas?",
  naxx_cont_class_choice: "If at all interested in continuing to raid Naxxramas, what character setup would you want to raid as? (If different Class/Spec list which which Class/Spec combo in Other)",
  should_people_roll_different_spec: "What is your initial reaction to the idea of People being able to change their \"Main Spec\", and in extension roll as \"Main Spec\" on items to be used in PrePatch and/or TBC? (i.e. a Resto Shaman rolling on Enhancement Gear as Main Spec in prep for TBC, etc.)",
  which_raids_interest: "Regardless of your answer to the above 2 questions, which Raids would you be interested in running on a consistent basis during Pre-Patch gear up yourself and others new Mains for TBC?",
  plan_to_take_break: "Do you plan on taking a break from WoW Classic before the Dark Portal opens?",
  character_name: "Your current player name? (that we would know you by: i.e., Frugo, Colossus, Jooda, etc.)",
  tryhard_rating: "Overall would you describe your PvE (Raiding) plans for TBC more as \"Tryhard/Focused\" or as \"Casual\"",
  tryhard_rating_explaination: "If you wouldn't mind, please briefly explain your answer to the last question.",
  ideal_spec_choices: "Ideally, what Specialization(s) (and in extension what class) do you want to Raid as? (Selecting multiple implies you would be equally interested in either)",
  ideal_prof_choices: "Which Primary Professions do you intend to take on your main Raiding character (if it is your ideal class/spec)?",
  secondary_spec_choices: "If you intend to have any other 70s you would be interested in raiding with (either in a 2nd raid group or less ideal choice for main raid), what Specialization(s) would you want to raid as?",
  loot_systems_okay_with: "Which Loot systems are you comfortable with (select all you are comfortable with)",
  ideal_loot_system: "Which Loot System Would you prefer most?",
  raid_days_per_week_count: "How many days per week are you able and interested in raiding?",
  raid_day_time_slots: "Which time slots are you available/willing to raid consistently? (times below should be interpreted as Server Time; PST/PDT)",
  interested_in_raid_leading: "Are you interested in taking part in Raid Leading and/or helping out with Raid Organization?",
  content_interests: "What content are you interested in",
  leadership_interests: "If at all, what Leadership position(s) in <Little Dragons> are you interested in pursuing during TBC? (Leave blank if you are not interested in any)",
  tbc_guild_wants: "What do you want out of the Guild in TBC?",
  tbc_guild_concerns: "Any Concerns for the Guild in TBC? (Questions can be asked in Discord)"
};

export default {
  answers: {
    timestamp: [""],
    naxx_interest: [
      "1",
      "2",
      "3"
    ],
    naxx_cont_class_choice: [
      "Current \"Main\" (who I've been raiding Naxx with), SAME specialization",
      "Other"
    ],
    should_people_roll_different_spec: [
      "Sounds good to me!",
      "Yes, if there are some restrictions",
      "No, people should only get to roll Main Spec with their current Role and Spec in the raid"
    ],
    which_raids_interest: [
      "Molten Core",
      "Blackwing Lair",
      "Zul Gurub",
      "AQ20",
      "AQ40",
      "Naxxramas",
    ],
    plan_to_take_break: [""],
    character_name: [""],
    tryhard_rating: [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    tryhard_rating_explaination: [""],
    ideal_spec_choices: [
      "Protection (Warrior)",
      "Arms/Fury",
      "Frost",
      "Fire",
      "Arcane",
      "Resto (Druid)",
      "Feral Tank",
      "Feral DPS",
      "Balance",
      "Holy (Priest)",
      "Discipline (Priest)",
      "Shadow",
      "Warlock PvE DPS spec",
      "Rogue PvE DPS spec",
      "Resto (Shaman)",
      "Elemental",
      "Enhancement",
      "Holy (Paladin)",
      "Retribution",
      "Protection (Paladin)",
      "Beast Mastery",
      "Survival",
      "Marksman"
    ],
    ideal_prof_choices: [
      "Tailoring",
      "Leatherworking",
      "Blacksmithing",
      "Herbalism",
      "Skinning",
      "Mining",
      "Engineering",
      "Jewelcrafting",
      "Alchemy",
      "Enchanting"
    ],
    secondary_spec_choices: [
      "Protection (Warrior)",
      "Arms/Fury",
      "Frost",
      "Fire",
      "Arcane",
      "Resto (Druid)",
      "Feral Tank",
      "Feral DPS",
      "Balance",
      "Holy (Priest)",
      "Discipline (Priest)",
      "Shadow",
      "Warlock PvE DPS spec",
      "Rogue PvE DPS spec",
      "Resto (Shaman)",
      "Elemental",
      "Enhancement",
      "Holy (Paladin)",
      "Retribution",
      "Protection (Paladin)",
      "Beast Mastery",
      "Survival",
      "Marksman"
    ],
    loot_systems_okay_with: [
      "MS>OS (how we did it in Vanilla Classic)",
      "Loot Council",
      "DKP",
      "Other"
    ],
    ideal_loot_system: [
      "MS>OS (how we did it in Vanilla Classic)",
      "Loot Council",
      "DKP",
      "Other"
    ],
    raid_days_per_week_count: [
      "1",
      "2",
      "3+"
    ],
    raid_day_time_slots: [
      "Monday (evening)",
      "Tuesday (evening)",
      "Wednesday (evening)",
      "Thursdayday (evening)",
      "Friday (evening)",
      "Saturday (morning)",
      "Saturday (afternoon)",
      "Saturday (evening)",
      "Sunday (morning)",
      "Sunday (afternoon)",
      "Sunday (evening)",
    ],
    interested_in_raid_leading: [
      "Yes",
      "No",
    ],
    content_interests: [
      "Raiding",
      "Heroic Dungeons",
      "RP Event",
      "PVP/Arenas",
      "Playing the Auction House/Accumulating Gold",
      "Perpetually Leveling Alts",
      "Making/Playing \"Twinks\"",
      "[ Unofficial ] Achievement Hunting",
    ],
    leadership_interests: [
      "Officer",
      "Class Leader",
      "Loot Council (If such exists)",
      "Other"
    ],
    tbc_guild_wants: [
      ""
    ],
    tbc_guild_concerns: [
      ""
    ]
  },
  colors,
  colorBlindColors,
  colorsObj,
  factions: {
    ["For the Horde!"]: {
      Shaman: true,
      Rogue: true,
      Priest: true,
      Warrior: true,
      Paladin: false,
      Mage: true,
      Warlock: true,
      Hunter: true,
      Druid: true
    },
    ["For the Alliance!"]: {
      Shaman: false,
      Rogue: true,
      Priest: true,
      Warrior: true,
      Paladin: true,
      Mage: true,
      Warlock: true,
      Hunter: true,
      Druid: true
    }
  },
  hasOthers,
  questions,
  factionRaces: {
    ["For the Horde!"]: {
      Human: false,
      Dwarf: false,
      ["Night Elf"]: false,
      Gnome: false,
      Orc: true,
      Undead: true,
      Tauren: true,
      Troll: true
    },
    ["For the Alliance!"]: {
      Human: true,
      Dwarf: true,
      ["Night Elf"]: true,
      Gnome: true,
      Orc: false,
      Undead: false,
      Tauren: false,
      Troll: false
    }
  },
  races: {
    Human: {
      Shaman: false,
      Rogue: true,
      Priest: true,
      Warrior: true,
      Paladin: true,
      Mage: true,
      Warlock: true,
      Hunter: false,
      Druid: false
    },
    Dwarf: {
      Shaman: false,
      Rogue: true,
      Priest: true,
      Warrior: true,
      Paladin: true,
      Mage: false,
      Warlock: false,
      Hunter: true,
      Druid: true
    },
    ["Night Elf"]: {
      Shaman: false,
      Rogue: true,
      Priest: true,
      Warrior: true,
      Paladin: false,
      Mage: false,
      Warlock: false,
      Hunter: true,
      Druid: true
    },
    Gnome: {
      Shaman: false,
      Rogue: true,
      Priest: false,
      Warrior: true,
      Paladin: false,
      Mage: true,
      Warlock: true,
      Hunter: false,
      Druid: false
    },
    Orc: {
      Shaman: true,
      Rogue: true,
      Priest: false,
      Warrior: true,
      Paladin: false,
      Mage: false,
      Warlock: true,
      Hunter: true,
      Druid: false
    },
    Undead: {
      Shaman: false,
      Rogue: true,
      Priest: true,
      Warrior: true,
      Paladin: false,
      Mage: true,
      Warlock: true,
      Hunter: false,
      Druid: false
    },
    Tauren: {
      Shaman: true,
      Rogue: false,
      Priest: false,
      Warrior: true,
      Paladin: false,
      Mage: false,
      Warlock: false,
      Hunter: true,
      Druid: true
    },
    Troll: {
      Shaman: true,
      Rogue: true,
      Priest: true,
      Warrior: true,
      Paladin: false,
      Mage: true,
      Warlock: false,
      Hunter: true,
      Druid: false
    }
  },
  titles
};
