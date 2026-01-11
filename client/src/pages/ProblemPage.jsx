import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Assuming your data is here
import { Play, Send, ChevronDown, BookAIcon, BookDashed, Key } from 'lucide-react';
import { LANGUAGE_CONFIG, PROBLEMS } from '../data/problems';
import Navbar from '../components/Navbar';
import { executeCode, LANGUAGE_VERSIONS } from '../lib/piston';
import CodeEditor from '../components/CodeEditor';
import confetti from 'canvas-confetti';
import { useActiveSessions } from '../hooks/useSessions';

const Workspace = () => {
  const isInitialMount = useRef(true);

  const { problemId } = useParams();
  const getStorageKey = (probId, lang) => `code-${probId}-${lang}`;
  // Find the problem data, fallback to 'two-sum' if ID is invalid
  const initialProblem = PROBLEMS[problemId] || PROBLEMS['two-sum'];
  const [problem, setProblem] = useState(initialProblem);
  const problems = Object.entries(PROBLEMS)
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState("");
  const navigate = useNavigate()

  // Layout State (Percentages)
  const [leftWidth, setLeftWidth] = useState(40); // Initial 40% for description
  const [topHeight, setTopHeight] = useState(65); // Initial 65% for code editor
  const isResizingWidth = useRef(false);
  const isResizingHeight = useRef(false);


  // langugae selection
  const languages = Object.entries(LANGUAGE_VERSIONS)
  const [isOpen, setIsOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  // new state for execution of  code
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isError, setIsError] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

 

  //sync code when refersh occurs
  useEffect(() => {
  const currentProblem = PROBLEMS[problemId];
  if (currentProblem) {
    setProblem(currentProblem);
    setOutput("");
    setSubmitStatus(null);

    const savedCode = localStorage.getItem(getStorageKey(problemId, language));
    
    // Set the code
    const codeToSet = savedCode !== null ? savedCode : (currentProblem.starterCode[language] || "");
    setCode(codeToSet);
    
    // Mark that we just performed a "Load" operation
    isInitialMount.current = true; 
  }
}, [problemId, language]);
// saving logic 

  useEffect(() => {
    // Only save if we have a valid problemId and language
    if (problemId && language && code) {
      localStorage.setItem(getStorageKey(problemId, language), code);
    }
  }, [code, problemId, language]);

  // Handle Resizing Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizingWidth.current) {
        const newWidth = (e.clientX / window.innerWidth) * 100;
        if (newWidth > 20 && newWidth < 80) setLeftWidth(newWidth);
      }
      if (isResizingHeight.current) {
        const container = document.getElementById('right-panel');
        const rect = container.getBoundingClientRect();
        const newHeight = ((e.clientY - rect.top) / rect.height) * 100;
        if (newHeight > 20 && newHeight < 85) setTopHeight(newHeight);
      }
    };

    const stopResizing = () => {
      isResizingWidth.current = false;
      isResizingHeight.current = false;
      document.body.style.cursor = 'default';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, []);




  //--------function to execute code

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput("Executing...")
    setIsError(false)

    try {
      const result = await executeCode(language, code)
      if (result.success) {
        setOutput(result.output)
        setIsError(false)
      } else {
        setOutput(result.error || result.output)
        setIsError(true)
      }

    } catch (error) {
      setIsError(true)
      setOutput("Error in connecting to execution server ")


    } finally {
      setIsRunning(false)
    }
  }
  //------------- function for submitting the code
  // ------------- function for submitting the code
