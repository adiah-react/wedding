import { motion } from "framer-motion";
import { useState } from "react";
import Button from "../ui/button";

import { ArrowRight, Lock } from "lucide-react";
import { useInvitation } from "../../hooks/useInvitation";

const InvitationForm = ({ initialCode = "", onSuccess }) => {
  const [code, setCode] = useState(initialCode);
  const { login, isLoading, error } = useInvitation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    const success = await login(code);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700 uppercase tracking-widest"
          >
            Invitation Code
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              name="code"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="block-w-full pl-10 pr-3 py-3 border-b-2 border-gray-200 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:border-wedding-gold transition-colors font-serif text-xl"
              placeholder="ENTER CODE"
              autoComplete="off"
              disabled={isLoading}
            />
          </div>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm"
          >
            {error}
          </motion.p>
        )}

        <Button
          type="submit"
          disabled={isLoading || !code.trim()}
          className="w-full justify-between group"
        >
          {isLoading ? "Unlocking..." : "Unlock Invitation"}
          {!isLoading && (
            <ArrowRight className="w-4 h-2 ml-2 transition-transform group-hover:translate-x-1" />
          )}
        </Button>
      </form>

      <p className="mt-8 text-center text-xs text-gray-400 uppercase tracking-widest">
        Please enter the code found on your invitation
      </p>
    </div>
  );
};

export default InvitationForm;
