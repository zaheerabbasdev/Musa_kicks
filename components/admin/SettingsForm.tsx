"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface SettingsFormProps {
  initialSettings: Record<string, string>;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    site_name: initialSettings.site_name ?? "Musa Kicks",
    whatsapp_number: initialSettings.whatsapp_number ?? "+92300000000",
    shipping_fee: initialSettings.shipping_fee ?? "250",
    free_shipping_threshold: initialSettings.free_shipping_threshold ?? "10000",
    loyalty_required_orders: initialSettings.loyalty_required_orders ?? "4",
    loyalty_reward_title: initialSettings.loyalty_reward_title ?? "Special Musa Kicks Gift",
    loyalty_reward_description:
      initialSettings.loyalty_reward_description ??
      "Congratulations! You've unlocked an exclusive gift from Musa Kicks.",
    store_address: initialSettings.store_address ?? "Islamabad, Pakistan",
    currency_code: initialSettings.currency_code ?? "PKR",
    currency_symbol: initialSettings.currency_symbol ?? "Rs.",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to save settings");
      }

      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {saved && (
        <div className="p-4 rounded-xl bg-success/10 border border-success/30 text-success text-sm flex items-center gap-2">
          <FontAwesomeIcon icon={faCheckCircle} />
          <span>Site settings successfully updated!</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm">
          {error}
        </div>
      )}

      {/* General & WhatsApp */}
      <div className="card p-6 space-y-4">
        <h2 className="text-lg font-bold">General Store Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              Store Name
            </label>
            <input
              type="text"
              value={formData.site_name}
              onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              WhatsApp Concierge Number (with country code)
            </label>
            <input
              type="text"
              value={formData.whatsapp_number}
              onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
              className="input w-full"
              placeholder="+923000000000"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">
            Store Physical Location
          </label>
          <input
            type="text"
            value={formData.store_address}
            onChange={(e) => setFormData({ ...formData, store_address: e.target.value })}
            className="input w-full"
          />
        </div>
      </div>

      {/* Shipping & Currency */}
      <div className="card p-6 space-y-4">
        <h2 className="text-lg font-bold">Shipping & Currency</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              Default Shipping Fee
            </label>
            <input
              type="number"
              min="0"
              value={formData.shipping_fee}
              onChange={(e) => setFormData({ ...formData, shipping_fee: e.target.value })}
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              Free Shipping Threshold
            </label>
            <input
              type="number"
              min="0"
              value={formData.free_shipping_threshold}
              onChange={(e) => setFormData({ ...formData, free_shipping_threshold: e.target.value })}
              className="input w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              Currency Code
            </label>
            <input
              type="text"
              value={formData.currency_code}
              onChange={(e) => setFormData({ ...formData, currency_code: e.target.value })}
              className="input w-full uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              Currency Symbol
            </label>
            <input
              type="text"
              value={formData.currency_symbol}
              onChange={(e) => setFormData({ ...formData, currency_symbol: e.target.value })}
              className="input w-full"
            />
          </div>
        </div>
      </div>

      {/* Loyalty Program Rules */}
      <div className="card p-6 space-y-4">
        <h2 className="text-lg font-bold">Loyalty Program Settings</h2>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">
            Orders Required to Unlock Reward
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={formData.loyalty_required_orders}
            onChange={(e) => setFormData({ ...formData, loyalty_required_orders: e.target.value })}
            className="input w-32"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">
            Reward Title
          </label>
          <input
            type="text"
            value={formData.loyalty_reward_title}
            onChange={(e) => setFormData({ ...formData, loyalty_reward_title: e.target.value })}
            className="input w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">
            Reward Description & Instructions
          </label>
          <textarea
            rows={3}
            value={formData.loyalty_reward_description}
            onChange={(e) => setFormData({ ...formData, loyalty_reward_description: e.target.value })}
            className="input w-full py-2.5 resize-none"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faFloppyDisk} />
          <span>{loading ? "Saving Settings..." : "Save Settings"}</span>
        </button>
      </div>
    </form>
  );
}
