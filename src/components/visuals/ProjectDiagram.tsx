import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Sliders, Activity, Info, BarChart3, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectDiagramProps {
  type: 'linguistics' | 'policy' | 'cognition' | 'algorithms';
  caption?: string;
  className?: string;
  interactive?: boolean;
}

export const ProjectDiagram: React.FC<ProjectDiagramProps> = ({
  type,
  caption,
  className = '',
  interactive = true,
}) => {
  // -------------------------------------------------------------
  // LINGUISTICS STATE
  // -------------------------------------------------------------
  const linguisticsSentences = [
    {
      text: 'The algorithm converges linearly',
      tokens: [
        { word: 'The', tag: 'DET', head: 1, rel: 'det', weight: 0.94 },
        { word: 'algorithm', tag: 'NOUN', head: 2, rel: 'nsubj', weight: 0.88 },
        { word: 'converges', tag: 'VERB', head: -1, rel: 'ROOT', weight: 1.0 },
        { word: 'linearly', tag: 'ADV', head: 2, rel: 'advmod', weight: 0.79 },
      ],
    },
    {
      text: 'Attention heads encode syntactic hierarchy',
      tokens: [
        { word: 'Attention', tag: 'NOUN', head: 1, rel: 'compound', weight: 0.82 },
        { word: 'heads', tag: 'NOUN', head: 2, rel: 'nsubj', weight: 0.91 },
        { word: 'encode', tag: 'VERB', head: -1, rel: 'ROOT', weight: 1.0 },
        { word: 'syntactic', tag: 'ADJ', head: 4, rel: 'amod', weight: 0.85 },
        { word: 'hierarchy', tag: 'NOUN', head: 2, rel: 'obj', weight: 0.89 },
      ],
    },
  ];

  const [activeSentenceIdx, setActiveSentenceIdx] = useState(0);
  const [selectedTokenIdx, setSelectedTokenIdx] = useState<number | null>(null);
  const [parsingStep, setParsingStep] = useState<number>(-1);
  const [showAttentionMatrix, setShowAttentionMatrix] = useState(false);

  const activeSentence = linguisticsSentences[activeSentenceIdx];

  const runParsingAnimation = () => {
    setSelectedTokenIdx(null);
    setParsingStep(0);
    const interval = setInterval(() => {
      setParsingStep((prev) => {
        if (prev >= activeSentence.tokens.length - 1) {
          clearInterval(interval);
          return -1;
        }
        return prev + 1;
      });
    }, 700);
  };

  // -------------------------------------------------------------
  // POLICY / NETWORK RESILIENCE STATE
  // -------------------------------------------------------------
  const [removalFraction, setRemovalFraction] = useState(0.18);
  const [networkTopology, setNetworkTopology] = useState<'hub-spoke' | 'ring-augmented'>('ring-augmented');
  const [isSimulatingCascade, setIsSimulatingCascade] = useState(false);

  // Calculate dynamic giant component size S(p)
  const criticalThreshold = networkTopology === 'ring-augmented' ? 0.38 : 0.15;
  const isCollapsed = removalFraction >= criticalThreshold;
  const giantComponentRatio = Math.max(
    8,
    Math.round(
      networkTopology === 'ring-augmented'
        ? 100 * Math.exp(-Math.pow(removalFraction / criticalThreshold, 2.2))
        : 100 * Math.exp(-Math.pow(removalFraction / criticalThreshold, 1.4))
    )
  );

  const triggerCascade = () => {
    setIsSimulatingCascade(true);
    let current = 0.05;
    const interval = setInterval(() => {
      current += 0.05;
      if (current >= 0.55) {
        clearInterval(interval);
        setIsSimulatingCascade(false);
      } else {
        setRemovalFraction(parseFloat(current.toFixed(2)));
      }
    }, 200);
  };

  // -------------------------------------------------------------
  // COGNITION (DRIFT-DIFFUSION) STATE
  // -------------------------------------------------------------
  const [driftRate, setDriftRate] = useState(0.45);
  const [thresholdA, setThresholdA] = useState(1.6);
  const [simulatedPaths, setSimulatedPaths] = useState<
    { points: { x: number; y: number }[]; outcome: 'A' | 'B'; decisionTime: number }[]
  >([]);
  const [isGeneratingTrajectory, setIsGeneratingTrajectory] = useState(false);

  const generateDriftPath = () => {
    setIsGeneratingTrajectory(true);
    const dt = 0.05;
    let x = 0;
    let y = thresholdA / 2;
    const pathPoints: { x: number; y: number }[] = [{ x: 45, y: 100 }];
    const upperLimit = 35;
    const lowerLimit = 165;
    const heightRange = lowerLimit - upperLimit;

    let step = 0;
    const maxSteps = 40;
    const stepInterval = setInterval(() => {
      step++;
      const randomNormal = (Math.random() - 0.5) * 1.8;
      const dy = (driftRate * dt + randomNormal * 0.25) * 25;
      // Note: in SVG, y=upperLimit is choice A (positive evidence)
      const currentSvgY = pathPoints[pathPoints.length - 1].y - dy;
      const currentSvgX = 45 + step * 6.5;

      if (currentSvgY <= upperLimit) {
        pathPoints.push({ x: currentSvgX, y: upperLimit });
        setSimulatedPaths((prev) => [
          ...prev.slice(-4),
          { points: pathPoints, outcome: 'A', decisionTime: parseFloat((step * 14).toFixed(0)) },
        ]);
        clearInterval(stepInterval);
        setIsGeneratingTrajectory(false);
      } else if (currentSvgY >= lowerLimit) {
        pathPoints.push({ x: currentSvgX, y: lowerLimit });
        setSimulatedPaths((prev) => [
          ...prev.slice(-4),
          { points: pathPoints, outcome: 'B', decisionTime: parseFloat((step * 14).toFixed(0)) },
        ]);
        clearInterval(stepInterval);
        setIsGeneratingTrajectory(false);
      } else if (step >= maxSteps) {
        pathPoints.push({ x: currentSvgX, y: currentSvgY });
        setSimulatedPaths((prev) => [
          ...prev.slice(-4),
          { points: pathPoints, outcome: currentSvgY < 100 ? 'A' : 'B', decisionTime: 560 },
        ]);
        clearInterval(stepInterval);
        setIsGeneratingTrajectory(false);
      } else {
        pathPoints.push({ x: currentSvgX, y: currentSvgY });
        setSimulatedPaths((prev) => {
          const updated = [...prev];
          if (updated.length === 0 || updated[updated.length - 1].points.length >= maxSteps) {
            return [...updated.slice(-4), { points: [...pathPoints], outcome: 'A', decisionTime: 0 }];
          }
          updated[updated.length - 1] = {
            points: [...pathPoints],
            outcome: 'A',
            decisionTime: step * 14,
          };
          return updated;
        });
      }
    }, 45);
  };

  // Initial seed simulation for cognition
  useEffect(() => {
    if (type === 'cognition' && simulatedPaths.length === 0) {
      setSimulatedPaths([
        {
          outcome: 'A',
          decisionTime: 280,
          points: [
            { x: 45, y: 100 },
            { x: 75, y: 92 },
            { x: 105, y: 80 },
            { x: 135, y: 88 },
            { x: 165, y: 64 },
            { x: 195, y: 52 },
            { x: 230, y: 35 },
          ],
        },
      ]);
    }
  }, [type]);

  // -------------------------------------------------------------
  // ALGORITHMS (LATTICE PATHFINDING) STATE
  // -------------------------------------------------------------
  const [blockedNodes, setBlockedNodes] = useState<Set<string>>(new Set(['1-1', '2-2', '3-1']));
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [isSearchingPath, setIsSearchingPath] = useState(false);

  const toggleNodeBlock = (key: string) => {
    if (key === '0-3' || key === '5-0') return; // protect source and target
    const updated = new Set(blockedNodes);
    if (updated.has(key)) {
      updated.delete(key);
    } else {
      updated.add(key);
    }
    setBlockedNodes(updated);
  };

  const runLatticeDijkstra = () => {
    setIsSearchingPath(true);
    setVisitedNodes([]);
    const sequence = ['0-3', '1-3', '1-2', '2-3', '3-3', '2-1', '3-2', '4-2', '4-1', '5-1', '5-0'];
    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= sequence.length) {
        clearInterval(interval);
        setIsSearchingPath(false);
      } else {
        const next = sequence[idx];
        setVisitedNodes((prev) => [...prev, next]);
        idx++;
      }
    }, 120);
  };

  return (
    <div className={`border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 flex flex-col justify-between transition-colors shadow-xs ${className}`}>
      {/* Schematic Top Bar with Live Interactive Badge */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-3 gap-2 text-[10px] font-mono tracking-wider">
        <div className="flex items-center gap-2 text-[var(--text-muted)]">
          <Activity className="w-3.5 h-3.5 text-[var(--accent-gold)] animate-pulse" />
          <span className="uppercase font-semibold">FIG. COMPUTATIONAL LAB</span>
          <span aria-hidden="true">·</span>
          <span className="text-[var(--accent-gold)] uppercase font-medium">LIVE MODEL</span>
        </div>

        {interactive && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase hidden sm:inline">
              Interactive
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
          </div>
        )}
      </div>

      {/* Main Vector Canvas */}
      <div className="w-full min-h-[220px] aspect-[16/10] flex flex-col items-center justify-center overflow-hidden relative bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] p-3">
        {/* ========================================================
            1. COMPUTATIONAL LINGUISTICS DIAGRAM
            ======================================================== */}
        {type === 'linguistics' && (
          <div className="w-full h-full flex flex-col justify-between">
            <svg viewBox="0 0 380 185" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Arcs between tokens */}
              {activeSentence.tokens.map((token, i) => {
                if (token.head === -1) {
                  // Root pointer
                  const x = 50 + i * (280 / (activeSentence.tokens.length - 1));
                  const isParsing = parsingStep === i;
                  return (
                    <g key={`root-${i}`}>
                      <line
                        x1={x}
                        y1="25"
                        x2={x}
                        y2="128"
                        stroke="var(--accent-gold)"
                        strokeWidth={isParsing ? '2.5' : '1.75'}
                        strokeDasharray={isParsing ? 'none' : '3 3'}
                      />
                      <polygon points={`${x},130 ${x - 3},122 ${x + 3},122`} fill="var(--accent-gold)" />
                      <rect x={x - 22} y="12" width="44" height="18" fill="var(--accent-gold)" rx="2" />
                      <text x={x} y="24" fill="#FFFFFF" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">
                        ROOT
                      </text>
                    </g>
                  );
                }

                const headIdx = token.head;
                const startX = 50 + headIdx * (280 / (activeSentence.tokens.length - 1));
                const endX = 50 + i * (280 / (activeSentence.tokens.length - 1));
                const midX = (startX + endX) / 2;
                const distance = Math.abs(endX - startX);
                const arcHeight = Math.min(100, Math.max(40, distance * 0.45));
                const isSelected = selectedTokenIdx === i;
                const isParsing = parsingStep === i;

                return (
                  <g key={`arc-${i}`} className="transition-all duration-300">
                    <path
                      d={`M ${startX} 130 C ${startX} ${130 - arcHeight}, ${endX} ${130 - arcHeight}, ${endX} 130`}
                      stroke={isSelected || isParsing ? 'var(--accent-gold)' : 'var(--text-primary)'}
                      strokeWidth={isSelected || isParsing ? '2.5' : '1.25'}
                      strokeOpacity={isSelected || isParsing ? 1 : 0.65}
                    />
                    <polygon
                      points={`${endX},130 ${endX - 3},123 ${endX + 3},123`}
                      fill={isSelected || isParsing ? 'var(--accent-gold)' : 'var(--text-primary)'}
                    />
                    <rect
                      x={midX - 22}
                      y={130 - arcHeight - 8}
                      width="44"
                      height="16"
                      fill="var(--bg-surface)"
                      stroke="var(--border-subtle)"
                      rx="2"
                    />
                    <text
                      x={midX}
                      y={130 - arcHeight + 3}
                      fill={isSelected || isParsing ? 'var(--accent-gold)' : 'var(--text-secondary)'}
                      fontSize="8.5"
                      fontFamily="var(--font-mono)"
                      textAnchor="middle"
                    >
                      {token.rel}
                    </text>
                  </g>
                );
              })}

              {/* Tokens with click and hover affordances */}
              {activeSentence.tokens.map((token, i) => {
                const x = 50 + i * (280 / (activeSentence.tokens.length - 1));
                const isSelected = selectedTokenIdx === i;
                const isParsing = parsingStep === i;
                return (
                  <g
                    key={`token-${i}`}
                    onClick={() => setSelectedTokenIdx(selectedTokenIdx === i ? null : i)}
                    className="cursor-pointer group"
                  >
                    <rect
                      x={x - 34}
                      y="136"
                      width="68"
                      height="28"
                      fill={isParsing || isSelected ? 'var(--accent-navy)' : 'var(--bg-surface-elevated)'}
                      stroke={isSelected ? 'var(--accent-gold)' : 'var(--border-subtle)'}
                      strokeWidth={isSelected ? '2' : '1'}
                      rx="3"
                    />
                    <text
                      x={x}
                      y="153"
                      fill={isParsing || isSelected ? '#FFFFFF' : 'var(--text-primary)'}
                      fontSize="10"
                      fontFamily="var(--font-sans)"
                      fontWeight="500"
                      textAnchor="middle"
                    >
                      {token.word}
                    </text>
                    <text
                      x={x}
                      y="173"
                      fill="var(--text-muted)"
                      fontSize="8"
                      fontFamily="var(--font-mono)"
                      textAnchor="middle"
                    >
                      [{token.tag}]
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        {/* ========================================================
            2. POLICY & NETWORK RESILIENCE DIAGRAM
            ======================================================== */}
        {type === 'policy' && (
          <div className="w-full h-full flex flex-col justify-between">
            <svg viewBox="0 0 380 175" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Axes */}
              <line x1="40" y1="145" x2="340" y2="145" stroke="var(--border-strong)" strokeWidth="1" />
              <line x1="40" y1="145" x2="40" y2="20" stroke="var(--border-strong)" strokeWidth="1" />

              <text x="335" y="158" fill="var(--text-muted)" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="end">
                Hub Removal Fraction (p)
              </text>
              <text
                x="30"
                y="25"
                fill="var(--text-muted)"
                fontSize="8.5"
                fontFamily="var(--font-mono)"
                textAnchor="end"
                transform="rotate(-90 30 25)"
              >
                Giant Component S(p)
              </text>

              {/* Dynamic Critical Threshold Line */}
              <line
                x1={40 + criticalThreshold * 370}
                y1="20"
                x2={40 + criticalThreshold * 370}
                y2="145"
                stroke="var(--accent-gold)"
                strokeWidth="1.25"
                strokeDasharray="3 3"
              />
              <text
                x={40 + criticalThreshold * 370 + 4}
                y="32"
                fill="var(--accent-gold)"
                fontSize="8"
                fontFamily="var(--font-mono)"
              >
                pc = {criticalThreshold}
              </text>

              {/* Theoretical Percolation Curves */}
              {/* Ring-Augmented Topology Curve */}
              <path
                d="M 40 35 C 100 37, 160 48, 180 72 C 210 102, 270 142, 335 145"
                stroke="var(--text-primary)"
                strokeWidth="2"
                strokeOpacity={networkTopology === 'ring-augmented' ? 1 : 0.3}
              />
              {/* Hub-and-Spoke Topology Curve */}
              <path
                d="M 40 35 C 75 42, 110 82, 140 128 C 170 142, 240 145, 335 145"
                stroke="var(--accent-gold)"
                strokeWidth="1.75"
                strokeDasharray="3 2"
                strokeOpacity={networkTopology === 'hub-spoke' ? 1 : 0.35}
              />

              {/* Interactive Cursor Current Point */}
              {(() => {
                const currentX = 40 + removalFraction * 370;
                // Calculate curve Y
                const normalizedY = 145 - (giantComponentRatio / 100) * 110;
                return (
                  <g>
                    <line
                      x1={currentX}
                      y1="25"
                      x2={currentX}
                      y2="145"
                      stroke="var(--accent-gold)"
                      strokeWidth="1.5"
                    />
                    <circle cx={currentX} cy={normalizedY} r="4.5" fill="var(--accent-gold)" stroke="#FFFFFF" strokeWidth="1.5" />
                    <rect
                      x={Math.min(260, Math.max(50, currentX - 40))}
                      y="16"
                      width="80"
                      height="18"
                      fill="var(--bg-surface)"
                      stroke="var(--border-subtle)"
                      rx="2"
                    />
                    <text
                      x={Math.min(300, Math.max(90, currentX))}
                      y="29"
                      fill="var(--text-primary)"
                      fontSize="9"
                      fontFamily="var(--font-mono)"
                      textAnchor="middle"
                    >
                      S({removalFraction}) = {giantComponentRatio}%
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>
        )}

        {/* ========================================================
            3. COGNITION (DRIFT-DIFFUSION) DIAGRAM
            ======================================================== */}
        {type === 'cognition' && (
          <div className="w-full h-full flex flex-col justify-between">
            <svg viewBox="0 0 380 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Boundaries */}
              <line x1="45" y1="35" x2="340" y2="35" stroke="var(--text-primary)" strokeWidth="1.5" />
              <text x="50" y="27" fill="var(--text-primary)" fontSize="8.5" fontFamily="var(--font-mono)">
                Threshold +a = {thresholdA.toFixed(1)} (Choice A)
              </text>

              <line x1="45" y1="165" x2="340" y2="165" stroke="var(--text-primary)" strokeWidth="1.5" />
              <text x="50" y="177" fill="var(--text-primary)" fontSize="8.5" fontFamily="var(--font-mono)">
                Threshold 0 (Choice B)
              </text>

              {/* Start point baseline */}
              <line x1="45" y1="100" x2="340" y2="100" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="3 3" />
              <text x="50" y="96" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">
                Baseline z = a/2
              </text>

              {/* Render Animated Trajectories */}
              {simulatedPaths.map((traj, idx) => {
                if (traj.points.length < 2) return null;
                const pathStr = traj.points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');
                const isLatest = idx === simulatedPaths.length - 1;
                return (
                  <g key={`traj-${idx}`}>
                    <path
                      d={pathStr}
                      stroke={traj.outcome === 'A' ? 'var(--accent-gold)' : 'var(--text-primary)'}
                      strokeWidth={isLatest ? '2' : '1.2'}
                      strokeOpacity={isLatest ? 1 : 0.45}
                      fill="none"
                    />
                    {traj.points.length > 0 && (
                      <circle
                        cx={traj.points[traj.points.length - 1].x}
                        cy={traj.points[traj.points.length - 1].y}
                        r={isLatest ? '4' : '2.5'}
                        fill={traj.outcome === 'A' ? 'var(--accent-gold)' : 'var(--text-primary)'}
                      />
                    )}
                  </g>
                );
              })}

              {/* Drift rate vector illustration */}
              <line x1="45" y1="100" x2="115" y2={100 - driftRate * 50} stroke="var(--accent-gold)" strokeWidth="1.5" strokeDasharray="2 2" />
              <text x="120" y={98 - driftRate * 50} fill="var(--accent-gold)" fontSize="8" fontFamily="var(--font-mono)">
                v = {driftRate}
              </text>
            </svg>
          </div>
        )}

        {/* ========================================================
            4. ALGORITHMS (LATTICE PATHFINDING) DIAGRAM
            ======================================================== */}
        {type === 'algorithms' && (
          <div className="w-full h-full flex flex-col justify-between">
            <svg viewBox="0 0 380 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Lattice Grid Points */}
              {Array.from({ length: 6 }).map((_, col) =>
                Array.from({ length: 4 }).map((_, row) => {
                  const x = 55 + col * 54;
                  const y = 30 + row * 40;
                  const key = `${col}-${row}`;
                  const isBlocked = blockedNodes.has(key);
                  const isVisited = visitedNodes.includes(key);
                  const isSource = col === 0 && row === 3;
                  const isTarget = col === 5 && row === 0;

                  return (
                    <g
                      key={key}
                      onClick={() => toggleNodeBlock(key)}
                      className="cursor-pointer group"
                    >
                      {/* Grid connect line */}
                      {col < 5 && (
                        <line
                          x1={x}
                          y1={y}
                          x2={x + 54}
                          y2={y}
                          stroke="var(--border-subtle)"
                          strokeWidth="1"
                        />
                      )}
                      {row < 3 && (
                        <line
                          x1={x}
                          y1={y}
                          x2={x}
                          y2={y + 40}
                          stroke="var(--border-subtle)"
                          strokeWidth="1"
                        />
                      )}

                      {/* Node Circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSource || isTarget ? '7' : isBlocked ? '6' : isVisited ? '5' : '3'}
                        fill={
                          isSource || isTarget
                            ? 'var(--accent-navy)'
                            : isBlocked
                            ? '#DC2626'
                            : isVisited
                            ? 'var(--accent-gold)'
                            : 'var(--text-muted)'
                        }
                        fillOpacity={isBlocked || isVisited || isSource || isTarget ? 1 : 0.4}
                      />
                      {isBlocked && (
                        <line
                          x1={x - 3}
                          y1={y - 3}
                          x2={x + 3}
                          y2={y + 3}
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                      )}
                    </g>
                  );
                })
              )}

              {/* Computed Active Path */}
              <path
                d="M 55 150 L 109 150 L 109 110 L 163 110 L 217 110 L 217 70 L 271 70 L 271 30 L 325 30"
                stroke="var(--accent-gold)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              <text x="55" y="174" fill="var(--text-primary)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">
                Source s (0,0)
              </text>
              <text x="325" y="20" fill="var(--text-primary)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">
                Target t (5,3)
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* Interactive Controls & Real-Time Action Bar */}
      {interactive && (
        <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] space-y-2.5">
          {/* Linguistics Controls */}
          {type === 'linguistics' && (
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-[var(--text-muted)] uppercase">Sentence:</span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSentenceIdx((prev) => (prev + 1) % linguisticsSentences.length);
                    setSelectedTokenIdx(null);
                  }}
                  className="px-2 py-1 text-[11px] bg-[var(--bg-surface-elevated)] hover:bg-[var(--accent-gold)] hover:text-white border border-[var(--border-subtle)] rounded transition-colors flex items-center gap-1"
                >
                  <Shuffle className="w-3 h-3 text-[var(--accent-gold)]" />
                  <span>Sentence {activeSentenceIdx + 1}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={runParsingAnimation}
                  disabled={parsingStep !== -1}
                  className="px-2.5 py-1 text-[11px] bg-[var(--accent-navy)] text-white hover:bg-[var(--accent-navy-hover)] disabled:opacity-50 rounded transition-colors flex items-center gap-1"
                >
                  <Play className="w-3 h-3 text-[var(--accent-gold)]" />
                  <span>{parsingStep !== -1 ? 'Parsing...' : 'Animate Parser'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAttentionMatrix(!showAttentionMatrix)}
                  className="px-2 py-1 text-[11px] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-elevated)] rounded transition-colors"
                >
                  {showAttentionMatrix ? 'Hide Weights' : 'Attention Matrix'}
                </button>
              </div>
            </div>
          )}

          {/* Attention Matrix Drawer for Linguistics */}
          {type === 'linguistics' && showAttentionMatrix && (
            <div className="p-2.5 bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] rounded animate-in fade-in">
              <span className="block text-[10px] font-mono uppercase text-[var(--accent-gold)] font-semibold mb-1">
                Extracted Self-Attention Arc Projection Matrix:
              </span>
              <div className="grid grid-cols-4 gap-1 text-center font-mono text-[10px]">
                {activeSentence.tokens.slice(0, 4).map((t, idx) => (
                  <div key={idx} className="p-1 border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                    <span className="text-[var(--text-muted)] block text-[9px]">{t.word}</span>
                    <span className="text-[var(--text-primary)] font-semibold">{(t.weight * 0.9).toFixed(3)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Policy Controls */}
          {type === 'policy' && (
            <div className="space-y-2 text-xs font-mono">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase text-[var(--text-muted)]">Topology:</span>
                  <button
                    type="button"
                    onClick={() => setNetworkTopology('ring-augmented')}
                    className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                      networkTopology === 'ring-augmented'
                        ? 'bg-[var(--accent-navy)] text-white'
                        : 'border border-[var(--border-subtle)] text-[var(--text-muted)]'
                    }`}
                  >
                    Ring-Augmented (Resilient)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNetworkTopology('hub-spoke')}
                    className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                      networkTopology === 'hub-spoke'
                        ? 'bg-[var(--accent-navy)] text-white'
                        : 'border border-[var(--border-subtle)] text-[var(--text-muted)]'
                    }`}
                  >
                    Hub-and-Spoke (Vulnerable)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={triggerCascade}
                  disabled={isSimulatingCascade}
                  className="px-2.5 py-1 text-[11px] bg-[var(--accent-navy)] text-white hover:bg-[var(--accent-navy-hover)] disabled:opacity-50 rounded transition-colors flex items-center gap-1"
                >
                  <Play className="w-3 h-3 text-[var(--accent-gold)]" />
                  <span>Simulate Failure Cascade</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] text-[var(--text-muted)] shrink-0">
                  Node Removal p = {removalFraction.toFixed(2)}
                </span>
                <input
                  type="range"
                  min="0.00"
                  max="0.60"
                  step="0.02"
                  value={removalFraction}
                  onChange={(e) => setRemovalFraction(parseFloat(e.target.value))}
                  className="w-full accent-[var(--accent-gold)] cursor-pointer"
                />
                <span
                  className={`text-[10px] font-semibold shrink-0 px-2 py-0.5 rounded ${
                    isCollapsed ? 'bg-red-500/10 text-red-600' : 'bg-emerald-500/10 text-emerald-600'
                  }`}
                >
                  {isCollapsed ? 'COLLAPSED' : 'STABLE'}
                </span>
              </div>
            </div>
          )}

          {/* Cognition Controls */}
          {type === 'cognition' && (
            <div className="space-y-2 text-xs font-mono">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[var(--text-muted)]">Drift v:</span>
                    <input
                      type="range"
                      min="0.1"
                      max="0.8"
                      step="0.05"
                      value={driftRate}
                      onChange={(e) => setDriftRate(parseFloat(e.target.value))}
                      className="w-20 accent-[var(--accent-gold)] cursor-pointer"
                    />
                    <span className="text-[10px] text-[var(--text-primary)]">{driftRate.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[var(--text-muted)]">Bound a:</span>
                    <input
                      type="range"
                      min="1.0"
                      max="2.4"
                      step="0.1"
                      value={thresholdA}
                      onChange={(e) => setThresholdA(parseFloat(e.target.value))}
                      className="w-20 accent-[var(--accent-gold)] cursor-pointer"
                    />
                    <span className="text-[10px] text-[var(--text-primary)]">{thresholdA.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={generateDriftPath}
                    disabled={isGeneratingTrajectory}
                    className="px-2.5 py-1 text-[11px] bg-[var(--accent-navy)] text-white hover:bg-[var(--accent-navy-hover)] disabled:opacity-50 rounded transition-colors flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 text-[var(--accent-gold)]" />
                    <span>Run Trajectory</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSimulatedPaths([])}
                    className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] rounded"
                    title="Clear paths"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {simulatedPaths.length > 0 && (
                <div className="text-[10px] text-[var(--text-muted)] flex items-center justify-between pt-1">
                  <span>Last Decision Time: {simulatedPaths[simulatedPaths.length - 1].decisionTime} ms</span>
                  <span className="text-[var(--accent-gold)]">
                    Choice: {simulatedPaths[simulatedPaths.length - 1].outcome === 'A' ? 'Hypothesis A' : 'Hypothesis B'}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Algorithms Controls */}
          {type === 'algorithms' && (
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="text-[10px] text-[var(--text-muted)]">
                Click nodes to toggle obstacles (red)
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={runLatticeDijkstra}
                  disabled={isSearchingPath}
                  className="px-2.5 py-1 text-[11px] bg-[var(--accent-navy)] text-white hover:bg-[var(--accent-navy-hover)] disabled:opacity-50 rounded transition-colors flex items-center gap-1"
                >
                  <Play className="w-3 h-3 text-[var(--accent-gold)]" />
                  <span>{isSearchingPath ? 'Expanding...' : 'Run Dijkstra Search'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBlockedNodes(new Set());
                    setVisitedNodes([]);
                  }}
                  className="px-2 py-1 text-[11px] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-elevated)] rounded"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {caption && (
        <p className="mt-2 text-[11px] font-sans text-[var(--text-secondary)] leading-relaxed italic border-t border-[var(--border-subtle)]/60 pt-2">
          {caption}
        </p>
      )}
    </div>
  );
};
