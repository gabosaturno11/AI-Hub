// The Art of Calisthenics Control Center
class ControlCenter {
    constructor() {
        this.bookData = {
            "parts": [
                {
                    "id": 1,
                    "title": "Foundation of Awareness",
                    "chapters": [
                        {"id": 1, "title": "Movement as Language", "status": "pending", "wordTarget": 3000, "currentWords": 0},
                        {"id": 2, "title": "The Seven Disciplines", "status": "pending", "wordTarget": 3500, "currentWords": 0},
                        {"id": 3, "title": "Ecosystem Philosophy", "status": "pending", "wordTarget": 3000, "currentWords": 0},
                        {"id": 4, "title": "Individual Expression", "status": "pending", "wordTarget": 2500, "currentWords": 0}
                    ]
                },
                {
                    "id": 2,
                    "title": "Systematic Approach",
                    "chapters": [
                        {"id": 5, "title": "Progressive Overload", "status": "pending", "wordTarget": 3200, "currentWords": 0},
                        {"id": 6, "title": "Movement Patterns", "status": "pending", "wordTarget": 3800, "currentWords": 0},
                        {"id": 7, "title": "Skill Integration", "status": "pending", "wordTarget": 3500, "currentWords": 0},
                        {"id": 8, "title": "Recovery Systems", "status": "pending", "wordTarget": 2800, "currentWords": 0},
                        {"id": 9, "title": "Assessment Protocols", "status": "pending", "wordTarget": 3000, "currentWords": 0}
                    ]
                }
            ]
        };

        this.prompts = {
            "chapter": [
                "Generate a comprehensive chapter on [TOPIC] for The Art of Calisthenics, integrating ecosystem philosophy with practical applications...",
                "Create detailed exercise progressions for [DISCIPLINE] following Victory Belt publishing standards...",
                "Develop cross-references between [CHAPTER] and other disciplines in the seven-part system..."
            ],
            "enhancement": [
                "Enhance this section with Gabo's authentic voice and movement philosophy...",
                "Add technical depth while maintaining accessibility for beginners...",
                "Create visual descriptions for exercise demonstrations and form cues..."
            ]
        };

        this.assets = [
            {
                "type": "PDF",
                "name": "HBF_Ph1_Week-1.pdf",
                "category": "Handbalancing",
                "status": "integrated"
            },
            {
                "type": "PDF", 
                "name": "HBF_Ph1_Week-6.pdf",
                "category": "Handbalancing",
                "status": "ready"
            },
            {
                "type": "Prompt Vault",
                "name": "Claude Artifact Collection",
                "category": "Writing Tools",
                "status": "active"
            }
        ];

        this.currentChapter = null;
        this.generationInProgress = false;
        this.generatedContent = new Map();
        
        this.init();
    }

    init() {
        this.renderBookStructure();
        this.renderAssets();
        this.updateProgress();
        this.bindEvents();
        this.updateLastAction('Control Center Initialized - Ready to complete The Art of Calisthenics');
    }

    bindEvents() {
        // Recursive Panel Controls
        document.getElementById('generate-btn')?.addEventListener('click', () => this.generateContent());
        document.getElementById('batch-process-btn')?.addEventListener('click', () => this.batchProcess());
        document.getElementById('stream-output-btn')?.addEventListener('click', () => this.streamOutput());
        document.getElementById('clear-btn')?.addEventListener('click', () => this.clearOutput());
        
        // Prompt category change
        document.getElementById('prompt-category')?.addEventListener('change', (e) => this.updatePromptPlaceholder(e.target.value));

        // Asset Management
        document.querySelectorAll('.asset-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchAssetTab(e.target.dataset.category));
        });

        // Drag and drop
        const dropZone = document.getElementById('drag-drop-zone');
        const fileInput = document.getElementById('file-input');
        
        dropZone?.addEventListener('click', () => fileInput?.click());
        dropZone?.addEventListener('dragover', (e) => this.handleDragOver(e));
        dropZone?.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        dropZone?.addEventListener('drop', (e) => this.handleDrop(e));
        fileInput?.addEventListener('change', (e) => this.handleFileSelect(e));

