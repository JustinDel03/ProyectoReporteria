export interface Conversation {
  conversation_id: string;
  conversation_start: string;
  conversation_end: string;   
  originating_direction: string;
  conversation_initiator?: string;
  media_stats_min_conversation_mos: number;
  media_stats_min_conversation_r_factor: number;
  division_ids: string[];
  resolution_times: any[];
  participants: Participant[];
  sessions: Session[];
  media_endpoint_stats: MediaEndpointStat[];
  metrics: Metric[];
  segments_data: Segment[];
}

export interface Participant {
  participant_id: string;
  external_contact_id?: string;
  participant_name?: string;
  purpose: string;
  user_id?: string;
}

export interface Session {
  session_id: string;
  direction: string;
  media_type: string;
  peer_id?: string;
  provider: string;
  recording?: boolean;
  requested_routings: string[];
  selected_agent_id?: string;
  ani: string;
  dnis: string;
  address_from?: string;
  address_to?: string;
  address_other?: string;
  address_self?: string;
  journey_customer_id?: string;
  journey_customer_id_type?: string;
  journey_customer_session_id?: string;
  journey_customer_session_id_type?: string;
  session_dnis: string;
  flow_id?: string;
  flow_name?: string;
  flow_type?: string;
  flow_version?: string;
  starting_language?: string;
  ending_language?: string;
  entry_reason?: string;
  entry_type?: string;
  exit_reason?: string;
  transfer_target_address?: string;
  transfer_target_name?: string;
  transfer_type?: string;
  flow_in_type?: string;
}

export interface MediaEndpointStat {
  codecs: string[];
  event_time: string;
  max_latency_ms: number;
  min_mos: number;
  min_r_factor: number;
  received_packets: number;
  discarded_packets?: number;
}

export interface Metric {
  name: string;
  emit_date: string;
  value: number;
}

export interface Segment {
  segment_start: string;
  segment_end: string;
  segment_type: string;
  conference: boolean;
  disconnect_type?: string;
  queue_id?: string;
  requested_language_id?: string;
  subject?: string;
  wrap_up_code?: string;
  sip_response_codes: number[];
}