const handleSubmit = async () => {
  setIsRunning(true);
  setSubmitStatus(null);
  setOutput("Submitting...");

  const result = await executeCode(language, code);

  setIsRunning(false);
  if (!result.success) {
    setIsError(true);
    setOutput(result.error || "Execution Error");
    return;
  }

 
  const normalize = (str) => 
    str.toString()
       .replace(/\r/g, "") 
       .split('\n')
       .map(line => line.trim())
       .filter(line => line !== "") // Optional: remove empty lines if your problems allow it
       .join('\n')
       .trim();

  const actualOutput = normalize(result.output);
  const expectedOutput = normalize(problem.expectedOutput[language]);

  if (actualOutput === expectedOutput) {
    setSubmitStatus('success');
    setOutput(actualOutput);

    {/*----------- success result ---------- */}

    confetti({
      particleCount: 150,
      spread: 170,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#2dd4bf', '#ffffff']
    });
  } else {
    setSubmitStatus('fail');
    setIsError(true);
    // Use JSON.stringify temporarily if you still see "Wrong Answer" 
    // to reveal hidden characters like \n or \t
    setOutput(`Wrong Answer\n\nExpected:\n${expectedOutput}\n\nActual:\n${actualOutput}`);
  }
};



  return (
    <div className="flex h-screen w-full bg-black text-gray-200 pt-17 overflow-hidden ">
      <Navbar />
      {/* LEFT PANEL: Description */}
      <div
        style={{ width: `${leftWidth}%` }}
        className="h-[calc(100vh-80px)] m-2 ml-4 overflow-y-auto bg-[#1e1e1e] border border-gray-700/50 rounded-xl shadow-2xl custom-scrollbar"
      >
        {/* Panel Header (Matches Editor Header height) */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-[0.9rem] bg-[#282828] border-b border-gray-700/50  ">
          <h2 className="text-xs font-bold uppercase text-cyan-500  flex "><BookDashed className='w-4 mx-1 h-4 p-0' /> Description</h2>
          <div className="relative inline-block text-left">
            {/* Trigger Button */}
            <div
              onClick={() => setIsCodeOpen(!isCodeOpen)}
              className="flex items-center gap-2 bg-[#333] hover:bg-[#3d3d3d] px-3 py-1.5 rounded-md cursor-pointer transition-colors border border-gray-600/30"
            >
              <span className="text-xs font-medium text-gray-200">
                {problem.title}
              </span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${isCodeOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {isCodeOpen && (
              <div className="absolute left-[-5rem] mt-2 w-48 rounded-md shadow-lg bg-[#1e1e1e] border border-gray-700 z-50 overflow-hidden">
                <div className="py-1">
                  {problems.map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => {
                        navigate(`/problem/${key}`);
                        setProblem(PROBLEMS[key]);

                        
                      }}
                      className={`text-left flex flex-col items-start w-full px-4 py-2 text-sm transition-colors
                  ${problemId === key ? 'bg-[#3d3d3d] text-white' : 'text-gray-400 hover:bg-[#2d2d2d] hover:text-white'}
                `}
                    >
                      <span className="font-medium">{config.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2 text-white">{problem.title}</h1>

          <div className="flex gap-2 mb-6">
            <span className={`px-2 py-1 rounded-md text-[11px] font-bold  tracking-wider ${problem.difficulty === 'Easy'
              ? 'bg-green-500/10 text-green-500'
              : problem.difficulty === 'Medium'
                ? 'bg-yellow-500/10 text-yellow-500'
                : 'bg-red-500/10 text-red-500'
              }`}>
              {problem.difficulty}
            </span>
            <span className="text-[11px] font-bold  tracking-wider text-gray-400 bg-gray-800/50 px-2 py-1 rounded-md border border-gray-700/30">
              {problem.category}
            </span>
          </div>

          <p className="mb-6 text-[14px] leading-relaxed text-gray-300">
            {problem.description.text}
          </p>

          {problem.description.notes && problem.description.notes.map((note, i) => (
            <div key={i} className="mb-4 p-3 bg-blue-500/5 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-sm text-blue-200/80 italic">{note}</p>
            </div>
          ))}

          {problem.examples.map((ex, i) => (
            <div key={i} className="mb-8">
              <h3 className="text-xs font-bold mb-3 uppercase tracking-widest text-gray-500">Example {i + 1}:</h3>
              <div className="bg-black/40 p-4 rounded-lg border border-gray-800/60 font-mono text-[13px] leading-6">
                <p><span className="text-gray-500 font-semibold">Input:</span> <span className="text-gray-300">{ex.input}</span></p>
                <p><span className="text-gray-500 font-semibold">Output:</span> <span className="text-gray-300">{ex.output}</span></p>
                {ex.explanation && (
                  <p className="mt-3 pt-3 border-t border-gray-800/50 italic text-gray-400">
                    <span className="text-gray-500 non-italic">Explanation:</span> {ex.explanation}
                  </p>
                )}
              </div>
            </div>
          ))}

          <div className="mt-8 pt-6 border-t border-gray-800">
            <h3 className="text-xs font-bold mb-4 uppercase tracking-widest text-gray-500">Constraints:</h3>
            <ul className="space-y-3">
              {problem.constraints.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-700 shrink-0" />
                  <code className="bg-gray-800/50 px-1.5 py-0.5 rounded text-gray-300 font-mono text-[12px]">{c}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* HORIZONTAL RESIZER */}
      <div
        className="w-1 flex items-center justify-center hover:bg-cyan-500/50 cursor-col-resize transition-all group"
        onMouseDown={() => { isResizingWidth.current = true; document.body.style.cursor = 'col-resize'; }}
      >
        <div className="h-10 w-[2px] bg-gray-700 group-hover:bg-cyan-300 rounded-full" />
      </div>

      {/* RIGHT PANEL: Editor & Output */}
      <div
        id="right-panel"
        style={{ width: `${100 - leftWidth}%` }}
        className="min-w-[30vw] flex flex-col h-[calc(100vh-80px)] m-2 mr-4 bg-[#1e1e1e] border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl"
      >

        {/* TOP: Code Editor Area */}
        <div style={{ height: `${topHeight}%` }} className="flex flex-col min-h-[275px]">
          {/* Editor Header */}
          <div className="flex items-center justify-between gap-2 px-4 py-2 bg-[#282828] border-b border-gray-700/50">
            <div className="flex items-center jutsify-center gap-2 ">
              <img src={`${LANGUAGE_CONFIG[language].icon}`} className='w-6 h-6'></img>
              <div className="relative inline-block text-left">
              {/* Trigger Button */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-[#333] hover:bg-[#3d3d3d] px-3 py-1.5 rounded-md cursor-pointer transition-colors border border-gray-600/30"
              >
                <span className="text-xs font-medium text-gray-200">
                  {LANGUAGE_VERSIONS[language].language} ({LANGUAGE_VERSIONS[language].version})
                </span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#1e1e1e] border border-gray-700 z-50 overflow-hidden">
                  <div className="py-1">
                    {languages.map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setLanguage(key);
                          setIsOpen(false);

                          // ADD THIS: Load the correct code for the newly selected language
                          const saved = localStorage.getItem(getStorageKey(problemId, key));
                          setCode(saved || problem.starterCode[key] || "");
                        }}
                        className={`flex flex-col items-start w-full px-4 py-2 text-sm transition-colors
                  ${language === key ? 'bg-[#3d3d3d] text-white' : 'text-gray-400 hover:bg-[#2d2d2d] hover:text-white'}
                `}
                      >
                        <span className="font-medium">{config.language}</span>
                        <span className="text-[10px] opacity-50">{config.version}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Action Buttons: Fixed at bottom right of the output or relative */}
              <div className="flex justify-end gap-3 ">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className={`flex items-center gap-2 px-5 py-2 bg-[#333] hover:bg-[#444] text-gray-200 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-lg ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Play size={14} className={isRunning ? "animate-pulse" : "fill-current"} />
                  {isRunning ? "Running..." : "Run"}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isRunning}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-lg 
    ${submitStatus === 'success' ? 'bg-green-600' : 'bg-teal-600 hover:bg-teal-500'} 
    text-white shadow-teal-900/20`}
                >
                  <Send size={14} />
                  {submitStatus === 'success' ? "Accepted!" : "Submit"}
                </button>
              </div>
            </div>
          </div>

          {/* The Editor Panel */}
          <div className="flex-1 relative bg-[#1e1e1e]">
            <CodeEditor
              code={code}
              language={language}
              onChange={setCode}
            />
            {/*<textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent p-4 font-mono text-[13px] leading-relaxed outline-none resize-none text-blue-300 selection:bg-blue-500/30"
              spellCheck="false"
            />*/}
          </div>
        </div>

        {/* VERTICAL RESIZER (The "Grip") */}
        <div
          className="h-1 bg-black hover:bg-cyan-500/50 cursor-row-resize transition-all flex items-center justify-center group"
          onMouseDown={() => { isResizingHeight.current = true; document.body.style.cursor = 'row-resize'; }}
        >
          <div className="w-10 h-[2px] bg-gray-600 group-hover:bg-cyan-300 rounded-full" />
        </div>

        {/* BOTTOM: Output Area */}
        <div style={{ height: `${100 - topHeight}%` }} className="flex flex-col bg-[#1e1e1e] min-h-[180px]">
          {/* Console Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800/50 bg-[#1e1e1e]">
            <div className="flex gap-4">
              <span className="text-xs font-bold uppercase text-cyan-500 tracking-tight border-b-2 border-cyan-500 pb-1">Console</span>
              {    /*          <span className="text-xs font-bold uppercase text-gray-500 tracking-tight hover:text-gray-300 cursor-pointer">Testcase</span>
*/}
            </div>
          </div>

          {/*------------ console area  ------------- */}

          <div className="flex-1 p-4 overflow-y-auto">
            {submitStatus && (
              <div className={`mb-4 p-2 rounded text-xs font-bold uppercase tracking-wider ${submitStatus === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                {submitStatus === 'success' ? "✓ All Test Cases Passed" : "✗ Wrong Answer"}
              </div>
            )}

            <div className={`font-mono text-sm p-4 rounded-lg border min-h-[80px] whitespace-pre-wrap ${isError ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-black/30 border-gray-800/60 text-gray-300'
              }`}>
            {/*   <span className="text-gray-600 mr-2">$</span>*/}
              {output || "Run Code to see the Output here..."}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Workspace;