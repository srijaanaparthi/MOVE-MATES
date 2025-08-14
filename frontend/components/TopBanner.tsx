import { AlertTriangle } from "lucide-react";

export function TopBanner() {
  return (
    <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-cyan-500 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <span className="font-medium text-sm sm:text-base">
            You are on an experimental build. Features are WIP.
          </span>
        </div>
      </div>
    </div>
  );
}
