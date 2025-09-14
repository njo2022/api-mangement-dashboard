import { Subscription } from '@/types/dashboard';

interface PlanCardProps {
  subscription: Subscription | null;
  loading: boolean;
  onTogglePayAsYouGo: () => void;
  onManagePlan: () => void;
}

export function PlanCard({ subscription, loading, onTogglePayAsYouGo, onManagePlan }: PlanCardProps) {
  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="text-3xl font-bold mb-4">Loading...</div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="text-3xl font-bold mb-4">No Plan</div>
      </div>
    );
  }

  const usagePercentage = Math.min(
    ((subscription.current_usage || 0) / (subscription.subscription_plans?.max_credits || 1000)) * 100,
    100
  );

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl p-6 text-white">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-2">CURRENT PLAN</h2>
          <div className="text-3xl font-bold mb-4">
            {subscription.subscription_plans?.name || 'Researcher'}
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-90">API Usage</span>
              <span className="text-sm font-medium">
                {subscription.current_usage || 0}/{subscription.subscription_plans?.max_credits || 1000} Credits
              </span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300" 
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm">Pay as you go</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input 
                type="checkbox" 
                name="toggle" 
                id="toggle" 
                checked={subscription.is_pay_as_you_go}
                onChange={onTogglePayAsYouGo}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" />
            </div>
          </div>
        </div>
        
        <button 
          onClick={onManagePlan}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-4 py-2 rounded-lg font-medium transition-all"
        >
          Manage Plan
        </button>
      </div>
    </div>
  );
}
