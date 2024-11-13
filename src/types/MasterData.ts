// BUSINESS UNIT
export type BUValues = {
  bu_name: string;
  bu_code: string;
  is_active: boolean;
  created_by: string;
};

// TERMS PP
export type TermsPPValues = {
  terms: string;
  pp: string;
  updated_by: string;
};

// SHORT BRIEF
export type BriefValues = {
  short_brief_name: string;
  updated_by: string;
};

// CRITERIA
export type CriteriaValues = {
  criteria_name: string;
  minimum_score: number;
  maximum_score: number;
  is_active: boolean;
};

export type CriteriaType = CriteriaValues & {
  id: string;
  category_fk: string;
  created_by: string;
  created_date: Date;
};

export type CategoryValues = {
  value_code: string;
  value_name: string;
  created_by: string;
  criteria: CriteriaValues[];
};
