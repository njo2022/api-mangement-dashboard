export interface ApiKey {
  id: string;
  name: string;
  type: 'dev' | 'prod';
  key_value: string;
  usage_count: number;
  usage_percent: number;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  max_credits: number;
  price: number;
}

export interface Subscription {
  id: string;
  plan_id: string;
  current_usage: number;
  is_pay_as_you_go: boolean;
  subscription_plans?: SubscriptionPlan;
}

export interface ApiKeyFormData {
  name: string;
  type: 'dev' | 'prod';
}

export interface ToastState {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: (() => void) | null;
  type: 'warning' | 'danger' | 'info';
}
