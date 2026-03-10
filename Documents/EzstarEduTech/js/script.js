document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    const mobileIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            mobileIcon.classList.remove('fa-bars');
            mobileIcon.classList.add('fa-xmark');
        } else {
            mobileIcon.classList.remove('fa-xmark');
            mobileIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileIcon.classList.remove('fa-xmark');
            mobileIcon.classList.add('fa-bars');
        });
    });

    // Sticky Navbar & Active Link Update on Scroll
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Update
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If the element has stagger-reveal, animate children with delay
                if (entry.target.classList.contains('stagger-reveal')) {
                    const children = entry.target.children;
                    for (let i = 0; i < children.length; i++) {
                        children[i].style.transitionDelay = `${(i + 1) * 0.1}s`;
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to observe
    const elementsToAnimate = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .stagger-reveal');
    elementsToAnimate.forEach(el => {
        animateOnScroll.observe(el);
    });

    // Interactive button hover effect (ripple/glow tracking)
    // Set up custom properties for hover effect on all .btn-glow elements
    const glowButtons = document.querySelectorAll('.btn-glow');
    glowButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Setting custom properties for potential advanced hover effects
            this.style.setProperty('--x', x + 'px');
            this.style.setProperty('--y', y + 'px');
        });
    });

    // 1. Start Learning Button - Scroll to Subjects
    const startLearningBtn = document.getElementById('startLearningBtn');
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const subjectsSection = document.getElementById('subjects');
            if (subjectsSection) {
                subjectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 2. AI Tutor Simulation functionality
    const tutorInput = document.getElementById('tutorInput');
    const tutorSendBtn = document.getElementById('tutorSendBtn');
    const tutorChatArea = document.getElementById('tutorChatArea');

    if (tutorInput && tutorSendBtn && tutorChatArea) {
        // Function to create a chat message element
        function appendMessage(text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
            messageDiv.innerHTML = `<p>${text}</p>`;
            tutorChatArea.appendChild(messageDiv);
            // Scroll to the latest message
            tutorChatArea.scrollTop = tutorChatArea.scrollHeight;
        }

        // Logic to determine AI response
        function getAIResponse(question) {
            const lowerQuestion = question.toLowerCase();
            
            if (lowerQuestion.includes('example') && lowerQuestion.includes('newton')) {
                return "Here are 3 examples of Newton's Second Law (F = ma):<br>1. Pushing a car (large mass) requires more force than pushing a bicycle (small mass) to achieve the same acceleration.<br>2. A heavy truck takes longer to stop than a small car moving at the same speed.<br>3. Kicking a soccer ball softly gives it less acceleration compared to kicking it hard with more force.";
            } else if (lowerQuestion.includes('example') && (lowerQuestion.includes('differentiation') || lowerQuestion.includes('derivative'))) {
                return "Here are 3 worked examples of differentiation:<br>1. <strong>y = x²</strong> &rarr; dy/dx = 2x<br>2. <strong>y = 3x³ + 2x</strong> &rarr; dy/dx = 9x² + 2<br>3. <strong>y = sin(x)</strong> &rarr; dy/dx = cos(x)";
            } else if (lowerQuestion.includes('example') && (lowerQuestion.includes('bonding') || lowerQuestion.includes('chemical'))) {
                return "Examples of Chemical Bonding:<br><strong>Ionic Bonding:</strong> Electrons are transferred from a metal to a non-metal (e.g., NaCl - Sodium Chloride).<br><strong>Covalent Bonding:</strong> Electrons are shared between two non-metals (e.g., H₂O - Water).";
            } else if (lowerQuestion.includes('example') && lowerQuestion.includes('english')) {
                return "Here are some English grammar examples:<br><strong>Nouns (Names):</strong> Teacher, Lagos, Computer.<br><strong>Verbs (Actions):</strong> Run, Study, Think.<br><strong>Adjectives (Describing words):</strong> Beautiful, Smart, Fast.";
            } else if (lowerQuestion.includes('teach me') || lowerQuestion.includes('work me through examples')) {
                return "Sure! Please specify the topic such as differentiation, Newton's laws, chemical bonding, or English grammar.";
            } else if (lowerQuestion.includes('differentiation') || lowerQuestion.includes('derivative')) {
                return "Differentiation is a process in calculus used to find the rate at which a quantity changes. Simply put, if you have a curve, the derivative gives you the exact slope of that curve at any given point!";
            } else if (lowerQuestion.includes('newton')) {
                return "Newton's Second Law states that the force acting on an object is equal to the mass of the object multiplied by its acceleration (F = ma). For example, it takes more force to push a heavy car than a light bicycle.";
            } else if (lowerQuestion.includes('chemical bonding') || lowerQuestion.includes('bond')) {
                return "Chemical bonding is what holds atoms together in molecules. Elements share, gain, or lose electrons to achieve a stable, full outer shell, acting like pieces of a puzzle snapping together.";
            } else {
                return "That's a great question! As your AI tutor, I'm here to help break down complex subjects step-by-step. Try asking me specifically about your syllabus topics in Math, Science, or English.";
            }
        }

        // Handle sending message
        function handleSend() {
            const questionText = tutorInput.value.trim();
            if (questionText === '') return;

            // Show User Message
            appendMessage(questionText, true);
            tutorInput.value = '';

            // Simulate AI thinking and respond
            setTimeout(() => {
                const response = getAIResponse(questionText);
                appendMessage(response, false);
            }, 800);
        }

        tutorSendBtn.addEventListener('click', handleSend);
        tutorInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });

        // AI Suggestions Logic
        const suggestionChips = document.querySelectorAll('.suggestion-chip');
        suggestionChips.forEach(chip => {
            chip.addEventListener('click', function() {
                tutorInput.value = this.innerText;
                handleSend();
            });
        });
    }

    // 3. Practice Question Solution Toggle & MCQ Logic
    const toggleSolutionBtns = document.querySelectorAll('.toggle-solution-btn');
    toggleSolutionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.q-card');
            const solutionContainer = card.querySelector('.practice-solution');
            const isHidden = solutionContainer.style.display === 'none';
            
            if (isHidden) {
                solutionContainer.style.display = 'block';
                this.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Solution';
                this.classList.add('btn-primary');
                this.classList.remove('btn-outline');
            } else {
                solutionContainer.style.display = 'none';
                this.innerHTML = '<i class="fa-solid fa-eye"></i> Show Solution';
                this.classList.remove('btn-primary');
                this.classList.add('btn-outline');
            }
        });
    });

    const mcqOptionsLists = document.querySelectorAll('.mcq-options');
    mcqOptionsLists.forEach(optionsContainer => {
        const correctVal = optionsContainer.getAttribute('data-correct');
        const buttons = optionsContainer.querySelectorAll('.mcq-btn');
        const feedbackDiv = optionsContainer.nextElementSibling;
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Disable all buttons in this container
                buttons.forEach(b => b.disabled = true);
                const selectedVal = this.getAttribute('data-val');
                
                if(selectedVal === correctVal) {
                    this.classList.add('correct');
                    feedbackDiv.innerHTML = '<i class="fa-solid fa-circle-check"></i> Correct! Well done!';
                    feedbackDiv.className = 'mcq-feedback feedback-correct';
                } else {
                    this.classList.add('incorrect');
                    buttons.forEach(b => {
                        if(b.getAttribute('data-val') === correctVal) b.classList.add('correct');
                    });
                    feedbackDiv.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Not quite, let\'s review the solution.';
                    feedbackDiv.className = 'mcq-feedback feedback-incorrect';
                }
                feedbackDiv.style.display = 'block';
            });
        });
    });

    // Exam Generator Logic
    const generateBtn = document.getElementById('generateQuestionBtn');
    if(generateBtn) {
        generateBtn.addEventListener('click', function() {
            const subject = document.getElementById('genSubject').value;
            const exam = document.getElementById('genExam').value;
            
            const area = document.getElementById('generatedQuestionArea');
            area.style.display = 'block';
            document.getElementById('genFeedback').style.display = 'none';
            document.getElementById('genExplanation').style.display = 'none';
            document.getElementById('genShowExpBtn').style.display = 'none';
            document.getElementById('genShowAnswerBtn').style.display = 'inline-flex';
            
            let qText = "";
            let optionsHTML = "";
            let correctAns = "";
            let explanation = "";
            let title = `${exam.toUpperCase()} ${subject.charAt(0).toUpperCase() + subject.slice(1)}`;
            
            // Dummy logic to generate random question based on subj
            if(subject === 'math') {
                qText = "If 3x + 5 = 20, what is the value of x?";
                optionsHTML = `
                    <button class="gen-mcq-btn" data-val="A">A) 3</button>
                    <button class="gen-mcq-btn" data-val="B">B) 5</button>
                    <button class="gen-mcq-btn" data-val="C">C) 15</button>
                    <button class="gen-mcq-btn" data-val="D">D) 25</button>
                `;
                correctAns = "B";
                explanation = "Subtract 5 from both sides: 3x = 15.<br>Divide by 3: x = 5.";
            } else if (subject === 'physics') {
                qText = "Which of these is a scalar quantity?";
                optionsHTML = `
                    <button class="gen-mcq-btn" data-val="A">A) Velocity</button>
                    <button class="gen-mcq-btn" data-val="B">B) Acceleration</button>
                    <button class="gen-mcq-btn" data-val="C">C) Speed</button>
                    <button class="gen-mcq-btn" data-val="D">D) Force</button>
                `;
                correctAns = "C";
                explanation = "Speed has only magnitude, so it is a scalar. Velocity, acceleration, and force all have direction, making them vectors.";
            } else if (subject === 'chemistry') {
                qText = "What is the atomic number of Carbon?";
                optionsHTML = `
                    <button class="gen-mcq-btn" data-val="A">A) 12</button>
                    <button class="gen-mcq-btn" data-val="B">B) 14</button>
                    <button class="gen-mcq-btn" data-val="C">C) 6</button>
                    <button class="gen-mcq-btn" data-val="D">D) 8</button>
                `;
                correctAns = "C";
                explanation = "Carbon is the 6th element on the periodic table, so it has 6 protons, meaning its atomic number is 6.";
            } else {
                qText = "Choose the word nearest in meaning to the underlined word: The boy is very <u>industrious</u>.";
                optionsHTML = `
                    <button class="gen-mcq-btn" data-val="A">A) Lazy</button>
                    <button class="gen-mcq-btn" data-val="B">B) Hardworking</button>
                    <button class="gen-mcq-btn" data-val="C">C) Stubborn</button>
                    <button class="gen-mcq-btn" data-val="D">D) Intelligent</button>
                `;
                correctAns = "B";
                explanation = "'Industrious' means diligent and hardworking. This maps perfectly to option B.";
            }

            document.getElementById('genQTag').innerText = title;
            document.getElementById('genQText').innerHTML = qText;
            document.getElementById('genOptions').innerHTML = optionsHTML;
            document.getElementById('genOptions').setAttribute('data-correct', correctAns);
            document.getElementById('genExpText').innerHTML = explanation;
            
            // Re-bind generated buttons
            const genButtons = document.querySelectorAll('.gen-mcq-btn');
            genButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    genButtons.forEach(b => b.disabled = true);
                    const sel = this.getAttribute('data-val');
                    const fb = document.getElementById('genFeedback');
                    
                    if(sel === correctAns) {
                        this.classList.add('correct');
                        fb.innerHTML = '<i class="fa-solid fa-circle-check"></i> Correct! Well done!';
                        fb.className = 'gen-feedback feedback-correct';
                    } else {
                        this.classList.add('incorrect');
                        genButtons.forEach(b => { if(b.getAttribute('data-val') === correctAns) b.classList.add('correct'); });
                        fb.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Not quite, let\'s review the explanation.';
                        fb.className = 'gen-feedback feedback-incorrect';
                    }
                    fb.style.display = 'block';
                    document.getElementById('genShowExpBtn').style.display = 'inline-flex';
                });
            });
        });

        // Show Answer / Show Explanation bindings
        document.getElementById('genShowAnswerBtn').addEventListener('click', function() {
            const correctAns = document.getElementById('genOptions').getAttribute('data-correct');
            const genButtons = document.querySelectorAll('.gen-mcq-btn');
            genButtons.forEach(b => {
                b.disabled = true;
                if(b.getAttribute('data-val') === correctAns) b.classList.add('correct');
            });
            document.getElementById('genShowExpBtn').style.display = 'inline-flex';
            this.style.display = 'none';
        });

        document.getElementById('genShowExpBtn').addEventListener('click', function() {
            const expDiv = document.getElementById('genExplanation');
            if(expDiv.style.display === 'none') {
                expDiv.style.display = 'block';
                this.innerText = 'Hide Explanation';
            } else {
                expDiv.style.display = 'none';
                this.innerText = 'Show Explanation';
            }
        });
    }

    // 4. Feature Cards Interactions
    const cardAi = document.getElementById('card-ai');
    const cardPrep = document.getElementById('card-prep');
    const cardQuiz = document.getElementById('card-quiz');
    const cardTrack = document.getElementById('card-track');

    if (cardAi) {
        cardAi.addEventListener('click', () => {
            const tutorSection = document.getElementById('tutor');
            if (tutorSection) tutorSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (cardPrep) {
        cardPrep.addEventListener('click', () => {
            const practiceSection = document.getElementById('practice');
            if (practiceSection) practiceSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (cardQuiz) {
        cardQuiz.addEventListener('click', () => {
            const practiceSection = document.getElementById('practice');
            if (practiceSection) practiceSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (cardTrack) {
        cardTrack.addEventListener('click', () => {
            alert("Smart tracking feature coming soon. EzestarEduTech will soon track your learning progress.");
        });
    }

});
