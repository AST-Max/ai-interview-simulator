import React from "react";
import { JOB_ROLES } from "../../config/constants";

export default function RoleSelector({ value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Target Job Role</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full border border-surfaceBorder bg-darker text-heading rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary [color-scheme:dark]"
      >
        <option value="">Select a role</option>
        {JOB_ROLES.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
}
