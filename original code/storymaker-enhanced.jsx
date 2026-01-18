import React, { useState, useRef, useEffect } from 'react';

// ============================================
// 📚 STORYMAKER APP - Enhanced for Grade 3 English
// Complete Question Types: MCQ, Synonyms, Antonyms,
// Fill-in-the-Blanks, Punctuation, Vocabulary, Sequencing
// ============================================

const SCREENS = {
  WELCOME: 'welcome',
  INPUT_CHOICE: 'input_choice',
  CAMERA: 'camera',
  UPLOAD: 'upload',
  ESSAY: 'essay',
  LOADING: 'loading',
  STORY: 'story',
  QUIZ: 'quiz',
  RESULTS: 'results'
};

// Question Types
const QUESTION_TYPES = {
  MCQ: 'mcq',
  SYNONYM: 'synonym',
  ANTONYM: 'antonym',
  FILL_BLANK: 'fill-blank',
  PUNCTUATION: 'punctuation',
  VOCABULARY: 'vocabulary',
  SEQUENCE: 'sequence',
  CORRECTION: 'correction'
};

// Question type labels and icons for UI
const QUESTION_TYPE_INFO = {
  [QUESTION_TYPES.MCQ]: { label: 'Reading', icon: '📖', color: '#667eea' },
  [QUESTION_TYPES.SYNONYM]: { label: 'Synonym', icon: '🔄', color: '#4ECDC4' },
  [QUESTION_TYPES.ANTONYM]: { label: 'Opposite', icon: '↔️', color: '#FF6B6B' },
  [QUESTION_TYPES.FILL_BLANK]: { label: 'Fill In', icon: '✏️', color: '#FFE66D' },
  [QUESTION_TYPES.PUNCTUATION]: { label: 'Punctuation', icon: '❗', color: '#f093fb' },
  [QUESTION_TYPES.VOCABULARY]: { label: 'Vocabulary', icon: '📚', color: '#45B7D1' },
  [QUESTION_TYPES.SEQUENCE]: { label: 'Order', icon: '🔢', color: '#96CEB4' },
  [QUESTION_TYPES.CORRECTION]: { label: 'Fix It', icon: '🔧', color: '#FFEAA7' }
};

// Fun loading messages for kids
const LOADING_MESSAGES = [
  "🎨 Looking at your amazing artwork...",
  "✨ Sprinkling some story magic...",
  "🦋 Catching creative butterflies...",
  "🌈 Mixing rainbow colors...",
  "📖 Writing your special story...",
  "🎭 Creating fun characters...",
  "🏰 Building a story world...",
  "🎪 Adding exciting adventures..."
];

// Mascot Component - Friendly guide character
const Mascot = ({ mood = 'happy', size = 'medium', message }) => {
  const sizes = { small: 60, medium: 100, large: 140 };
  const s = sizes[size];
  
  const expressions = {
    happy: { eyes: '◠', mouth: '‿' },
    excited: { eyes: '★', mouth: 'D' },
    thinking: { eyes: '◑', mouth: '~' },
    celebrating: { eyes: '♥', mouth: 'O' }
  };
  
  const exp = expressions[mood] || expressions.happy;
  
  return (
    <div className="mascot-container">
      <div className="mascot" style={{ width: s, height: s }}>
        <div className="mascot-body">
          <div className="mascot-face">
            <div className="mascot-eyes">
              <span className="eye">{exp.eyes}</span>
              <span className="eye">{exp.eyes}</span>
            </div>
            <div className="mascot-mouth">{exp.mouth}</div>
          </div>
          <div className="mascot-antenna"></div>
          <div className="mascot-antenna right"></div>
        </div>
      </div>
      {message && <div className="mascot-speech">{message}</div>}
    </div>
  );
};

// Star Rating Component
const StarRating = ({ score, total }) => {
  const percentage = (score / total) * 100;
  let stars = 1;
  if (percentage >= 80) stars = 3;
  else if (percentage >= 50) stars = 2;
  
  return (
    <div className="star-rating">
      {[1, 2, 3].map(i => (
        <span key={i} className={`star ${i <= stars ? 'filled' : ''}`}>★</span>
      ))}
    </div>
  );
};

// Welcome Screen
const WelcomeScreen = ({ onStart }) => (
  <div className="screen welcome-screen">
    <div className="welcome-content">
      <div className="floating-shapes">
        {['📚', '✏️', '🎨', '⭐', '🌈', '🦋', '🎭', '🏰'].map((emoji, i) => (
          <span key={i} className={`shape shape-${i}`}>{emoji}</span>
        ))}
      </div>
      
      <Mascot mood="excited" size="large" />
      
      <h1 className="app-title">
        <span className="title-word">Story</span>
        <span className="title-word highlight">Maker</span>
        <span className="title-sparkle">✨</span>
      </h1>
      
      <p className="welcome-text">
        Turn your drawings and ideas into amazing stories!
      </p>
      
      <button className="btn btn-primary btn-large pulse" onClick={onStart}>
        <span className="btn-icon">🚀</span>
        Let's Create!
      </button>
    </div>
  </div>
);

// Input Choice Screen
const InputChoiceScreen = ({ onChoice }) => (
  <div className="screen input-choice-screen">
    <Mascot mood="happy" message="How would you like to start?" />
    
    <h2 className="screen-title">Choose Your Adventure!</h2>
    
    <div className="choice-cards">
      <button className="choice-card camera-card" onClick={() => onChoice('camera')}>
        <div className="card-icon">📷</div>
        <div className="card-title">Take Photo</div>
        <div className="card-desc">Snap a picture of your drawing</div>
      </button>
      
      <button className="choice-card upload-card" onClick={() => onChoice('upload')}>
        <div className="card-icon">🖼️</div>
        <div className="card-title">Upload Image</div>
        <div className="card-desc">Pick a picture from your device</div>
      </button>
      
      <button className="choice-card essay-card" onClick={() => onChoice('essay')}>
        <div className="card-icon">✍️</div>
        <div className="card-title">Write Ideas</div>
        <div className="card-desc">Type your story ideas</div>
      </button>
    </div>
  </div>
);

// Camera Screen
const CameraScreen = ({ onCapture, onBack }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [captured, setCaptured] = useState(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError("Oops! Can't access the camera. Try uploading an image instead!");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      setCaptured(imageData);
    }
  };

  const retake = () => setCaptured(null);

  const confirm = () => {
    stopCamera();
    onCapture(captured);
  };

  if (error) {
    return (
      <div className="screen camera-screen">
        <Mascot mood="thinking" message={error} />
        <button className="btn btn-secondary" onClick={onBack}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="screen camera-screen">
      <h2 className="screen-title">📷 Take a Photo!</h2>
      
      <div className="camera-container">
        {!captured ? (
          <>
            <video ref={videoRef} autoPlay playsInline className="camera-preview" />
            <button className="btn-capture" onClick={takePhoto}>
              <span className="capture-ring"></span>
            </button>
          </>
        ) : (
          <div className="captured-preview">
            <img src={captured} alt="Captured" />
            <div className="capture-actions">
              <button className="btn btn-secondary" onClick={retake}>🔄 Retake</button>
              <button className="btn btn-primary" onClick={confirm}>✓ Use This!</button>
            </div>
          </div>
        )}
      </div>
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button className="btn-back" onClick={onBack}>← Back</button>
    </div>
  );
};

