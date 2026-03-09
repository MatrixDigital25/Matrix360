export interface Enterprise {
  enterprise_id: number;
  organization_name: string;
  industry: string;
  region: string;
  strategic_priorities: string;
  created_at: string;
}

export interface Consultant {
  consultant_id: number;
  name: string;
  title: string;
  industry_expertise: string;
  strategic_specialization: string;
  region: string;
  years_experience: number;
  profile_photo?: string;
  bio?: string;
  created_at: string;
}

export interface StrategicChallenge {
  challenge_id: number;
  enterprise_id: number;
  industry: string;
  challenge_description: string;
  strategic_objective: string;
  timeline: string;
  region: string;
  created_at: string;
}

export interface Engagement {
  engagement_id: number;
  challenge_id: number;
  enterprise_id: number;
  status: string;
  start_date: string;
  created_at: string;
  consultants?: Consultant[];
}

export interface Deliverable {
  deliverable_id: number;
  engagement_id: number;
  title: string;
  status: string;
  due_date?: string;
  created_at: string;
}

export interface Meeting {
  meeting_id: number;
  engagement_id: number;
  title: string;
  scheduled_at: string;
  transcript?: string;
  created_at: string;
}

export interface Document {
  document_id: number;
  engagement_id: number;
  title: string;
  content?: string;
  created_at: string;
}

export interface AIInsight {
  insight_id: number;
  engagement_id: number;
  insight_type: string;
  content: string;
  created_at: string;
}
