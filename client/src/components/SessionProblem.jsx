import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Send, ChevronDown, BookDashed, Terminal, CheckCircle2, Code2 } from 'lucide-react';
import { LANGUAGE_CONFIG, PROBLEMS } from '../data/problems';
import { executeCode, LANGUAGE_VERSIONS } from '../lib/piston';
import confetti from 'canvas-confetti';
import CodeEditor from './CodeEditor';

const SessionProblem = () => {
    const { problemId: initialId } = useParams();

    const [currentProblemId, setCurrentProblemId] = useState(initialId || 'two-sum');
    const [problem, setProblem] = useState(PROBLEMS[currentProblemId]);
    const [code, setCode] = useState(problem.starterCode[language] || "");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isError, setIsError] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Using a fixed percentage for the top half
    const [descriptionHeight, setDescriptionHeight] = useState(35); 

    const problems = Object.entries(PROBLEMS);
    const [language,setLanguage] = useState(LANGUAGE_VERSIONS['javascript'])

    const handleProblemChange = (id) => {
        setCurrentProblemId(id);
        const newProb = PROBLEMS[id];
        setProblem(newProb);
        setCode(newProb.starterCode[language] || "");
        setOutput("");
        setSubmitStatus(null);
        setIsDropdownOpen(false);
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput("Executing...");
        setIsError(false);
        try {
            const result = await executeCode(language, code);
            if (result.success) {
                setOutput(result.output);
                setIsError(false);
            } else {
                setOutput(result.error || result.output);
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
            setOutput("Execution failed...");
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmit = async () => {
        setIsRunning(true);
        const result = await executeCode(language, code);
        setIsRunning(false);

        const normalize = (str) => str.toString().trim().replace(/\r/g, "");
        const actual = normalize(result.output);
        const expected = normalize(problem.expectedOutput[language] || "");

        if (actual === expected) {
            setSubmitStatus('success');
            setOutput("Success: All test cases passed!");
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } else {
            setSubmitStatus('fail');
            setIsError(true);
            setOutput(`Wrong Answer\nExpected: ${expected}\nActual: ${actual}`);
        }
    };

    return (
        // FIXED: Removed overflow-y-scroll here. Added overflow-hidden to prevent body scroll.
        <div className="flex flex-col h-[100vh] bg-[#111] text-gray-300 overflow-hidden">

            {/* 1. HEADER (Fixed Height) */}
            <div className="flex items-center justify-between py-3 px-3 border-b border-white/5 bg-white/[0.02]">
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10 transition-all text-sm"
                    >
                        <div className="flex items-center gap-2 truncate text-cyan-500 font-medium text-xs">
                            <BookDashed size={14} />
                            <span className="truncate">{problem.title}</span>
                        </div>
                        <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-2xl z-50 max-h-64 overflow-y-auto custom-scrollbar">
                            {Object.entries(LANGUAGE_CONFIG).map(([key, config]) => (
                                <button
                                    key={key}
                                    onClick={() => handleProblemChange(key)}
                                    className={`w-full text-left px-4 py-3 text-xs border-b border-white/5 hover:bg-white/5 ${currentProblemId === key ? 'text-cyan-400 bg-cyan-400/5' : 'text-gray-400'}`}
                                >
                                    {config.title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>


                 <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10 transition-all text-sm"
                    >
                        <div className="flex items-center gap-2 truncate text-cyan-500 font-medium text-xs">
                            <BookDashed size={14} />
                            <span className="truncate">{problem.title}</span>
                        </div>
                        <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-2xl z-50 max-h-64 overflow-y-auto custom-scrollbar">
                            {problems.map(([key, config]) => (
                                <button
                                    key={key}
                                    onClick={() => handleProblemChange(key)}
                                    className={`w-full text-left px-4 py-3 text-xs border-b border-white/5 hover:bg-white/5 ${currentProblemId === key ? 'text-cyan-400 bg-cyan-400/5' : 'text-gray-400'}`}
                                >
                                    {config.title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 2. MAIN FLEX CONTENT */}
            <div className="flex-1 flex flex-col min-h-0">

                {/* DESCRIPTION SECTION (Scrollable internally) */}
                <div 
                    style={{ height: `${descriptionHeight}%` }} 
                    className="flex-none overflow-y-auto p-4 custom-scrollbar border-b border-white/5"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                            {problem.difficulty}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">{problem.category}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400 mb-3">{problem.description.text}</p>
                    <div className="bg-black/40 border border-white/5 rounded-lg p-3 text-[12px] font-mono mb-2">
                        <p className="text-gray-500 mb-1 uppercase text-[10px]">Example 1</p>
                        <p><span className="text-gray-600">In:</span> {problem.examples[0].input}</p>
                        <p><span className="text-gray-600">Out:</span> {problem.examples[0].output}</p>
                    </div>
                </div>

                {/* EDITOR SECTION (Takes remaining space) */}
                <div className="flex-1 flex flex-col min-h-0 relative">
                    <div className="flex-none flex items-center gap-2 px-4 py-2 bg-white/[0.02] border-b border-white/5">
                        <Code2 size={14} className="text-gray-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Code Editor</span>
                    </div>
                    
                    {/* Monaco container must be flex-1 and min-h-0 */}
                    <div className="flex-1 min-h-0 w-full relative">
                        <CodeEditor
                            code={code}
                            language={language}
                            onChange={setCode}
                        />
                    </div>
                </div>
            </div>

            {/* 3. TERMINAL SECTION (Fixed at Bottom) */}
            <div className="flex-none p-4 border-t border-white/5 bg-[#0a0a0a]">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
                        <Terminal size={14} /> Console
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleRunCode} disabled={isRunning} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-md text-[11px] font-bold border border-white/10 transition-all active:scale-95 disabled:opacity-50">
                            <Play size={12} /> Run
                        </button>
                        <button onClick={handleSubmit} disabled={isRunning} className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 px-4 py-1.5 rounded-md text-[11px] font-bold text-white transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-cyan-900/20">
                            <Send size={12} /> Submit
                        </button>
                    </div>
                </div>

                <div className={`w-full h-28 overflow-y-auto p-3 rounded-lg border font-mono text-[11px] whitespace-pre-wrap transition-colors ${
                    isError ? 'bg-red-500/5 border-red-500/20 text-red-400' : 'bg-black/60 border-white/5 text-gray-300'
                }`}>
                    {submitStatus === 'success' && (
                        <div className="flex items-center gap-2 text-green-400 mb-1 font-bold">
                            <CheckCircle2 size={12} /> PASSED
                        </div>
                    )}
                    {output || "Output will appear here..."}
                </div>
            </div>
        </div>
    );
};

export default SessionProblem;