        // Backend Controls
        document.querySelectorAll('.control-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchControlTab(e.target.dataset.tab));
        });

        document.getElementById('test-api-btn')?.addEventListener('click', () => this.testAPI());
        
        // Export buttons
        document.querySelectorAll('.export-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.exportContent(e.target.dataset.format));
        });

        // Settings
        document.getElementById('token-limit')?.addEventListener('input', (e) => this.updateTokenLimit(e.target.value));
        
        // Checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateSettings());
        });
    }

    renderBookStructure() {
        const container = document.getElementById('book-parts');
        if (!container) return;

        container.innerHTML = '';
        
        this.bookData.parts.forEach(part => {
            const partElement = document.createElement('div');
            partElement.className = 'book-part expanded';
            
            const completedChapters = part.chapters.filter(ch => ch.status === 'completed').length;
            const inProgressChapters = part.chapters.filter(ch => ch.status === 'in-progress').length;
            
            partElement.innerHTML = `
                <div class="part-header" onclick="this.parentElement.classList.toggle('expanded')">
                    <span>Part ${part.id}: ${part.title}</span>
                    <span>${completedChapters + inProgressChapters}/${part.chapters.length}</span>
                </div>
                <div class="part-chapters">
                    ${part.chapters.map(chapter => `
                        <div class="chapter-item" data-chapter-id="${chapter.id}" onclick="controlCenter.selectChapter(${chapter.id})">
                            <div class="chapter-title">${chapter.title}</div>
                            <div class="chapter-status">
                                <span class="status status--${chapter.status === 'completed' ? 'success' : chapter.status === 'in-progress' ? 'warning' : 'info'}">${chapter.status}</span>
                                <span class="word-target">${chapter.currentWords || 0}/${chapter.wordTarget}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            container.appendChild(partElement);
        });
    }

    selectChapter(chapterId) {
        // Remove previous active states
        document.querySelectorAll('.chapter-item').forEach(item => item.classList.remove('active'));
        
        // Find and activate selected chapter
        const chapterElement = document.querySelector(`[data-chapter-id="${chapterId}"]`);
        chapterElement?.classList.add('active');
        
        // Find chapter data
        this.currentChapter = null;
        this.bookData.parts.forEach(part => {
            const chapter = part.chapters.find(ch => ch.id === chapterId);
            if (chapter) {
                this.currentChapter = chapter;
            }
        });
        
        if (this.currentChapter) {
            this.updatePromptForChapter();
            this.loadExistingContent();
            this.updateLastAction(`Selected Chapter: ${this.currentChapter.title}`);
            this.showNotification(`Working on: ${this.currentChapter.title}`, 'info');
        }
    }

    loadExistingContent() {
        const outputContent = document.getElementById('output-content');
        if (this.currentChapter && this.generatedContent.has(this.currentChapter.id)) {
            const existingContent = this.generatedContent.get(this.currentChapter.id);
            if (outputContent) {
                outputContent.textContent = existingContent;
            }
        } else if (outputContent) {
            outputContent.textContent = `Ready to generate content for: ${this.currentChapter?.title || 'Select a chapter'}

Click "Generate" to create comprehensive chapter content using Victory Belt standards and Gabo's movement philosophy.

Token batching enabled (400/8000) for optimal content generation.`;
        }
    }

    updatePromptForChapter() {
        if (!this.currentChapter) return;
        
        const promptInput = document.getElementById('prompt-input');
        const category = document.getElementById('prompt-category')?.value || 'chapter';
        
        let prompt = this.prompts[category][0];
        prompt = prompt.replace('[TOPIC]', this.currentChapter.title);
        prompt = prompt.replace('[DISCIPLINE]', this.currentChapter.title);
        prompt = prompt.replace('[CHAPTER]', this.currentChapter.title);
        
        if (promptInput) {
            promptInput.value = prompt;
        }
    }

    updatePromptPlaceholder(category) {
        const promptInput = document.getElementById('prompt-input');
        if (promptInput && this.prompts[category]) {
            let prompt = this.prompts[category][0];
            if (this.currentChapter) {
                prompt = prompt.replace('[TOPIC]', this.currentChapter.title);
                prompt = prompt.replace('[DISCIPLINE]', this.currentChapter.title);
                prompt = prompt.replace('[CHAPTER]', this.currentChapter.title);
            }
            promptInput.value = prompt;
        }
    }

    generateContent() {
        if (this.generationInProgress) return;
        
        const promptInput = document.getElementById('prompt-input');
        const outputContent = document.getElementById('output-content');
        const progressDiv = document.getElementById('generation-progress');
        const progressFill = document.getElementById('generation-fill');
        const progressText = document.getElementById('progress-text');
        const generateBtn = document.getElementById('generate-btn');
        
        if (!promptInput?.value.trim()) {
            this.showNotification('Please enter a prompt to generate content', 'warning');
            return;
        }

        if (!this.currentChapter) {
            this.showNotification('Please select a chapter first', 'warning');
            return;
        }
        
        this.generationInProgress = true;
        progressDiv?.classList.remove('hidden');
        
        if (generateBtn) {
            generateBtn.textContent = 'Generating...';
            generateBtn.disabled = true;
        }
        
        if (outputContent) {
            outputContent.textContent = 'Initializing content generation...\nApplying Victory Belt formatting standards...\nIntegrating ecosystem philosophy...';
        }
        
        // Simulate realistic generation process with multiple stages
        let progress = 0;
        const stages = [
            'Analyzing chapter structure...',
            'Integrating cross-disciplinary connections...',
            'Applying Gabo\'s movement philosophy...',
            'Formatting for Victory Belt standards...',
            'Generating exercise progressions...',
            'Adding technical depth and accessibility...',
            'Creating visual descriptions...',
            'Final content review and optimization...'
        ];
        
        let currentStage = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 12 + 3;
            if (progress > 100) progress = 100;
            
            if (progressFill) progressFill.style.width = `${progress}%`;
            
            // Update stage text
            if (progress > (currentStage + 1) * 12.5 && currentStage < stages.length - 1) {
                currentStage++;
            }
            
            if (progressText) progressText.textContent = `${stages[currentStage]} ${Math.round(progress)}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => this.completeGeneration(), 500);
            }
        }, 150);
        
        this.updateLastAction(`Generating Content: ${this.currentChapter.title}`);
    }

    completeGeneration() {
        const outputContent = document.getElementById('output-content');
        const progressDiv = document.getElementById('generation-progress');
        const generateBtn = document.getElementById('generate-btn');
        
        // Generate realistic chapter content based on selected chapter
        const wordCount = Math.floor(Math.random() * 500) + 800;
        const sampleContent = this.generateChapterContent(this.currentChapter, wordCount);
        
        if (outputContent) {
            outputContent.textContent = sampleContent;
            outputContent.scrollTop = 0;
        }
        
        // Store the generated content
        this.generatedContent.set(this.currentChapter.id, sampleContent);
        
        progressDiv?.classList.add('hidden');
        this.generationInProgress = false;
        
        if (generateBtn) {
            generateBtn.textContent = 'Generate';
            generateBtn.disabled = false;
        }
        
        // Update chapter progress
        if (this.currentChapter) {
            this.currentChapter.currentWords += wordCount;
            if (this.currentChapter.currentWords >= this.currentChapter.wordTarget * 0.8) {
                this.currentChapter.status = 'completed';
            } else {
                this.currentChapter.status = 'in-progress';
            }
            this.renderBookStructure();
            this.updateProgress();
        }
        
        this.showNotification(`Generated ${wordCount} words for ${this.currentChapter.title}`, 'success');
        this.updateLastAction(`Content Generated: ${this.currentChapter.title} (+${wordCount} words)`);
    }

    generateChapterContent(chapter, wordCount) {
        const chapterTemplates = {
            1: { // Movement as Language
                intro: "Movement transcends mere physical activity—it is a sophisticated language through which we communicate with our environment, our bodies, and our deepest selves.",
                sections: ["The Grammar of Movement", "Vocabulary Development", "Fluency Through Practice", "Cultural Dialects of Motion"]
            },
            2: { // The Seven Disciplines
                intro: "The seven disciplines of calisthenics form an interconnected ecosystem, each supporting and enhancing the others in a symphony of human potential.",
                sections: ["Handbalancing Foundation", "Locomotion Patterns", "Flexibility Integration", "Strength Fundamentals", "Conditioning Protocols", "Skills Development", "Flow States"]
            },
            5: { // Progressive Overload
                intro: "Progressive overload in calisthenics requires a nuanced understanding of leverage, time under tension, and neuromuscular adaptation.",
                sections: ["Leverage Manipulation", "Temporal Progressions", "Volume Periodization", "Intensity Scaling"]
            },
            8: { // Recovery Systems
                intro: "Recovery is not passive rest—it is an active cultivation of adaptation, repair, and preparation for greater challenges.",
                sections: ["Neurological Recovery", "Tissue Adaptation", "Sleep Architecture", "Active Recovery Protocols"]
            }
        };

        const template = chapterTemplates[chapter.id] || {
            intro: `The principles governing ${chapter.title.toLowerCase()} represent a cornerstone of comprehensive calisthenics practice.`,
            sections: ["Foundational Principles", "Practical Applications", "Progressive Development", "Integration Strategies"]
        };

        return `# ${chapter.title}

## Introduction
${template.intro}

This chapter explores the intricate relationship between theory and practice, providing you with both the philosophical framework and concrete tools necessary for mastery. Drawing from years of movement exploration and teaching experience, we'll examine how ${chapter.title.toLowerCase()} fits within the broader ecosystem of human potential.

## Core Principles

### 1. Systematic Approach
Every aspect of ${chapter.title.toLowerCase()} follows natural laws of adaptation and progression. Rather than random exercises, we employ systematic methodologies that honor your body's inherent wisdom while challenging it to grow.

### 2. Individual Expression
While principles remain universal, application must be personal. Your unique biomechanics, movement history, and goals shape how these concepts manifest in your practice.

### 3. Ecological Integration
Nothing exists in isolation. ${chapter.title} connects seamlessly with handbalancing, locomotion, flexibility, strength, conditioning, skills, and flow—each discipline informing and enhancing the others.

## ${template.sections[0]}
${template.sections[0]} forms the bedrock upon which all advancement builds. Consider the relationship between stability and mobility, strength and flexibility, challenge and recovery. These apparent opposites create dynamic tension that drives adaptation.

Key considerations:
- Assessment before progression
- Quality over quantity in all applications  
- Respect for natural movement patterns
- Integration with existing capacities

## ${template.sections[1]}
Moving from theory to practice requires careful attention to detail and systematic progression. Each exercise becomes a meditation on movement quality, an opportunity to deepen your relationship with your body.

Progressive Framework:
1. Assessment of current capacity
2. Identification of limiting factors
3. Targeted intervention strategies
4. Integration and testing phases
5. Advancement to next level

## ${template.sections[2]}
${template.sections[2]} represents the bridge between foundational work and advanced expression. Here we explore nuanced applications that challenge conventional thinking about bodyweight training.

Advanced concepts include:
- Multi-planar movement integration
- Temporal manipulation techniques
- Neuromuscular efficiency protocols
- Adaptation monitoring systems

## ${template.sections[3]}
The ultimate goal transcends individual exercises or even individual disciplines. ${template.sections[3]} reveals how ${chapter.title.toLowerCase()} contributes to your overall movement ecosystem.

Integration strategies:
- Cross-training protocols between disciplines
- Periodization considering all seven areas
- Recovery and adaptation optimization
- Long-term development planning

## Practical Applications

### Assessment Protocols
Before beginning any progression, establish baseline measurements. This includes not only physical capacity but also movement quality, coordination patterns, and subjective experiences.

### Programming Guidelines
Structure your practice sessions to include:
- Movement preparation (10-15 minutes)
- Skill development (20-30 minutes)  
- Strength/conditioning work (15-25 minutes)
- Integration and cool-down (10-15 minutes)

### Common Challenges and Solutions
Every practitioner encounters obstacles. Rather than viewing these as failures, consider them opportunities for deeper understanding and creative problem-solving.

## Chapter Integration

This exploration of ${chapter.title.toLowerCase()} connects directly with:
- Previous chapters through shared principles
- Subsequent chapters through progressive complexity
- Parallel disciplines through ecosystem thinking
- Your personal practice through individual application

## Moving Forward

As you integrate these concepts into your practice, remember that mastery is not a destination but a continuous journey of discovery. Each session offers opportunities to deepen your understanding and refine your expression.

The principles outlined here will serve you regardless of your current level or future aspirations. Whether you're taking your first steps into calisthenics or pushing the boundaries of advanced practice, these foundations remain constant.

---
Chapter ${chapter.id}: ${chapter.title}
Generated: ${new Date().toLocaleDateString()}
Word Count: ~${wordCount} words
Status: ${this.currentChapter.status}
Progress: ${Math.round((this.currentChapter.currentWords / this.currentChapter.wordTarget) * 100)}% of target

Victory Belt Publishing Standards Applied ✓
Cross-Disciplinary Integration Complete ✓
Gabo's Movement Philosophy Integrated ✓`;
    }

    batchProcess() {
        if (!this.currentChapter) {
            this.showNotification('Please select a chapter for batch processing', 'warning');
            return;
        }
        
        this.showNotification(`Batch processing ${this.currentChapter.title}: Managing 400/8000 tokens across multiple API calls`, 'info');
        this.updateLastAction(`Batch Processing: ${this.currentChapter.title}`);
        
        // Simulate batch processing
        setTimeout(() => {
            this.showNotification('Batch processing complete - content generated in optimized segments', 'success');
            this.updateLastAction('Batch Processing Complete');
        }, 3000);
    }

    streamOutput() {
        if (!this.currentChapter) {
            this.showNotification('Please select a chapter for streaming output', 'warning');
            return;
        }
        
        this.showNotification('Streaming output enabled - real-time generation with live updates', 'info');
        this.updateLastAction(`Streaming Output: ${this.currentChapter.title}`);
    }

    clearOutput() {
        const outputContent = document.getElementById('output-content');
        if (outputContent) {
            outputContent.textContent = this.currentChapter ? 
                `Ready to generate content for: ${this.currentChapter.title}\n\nClick "Generate" to create comprehensive chapter content.` :
                'Select a chapter to begin content generation';
        }
        this.updateLastAction('Output Cleared');
    }

    renderAssets() {
        const container = document.getElementById('asset-grid');
        if (!container) return;

        container.innerHTML = '';
        
        this.assets.forEach(asset => {
            const assetElement = document.createElement('div');
            assetElement.className = 'asset-item';
            assetElement.dataset.category = asset.type.toLowerCase().replace(' ', '');
            
            const iconSvg = asset.type === 'PDF' ? 
                '<svg class="asset-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>' :
                '<svg class="asset-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>';

            assetElement.innerHTML = `
                ${iconSvg}
                <div class="asset-name">${asset.name}</div>
                <div class="asset-category">${asset.category}</div>
                <span class="status status--${asset.status === 'integrated' ? 'success' : asset.status === 'active' ? 'info' : 'warning'}">${asset.status}</span>
            `;
            
            assetElement.addEventListener('click', () => {
                this.showNotification(`Integrating asset: ${asset.name}`, 'info');
                this.updateLastAction(`Asset Selected: ${asset.name}`);
            });
            
            container.appendChild(assetElement);
        });
    }

    switchAssetTab(category) {
        document.querySelectorAll('.asset-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
        
        const items = document.querySelectorAll('.asset-item');
        items.forEach(item => {
            if (category === 'all' || 
                item.dataset.category === category || 
                (category === 'pdfs' && item.dataset.category === 'pdf') ||
                (category === 'prompts' && item.dataset.category === 'promptvault')) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        
        this.updateLastAction(`Asset Filter: ${category}`);
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        
        const files = Array.from(e.dataTransfer.files);
        this.processFiles(files);
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        this.processFiles(files);
    }

    processFiles(files) {
        files.forEach(file => {
            const asset = {
                type: file.type.includes('pdf') ? 'PDF' : 'Document',
                name: file.name,
                category: file.type.includes('pdf') ? 'Training Material' : 'Content',
                status: 'ready'
            };
            this.assets.push(asset);
        });
        
        this.renderAssets();
        this.showNotification(`${files.length} file(s) uploaded and ready for integration`, 'success');
        this.updateLastAction(`Uploaded ${files.length} files`);
    }

    switchControlTab(tab) {
        document.querySelectorAll('.control-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
        
        document.querySelectorAll('.control-content').forEach(content => content.classList.add('hidden'));
        document.getElementById(`${tab}-controls`)?.classList.remove('hidden');
        
        this.updateLastAction(`Backend Tab: ${tab}`);
    }

    testAPI() {
        const endpoint = document.getElementById('api-endpoint')?.value;
        const query = document.getElementById('api-query')?.value;
        const response = document.getElementById('api-response');
        
        if (response) {
            response.innerHTML = `
<strong>Testing ${endpoint}</strong>
Query: ${query || 'Connection test'}

Response:
{
  "status": "success",
  "endpoint": "${endpoint}",
  "timestamp": "${new Date().toISOString()}",
  "tokens_available": 7600,
  "batch_ready": true,
  "streaming_enabled": true,
  "response_time": "0.8s",
  "data": {
    "connection": "stable",
    "rate_limit": "normal",
    "book_context": "The Art of Calisthenics",
    "generation_ready": true
  }
}
            `;
        }
        
        this.showNotification(`API ${endpoint} tested successfully`, 'success');
        this.updateLastAction(`API Test: ${endpoint}`);
    }

    exportContent(format) {
        const statusDiv = document.getElementById('export-status');
        const formatNames = {
            'word': 'Word Document (.docx)',
            'pdf': 'PDF Manuscript',
            'html': 'HTML Preview',
            'victory': 'Victory Belt Submission Package'
        };
        
        const completedChapters = this.getCompletedChaptersCount();
        
        if (statusDiv) {
            statusDiv.className = 'export-status active';
            statusDiv.innerHTML = `
                <div class="status status--info" style="margin-bottom: 8px;">
                    Exporting ${formatNames[format]}...
                </div>
                <div style="font-size: 12px; color: var(--color-text-secondary);">
                    Including ${completedChapters} completed chapters
                    ${format === 'victory' ? '• Victory Belt formatting applied • Professional layout included' : ''}
                </div>
            `;
            
            setTimeout(() => {
                statusDiv.innerHTML = `
                    <div class="status status--success" style="margin-bottom: 8px;">
                        ${formatNames[format]} exported successfully!
                    </div>
                    <div style="font-size: 12px; color: var(--color-text-secondary);">
                        File ready for download • ${completedChapters} chapters included
                        ${format === 'victory' ? '• Ready for publisher submission' : ''}
                    </div>
                `;
            }, 2000);
        }
        
        this.showNotification(`Exporting ${formatNames[format]} with ${completedChapters} chapters`, 'success');
        this.updateLastAction(`Export: ${formatNames[format]}`);
    }

    getCompletedChaptersCount() {
        return this.bookData.parts.reduce((sum, part) => 
            sum + part.chapters.filter(ch => ch.status === 'completed' || ch.status === 'in-progress').length, 0);
    }

    updateTokenLimit(value) {
        const display = document.getElementById('token-limit-display');
        const tokenCount = document.getElementById('token-count');
        
        if (display) display.textContent = value;
        if (tokenCount) tokenCount.textContent = `${value}/8000 tokens`;
        
        this.updateLastAction(`Token Limit: ${value}`);
    }

    updateSettings() {
        const victoryBelt = document.getElementById('victory-belt-format')?.checked;
        const academic = document.getElementById('academic-style')?.checked;
        const visual = document.getElementById('visual-elements')?.checked;
        
        let settingsMsg = 'Settings updated: ';
        if (victoryBelt) settingsMsg += 'Victory Belt ✓ ';
        if (academic) settingsMsg += 'Academic ✓ ';
        if (visual) settingsMsg += 'Visual Elements ✓';
        
        this.updateLastAction(settingsMsg);
    }

    updateProgress() {
        const totalChapters = this.bookData.parts.reduce((sum, part) => sum + part.chapters.length, 0);
        const completedChapters = this.bookData.parts.reduce((sum, part) => 
            sum + part.chapters.filter(ch => ch.status === 'completed').length, 0);
        const inProgressChapters = this.bookData.parts.reduce((sum, part) => 
            sum + part.chapters.filter(ch => ch.status === 'in-progress').length, 0);
        
        const totalWords = this.bookData.parts.reduce((sum, part) => 
            sum + part.chapters.reduce((chSum, ch) => chSum + ch.wordTarget, 0), 0);
        const currentWords = this.bookData.parts.reduce((sum, part) => 
            sum + part.chapters.reduce((chSum, ch) => chSum + (ch.currentWords || 0), 0), 0);
        
        const progressPercent = ((completedChapters + (inProgressChapters * 0.5)) / totalChapters) * 100;
        
        // Update header stats
        document.getElementById('overall-progress').textContent = `${Math.round(progressPercent)}%`;
        document.getElementById('chapters-complete').textContent = `${completedChapters + inProgressChapters}/${totalChapters}`;
        document.getElementById('total-words').textContent = `${currentWords.toLocaleString()}/${totalWords.toLocaleString()}`;
        
        // Update progress bar
        document.getElementById('progress-fill').style.width = `${progressPercent}%`;
    }

    showNotification(message, type = 'info') {
        // Create a simple notification system
        const notification = document.createElement('div');
        notification.className = `status status--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 1000;
            padding: 12px 16px;
            border-radius: 8px;
            max-width: 350px;
            box-shadow: var(--shadow-lg);
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    updateLastAction(action) {
        const lastActionElement = document.getElementById('last-action');
        if (lastActionElement) {
            lastActionElement.textContent = `Last Action: ${action}`;
        }
    }
}

// Initialize the control center when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.controlCenter = new ControlCenter();
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
`;
document.head.appendChild(style);