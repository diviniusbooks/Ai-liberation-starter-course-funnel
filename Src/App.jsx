import React, { useState, useEffect } from 'react';
import { Rocket, CheckCircle, Lock, TrendingUp, BookOpen, Trophy, Zap, Download, Share2, Mail, DollarSign, Star, Target, Brain, Shield, Lightbulb, Users, Gift, Video, FileText, MessageSquare } from 'lucide-react';

const AILiberationCourse = () => {
  const [currentModule, setCurrentModule] = useState(1);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [answers, setAnswers] = useState({});
  const [streak, setStreak] = useState(0);
  const [view, setView] = useState('course');
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [email, setEmail] = useState('');
  const [userProgress, setUserProgress] = useState(0);

  const modules = {
    1: {
      title: "The Liberation Mindset",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      lessons: [
        {
          id: 1,
          title: "Your AI Fear Inventory",
          type: "exercise",
          duration: "15 min",
          content: "Let's identify and understand your specific AI fears.",
          question: "What's your #1 fear about AI in your career?",
          exercise: "Rate your fears from 1-10 and write why each one feels real to you.",
          action: "Complete your AI Fear Inventory worksheet",
          bonus: "Download: 'The Fear-to-Power Transformation Guide'"
        },
        {
          id: 2,
          title: "What AI Actually Threatens",
          type: "lesson",
          duration: "10 min",
          content: "AI threatens repetitive tasks, not your judgment. Let's separate fact from fiction.",
          keyTakeaway: "AI won't replace workers, but workers who use AI will replace workers who don't.",
          quiz: [
            { q: "What percentage of jobs can be FULLY automated?", a: "5%", options: ["5%", "30%", "60%", "80%"] },
            { q: "What's AI's biggest weakness?", a: "Nuanced judgment", options: ["Speed", "Nuanced judgment", "Data analysis", "Pattern recognition"] }
          ]
        },
        {
          id: 3,
          title: "Reframe: From Threat to Teammate",
          type: "exercise",
          duration: "20 min",
          content: "Change your AI story, change your future.",
          question: "Rewrite your #1 fear as an opportunity using AI as your amplifier.",
          exercise: "Create your AI Partnership Vision Statement",
          action: "Write: 'I partner with AI to become exceptional at ___'"
        }
      ]
    },
    2: {
      title: "Your First AI Experiment",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
      lessons: [
        {
          id: 4,
          title: "Choose Your First AI Tool",
          type: "lesson",
          duration: "10 min",
          content: "ChatGPT, Claude, or Gemini? Here's how to pick the right one for YOU.",
          action: "Set up one free AI account today",
          resources: [
            { name: "ChatGPT Setup Guide", link: "#" },
            { name: "Claude Tutorial Video", link: "#" }
          ]
        },
        {
          id: 5,
          title: "Your First AI Task",
          type: "challenge",
          duration: "30 min",
          content: "Let's delegate one 'dread task' to AI right now.",
          challenge: "Use AI to complete ONE task you've been putting off",
          question: "What task did you delegate? How much time did you save?",
          celebration: "🎉 You just completed your first AI-assisted task!"
        }
      ]
    },
    3: {
      title: "Prompt Engineering Mastery",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      locked: true,
      unlockAt: 3,
      lessons: [
        {
          id: 6,
          title: "The PRECISE Framework",
          type: "lesson",
          duration: "15 min",
          content: "Transform amateur prompts into professional results.",
          framework: "Purpose • Role • Example • Context • Instructions • Style • Extras"
        },
        {
          id: 7,
          title: "Your Prompt Library",
          type: "exercise",
          duration: "25 min",
          content: "Build your personal collection of high-performing prompts.",
          action: "Save 3 prompts you'll use repeatedly"
        }
      ]
    }
  };

  const currentModuleData = modules[currentModule];
  const currentLessonData = currentModuleData?.lessons.find(l => l.id === currentLesson);
  const totalLessons = Object.values(modules).reduce((acc, mod) => acc + mod.lessons.length, 0);
  const progressPercent = (completedLessons.size / totalLessons) * 100;

  useEffect(() => {
    if (completedLessons.size === 3 && !email) {
      setShowEmailCapture(true);
    }
  }, [completedLessons.size, email]);

  useEffect(() => {
    let consecutive = 0;
    const sortedCompleted = Array.from(completedLessons).sort((a, b) => a - b);
    for (let i = 0; i < sortedCompleted.length; i++) {
      if (i === 0 || sortedCompleted[i] === sortedCompleted[i - 1] + 1) {
        consecutive++;
      } else break;
    }
    setStreak(consecutive);
  }, [completedLessons]);

  const handleCompleteLesson = () => {
    setCompletedLessons(new Set([...completedLessons, currentLesson]));
    const answer = document.getElementById('lessonAnswer')?.value;
    if (answer) {
      setAnswers({ ...answers, [currentLesson]: answer });
    }
    
    // Show upgrade modal every 5 lessons
    if (completedLessons.size > 0 && (completedLessons.size + 1) % 5 === 0) {
      setShowUpgradeModal(true);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('emailInput')?.value;
    if (emailInput) {
      setEmail(emailInput);
      alert('✓ Welcome! Check your email for:\n\n📚 Complete AI Toolkit Guide\n🎁 50+ Premium Prompts\n🔓 Unlocked: Advanced modules\n\n(In production, this sends to your email service)');
      setShowEmailCapture(false);
    }
  };

  // Email Capture Modal
  if (showEmailCapture) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative">
          <button 
            onClick={() => setShowEmailCapture(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          >×</button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🎉 Amazing progress!</h2>
            <p className="text-gray-600">You've completed 3 lessons! Unlock the rest:</p>
            <div className="mt-4 space-y-2 text-left">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Complete AI Toolkit Guide (PDF)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>50+ Industry-Specific Prompts</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Unlock all advanced modules</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Weekly AI tips & updates</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              id="emailInput"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Unlock Free Resources
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Join 10,000+ professionals mastering AI. Unsubscribe anytime.
          </p>
        </div>
      </div>
    );
  }

  // Upgrade Modal
  if (showUpgradeModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-8 relative">
          <button 
            onClick={() => setShowUpgradeModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          >×</button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to go pro?</h2>
            <p className="text-gray-600">Accelerate your AI mastery with premium features</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Video className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">Video tutorials for every lesson</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <FileText className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">Downloadable worksheets & templates</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">Private community access</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">Monthly live Q&A sessions</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Trophy className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">Certificate of completion</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">200+ bonus prompts library</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 mb-4 text-center">
            <div className="text-sm text-purple-700 mb-1">LIMITED TIME OFFER</div>
            <div className="flex items-center justify-center gap-3">
              <div className="text-2xl text-gray-400 line-through">$197</div>
              <div className="text-4xl font-bold text-gray-800">$97</div>
            </div>
            <div className="text-sm text-gray-600 mt-1">One-time payment • Lifetime access</div>
          </div>

          <button
            onClick={() => window.open('https://divinusbooks.carrd.co/accelerator', '_blank')}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-lg font-bold hover:from-yellow-600 hover:to-orange-600 transition-all text-lg mb-3"
          >
            Upgrade to Premium ($97)
          </button>

          <button
            onClick={() => setShowUpgradeModal(false)}
            className="w-full text-gray-600 py-2 hover:text-gray-800"
          >
            Continue with Free Version
          </button>
        </div>
      </div>
    );
  }

  // Progress Dashboard
  if (view === 'progress') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => setView('course')} className="text-purple-600 hover:text-purple-700 font-semibold">
                ← Back to Course
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Your Progress</h1>
              <div className="w-20"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800">{streak}</div>
              <div className="text-sm text-gray-600">Lesson Streak</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800">{completedLessons.size}</div>
              <div className="text-sm text-gray-600">Lessons Completed</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Target className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800">{Math.round(progressPercent)}%</div>
              <div className="text-sm text-gray-600">Course Progress</div>
            </div>
          </div>

          {/* Upsell: Physical Workbook */}
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg shadow-lg p-6 mb-6 border-2 border-blue-300">
            <div className="flex items-start gap-4">
              <BookOpen className="w-12 h-12 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-blue-900 mb-2">📖 Want the physical workbook?</h3>
                <p className="text-blue-800 mb-4">Get the complete AI Liberation workbook with all exercises, trackers, and bonus content. Beautiful design, premium quality!</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open('https://amazon.com/ai-liberation-workbook', '_blank')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold"
                  >
                    Order on Amazon - $14.99
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Module Progress</h2>
            {Object.entries(modules).map(([modId, mod]) => {
              const modLessons = mod.lessons.map(l => l.id);
              const modCompleted = modLessons.filter(id => completedLessons.has(id)).length;
              const modPercent = (modCompleted / modLessons.length) * 100;
              const ModIcon = mod.icon;

              return (
                <div key={modId} className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 bg-gradient-to-r ${mod.color} rounded-lg flex items-center justify-center`}>
                      <ModIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800">{mod.title}</h3>
                        <span className="text-sm text-gray-600">{modCompleted}/{modLessons.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`bg-gradient-to-r ${mod.color} h-2 rounded-full transition-all`}
                          style={{ width: `${modPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Community Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Users className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Join the AI Liberation Community</h3>
            <p className="text-gray-600 mb-4">10,000+ professionals mastering AI together</p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => window.open('https://divinusbooks.carrd.co/community', '_blank')}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Join Free
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Course View
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                AI Liberation
              </h1>
              <p className="text-sm text-gray-600 mt-1">Self-Paced Course • Master AI in 90 Days</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('progress')}
                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
              >
                <TrendingUp className="w-6 h-6" />
              </button>
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all font-semibold text-sm"
              >
                <Star className="w-4 h-4 inline mr-1" />
                Upgrade
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-600">{completedLessons.size}/{totalLessons}</span>
          </div>

          {streak > 0 && (
            <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg">
              <span className="text-2xl">🔥</span>
              <span className="text-sm font-semibold text-orange-700">{streak} lesson streak! Keep going!</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar: Module List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-6">
              <h2 className="font-bold text-gray-800 mb-4">Course Modules</h2>
              {Object.entries(modules).map(([modId, mod]) => {
                const ModIcon = mod.icon;
                const isLocked = mod.locked && completedLessons.size < (mod.unlockAt || 999);
                const modLessons = mod.lessons.map(l => l.id);
                const modCompleted = modLessons.filter(id => completedLessons.has(id)).length;

                return (
                  <button
                    key={modId}
                    onClick={() => !isLocked && setCurrentModule(parseInt(modId))}
                    disabled={isLocked}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-all ${
                      currentModule === parseInt(modId)
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : isLocked
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        currentModule === parseInt(modId)
                          ? 'bg-white bg-opacity-20'
                          : isLocked
                          ? 'bg-gray-200'
                          : `bg-gradient-to-r ${mod.color}`
                      }`}>
                        {isLocked ? <Lock className="w-5 h-5" /> : <ModIcon className={`w-5 h-5 ${currentModule === parseInt(modId) ? 'text-white' : 'text-white'}`} />}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{mod.title}</div>
                        <div className="text-xs opacity-75">{modCompleted}/{modLessons.length} lessons</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Lesson List for Current Module */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {currentModuleData.title}
              </h2>
              <div className="space-y-3">
                {currentModuleData.lessons.map((lesson, idx) => {
                  const isCompleted = completedLessons.has(lesson.id);
                  const isCurrent = currentLesson === lesson.id;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(lesson.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        isCurrent
                          ? 'border-purple-500 bg-purple-50'
                          : isCompleted
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-500' : isCurrent ? 'bg-purple-500' : 'bg-gray-300'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-white font-semibold text-sm">{idx + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">{lesson.title}</div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-500">{lesson.type}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Lesson Content */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold uppercase">
                  {currentLessonData.type}
                </div>
                <div className="text-sm text-gray-500">{currentLessonData.duration}</div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {currentLessonData.title}
              </h2>

              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {currentLessonData.content}
                </p>
              </div>

              {currentLessonData.keyTakeaway && (
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded mb-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-yellow-900 mb-1">Key Takeaway</div>
                      <p className="text-yellow-800">{currentLessonData.keyTakeaway}</p>
                    </div>
                  </div>
                </div>
              )}

              {currentLessonData.question && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {currentLessonData.question}
                  </label>
                  <textarea
                    id="lessonAnswer"
                    defaultValue={answers[currentLesson] || ''}
                    placeholder="Write your answer here..."
                    className="w-full h-32 p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                  />
                </div>
              )}

              {currentLessonData.exercise && (
                <div className="p-4 bg-purple-50 rounded-lg mb-6">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-purple-900 mb-1">Your Exercise</div>
                      <p className="text-purple-800">{currentLessonData.exercise}</p>
                    </div>
                  </div>
                </div>
              )}

              {currentLessonData.action && (
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded mb-6">
                  <div className="flex items-start gap-3">
                    <Rocket className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-green-900 mb-1">Action Step</div>
                      <p className="text-green-800">{currentLessonData.action}</p>
                    </div>
                  </div>
                </div>
              )}

              {currentLessonData.challenge && (
                <div className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded mb-6">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-orange-900 mb-1">Challenge</div>
                      <p className="text-orange-800">{currentLessonData.challenge}</p>
                    </div>
                  </div>
                </div>
              )}

              {currentLessonData.quiz && (
                <div className="mb-6 space-y-4">
                  <h3 className="font-bold text-gray-800">Quick Knowledge Check</h3>
                  {currentLessonData.quiz.map((q, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-800 mb-3">{q.q}</div>
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={(e) => {
                              const isCorrect = opt === q.a;
                              e.currentTarget.className = `w-full text-left p-3 rounded-lg transition-all ${
                                isCorrect 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-red-200 text-red-800'
                              }`;
                              if (isCorrect) {
                                setTimeout(() => {
                                  e.currentTarget.className = 'w-full text-left p-3 rounded-lg bg-green-100 border-2 border-green-500 text-gray-800';
                                }, 1000);
                              }
                            }}
                            className="w-full text-left p-3 rounded-lg bg-white border-2 border-gray-200 hover:border-purple-300 transition-all"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentLessonData.resources && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3">Resources</h3>
                  <div className="space-y-2">
                    {currentLessonData.resources.map((res, idx) => (
                      <a
                        key={idx}
                        href={res.link}
                        className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all"
                      >
                        <Download className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-700 font-semibold">{res.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {currentLessonData.bonus && (
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg mb-6">
                  <div className="flex items-center gap-3">
                    <Gift className="w-6 h-6 text-yellow-600" />
                    <div>
                      <div className="font-bold text-yellow-900">Bonus Resource</div>
                      <div className="text-yellow-800">{currentLessonData.bonus}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-8">
                <button
                  onClick={handleCompleteLesson}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg flex items-center justify-center gap-2 font-semibold"
                >
                  <CheckCircle className="w-5 h-5" />
                  {completedLessons.has(currentLesson) ? 'Completed ✓' : 'Mark Complete'}
                </button>
                
                <button
                  onClick={() => {
                    const nextLesson = currentLesson + 1;
                    const allLessons = Object.values(modules).flatMap(m => m.lessons);
                    if (allLessons.find(l => l.id === nextLesson)) {
                      setCurrentLesson(nextLesson);
                      // Find which module contains this lesson
                      Object.entries(modules).forEach(([modId, mod]) => {
                        if (mod.lessons.find(l => l.id === nextLesson)) {
                          setCurrentModule(parseInt(modId));
                        }
                      });
                    }
                  }}
                  disabled={currentLesson >= totalLessons}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  Next Lesson →
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    const shareText = `Just completed "${currentLessonData.title}" in AI Liberation! 🚀\n\nMastering AI one lesson at a time.\n\nJoin me: DivinusBooks.carrd.co\n\n#AILiberation #AISkills`;
                    if (navigator.share) {
                      navigator.share({ text: shareText });
                    } else {
                      navigator.clipboard.writeText(shareText);
                      alert('✓ Copied! Share on social media and tag @DiviniusBooks');
                    }
                  }}
                  className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2 text-sm"
                >
                  <Share2 className="w-4 h-4" />
                  Share Progress
                </button>
                <button
                  onClick={() => {
                    const printContent = `
                      <html>
                        <head><title>${currentLessonData.title}</title>
                        <style>body{font-family:Georgia,serif;padding:40px;line-height:1.8}h1{font-size:24px;margin-bottom:20px}.content{white-space:pre-wrap;font-size:16px}</style>
                        </head>
                        <body>
                          <h1>${currentLessonData.title}</h1>
                          <div class="content">${currentLessonData.content}</div>
                          ${currentLessonData.question ? `<p><strong>Question:</strong> ${currentLessonData.question}</p>` : ''}
                          ${answers[currentLesson] ? `<p><strong>Your Answer:</strong> ${answers[currentLesson]}</p>` : ''}
                          <hr style="margin-top:40px"/>
                          <p style="font-size:12px;color:#666">AI Liberation Course • DivinusBooks.carrd.co</p>
                        </body>
                      </html>
                    `;
                    const printWindow = window.open('', '', 'width=800,height=600');
                    printWindow.document.write(printContent);
                    printWindow.document.close();
                    printWindow.print();
                  }}
                  className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Save Lesson
                </button>
              </div>

              {/* Celebration for completed lesson */}
              {currentLessonData.celebration && completedLessons.has(currentLesson) && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-300 text-center">
                  <div className="text-3xl mb-2">🎉</div>
                  <div className="font-bold text-green-900">{currentLessonData.celebration}</div>
                </div>
              )}
            </div>

            {/* Upsell Section - Appears after every 3rd lesson */}
            {currentLesson % 3 === 0 && (
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg p-6 mt-6 border-2 border-purple-300">
                <div className="flex items-start gap-4">
                  <BookOpen className="w-12 h-12 text-purple-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-purple-900 mb-2">📚 Want the complete workbook?</h3>
                    <p className="text-purple-800 mb-4">
                      Get the AI Liberation physical workbook with all 10 chapters, exercises, and bonus content. 
                      Perfect for offline learning and reflection.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => window.open('https://amazon.com/ai-liberation-jmitchell', '_blank')}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all font-semibold"
                      >
                        Order on Amazon - $14.99
                      </button>
                      <button
                        onClick={() => window.open('https://amazon.com/ai-liberation-jmitchell#preview', '_blank')}
                        className="bg-white text-purple-700 px-6 py-2 rounded-lg hover:bg-purple-50 transition-all font-semibold border-2 border-purple-300"
                      >
                        Preview Pages
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Community Engagement */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <div className="text-center">
                <Users className="w-12 h-12 text-pink-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Learning with 10,000+ Professionals</h3>
                <p className="text-gray-600 mb-4">
                  Share your progress, get support, and celebrate wins together
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button 
                    onClick={() => window.open('https://divinusbooks.carrd.co/community', '_blank')}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
                  >
                    Join Community
                  </button>
                  <button
                    onClick={() => window.open('https://instagram.com/diviniusbooks', '_blank')}
                    className="px-6 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Follow on Instagram
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AILiberationCourse;
