export interface LoginLog {
  id: string;
  email: string;
  ip_address?: string;
  status: "success" | "failed";
  created_at: string;
};