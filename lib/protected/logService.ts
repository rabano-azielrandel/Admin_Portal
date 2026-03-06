import { createClient } from "../supabase/server";

export async function insertLogs({
  id,
  email,
  event_type,
  status,
  ip_address,
  device,
  user_agent,
}: {
  id: string | null;
  email: string;
  event_type: string;
  status: string;
  ip_address: string;
  device: string;
  user_agent: string;
}) {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("log_auth_event",{
        p_user_id: id,
        p_email: email,
        p_event_type: event_type,
        p_status: status,
        p_ip_address: ip_address,
        p_device: device,
        p_user_agent: user_agent,
    });

    if (error) throw new Error(error.message);

    return data;
}