// Upload Screen
const UploadScreen = ({ onUpload, onBack }) => {
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <div className="screen upload-screen">
      <h2 className="screen-title">🖼️ Upload Your Drawing!</h2>
      
      {!preview ? (
        <div 
          className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-icon">🎨</div>
          <p className="upload-text">Drop your picture here</p>
          <p className="upload-subtext">or tap to choose a file</p>
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="image-preview" />
          <div className="preview-actions">
            <button className="btn btn-secondary" onClick={() => setPreview(null)}>
              🔄 Choose Different
            </button>
            <button className="btn btn-primary" onClick={() => onUpload(preview)}>
              ✓ Use This!
            </button>
          </div>
        </div>
      )}
      
      <button className="btn-back" onClick={onBack}>← Back</button>
    </div>
  );
};

// Essay Input Screen
const EssayScreen = ({ onSubmit, onBack }) => {
  const [text, setText] = useState('');
  const maxWords = 200;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const prompts = [
    "A brave knight who finds a magical...",
    "One day, a friendly dragon...",
    "In a treehouse in the clouds...",
    "The secret door in the garden led to..."
  ];

  const [currentPrompt] = useState(prompts[Math.floor(Math.random() * prompts.length)]);

  return (
    <div className="screen essay-screen">
      <h2 className="screen-title">✍️ Write Your Ideas!</h2>
      
      <Mascot mood="happy" size="small" message="Tell me about your story!" />
      
      <div className="essay-container">
        <div className="prompt-bubble">
          <span className="prompt-label">💡 Need an idea?</span>
          <span className="prompt-text">{currentPrompt}</span>
        </div>
        
        <textarea
          className="essay-input"
          placeholder="Once upon a time..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={1500}
        />
        
        <div className="word-counter">
          <span className={wordCount > maxWords ? 'over' : ''}>{wordCount}</span>
          <span className="separator">/</span>
          <span>{maxWords} words</span>
        </div>
      </div>
      
      <div className="essay-actions">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button 
          className="btn btn-primary"
          onClick={() => onSubmit(text)}
          disabled={wordCount < 5}
        >
          Create My Story! 🚀
        </button>
      </div>
    </div>
  );
};

