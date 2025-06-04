
import React, { useState, useEffect, useRef } from 'react';

const TerminalWindow = () => {
  const [currentPath, setCurrentPath] = useState('C:\\Portfolio>');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    'Microsoft Windows 95 [Version 4.00.950]',
    '(c) Copyright Microsoft Corp 1981-1995.',
    '',
    'Welcome to Vivekanand\'s Portfolio Terminal',
    'Type "help" for available commands.',
    ''
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  help      - Show this help message',
      '  dir       - List directory contents',
      '  whoami    - Display user information',
      '  skills    - Show technical skills',
      '  projects  - List recent projects',
      '  contact   - Display contact information',
      '  clear     - Clear the screen',
      '  cd        - Change directory (placeholder)',
      ''
    ],
    dir: () => [
      ' Volume in drive C is PORTFOLIO',
      ' Directory of C:\\Portfolio',
      '',
      '12/06/2024  10:30 AM    <DIR>          .',
      '12/06/2024  10:30 AM    <DIR>          ..',
      '12/06/2024  09:15 AM    <DIR>          Projects',
      '12/06/2024  09:20 AM    <DIR>          Skills',
      '12/06/2024  09:25 AM         2,048    Resume.pdf',
      '12/06/2024  09:30 AM         1,024    Contact.txt',
      '               2 File(s)          3,072 bytes',
      '               4 Dir(s)   99,999,999 bytes free',
      ''
    ],
    whoami: () => [
      'User: Vivekanand',
      'Role: Full Stack Developer',
      'Experience: Passionate about creating innovative web solutions',
      'Location: Available for remote work',
      ''
    ],
    skills: () => [
      'Technical Skills:',
      '================',
      'Frontend: React, JavaScript, TypeScript, HTML5, CSS3',
      'Backend: Node.js, Python, Express.js',
      'Database: MongoDB, MySQL, PostgreSQL',
      'Tools: Git, Docker, VS Code, Figma',
      'Cloud: AWS, Netlify, Vercel',
      ''
    ],
    projects: () => [
      'Recent Projects:',
      '================',
      '1. Windows 95 Portfolio - Retro-style portfolio website',
      '2. E-Commerce Platform - Full-stack shopping application',
      '3. Real-time Chat App - WebSocket-based messaging',
      '4. Weather Dashboard - React-based weather application',
      '5. Task Management App - Productivity application',
      '',
      'Visit portfoliovivekanand.netlify.app for more details',
      ''
    ],
    contact: () => [
      'Contact Information:',
      '===================',
      'Email: vivekanand@example.com',
      'Website: portfoliovivekanand.netlify.app',
      'GitHub: github.com/vivekanand',
      'LinkedIn: linkedin.com/in/vivekanand',
      ''
    ],
    clear: () => {
      setOutput([]);
      return [];
    }
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const newOutput = [...output, `${currentPath} ${command}`];
    
    if (commands[cmd as keyof typeof commands]) {
      const result = commands[cmd as keyof typeof commands]();
      if (Array.isArray(result)) {
        newOutput.push(...result);
      }
    } else if (cmd === '') {
      // Empty command, just add prompt
    } else {
      newOutput.push(`'${command}' is not recognized as an internal or external command,`);
      newOutput.push('operable program or batch file.');
      newOutput.push('');
    }
    
    setOutput(newOutput);
    setCommandHistory([...commandHistory, command]);
    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
    } else if (e.key === 'ArrowUp' && commandHistory.length > 0) {
      setCurrentInput(commandHistory[commandHistory.length - 1]);
    }
  };

  return (
    <div className="h-full bg-black text-green-400 font-mono text-sm p-4 overflow-hidden flex flex-col">
      <div 
        ref={outputRef}
        className="flex-1 overflow-y-auto whitespace-pre-wrap mb-2"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#00ff00 #000000' }}
      >
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      
      <div className="flex items-center">
        <span className="mr-1">{currentPath}</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none text-green-400 flex-1"
          autoFocus
        />
        <span className="animate-pulse">_</span>
      </div>
    </div>
  );
};

export default TerminalWindow;
