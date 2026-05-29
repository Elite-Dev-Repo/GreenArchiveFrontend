import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Loader2, Plus, Key, Copy, CheckCircle2 } from "lucide-react";
import { fetchApiKeys, createApiKey, type ApiKey } from "../lib/data";

interface CreatedKey {
  name: string;
  key: string;
  created: string;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [newName, setNewName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createdKey, setCreatedKey] = useState<CreatedKey | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setKeys(await fetchApiKeys());
      } catch {
        toast.error("Failed to load API keys");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const generate = async () => {
    if (!newName.trim()) return;
    setGenerating(true);
    try {
      const data = await createApiKey(newName);
      setKeys((prev) => [data as ApiKey, ...prev]);
      setShowModal(false);
      setNewName("");
      setCreatedKey({ name: data.name, key: data.key!, created: (data as Record<string, string>).created });
    } catch {
      toast.error("Failed to create API key");
    } finally {
      setGenerating(false);
    }
  };

  const copyKey = async () => {
    if (!createdKey) return;
    await navigator.clipboard.writeText(createdKey.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dismissKey = () => {
    setCreatedKey(null);
    setCopied(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-lime" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-black-condensed text-heading text-ink">API KEYS</h1>
          <p className="font-body text-muted mt-1">Manage your GreenArchive API access keys</p>
        </div>
        <button onClick={() => setShowModal(true)} className="pill-btn px-5 py-3 text-sm flex items-center gap-2">
          <Plus size={18} />
          Generate New Key
        </button>
      </div>

      {keys.length === 0 ? (
        <div className="card-outline p-16 text-center">
          <div className="w-16 h-16 bg-lime/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Key size={28} className="text-muted" />
          </div>
          <h2 className="font-black-condensed text-2xl text-ink">No API keys yet</h2>
          <p className="font-body text-muted mt-2 max-w-sm mx-auto">
            Generate your first key to start querying the GreenArchive API.
          </p>
          <button onClick={() => setShowModal(true)} className="pill-btn px-6 py-3 mt-6 text-sm">
            Generate Your First Key
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-ink/10">
                <th className="font-body text-xs font-bold text-muted uppercase tracking-wider text-left py-3 px-4">Name</th>
                <th className="font-body text-xs font-bold text-muted uppercase tracking-wider text-left py-3 px-4 hidden md:table-cell">Created At</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((k, i) => (
                <tr key={i} className="border-b border-ink/5 hover:bg-lime/5 transition-colors">
                  <td className="py-4 px-4 font-body font-semibold text-ink">{k.name}</td>
                  <td className="py-4 px-4 font-body text-sm text-muted hidden md:table-cell">
                    {new Date(k.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-ink/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-cream border-2 border-ink/10 rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="font-black-condensed text-2xl text-ink">New API Key</h2>
            <p className="font-body text-sm text-muted mt-1 mb-4">Give your key a descriptive name.</p>
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              className="w-full px-4 py-3 bg-white border-2 border-ink/10 rounded-xl font-body text-ink placeholder:text-muted/50 focus:outline-none focus:border-lime transition-colors"
              placeholder="e.g. Production"
            />
            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => { setShowModal(false); setNewName(""); }} className="flex-1 font-body font-semibold text-muted px-4 py-2.5 border-2 border-ink/10 rounded-full hover:bg-ink/5 transition-colors">
                Cancel
              </button>
              <button onClick={generate} disabled={generating || !newName.trim()} className="flex-1 pill-btn px-4 py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                {generating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                Generate
              </button>
            </div>
          </div>
        </div>
      )}

      {createdKey && (
        <div className="fixed inset-0 bg-ink/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-cream border-2 border-ink/10 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="font-black-condensed text-2xl text-ink">API Key Created</h2>
            <p className="font-body text-sm text-red-500 font-semibold mt-2">
              This key will only be shown once. Save it somewhere safe!
            </p>
            <div className="mt-4 p-4 bg-white border-2 border-lime/40 rounded-xl break-all font-mono text-sm text-ink select-all">
              {createdKey.key}
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={dismissKey} className="flex-1 font-body font-semibold text-muted px-4 py-2.5 border-2 border-ink/10 rounded-full hover:bg-ink/5 transition-colors">
                Done
              </button>
              <button onClick={copyKey} className="flex-1 pill-btn px-4 py-2.5 text-sm flex items-center justify-center gap-2">
                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy Key"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