// Loading Screen
const LoadingScreen = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(i => (i + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="screen loading-screen">
      <div className="loading-content">
        <Mascot mood="thinking" size="large" />
        
        <div className="loading-animation">
          <div className="loading-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
        
        <p className="loading-message">{LOADING_MESSAGES[messageIndex]}</p>
        
        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Story Display Screen
const StoryScreen = ({ story, onStartQuiz, onBack }) => {
  const [currentSection, setCurrentSection] = useState(0);
  
  if (!story || !story.sections) {
    return (
      <div className="screen story-screen">
        <Mascot mood="thinking" message="Oops! Something went wrong. Let's try again!" />
        <button className="btn btn-primary" onClick={onBack}>Try Again</button>
      </div>
    );
  }

  const section = story.sections[currentSection];
  const isLastSection = currentSection === story.sections.length - 1;
  const isFirstSection = currentSection === 0;

  return (
    <div className="screen story-screen">
      <div className="story-header">
        <h1 className="story-title">{story.title}</h1>
        <div className="section-indicator">
          {story.sections.map((_, i) => (
            <span 
              key={i} 
              className={`indicator-dot ${i === currentSection ? 'active' : ''} ${i < currentSection ? 'completed' : ''}`}
            />
          ))}
        </div>
      </div>
      
      <div className="story-content">
        <div className="section-card">
          <div className="section-number">Part {currentSection + 1}</div>
          <h3 className="section-heading">{section.heading}</h3>
          <p className="section-text">{section.text}</p>
          {section.illustration && (
            <div className="section-illustration">{section.illustration}</div>
          )}
        </div>
      </div>
      
      <div className="story-navigation">
        <button 
          className="btn btn-secondary"
          onClick={() => setCurrentSection(c => c - 1)}
          disabled={isFirstSection}
          style={{ opacity: isFirstSection ? 0.5 : 1 }}
        >
          ← Previous
        </button>
        
        {isLastSection ? (
          <button className="btn btn-primary btn-quiz" onClick={onStartQuiz}>
            📝 Quiz Time!
          </button>
        ) : (
          <button 
            className="btn btn-primary"
            onClick={() => setCurrentSection(c => c + 1)}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

// Question Type Badge Component
const QuestionTypeBadge = ({ type }) => {
  const info = QUESTION_TYPE_INFO[type] || QUESTION_TYPE_INFO[QUESTION_TYPES.MCQ];
  return (
    <div className="question-type-badge" style={{ backgroundColor: info.color }}>
      <span className="badge-icon">{info.icon}</span>
      <span className="badge-label">{info.label}</span>
    </div>
  );
};

// Fill in the Blank Display Component
const FillBlankDisplay = ({ sentence, showAnswer, correctAnswer }) => {
  const parts = sentence.split('_____');
  return (
    <div className="fill-blank-sentence">
      {parts[0]}
      <span className={`blank-space ${showAnswer ? 'filled' : ''}`}>
        {showAnswer ? correctAnswer : '_______'}
      </span>
      {parts[1]}
    </div>
  );
};

// Context Display Component (for synonym/vocabulary questions)
const ContextDisplay = ({ context, targetWord }) => {
  if (!context) return null;
  
  const parts = context.split(new RegExp(`(${targetWord})`, 'gi'));
  return (
    <div className="context-box">
      <div className="context-label">📖 From the story:</div>
      <div className="context-text">
        "{parts.map((part, i) => 
          part.toLowerCase() === targetWord?.toLowerCase() 
            ? <span key={i} className="highlighted-word">{part}</span>
            : part
        )}"
      </div>
    </div>
  );
};

// Enhanced Quiz Screen with Multiple Question Types
const QuizScreen = ({ questions, onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="screen quiz-screen">
        <Mascot mood="thinking" message="No questions available!" />
      </div>
    );
  }

  const question = questions[currentQ];
  const questionType = question.type || QUESTION_TYPES.MCQ;
  const isLast = currentQ === questions.length - 1;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswer = (answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);
    setShowHint(false);
    setAnswers({ ...answers, [currentQ]: answer });
  };

  const nextQuestion = () => {
    if (isLast) {
      const score = Object.entries(answers).filter(
        ([i, a]) => questions[i].correctAnswer === a
      ).length + (isCorrect ? 1 : 0);
      onComplete(score, questions.length);
    } else {
      setCurrentQ(c => c + 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
      setShowHint(false);
    }
  };

  const toggleHint = () => setShowHint(!showHint);

  // Render question content based on type
  const renderQuestionContent = () => {
    switch (questionType) {
      case QUESTION_TYPES.SYNONYM:
        return (
          <div className="question-content synonym-question">
            <p className="question-instruction">Find a word that means the <span className="emphasis">SAME</span> as:</p>
            <div className="target-word-box synonym-box">
              <span className="target-word">{question.targetWord}</span>
            </div>
            <ContextDisplay context={question.context} targetWord={question.targetWord} />
          </div>
        );

      case QUESTION_TYPES.ANTONYM:
        return (
          <div className="question-content antonym-question">
            <p className="question-instruction">Find a word that means the <span className="emphasis opposite">OPPOSITE</span> of:</p>
            <div className="target-word-box antonym-box">
              <span className="target-word">{question.targetWord}</span>
            </div>
            <ContextDisplay context={question.context} targetWord={question.targetWord} />
          </div>
        );

      case QUESTION_TYPES.FILL_BLANK:
        return (
          <div className="question-content fill-blank-question">
            <p className="question-instruction">Choose the best word to complete the sentence:</p>
            <FillBlankDisplay 
              sentence={question.sentence} 
              showAnswer={showFeedback}
              correctAnswer={question.correctAnswer}
            />
          </div>
        );

      case QUESTION_TYPES.PUNCTUATION:
        return (
          <div className="question-content punctuation-question">
            <p className="question-instruction">Which sentence has the <span className="emphasis">CORRECT</span> punctuation?</p>
            <div className="punctuation-tip">
              💡 Look for: Capital letters, periods, question marks, exclamation points, and quotation marks!
            </div>
          </div>
        );

      case QUESTION_TYPES.VOCABULARY:
        return (
          <div className="question-content vocabulary-question">
            <p className="question-instruction">What does the word <span className="vocab-word">"{question.targetWord}"</span> mean?</p>
            <ContextDisplay context={question.context} targetWord={question.targetWord} />
          </div>
        );

      case QUESTION_TYPES.SEQUENCE:
        return (
          <div className="question-content sequence-question">
            <p className="question-instruction">
              {question.question.includes('FIRST') && <span className="sequence-badge first">1st</span>}
              {question.question.includes('LAST') && <span className="sequence-badge last">Last</span>}
              {question.question.includes('NEXT') && <span className="sequence-badge next">Next</span>}
              {question.question}
            </p>
          </div>
        );

      case QUESTION_TYPES.CORRECTION:
        return (
          <div className="question-content correction-question">
            <p className="question-instruction">Find the mistake in this sentence:</p>
            <div className="sentence-to-fix">
              <span className="fix-icon">🔍</span>
              <span className="sentence-text">{question.sentence}</span>
            </div>
          </div>
        );

      default: // MCQ
        return (
          <div className="question-content mcq-question">
            <p className="question-text">{question.question}</p>
          </div>
        );
    }
  };

  // Get option display style based on question type
  const getOptionClass = (option, i) => {
    const isSelected = selectedAnswer === option;
    const isCorrectOption = option === question.correctAnswer;
    let optionClass = 'option-btn';
    
    // Add special styling for punctuation options
    if (questionType === QUESTION_TYPES.PUNCTUATION) {
      optionClass += ' punctuation-option';
    }
    
    if (showFeedback) {
      if (isCorrectOption) optionClass += ' correct';
      else if (isSelected && !isCorrectOption) optionClass += ' incorrect';
    } else if (isSelected) {
      optionClass += ' selected';
    }
    
    return optionClass;
  };

  return (
    <div className="screen quiz-screen">
      <div className="quiz-header">
        <h2 className="quiz-title">📝 Quiz Time!</h2>
        <div className="question-counter">
          Question {currentQ + 1} of {questions.length}
        </div>
        <div className="progress-dots">
          {questions.map((q, i) => (
            <span 
              key={i} 
              className={`progress-dot ${i === currentQ ? 'current' : ''} ${i < currentQ ? 'done' : ''}`}
              style={{ 
                backgroundColor: i < currentQ 
                  ? (answers[i] === questions[i].correctAnswer ? '#4ECDC4' : '#FF6B6B')
                  : undefined 
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="question-card">
        <QuestionTypeBadge type={questionType} />
        
        {renderQuestionContent()}
        
        {/* Hint button for some question types */}
        {!showFeedback && question.hint && (
          <button className="hint-btn" onClick={toggleHint}>
            {showHint ? '🙈 Hide Hint' : '💡 Need a Hint?'}
          </button>
        )}
        
        {showHint && question.hint && (
          <div className="hint-box">
            <span className="hint-icon">💡</span>
            <span className="hint-text">{question.hint}</span>
          </div>
        )}
        
        <div className="options-list">
          {question.options.map((option, i) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === question.correctAnswer;
            
            return (
              <button
                key={i}
                className={getOptionClass(option, i)}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
              >
                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                <span className="option-text">{option}</span>
                {showFeedback && isCorrectOption && <span className="check">✓</span>}
                {showFeedback && isSelected && !isCorrectOption && <span className="cross">✗</span>}
              </button>
            );
          })}
        </div>
        
        {showFeedback && (
          <div className={`feedback-box ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="feedback-icon">{isCorrect ? '🎉' : '💪'}</div>
            <div className="feedback-content">
              <div className="feedback-text">
                {isCorrect ? 'Great job!' : `The correct answer is: ${question.correctAnswer}`}
              </div>
              {question.explanation && (
                <div className="feedback-explanation">{question.explanation}</div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {showFeedback && (
        <button className="btn btn-primary btn-next" onClick={nextQuestion}>
          {isLast ? 'See Results! 🏆' : 'Next Question →'}
        </button>
      )}
    </div>
  );
};

// Results Screen with Skill Breakdown
const ResultsScreen = ({ score, total, questions, answers, onRestart, onNewStory }) => {
  const percentage = Math.round((score / total) * 100);
  
  // Calculate scores by question type
  const skillBreakdown = {};
  if (questions && answers) {
    questions.forEach((q, i) => {
      const type = q.type || QUESTION_TYPES.MCQ;
      if (!skillBreakdown[type]) {
        skillBreakdown[type] = { correct: 0, total: 0 };
      }
      skillBreakdown[type].total++;
      if (answers[i] === q.correctAnswer) {
        skillBreakdown[type].correct++;
      }
    });
  }
  
  let message, emoji, mascotMood;
  if (percentage >= 80) {
    message = "Amazing! You're a Story Master!";
    emoji = "🏆";
    mascotMood = "celebrating";
  } else if (percentage >= 50) {
    message = "Good job! Keep reading!";
    emoji = "⭐";
    mascotMood = "happy";
  } else {
    message = "Nice try! Practice makes perfect!";
    emoji = "💪";
    mascotMood = "happy";
  }

  return (
    <div className="screen results-screen">
      <div className="results-content">
        <div className="celebration-burst">
          {percentage >= 50 && ['🎉', '⭐', '✨', '🌟', '💫'].map((e, i) => (
            <span key={i} className={`burst-item burst-${i}`}>{e}</span>
          ))}
        </div>
        
        <Mascot mood={mascotMood} size="large" />
        
        <div className="results-emoji">{emoji}</div>
        
        <h2 className="results-title">{message}</h2>
        
        <div className="score-display">
          <div className="score-circle">
            <span className="score-number">{score}</span>
            <span className="score-divider">/</span>
            <span className="score-total">{total}</span>
          </div>
          <StarRating score={score} total={total} />
        </div>
        
        {/* Skill Breakdown */}
        {Object.keys(skillBreakdown).length > 1 && (
          <div className="skill-breakdown">
            <h3 className="breakdown-title">📊 Your Skills</h3>
            <div className="skill-bars">
              {Object.entries(skillBreakdown).map(([type, data]) => {
                const info = QUESTION_TYPE_INFO[type];
                const pct = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={type} className="skill-row">
                    <div className="skill-label">
                      <span className="skill-icon">{info?.icon}</span>
                      <span className="skill-name">{info?.label}</span>
                    </div>
                    <div className="skill-bar-container">
                      <div 
                        className="skill-bar-fill" 
                        style={{ 
                          width: `${pct}%`,
                          backgroundColor: info?.color 
                        }}
                      />
                    </div>
                    <div className="skill-score">{data.correct}/{data.total}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        <div className="results-actions">
          <button className="btn btn-secondary" onClick={onRestart}>
            🔄 Read Again
          </button>
          <button className="btn btn-primary" onClick={onNewStory}>
            ✨ New Story
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Story Generator with Comprehensive Question Types
const generateStoryFromInput = async (input, inputType) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const sampleStories = [
    {
      title: "The Magical Garden Adventure",
      sections: [
        {
          heading: "A Special Discovery",
          text: "One sunny morning, Maya found a tiny door hidden behind the rose bushes in her backyard. The door was painted bright blue with a golden doorknob that sparkled in the sunlight. Maya's heart beat fast with excitement!",
          illustration: "🌹🚪✨"
        },
        {
          heading: "Through the Door",
          text: "Maya turned the doorknob and stepped through. She gasped! On the other side was a magical garden where flowers could talk and butterflies left trails of glitter. A friendly caterpillar wearing tiny glasses waved at her.",
          illustration: "🦋🌸🐛"
        },
        {
          heading: "New Friends",
          text: "\"Welcome to the Garden of Wonder!\" said the caterpillar, whose name was Professor Wiggle. \"We've been waiting for someone kind to visit us. Would you like to help us solve a mystery?\"",
          illustration: "🎩🔍🌺"
        },
        {
          heading: "The Big Mystery",
          text: "Professor Wiggle explained that the Rainbow Fountain had stopped working, and without it, the flowers were losing their colors! Maya knew she had to help her new friends save the garden.",
          illustration: "🌈⛲🎨"
        },
        {
          heading: "A Happy Ending",
          text: "Maya discovered that a sleeping bunny had accidentally blocked the fountain's water pipe! After gently waking the bunny and moving it to a cozy bed of leaves, the fountain sprayed beautiful rainbow water again. The garden celebrated with a colorful party!",
          illustration: "🐰🎊🌈"
        }
      ],
      questions: [
        // MCQ - Reading Comprehension
        {
          type: QUESTION_TYPES.MCQ,
          question: "Where did Maya find the tiny door?",
          options: ["In her bedroom", "Behind the rose bushes", "At school", "In a tree"],
          correctAnswer: "Behind the rose bushes",
          explanation: "Maya found the door hidden behind the rose bushes in her backyard."
        },
        {
          type: QUESTION_TYPES.MCQ,
          question: "What was the caterpillar's name?",
          options: ["Professor Wiggle", "Mr. Crawly", "Captain Bug", "Doctor Fuzzy"],
          correctAnswer: "Professor Wiggle",
          explanation: "The friendly caterpillar was named Professor Wiggle."
        },
        // SYNONYM
        {
          type: QUESTION_TYPES.SYNONYM,
          targetWord: "tiny",
          context: "Maya found a tiny door hidden behind the rose bushes.",
          options: ["huge", "small", "heavy", "old"],
          correctAnswer: "small",
          explanation: "'Tiny' and 'small' both mean something very little in size.",
          hint: "Think about the size of the door Maya found."
        },
        {
          type: QUESTION_TYPES.SYNONYM,
          targetWord: "sparkled",
          context: "The golden doorknob sparkled in the sunlight.",
          options: ["shined", "broke", "fell", "moved"],
          correctAnswer: "shined",
          explanation: "'Sparkled' and 'shined' both mean to give off bright light.",
          hint: "What does something do when light hits it and it looks pretty?"
        },
        // ANTONYM
        {
          type: QUESTION_TYPES.ANTONYM,
          targetWord: "bright",
          context: "The door was painted bright blue.",
          options: ["dark", "pretty", "tall", "new"],
          correctAnswer: "dark",
          explanation: "'Bright' means full of light, and 'dark' means without light - they are opposites!",
          hint: "What is the opposite of a sunny day?"
        },
        // FILL IN THE BLANK
        {
          type: QUESTION_TYPES.FILL_BLANK,
          sentence: "Maya's heart beat fast with _____!",
          options: ["sadness", "excitement", "sleepiness", "hunger"],
          correctAnswer: "excitement",
          explanation: "Maya felt excited when she discovered the magical door!",
          hint: "How would you feel if you found something amazing?"
        },
        {
          type: QUESTION_TYPES.FILL_BLANK,
          sentence: "The flowers were losing their _____ because the fountain stopped working.",
          options: ["colors", "leaves", "names", "friends"],
          correctAnswer: "colors",
          explanation: "Without the Rainbow Fountain, the flowers were losing their colors.",
          hint: "What does a rainbow have that flowers might need?"
        },
        // PUNCTUATION
        {
          type: QUESTION_TYPES.PUNCTUATION,
          question: "Which sentence has the correct punctuation?",
          options: [
            "Welcome to the Garden of Wonder",
            "welcome to the Garden of Wonder!",
            "\"Welcome to the Garden of Wonder!\"",
            "\"welcome to the garden of wonder\""
          ],
          correctAnswer: "\"Welcome to the Garden of Wonder!\"",
          explanation: "When someone speaks, we use quotation marks \" \". Sentences start with capital letters. An exclamation mark shows excitement!",
          hint: "Look for quotation marks around the words someone says."
        },
        {
          type: QUESTION_TYPES.PUNCTUATION,
          question: "Which sentence is written correctly?",
          options: [
            "maya found a door",
            "Maya found a door.",
            "maya Found a Door.",
            "MAYA FOUND A DOOR"
          ],
          correctAnswer: "Maya found a door.",
          explanation: "Sentences start with a capital letter and end with a period. Only the first word and names get capital letters.",
          hint: "Remember: capital letter at the start, period at the end!"
        },
        // VOCABULARY
        {
          type: QUESTION_TYPES.VOCABULARY,
          targetWord: "gasped",
          context: "Maya turned the doorknob and stepped through. She gasped!",
          question: "What does 'gasped' mean?",
          options: [
            "Took a quick breath in surprise",
            "Laughed very loudly",
            "Fell down on the ground",
            "Closed her eyes tightly"
          ],
          correctAnswer: "Took a quick breath in surprise",
          explanation: "When you 'gasp,' you breathe in quickly because you're surprised or amazed by something!",
          hint: "Think about what you do when you see something amazing."
        },
        // SEQUENCE
        {
          type: QUESTION_TYPES.SEQUENCE,
          question: "What happened FIRST in the story?",
          options: [
            "Maya met Professor Wiggle",
            "Maya found a tiny door",
            "The garden had a party",
            "Maya woke up a sleeping bunny"
          ],
          correctAnswer: "Maya found a tiny door",
          explanation: "The story begins when Maya discovers the tiny door behind the rose bushes.",
          hint: "Think about how the story started."
        },
        {
          type: QUESTION_TYPES.SEQUENCE,
          question: "What happened LAST in the story?",
          options: [
            "Maya stepped through the door",
            "Professor Wiggle explained the problem",
            "The garden celebrated with a party",
            "Maya found the sleeping bunny"
          ],
          correctAnswer: "The garden celebrated with a party",
          explanation: "At the end of the story, after Maya fixed the fountain, the garden celebrated with a colorful party!",
          hint: "How did the story end?"
        },
        // CORRECTION
        {
          type: QUESTION_TYPES.CORRECTION,
          sentence: "the caterpillar waved at her",
          question: "Find the mistake in this sentence:",
          options: [
            "Missing capital letter at the beginning",
            "Missing period at the end",
            "Both A and B",
            "No mistakes"
          ],
          correctAnswer: "Both A and B",
          explanation: "Sentences must start with a capital letter ('The' not 'the') and end with a period (.).",
          hint: "Check both the beginning AND the end of the sentence."
        }
      ]
    },
    {
      title: "The Brave Little Robot",
      sections: [
        {
          heading: "Beep's Dream",
          text: "In a busy robot factory, there lived a small robot named Beep. While other robots dreamed of working in offices, Beep dreamed of something different – becoming an artist! Every night, Beep practiced drawing stars and rainbows.",
          illustration: "🤖✨🎨"
        },
        {
          heading: "A Difficult Day",
          text: "One day, the factory manager announced a contest. \"We need someone to design a new logo for our factory!\" All the big robots laughed at Beep. \"You're too small to create anything important,\" they said meanly.",
          illustration: "😢🏭📢"
        },
        {
          heading: "Beep Tries Anyway",
          text: "But Beep didn't give up. That night, Beep worked extra hard, using bright colors and creative shapes. The design showed robots and humans working together under a smiling sun. It was different from anything else!",
          illustration: "🌟🖼️🌈"
        },
        {
          heading: "The Big Surprise",
          text: "When the judges saw Beep's design, they were amazed! \"This is exactly what we needed!\" said the factory manager excitedly. \"It shows that everyone, big or small, can create something wonderful.\"",
          illustration: "🏆😊👏"
        },
        {
          heading: "Dreams Come True",
          text: "Beep's logo was chosen as the winner! From that day on, Beep became the factory's official artist. The other robots learned an important lesson: never judge someone by their size. Everyone has special talents waiting to shine!",
          illustration: "🤖🎨⭐"
        }
      ],
      questions: [
        // MCQ
        {
          type: QUESTION_TYPES.MCQ,
          question: "What was the small robot's name?",
          options: ["Buzz", "Beep", "Boop", "Blip"],
          correctAnswer: "Beep",
          explanation: "The small robot was named Beep."
        },
        {
          type: QUESTION_TYPES.MCQ,
          question: "What did Beep dream of becoming?",
          options: ["A chef", "A pilot", "An artist", "A teacher"],
          correctAnswer: "An artist",
          explanation: "Beep dreamed of becoming an artist and practiced drawing stars and rainbows."
        },
        {
          type: QUESTION_TYPES.MCQ,
          question: "What did Beep's design show?",
          options: ["Just robots working", "Robots and humans together", "Only the factory", "Just machines"],
          correctAnswer: "Robots and humans together",
          explanation: "Beep's design showed robots and humans working together under a smiling sun."
        },
        // SYNONYM
        {
          type: QUESTION_TYPES.SYNONYM,
          targetWord: "small",
          context: "In a busy robot factory, there lived a small robot named Beep.",
          options: ["little", "loud", "fast", "old"],
          correctAnswer: "little",
          explanation: "'Small' and 'little' both mean not big in size.",
          hint: "Think about Beep's size compared to other robots."
        },
        {
          type: QUESTION_TYPES.SYNONYM,
          targetWord: "amazed",
          context: "When the judges saw Beep's design, they were amazed!",
          options: ["angry", "surprised", "tired", "bored"],
          correctAnswer: "surprised",
          explanation: "'Amazed' and 'surprised' both mean you didn't expect something - in a good way!",
          hint: "How do you feel when you see something really cool?"
        },
        // ANTONYM
        {
          type: QUESTION_TYPES.ANTONYM,
          targetWord: "small",
          context: "\"You're too small to create anything important,\" they said.",
          options: ["big", "fast", "smart", "quiet"],
          correctAnswer: "big",
          explanation: "'Small' means little, and 'big' means large - they are opposites!",
          hint: "The other robots were the opposite of small."
        },
        {
          type: QUESTION_TYPES.ANTONYM,
          targetWord: "different",
          context: "It was different from anything else!",
          options: ["same", "pretty", "new", "colorful"],
          correctAnswer: "same",
          explanation: "'Different' means not alike, and 'same' means alike - they are opposites!",
          hint: "If something is not different, what is it?"
        },
        // FILL IN THE BLANK
        {
          type: QUESTION_TYPES.FILL_BLANK,
          sentence: "Beep worked extra hard using bright colors and creative _____.",
          options: ["sounds", "shapes", "smells", "songs"],
          correctAnswer: "shapes",
          explanation: "Beep used bright colors and creative shapes to make the design.",
          hint: "What do you use along with colors to draw pictures?"
        },
        {
          type: QUESTION_TYPES.FILL_BLANK,
          sentence: "The other robots learned an important _____.",
          options: ["song", "game", "lesson", "dance"],
          correctAnswer: "lesson",
          explanation: "The robots learned an important lesson about not judging others.",
          hint: "When you learn something important, you learn a _____."
        },
        // PUNCTUATION
        {
          type: QUESTION_TYPES.PUNCTUATION,
          question: "Which shows the correct way to write what someone said?",
          options: [
            "We need someone to design a new logo",
            "\"We need someone to design a new logo!\"",
            "we need someone to design a new logo!",
            "\"we need someone to design a new logo\""
          ],
          correctAnswer: "\"We need someone to design a new logo!\"",
          explanation: "When writing what someone says, use quotation marks, start with a capital letter, and end with the right punctuation mark.",
          hint: "Look for quotation marks AND a capital letter at the start."
        },
        // VOCABULARY
        {
          type: QUESTION_TYPES.VOCABULARY,
          targetWord: "announced",
          context: "One day, the factory manager announced a contest.",
          question: "What does 'announced' mean?",
          options: [
            "Told everyone about something",
            "Kept a secret",
            "Forgot about something",
            "Fixed something broken"
          ],
          correctAnswer: "Told everyone about something",
          explanation: "When you 'announce' something, you tell everyone about it, usually something important!",
          hint: "What does a teacher do when they have news for the class?"
        },
        // SEQUENCE
        {
          type: QUESTION_TYPES.SEQUENCE,
          question: "What happened right AFTER the big robots laughed at Beep?",
          options: [
            "Beep won the contest",
            "Beep worked hard on a design",
            "The manager announced a contest",
            "Beep became the factory artist"
          ],
          correctAnswer: "Beep worked hard on a design",
          explanation: "After being laughed at, Beep didn't give up - Beep worked extra hard that night on the design.",
          hint: "What did Beep do instead of giving up?"
        },
        // CORRECTION
        {
          type: QUESTION_TYPES.CORRECTION,
          sentence: "beep dreamed of becoming an Artist",
          question: "Find the mistake in this sentence:",
          options: [
            "'beep' should have a capital B",
            "'Artist' should not have a capital A",
            "Both A and B",
            "No mistakes"
          ],
          correctAnswer: "Both A and B",
          explanation: "Names (like Beep) always start with capital letters. Regular words (like artist) do not need capitals in the middle of a sentence.",
          hint: "Check which words should and shouldn't have capital letters."
        }
      ]
    }
  ];
  
  return sampleStories[Math.floor(Math.random() * sampleStories.length)];
};

// Main App Component
export default function StoryMakerApp() {
  const [screen, setScreen] = useState(SCREENS.WELCOME);
  const [inputData, setInputData] = useState(null);
  const [inputType, setInputType] = useState(null);
  const [story, setStory] = useState(null);
  const [quizScore, setQuizScore] = useState({ score: 0, total: 0 });
  const [quizAnswers, setQuizAnswers] = useState({});

  const handleStart = () => setScreen(SCREENS.INPUT_CHOICE);
  
  const handleChoice = (choice) => {
    setInputType(choice);
    if (choice === 'camera') setScreen(SCREENS.CAMERA);
    else if (choice === 'upload') setScreen(SCREENS.UPLOAD);
    else if (choice === 'essay') setScreen(SCREENS.ESSAY);
  };

  const handleInputSubmit = async (data) => {
    setInputData(data);
    setScreen(SCREENS.LOADING);
    
    try {
      const generatedStory = await generateStoryFromInput(data, inputType);
      setStory(generatedStory);
      setScreen(SCREENS.STORY);
    } catch (error) {
      console.error('Error generating story:', error);
      setScreen(SCREENS.INPUT_CHOICE);
    }
  };

  const handleStartQuiz = () => {
    setQuizAnswers({});
    setScreen(SCREENS.QUIZ);
  };
  
  const handleQuizComplete = (score, total) => {
    setQuizScore({ score, total });
    setScreen(SCREENS.RESULTS);
  };

  const handleRestart = () => setScreen(SCREENS.STORY);
  
  const handleNewStory = () => {
    setStory(null);
    setInputData(null);
    setInputType(null);
    setQuizAnswers({});
    setScreen(SCREENS.INPUT_CHOICE);
  };

  const goBack = () => setScreen(SCREENS.INPUT_CHOICE);

  return (
    <div className="app-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Fredoka+One&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .app-container {
          font-family: 'Nunito', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-attachment: fixed;
          overflow-x: hidden;
        }
        
        .screen {
          min-height: 100vh;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* ===== MASCOT STYLES ===== */
        .mascot-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .mascot {
          position: relative;
          animation: bounce 2s ease-in-out infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .mascot-body {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #FFE66D 0%, #FFD93D 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2), inset 0 -5px 20px rgba(0,0,0,0.1);
          border: 4px solid #FFC107;
        }
        
        .mascot-face {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        
        .mascot-eyes {
          display: flex;
          gap: 15px;
          font-size: 24px;
        }
        
        .eye {
          color: #333;
        }
        
        .mascot-mouth {
          font-size: 20px;
          color: #333;
        }
        
        .mascot-antenna {
          position: absolute;
          top: -15px;
          left: 30%;
          width: 4px;
          height: 20px;
          background: #FFC107;
          border-radius: 4px;
        }
        
        .mascot-antenna::after {
          content: '';
          position: absolute;
          top: -8px;
          left: -4px;
          width: 12px;
          height: 12px;
          background: #FF6B6B;
          border-radius: 50%;
        }
        
        .mascot-antenna.right {
          left: auto;
          right: 30%;
        }
        
        .mascot-antenna.right::after {
          background: #4ECDC4;
        }
        
        .mascot-speech {
          background: white;
          padding: 12px 20px;
          border-radius: 20px;
          margin-top: 15px;
          font-weight: 600;
          color: #333;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          position: relative;
          max-width: 280px;
          text-align: center;
        }
        
        .mascot-speech::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid white;
        }
        
        /* ===== BUTTONS ===== */
        .btn {
          padding: 14px 28px;
          border-radius: 50px;
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          font-size: 18px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%);
          color: white;
          box-shadow: 0 6px 20px rgba(78, 205, 196, 0.4);
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(78, 205, 196, 0.5);
        }
        
        .btn-secondary {
          background: white;
          color: #667eea;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        
        .btn-large {
          padding: 18px 40px;
          font-size: 22px;
        }
        
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }
        
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .btn-back {
          background: rgba(255,255,255,0.2);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          border: 2px solid rgba(255,255,255,0.3);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 20px;
        }
        
        .btn-back:hover {
          background: rgba(255,255,255,0.3);
        }
        
        /* ===== WELCOME SCREEN ===== */
        .welcome-screen {
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .welcome-content {
          position: relative;
          z-index: 2;
        }
        
        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .shape {
          position: absolute;
          font-size: 40px;
          animation: float 6s ease-in-out infinite;
          opacity: 0.6;
        }
        
        .shape-0 { top: 10%; left: 10%; animation-delay: 0s; }
        .shape-1 { top: 20%; right: 15%; animation-delay: 1s; }
        .shape-2 { top: 60%; left: 5%; animation-delay: 2s; }
        .shape-3 { top: 70%; right: 10%; animation-delay: 0.5s; }
        .shape-4 { top: 40%; left: 15%; animation-delay: 1.5s; }
        .shape-5 { top: 80%; left: 30%; animation-delay: 2.5s; }
        .shape-6 { top: 15%; left: 40%; animation-delay: 3s; }
        .shape-7 { top: 50%; right: 20%; animation-delay: 0.8s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        .app-title {
          font-family: 'Fredoka One', cursive;
          font-size: 56px;
          color: white;
          text-shadow: 4px 4px 0 rgba(0,0,0,0.2);
          margin: 20px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        
        .title-word.highlight {
          color: #FFE66D;
        }
        
        .title-sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }
        
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(15deg); }
        }
        
        .welcome-text {
          font-size: 20px;
          color: rgba(255,255,255,0.9);
          margin-bottom: 30px;
          max-width: 400px;
        }
        
        /* ===== INPUT CHOICE SCREEN ===== */
        .screen-title {
          font-family: 'Fredoka One', cursive;
          font-size: 32px;
          color: white;
          text-shadow: 3px 3px 0 rgba(0,0,0,0.2);
          margin-bottom: 30px;
          text-align: center;
        }
        
        .choice-cards {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 900px;
        }
        
        .choice-card {
          background: white;
          border-radius: 25px;
          padding: 30px;
          width: 250px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 4px solid transparent;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        
        .choice-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        
        .camera-card:hover { border-color: #FF6B6B; }
        .upload-card:hover { border-color: #4ECDC4; }
        .essay-card:hover { border-color: #FFE66D; }
        
        .card-icon {
          font-size: 60px;
          margin-bottom: 15px;
        }
        
        .card-title {
          font-family: 'Fredoka One', cursive;
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
        }
        
        .card-desc {
          font-size: 14px;
          color: #666;
        }
        
        /* ===== CAMERA SCREEN ===== */
        .camera-container {
          width: 100%;
          max-width: 500px;
          border-radius: 20px;
          overflow: hidden;
          background: #000;
          position: relative;
        }
        
        .camera-preview {
          width: 100%;
          display: block;
        }
        
        .btn-capture {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: white;
          border: 5px solid #4ECDC4;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .capture-ring {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #FF6B6B;
          transition: transform 0.2s;
        }
        
        .btn-capture:hover .capture-ring {
          transform: scale(0.9);
        }
        
        .captured-preview {
          position: relative;
        }
        
        .captured-preview img {
          width: 100%;
          display: block;
        }
        
        .capture-actions {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 15px;
        }
        
        /* ===== UPLOAD SCREEN ===== */
        .upload-zone {
          width: 100%;
          max-width: 400px;
          min-height: 300px;
          border: 4px dashed rgba(255,255,255,0.5);
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          background: rgba(255,255,255,0.1);
        }
        
        .upload-zone:hover, .upload-zone.drag-over {
          border-color: white;
          background: rgba(255,255,255,0.2);
        }
        
        .upload-icon {
          font-size: 80px;
          margin-bottom: 20px;
        }
        
        .upload-text {
          font-size: 20px;
          color: white;
          font-weight: 700;
        }
        
        .upload-subtext {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          margin-top: 10px;
        }
        
        .preview-container {
          max-width: 400px;
          width: 100%;
        }
        
        .image-preview {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .preview-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-top: 20px;
        }
        
        /* ===== ESSAY SCREEN ===== */
        .essay-container {
          width: 100%;
          max-width: 600px;
        }
        
        .prompt-bubble {
          background: rgba(255,255,255,0.15);
          border-radius: 15px;
          padding: 15px 20px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .prompt-label {
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          font-weight: 700;
        }
        
        .prompt-text {
          color: white;
          font-style: italic;
        }
        
        .essay-input {
          width: 100%;
          min-height: 200px;
          padding: 20px;
          border-radius: 20px;
          border: none;
          font-family: 'Nunito', sans-serif;
          font-size: 18px;
          resize: vertical;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .essay-input:focus {
          outline: 4px solid #4ECDC4;
        }
        
        .word-counter {
          text-align: right;
          margin-top: 10px;
          color: white;
          font-weight: 600;
        }
        
        .word-counter .over {
          color: #FF6B6B;
        }
        
        .essay-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          width: 100%;
          max-width: 600px;
        }
        
        /* ===== LOADING SCREEN ===== */
        .loading-screen {
          text-align: center;
        }
        
        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .loading-animation {
          margin: 30px 0;
        }
        
        .loading-dots {
          display: flex;
          gap: 15px;
        }
        
        .dot {
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          animation: dotBounce 1.4s ease-in-out infinite;
        }
        
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        
        .loading-message {
          font-size: 20px;
          color: white;
          font-weight: 600;
          min-height: 30px;
          animation: fadeInOut 2s ease-in-out;
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .loading-progress {
          width: 200px;
          margin-top: 30px;
        }
        
        .progress-bar {
          height: 8px;
          background: rgba(255,255,255,0.3);
          border-radius: 10px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: #4ECDC4;
          border-radius: 10px;
          animation: progressAnim 3s ease-in-out infinite;
        }
        
        @keyframes progressAnim {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        
        /* ===== STORY SCREEN ===== */
        .story-screen {
          padding: 20px;
          justify-content: flex-start;
          padding-top: 40px;
        }
        
        .story-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .story-title {
          font-family: 'Fredoka One', cursive;
          font-size: 32px;
          color: white;
          text-shadow: 3px 3px 0 rgba(0,0,0,0.2);
          margin-bottom: 20px;
        }
        
        .section-indicator {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        
        .indicator-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transition: all 0.3s;
        }
        
        .indicator-dot.active {
          background: #FFE66D;
          transform: scale(1.3);
        }
        
        .indicator-dot.completed {
          background: #4ECDC4;
        }
        
        .story-content {
          width: 100%;
          max-width: 700px;
          margin-bottom: 30px;
        }
        
        .section-card {
          background: white;
          border-radius: 25px;
          padding: 30px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
          animation: slideUp 0.5s ease;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .section-number {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 15px;
        }
        
        .section-heading {
          font-family: 'Fredoka One', cursive;
          font-size: 26px;
          color: #333;
          margin-bottom: 15px;
        }
        
        .section-text {
          font-size: 18px;
          line-height: 1.8;
          color: #444;
        }
        
        .section-illustration {
          font-size: 50px;
          text-align: center;
          margin-top: 20px;
          letter-spacing: 10px;
        }
        
        .story-navigation {
          display: flex;
          gap: 20px;
        }
        
        .btn-quiz {
          animation: pulse 2s ease-in-out infinite;
        }
        
        /* ===== QUIZ SCREEN ===== */
        .quiz-screen {
          padding: 20px;
          justify-content: flex-start;
          padding-top: 30px;
        }
        
        .quiz-header {
          text-align: center;
          margin-bottom: 25px;
        }
        
        .quiz-title {
          font-family: 'Fredoka One', cursive;
          font-size: 32px;
          color: white;
          text-shadow: 3px 3px 0 rgba(0,0,0,0.2);
          margin-bottom: 10px;
        }
        
        .question-counter {
          color: rgba(255,255,255,0.9);
          font-weight: 600;
          margin-bottom: 15px;
        }
        
        .progress-dots {
          display: flex;
          gap: 8px;
          justify-content: center;
        }
        
        .progress-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transition: all 0.3s;
        }
        
        .progress-dot.current {
          background: #FFE66D;
          transform: scale(1.3);
        }
        
        .progress-dot.done {
          background: #4ECDC4;
        }
        
        .question-card {
          background: white;
          border-radius: 25px;
          padding: 30px;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }
        
        /* Question Type Badge */
        .question-type-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 20px;
          color: white;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 20px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.15);
        }
        
        .badge-icon {
          font-size: 16px;
        }
        
        /* Question Content Styles */
        .question-content {
          margin-bottom: 25px;
        }
        
        .question-text {
          font-size: 20px;
          font-weight: 700;
          color: #333;
          line-height: 1.5;
        }
        
        .question-instruction {
          font-size: 18px;
          color: #555;
          margin-bottom: 15px;
        }
        
        .emphasis {
          color: #4ECDC4;
          font-weight: 800;
        }
        
        .emphasis.opposite {
          color: #FF6B6B;
        }
        
        /* Target Word Box (for synonyms/antonyms) */
        .target-word-box {
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          margin: 15px 0;
          border: 3px solid transparent;
        }
        
        .synonym-box {
          border-color: #4ECDC4;
        }
        
        .antonym-box {
          border-color: #FF6B6B;
        }
        
        .target-word {
          font-family: 'Fredoka One', cursive;
          font-size: 32px;
          color: #333;
        }
        
        /* Context Box */
        .context-box {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          border-radius: 0 10px 10px 0;
          padding: 15px;
          margin: 15px 0;
        }
        
        .context-label {
          font-size: 12px;
          color: #888;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .context-text {
          font-size: 16px;
          color: #555;
          font-style: italic;
          line-height: 1.6;
        }
        
        .highlighted-word {
          background: linear-gradient(120deg, #FFE66D 0%, #FFD93D 100%);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          font-style: normal;
        }
        
        /* Fill in the Blank */
        .fill-blank-sentence {
          font-size: 20px;
          color: #333;
          line-height: 1.8;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 15px;
          text-align: center;
        }
        
        .blank-space {
          display: inline-block;
          min-width: 100px;
          border-bottom: 3px solid #667eea;
          margin: 0 5px;
          padding: 2px 10px;
          font-weight: 700;
          color: #667eea;
          transition: all 0.3s;
        }
        
        .blank-space.filled {
          background: #4ECDC4;
          color: white;
          border-radius: 8px;
          border-bottom: none;
        }
        
        /* Punctuation */
        .punctuation-tip {
          background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%);
          border-radius: 10px;
          padding: 12px 15px;
          font-size: 14px;
          color: #856404;
          margin-top: 10px;
        }
        
        .punctuation-option {
          font-family: 'Courier New', monospace;
          font-size: 16px !important;
        }
        
        /* Vocabulary */
        .vocab-word {
          color: #667eea;
          font-weight: 800;
          font-style: italic;
        }
        
        /* Sequence */
        .sequence-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 14px;
          font-weight: 700;
          margin-right: 10px;
        }
        
        .sequence-badge.first {
          background: #4ECDC4;
          color: white;
        }
        
        .sequence-badge.last {
          background: #FF6B6B;
          color: white;
        }
        
        .sequence-badge.next {
          background: #FFE66D;
          color: #333;
        }
        
        /* Correction */
        .sentence-to-fix {
          display: flex;
          align-items: center;
          gap: 15px;
          background: #fff5f5;
          border: 2px dashed #FF6B6B;
          border-radius: 15px;
          padding: 20px;
          margin: 15px 0;
        }
        
        .fix-icon {
          font-size: 30px;
        }
        
        .sentence-text {
          font-size: 20px;
          font-family: 'Courier New', monospace;
          color: #333;
        }
        
        /* Hint System */
        .hint-btn {
          background: rgba(102, 126, 234, 0.1);
          border: 2px solid #667eea;
          color: #667eea;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin-bottom: 15px;
        }
        
        .hint-btn:hover {
          background: rgba(102, 126, 234, 0.2);
        }
        
        .hint-box {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: linear-gradient(135deg, #e8f4f8 0%, #d4ecf4 100%);
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 20px;
          animation: fadeIn 0.3s ease;
        }
        
        .hint-icon {
          font-size: 24px;
        }
        
        .hint-text {
          font-size: 15px;
          color: #2980b9;
          line-height: 1.5;
        }
        
        /* Options */
        .options-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .option-btn {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 16px 20px;
          background: #f8f9fa;
          border: 3px solid #e9ecef;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        
        .option-btn:hover:not(:disabled) {
          border-color: #667eea;
          background: #f0f4ff;
          transform: translateX(5px);
        }
        
        .option-btn.selected {
          border-color: #667eea;
          background: #e8edff;
        }
        
        .option-btn.correct {
          border-color: #4ECDC4;
          background: #e8faf8;
        }
        
        .option-btn.incorrect {
          border-color: #FF6B6B;
          background: #fff0f0;
        }
        
        .option-letter {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #667eea;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }
        
        .option-text {
          flex: 1;
          color: #333;
          font-size: 16px;
        }
        
        .check, .cross {
          font-size: 24px;
          font-weight: bold;
        }
        
        .check { color: #4ECDC4; }
        .cross { color: #FF6B6B; }
        
        .feedback-box {
          margin-top: 20px;
          padding: 20px;
          border-radius: 15px;
          display: flex;
          align-items: flex-start;
          gap: 15px;
          animation: slideUp 0.3s ease;
        }
        
        .feedback-box.correct {
          background: linear-gradient(135deg, #e8faf8, #d4f5f0);
          border: 2px solid #4ECDC4;
        }
        
        .feedback-box.incorrect {
          background: linear-gradient(135deg, #fff5f5, #ffe8e8);
          border: 2px solid #FF6B6B;
        }
        
        .feedback-icon {
          font-size: 30px;
        }
        
        .feedback-content {
          flex: 1;
        }
        
        .feedback-text {
          font-weight: 700;
          font-size: 16px;
          color: #333;
        }
        
        .feedback-explanation {
          font-size: 14px;
          color: #666;
          margin-top: 8px;
          line-height: 1.5;
        }
        
        .btn-next {
          margin-top: 25px;
        }
        
        /* ===== RESULTS SCREEN ===== */
        .results-screen {
          text-align: center;
        }
        
        .results-content {
          position: relative;
          max-width: 500px;
          width: 100%;
        }
        
        .celebration-burst {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: 300px;
          pointer-events: none;
        }
        
        .burst-item {
          position: absolute;
          font-size: 30px;
          animation: burst 2s ease-out infinite;
        }
        
        .burst-0 { top: 50%; left: 50%; animation-delay: 0s; }
        .burst-1 { top: 30%; left: 20%; animation-delay: 0.2s; }
        .burst-2 { top: 20%; left: 70%; animation-delay: 0.4s; }
        .burst-3 { top: 60%; left: 10%; animation-delay: 0.6s; }
        .burst-4 { top: 70%; left: 80%; animation-delay: 0.8s; }
        
        @keyframes burst {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        
        .results-emoji {
          font-size: 80px;
          margin: 20px 0;
          animation: bounce 1s ease infinite;
        }
        
        .results-title {
          font-family: 'Fredoka One', cursive;
          font-size: 32px;
          color: white;
          text-shadow: 3px 3px 0 rgba(0,0,0,0.2);
          margin-bottom: 30px;
        }
        
        .score-display {
          margin-bottom: 30px;
        }
        
        .score-circle {
          display: inline-flex;
          align-items: baseline;
          background: white;
          padding: 20px 40px;
          border-radius: 100px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          margin-bottom: 15px;
        }
        
        .score-number {
          font-family: 'Fredoka One', cursive;
          font-size: 60px;
          color: #4ECDC4;
        }
        
        .score-divider {
          font-size: 40px;
          color: #999;
          margin: 0 10px;
        }
        
        .score-total {
          font-family: 'Fredoka One', cursive;
          font-size: 40px;
          color: #999;
        }
        
        .star-rating {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        
        .star {
          font-size: 40px;
          color: rgba(255,255,255,0.3);
          transition: all 0.3s;
        }
        
        .star.filled {
          color: #FFE66D;
          text-shadow: 0 0 20px rgba(255, 230, 109, 0.5);
          animation: starPop 0.5s ease backwards;
        }
        
        .star.filled:nth-child(2) { animation-delay: 0.2s; }
        .star.filled:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes starPop {
          0% { transform: scale(0) rotate(-180deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        /* Skill Breakdown */
        .skill-breakdown {
          background: rgba(255,255,255,0.15);
          border-radius: 20px;
          padding: 20px;
          margin-bottom: 25px;
        }
        
        .breakdown-title {
          font-family: 'Fredoka One', cursive;
          font-size: 18px;
          color: white;
          margin-bottom: 15px;
        }
        
        .skill-bars {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .skill-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .skill-label {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 100px;
          color: white;
          font-size: 14px;
          font-weight: 600;
        }
        
        .skill-icon {
          font-size: 16px;
        }
        
        .skill-bar-container {
          flex: 1;
          height: 12px;
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
          overflow: hidden;
        }
        
        .skill-bar-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 1s ease;
        }
        
        .skill-score {
          min-width: 35px;
          color: white;
          font-weight: 700;
          font-size: 14px;
        }
        
        .results-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        /* ===== RESPONSIVE ===== */
        @media (max-width: 600px) {
          .app-title {
            font-size: 42px;
          }
          
          .choice-cards {
            flex-direction: column;
            align-items: center;
          }
          
          .choice-card {
            width: 100%;
            max-width: 300px;
          }
          
          .screen-title {
            font-size: 28px;
          }
          
          .story-title, .quiz-title, .results-title {
            font-size: 26px;
          }
          
          .section-heading {
            font-size: 22px;
          }
          
          .section-text, .question-text {
            font-size: 16px;
          }
          
          .target-word {
            font-size: 26px;
          }
          
          .btn {
            padding: 12px 25px;
            font-size: 16px;
          }
          
          .btn-large {
            padding: 15px 35px;
            font-size: 18px;
          }
          
          .skill-label {
            min-width: 80px;
            font-size: 12px;
          }
        }
      `}</style>
      
      {screen === SCREENS.WELCOME && (
        <WelcomeScreen onStart={handleStart} />
      )}
      
      {screen === SCREENS.INPUT_CHOICE && (
        <InputChoiceScreen onChoice={handleChoice} />
      )}
      
      {screen === SCREENS.CAMERA && (
        <CameraScreen onCapture={handleInputSubmit} onBack={goBack} />
      )}
      
      {screen === SCREENS.UPLOAD && (
        <UploadScreen onUpload={handleInputSubmit} onBack={goBack} />
      )}
      
      {screen === SCREENS.ESSAY && (
        <EssayScreen onSubmit={handleInputSubmit} onBack={goBack} />
      )}
      
      {screen === SCREENS.LOADING && (
        <LoadingScreen />
      )}
      
      {screen === SCREENS.STORY && (
        <StoryScreen 
          story={story} 
          onStartQuiz={handleStartQuiz}
          onBack={goBack}
        />
      )}
      
      {screen === SCREENS.QUIZ && (
        <QuizScreen 
          questions={story?.questions || []}
          onComplete={handleQuizComplete}
        />
      )}
      
      {screen === SCREENS.RESULTS && (
        <ResultsScreen 
          score={quizScore.score}
          total={quizScore.total}
          questions={story?.questions}
          answers={quizAnswers}
          onRestart={handleRestart}
          onNewStory={handleNewStory}
        />
      )}
    </div>
  );
}
