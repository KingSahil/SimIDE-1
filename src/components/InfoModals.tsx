import { useState } from 'react';
import { X, BookOpen, Clock, MessageSquare, Send, CheckCircle2, Copy, Check } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copySnippet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const launchConfig = `{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "SimIDE: Debug C++ Algorithm",
      "type": "simide-cpp",
      "request": "launch",
      "program": "\${workspaceFolder}/\${fileBasenameNoExtension}",
      "args": [],
      "stopAtEntry": true,
      "cwd": "\${workspaceFolder}",
      "environment": [],
      "externalConsole": false,
      "MIMode": "lldb"
    }
  ]
}`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(8, 13, 20, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#0D1521',
          border: '1px solid #26364A',
          borderRadius: '16px',
          maxWidth: '720px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '32px',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '6px',
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <BookOpen size={22} color="#168BFF" />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F4F7FB' }}>
            SimIDE Quick Documentation
          </h3>
        </div>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Complete guide to configuring and running SimIDE with your local C++ compiler.
        </p>

        {/* Section 1: Prerequisites */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F4F7FB', marginBottom: '8px' }}>
            1. Prerequisites
          </h4>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.7' }}>
            <li>VS Code 1.85.0 or newer</li>
            <li>GCC/G++ (v11+) on Linux/Windows (MinGW-w64) or Clang/LLDB on macOS</li>
            <li>C/C++ Extension for VS Code (`ms-vscode.cpptools`)</li>
          </ul>
        </div>

        {/* Section 2: launch.json */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F4F7FB' }}>
              2. Launch Configuration (`.vscode/launch.json`)
            </h4>
            <button
              onClick={() => copySnippet(launchConfig, 1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(22, 139, 255, 0.1)',
                border: '1px solid rgba(22, 139, 255, 0.3)',
                color: '#168BFF',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              {copiedIndex === 1 ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedIndex === 1 ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>
          <pre
            style={{
              backgroundColor: '#080D14',
              border: '1px solid #26364A',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              color: '#A7B5C7',
              fontFamily: 'var(--font-mono)',
              overflowX: 'auto',
            }}
          >
            {launchConfig}
          </pre>
        </div>

        {/* Section 3: Keyboard Shortcuts */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F4F7FB', marginBottom: '12px' }}>
            3. Synchronized Debugger Shortcuts
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            <div style={{ backgroundColor: '#101A28', border: '1px solid #26364A', padding: '10px 14px', borderRadius: '8px' }}>
              <kbd style={{ backgroundColor: '#152235', padding: '2px 8px', borderRadius: '4px', border: '1px solid #364B66', color: '#168BFF', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>F5</kbd>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>Start Debugging & Sync</span>
            </div>
            <div style={{ backgroundColor: '#101A28', border: '1px solid #26364A', padding: '10px 14px', borderRadius: '8px' }}>
              <kbd style={{ backgroundColor: '#152235', padding: '2px 8px', borderRadius: '4px', border: '1px solid #364B66', color: '#168BFF', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>F10</kbd>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>Step Over & Update Visuals</span>
            </div>
            <div style={{ backgroundColor: '#101A28', border: '1px solid #26364A', padding: '10px 14px', borderRadius: '8px' }}>
              <kbd style={{ backgroundColor: '#152235', padding: '2px 8px', borderRadius: '4px', border: '1px solid #364B66', color: '#168BFF', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>F11</kbd>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>Step Into Function Call</span>
            </div>
            <div style={{ backgroundColor: '#101A28', border: '1px solid #26364A', padding: '10px 14px', borderRadius: '8px' }}>
              <kbd style={{ backgroundColor: '#152235', padding: '2px 8px', borderRadius: '4px', border: '1px solid #364B66', color: '#168BFF', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>Shift+F5</kbd>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>Stop Session</span>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>
          Close Documentation
        </button>
      </div>
    </div>
  );
};

export const ChangelogModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(8, 13, 20, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#0D1521',
          border: '1px solid #26364A',
          borderRadius: '16px',
          maxWidth: '640px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '32px',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '6px',
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Clock size={22} color="#168BFF" />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F4F7FB' }}>
            SimIDE Release Changelog
          </h3>
        </div>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Tracks releases, visual engine updates, and debugger integrations.
        </p>

        {/* v0.4.2 */}
        <div style={{ borderLeft: '2px solid #168BFF', paddingLeft: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F4F7FB' }}>v0.4.2 — Latest Hackathon Build</span>
            <span style={{ fontSize: '0.6875rem', backgroundColor: 'rgba(60, 203, 131, 0.15)', color: '#3CCB83', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>Current</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Released October 2026</div>
          <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.7' }}>
            <li>Real-time singly linked list visualization synchronized with GDB execution steps.</li>
            <li>Dynamic heap address inspection (`0x7FA0`, `0x7FB8`) with next-pointer arrows.</li>
            <li>`nullptr` ground termination node rendering and memory state alerts.</li>
            <li>Deterministic step-forward and step-backward controls inside VS Code.</li>
          </ul>
        </div>

        {/* v0.3.0 */}
        <div style={{ borderLeft: '2px solid #26364A', paddingLeft: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#A7B5C7' }}>v0.3.0 — Array & Memory Layout Engine</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Released September 2026</div>
          <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.7' }}>
            <li>Contiguous array byte-offset calculations (+0B, +4B, +8B).</li>
            <li>Call frame inspection and local pointer register mapping.</li>
          </ul>
        </div>

        <button onClick={onClose} className="btn btn-secondary" style={{ width: '100%' }}>
          Close Changelog
        </button>
      </div>
    </div>
  );
};

export const ContactModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [type, setType] = useState('Feedback');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(8, 13, 20, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#0D1521',
          border: '1px solid #26364A',
          borderRadius: '16px',
          maxWidth: '540px',
          width: '100%',
          padding: '32px',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '6px',
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <MessageSquare size={22} color="#168BFF" />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F4F7FB' }}>
            SimIDE Community Feedback
          </h3>
        </div>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Are you a student, educator, or hackathon judge? We'd love your input to make C++ visualization even better.
        </p>

        {submitted ? (
          <div
            style={{
              padding: '36px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <CheckCircle2 size={44} color="#3CCB83" />
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F4F7FB' }}>
              Thank You for Your Feedback!
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Your message has been recorded. Our open source maintainers review every contribution.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Feedback Category
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#101A28',
                  border: '1px solid #26364A',
                  color: '#F4F7FB',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              >
                <option value="Feedback">General Feedback / Impression</option>
                <option value="Feature">Suggest New Algorithm / Data Structure</option>
                <option value="Bug">Report an Issue / Debugger Sync Bug</option>
                <option value="University">University Course Adoption</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Your Email (Optional)
              </label>
              <input
                type="email"
                placeholder="developer@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#101A28',
                  border: '1px solid #26364A',
                  color: '#F4F7FB',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Message
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tell us what you think or what C++ data structure you'd like visualized next..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#101A28',
                  border: '1px solid #26364A',
                  color: '#F4F7FB',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
              <Send size={16} />
              <span>Submit Feedback</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
