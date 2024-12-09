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

// SERIES
export type SeriesValues = {
  series_name: string;
  is_active: boolean;
};

export type SeriesType = SeriesValues & {
  id: string;
};

// FUNCTION MENU
export type FMValues = {
  fm_code?: string;
  fm_name: string;
  is_active: boolean;
};

export type AnswerProps = {
  text?: string;
  image_url?: string;
  point?: number;
};

export type QuestionProps = {
  question: {
    seq: number;
    layout_type: string;
    input_text: string;
    input_image_url: string;
  };
  answers: Array<{ text?: string; image_url?: string; point: number }>;
  admin?: boolean;
};

export type Page = {
  name: string;
  path: string;
  icon: string;
};
