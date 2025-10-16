import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const ASCII_ART = `
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║     ██╗    ██╗ █████╗ ███████╗██╗                                         ║
║     ██║    ██║██╔══██╗██╔════╝██║                                         ║
║     ██║ █╗ ██║███████║███████╗██║                                         ║
║     ██║███╗██║██╔══██║╚════██║██║                                         ║
║     ╚███╔███╔╝██║  ██║███████║██║                                         ║
║      ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚═╝                                         ║
║                                                                           ║
║    > NETWORK SECURITY ENGINEER                                            ║
║    > SYSTEM STATUS: OPERATIONAL                                           ║
║    > ACCESS LEVEL: PUBLIC                                                 ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝`;

  const commands = {
    help: () => `
Available commands:
  help        - Show this help message
  about       - Display information about Wasi
  whoami      - Current user information
  skills      - List technical skills and expertise
  domains     - Show operational domains
  arsenal     - Display security tools and technologies
  collaborate - View collaboration interests
  contact     - Get contact information
  stats       - Show GitHub statistics
  clear       - Clear terminal screen
  exit        - Close terminal session
`,
    about: () => `
NETWORK SECURITY ENGINEER

Current Role:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Specializing in infrastructure hardening and threat mitigation.
Architecting resilient networks, defending digital perimeters,
and building secure systems that stand against modern threats.

Mission: Design and implement enterprise-level security solutions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,
    whoami: () => `
root@wasi:~$ id
uid=0(wasi) gid=0(security) groups=0(security),1(network),2(cloud)

Current User: Wasi
Role: Network Security Engineer
Clearance: PUBLIC
Status: ACTIVE
Location: Cyber Defense Operations
`,
    skills: () => `
╔═══════════════════════════════════════════════════════════════╗
║                    TECHNICAL PROFICIENCIES                    ║
╚═══════════════════════════════════════════════════════════════╝

[PROGRAMMING & SCRIPTING]
├── Python          ████████████████████ 95%
├── Bash            ███████████████████░ 90%
└── PowerShell      ██████████████████░░ 85%

[NETWORK INFRASTRUCTURE]
├── Cisco           ████████████████████ 95%
├── Juniper         ██████████████████░░ 85%
├── Palo Alto       ███████████████████░ 90%
└── Fortinet        ██████████████████░░ 85%

[SECURITY TOOLS]
├── IDS/IPS         ████████████████████ 95%
├── SIEM            ███████████████████░ 90%
├── Wireshark       ████████████████████ 95%
├── Nmap            ████████████████████ 95%
├── Metasploit      ██████████████████░░ 85%
└── Burp Suite      ███████████████████░ 90%

[CLOUD PLATFORMS]
├── AWS             ███████████████████░ 90%
├── Azure           ██████████████████░░ 85%
└── GCP             ██████████████████░░ 85%
`,
    domains: () => `
OPERATIONAL DOMAINS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[🔒 NETWORK WARFARE]
  ✓ Software-Defined Networking
  ✓ Network Segmentation & Isolation
  ✓ Zero Trust Architecture
  ✓ Infrastructure Automation

[☁️ CLOUD BATTLEGROUND]
  ✓ AWS Security Architecture
  ✓ Azure Cloud Infrastructure
  ✓ GCP Resource Management
  ✓ Multi-Cloud Security Posture

[🛡️ CYBER DEFENSE]
  ✓ Threat Hunting & Intelligence
  ✓ Intrusion Detection Systems
  ✓ Incident Response Protocols
  ✓ Security Operations Center

[🔐 CRYPTOGRAPHIC OPERATIONS]
  ✓ PKI Implementation
  ✓ Encryption Standards
  ✓ Secure Key Management
  ✓ Protocol Analysis

[🤖 AI & MACHINE LEARNING]
  ✓ ML-Driven Threat Detection
  ✓ Automated Security Analysis
  ✓ Behavioral Analytics
  ✓ Predictive Security Models
`,
    arsenal: () => `
class SecurityEngineer:
    def __init__(self):
        self.network_gear = [
            'Cisco IOS/IOS-XE',
            'Juniper Junos',
            'Palo Alto PAN-OS',
            'Fortinet FortiOS'
        ]
        
        self.security_tools = [
            'IDS/IPS Systems',
            'SIEM Platforms',
            'Next-Gen Firewalls',
            'VPN Solutions'
        ]
        
        self.cloud_platforms = [
            'Amazon Web Services',
            'Microsoft Azure',
            'Google Cloud Platform'
        ]
        
        self.pentesting_kit = [
            'Wireshark - Network Protocol Analyzer',
            'Nmap - Network Scanner',
            'Metasploit - Exploitation Framework',
            'Burp Suite - Web Security Testing'
        ]
        
        self.languages = [
            'Python - Automation & Scripting',
            'Bash - System Administration',
            'PowerShell - Windows Management'
        ]
    
    def deploy_security(self):
        return "🟢 Maximum protection enabled"

>>> SecurityEngineer().deploy_security()
'🟢 Maximum protection enabled'
`,
    collaborate: () => `
COLLABORATION PROTOCOLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

seeking_partners_for:
  
  advanced_networking:
    - Software-Defined Networking (SDN)
    - Network automation and orchestration
    - Infrastructure as Code (IaC)
  
  cloud_security:
    - Multi-cloud architecture & security
    - Cloud-native security solutions
    - Container and Kubernetes security
  
  ai_security:
    - ML-driven threat detection
    - Automated incident response
    - Behavioral analytics
  
  cryptography:
    - Next-gen encryption protocols
    - Post-quantum cryptography
    - Secure communication systems
  
  red_team:
    - Offensive security operations
    - Penetration testing frameworks
    - Security tool development

Status: OPEN FOR COLLABORATION
Priority: HIGH
`,
    contact: () => `
╔═══════════════════════════════════════════════════════════════╗
║                    SECURE COMMUNICATION CHANNEL               ║
╚═══════════════════════════════════════════════════════════════╝

┌─[root@wasi]─[~]
└──╼ $ curl -X GET https://github.com/10110001111

[ESTABLISHING SECURE CONNECTION...]
[HANDSHAKE COMPLETE]
[ENCRYPTION: TLS 1.3]

GitHub Profile:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 https://github.com/10110001111

[CONNECTION STATUS: ACTIVE]
[LATENCY: <10ms]
[SECURITY LEVEL: MAXIMUM]
`,
    stats: () => `
SYSTEM STATISTICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Visit your GitHub profile to view real-time statistics:
   https://github.com/10110001111

Available metrics:
  ✓ Contribution activity
  ✓ Repository statistics
  ✓ Language distribution
  ✓ Commit frequency
  ✓ Issue and PR metrics

[REAL-TIME MONITORING: ENABLED]
[DATA REFRESH RATE: LIVE]
`,
    clear: () => 'CLEAR',
    exit: () => `
[CLOSING SECURE SESSION...]
[CLEARING SENSITIVE DATA...]
[DISCONNECTING...]

Session terminated. Refresh page to reconnect.
`,
  };

  useEffect(() => {
    setHistory([
      { type: 'output', content: ASCII_ART },
      { type: 'output', content: '\nWelcome to my profile terminal v1.0.0' },
      { type: 'output', content: 'Type "help" for available commands.\n' }
    ]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Calculate cursor position based on input text
  useEffect(() => {
    if (inputRef.current) {
      const span = document.createElement('span');
      span.style.font = window.getComputedStyle(inputRef.current).font;
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.style.whiteSpace = 'pre';
      span.textContent = input || '';
      document.body.appendChild(span);
      setCursorPosition(span.offsetWidth);
      document.body.removeChild(span);
    }
  }, [input]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setHistory(prev => [...prev, { type: 'input', content: cmd }]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === '') return;

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd]();
      if (output === 'CLEAR') {
        setHistory([]);
      } else {
        setHistory(prev => [...prev, { type: 'output', content: output }]);
      }
    } else {
      setHistory(prev => [...prev, { 
        type: 'error', 
        content: `Command not found: ${trimmedCmd}\nType 'help' for available commands.` 
      }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        handleCommand(input);
        setInput('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-wrapper">
        <div 
          ref={terminalRef}
          className="terminal-screen"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, index) => (
            <div key={index} className="terminal-line">
              {item.type === 'input' && (
                <div className="terminal-input-line">
                  <span className="terminal-prompt">root@wasi:~$</span>
                  <span className="terminal-input-text">{item.content}</span>
                </div>
              )}
              {item.type === 'output' && (
                <pre className="terminal-output">
                  {item.content}
                </pre>
              )}
              {item.type === 'error' && (
                <pre className="terminal-error">
                  {item.content}
                </pre>
              )}
            </div>
          ))}
          
          <div className="terminal-input-line">
            <span className="terminal-prompt">root@wasi:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              autoFocus
              spellCheck="false"
            />
            <span 
              className="terminal-cursor"
              style={{ left: `calc(140px + ${cursorPosition}px)` }}
            >
              ▊
            </span>
          </div>
        </div>
        
        <div className="terminal-footer">
          <p>Wasi</p>
          <p className="terminal-hint">Press ↑/↓ to navigate command history | Press Enter to execute</p>
        </div>
      </div>
    </div>
  );
}

export default App;
