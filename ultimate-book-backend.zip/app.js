// Ultimate Book Backend JavaScript - Final Fixed Version
class BookBackendApp {
    constructor() {
        this.currentView = 'dashboard';
        this.bookData = {
            title: "The Art of Calisthenics: A Revolutionary Approach to Human Movement",
            totalPages: 350,
            targetWords: 65000,
            currentWords: 12500,
            completionPercentage: 19,
            parts: [
                {
                    id: 1,
                    title: "Foundation of Awareness",
                    description: "Building the philosophical and practical groundwork",
                    color: "#FF6B6B",
                    chapters: [
                        {
                            id: 1,
                            title: "Movement as Language",
                            status: "draft",
                            wordCount: 2800,
                            targetWords: 3000,
                            lastEdited: "2025-09-10T00:45:00Z"
                        },
                        {
                            id: 2,
                            title: "The Seven Disciplines",
                            status: "outline",
                            wordCount: 800,
                            targetWords: 3500,
                            lastEdited: "2025-09-09T18:30:00Z"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Systematic Approach",
                    description: "Methodical progression and skill development",
                    color: "#4ECDC4",
                    chapters: [
                        {
                            id: 3,
                            title: "Progressive Overload Principles",
                            status: "research",
                            wordCount: 0,
                            targetWords: 3200,
                            lastEdited: null
                        }
                    ]
                }
            ]
        };
        
        this.charts = {};
        this.protocolRunning = false;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        setTimeout(() => {
            this.bindEvents();
            this.setupDragAndDrop();
            this.updateProgress();
            
            // Initialize charts after a delay
            setTimeout(() => this.initializeCharts(), 500);
            
            // Simulate real-time updates
            setInterval(() => this.simulateRealTimeUpdates(), 30000);
        }, 100);
    }

    bindEvents() {
        // Navigation - More robust event binding
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const viewName = e.currentTarget.getAttribute('data-view');
                console.log('Navigation clicked:', viewName); // Debug log
                if (viewName) {
                    this.switchView(viewName);
                }
            });
        });

        // Export button - Enhanced binding with multiple selectors
        const exportBtns = document.querySelectorAll('.export-btn, [data-action="export"]');
        exportBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Export button clicked'); // Debug log
                this.showModal('export-modal');
            });
        });

        // Protocol buttons - Enhanced with prevention of multiple runs
        document.querySelectorAll('.run-protocol').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (this.protocolRunning) {
                    this.showNotification('Protocol already running, please wait...', 'warning');
                    return;
                }
                const protocol = e.currentTarget.getAttribute('data-protocol');
                console.log('Protocol button clicked:', protocol); // Debug log
                if (protocol) {
                    this.runProtocol(protocol);
                }
            });
        });

        // Modal close buttons - Enhanced
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.hideModal();
            });
        });

        document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) {
                    this.hideModal();
                }
            });
        });

        // AI Panel
        const closePanel = document.querySelector('.close-panel');
        if (closePanel) {
            closePanel.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideAIPanel();
            });
        }

        // Category tabs
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const category = e.currentTarget.getAttribute('data-category');
                if (category) {
                    this.switchPromptCategory(category);
                }
            });
        });

        // Quick actions
        this.bindQuickActions();

        // Chapter actions
        this.bindChapterActions();

        // Mind map interactions
        this.bindMindMapEvents();

        // Export options in modal
        this.bindExportOptions();

        // Keyboard shortcuts
        this.bindKeyboardShortcuts();
    }

    bindQuickActions() {
        const actionButtons = document.querySelectorAll('.action-buttons .btn');
        actionButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const actions = ['newChapter', 'runAudit', 'aiAssistant', 'uploadAsset'];
                this.executeQuickAction(actions[index]);
            });
        });
    }

    bindChapterActions() {
        document.querySelectorAll('.chapter-actions .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = e.currentTarget.textContent.toLowerCase().trim();
                const chapterItem = e.currentTarget.closest('.chapter-item');
                const chapterId = chapterItem ? chapterItem.dataset.id : null;
                if (chapterId) {
                    this.executeChapterAction(action, chapterId);
                }
            });
        });
    }

    bindMindMapEvents() {
        const nodes = document.querySelectorAll('.mindmap-node');
        nodes.forEach(node => {
            this.makeDraggable(node);
            
            node.addEventListener('click', () => {
                this.selectMindMapNode(node);
            });
            
            node.addEventListener('dblclick', () => {
                this.editMindMapNode(node);
            });
        });

        // Mind map toolbar
        document.querySelectorAll('.mindmap-toolbar .btn').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const actions = ['addNode', 'autoLayout', 'exportMap'];
                this.executeMindMapAction(actions[index]);
            });
        });
    }

    bindExportOptions() {
        document.querySelectorAll('.export-option .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const exportType = e.currentTarget.closest('.export-option').querySelector('h4').textContent;
                this.executeExport(exportType);
            });
        });
    }

    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'n':
                        e.preventDefault();
                        this.executeQuickAction('newChapter');
                        break;
                    case 'e':
                        e.preventDefault();
                        this.showModal('export-modal');
                        break;
                    case '1':
                        e.preventDefault();
                        this.switchView('dashboard');
                        break;
                    case '2':
                        e.preventDefault();
                        this.switchView('mindmap');
                        break;
                    case '3':
                        e.preventDefault();
                        this.switchView('chapters');
                        break;
                }
            }
            
            if (e.key === 'Escape') {
                this.hideModal();
                this.hideAIPanel();
            }
        });
    }

    switchView(viewName) {
        if (!viewName || this.currentView === viewName) return;

        console.log(`Switching from ${this.currentView} to ${viewName}`); // Debug log

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        const activeNavItem = document.querySelector(`[data-view="${viewName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Update views
        document.querySelectorAll('.view-container').forEach(view => {
            view.classList.remove('active');
        });
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
            console.log(`Activated view: ${viewName}-view`); // Debug log
        }

        this.currentView = viewName;

        // Initialize view-specific features
        if (viewName === 'analytics') {
            setTimeout(() => {
                this.initializeCharts();
                this.showNotification('Analytics dashboard loaded', 'success');
            }, 200);
        }

        if (viewName === 'mindmap') {
            setTimeout(() => {
                this.refreshMindMap();
                this.showNotification('Mind map interface loaded', 'success');
            }, 100);
        }

        if (viewName === 'chapters') {
            setTimeout(() => {
                this.refreshChapterFolders();
                this.showNotification('Chapter folders loaded', 'success');
            }, 100);
        }

        if (viewName === 'protocols') {
            this.showNotification('MSOP Protocol suite ready', 'info');
        }

        if (viewName === 'timeline') {
            this.showNotification('Project timeline loaded', 'success');
        }

        // Animate the transition
        this.animateViewTransition();
    }

    refreshChapterFolders() {
        // Reinitialize drag and drop for chapter folders
        this.setupDragAndDrop();
        
        // Add some visual feedback to folders
        const folders = document.querySelectorAll('.chapter-folder');
        folders.forEach((folder, index) => {
            folder.style.opacity = '0';
            folder.style.transform = 'translateY(20px)';
            setTimeout(() => {
                folder.style.opacity = '1';
                folder.style.transform = 'translateY(0)';
                folder.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            }, index * 100);
        });
    }

    animateViewTransition() {
        const activeView = document.querySelector('.view-container.active');
        if (!activeView) return;

        activeView.style.transform = 'translateY(20px)';
        activeView.style.opacity = '0';
        
        setTimeout(() => {
            activeView.style.transform = 'translateY(0)';
            activeView.style.opacity = '1';
            activeView.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        }, 50);
    }

    initializeCharts() {
        // Only initialize if we're in analytics view and charts don't exist
        if (this.currentView !== 'analytics') return;

        // Progress Chart
        const progressCtx = document.getElementById('progressChart');
        if (progressCtx && !this.charts.progress) {
            this.charts.progress = new Chart(progressCtx, {
                type: 'line',
                data: {
                    labels: ['Sep 1', 'Sep 3', 'Sep 5', 'Sep 7', 'Sep 9', 'Sep 10'],
                    datasets: [{
                        label: 'Words Written',
                        data: [0, 2500, 4200, 6800, 10200, 12500],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(167, 169, 169, 0.1)'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(167, 169, 169, 0.1)'
                            }
                        }
                    }
                }
            });
        }

        // Word Count Chart
        const wordCtx = document.getElementById('wordCountChart');
        if (wordCtx && !this.charts.wordCount) {
            this.charts.wordCount = new Chart(wordCtx, {
                type: 'bar',
                data: {
                    labels: ['Sep 8', 'Sep 9', 'Sep 10'],
                    datasets: [{
                        label: 'Daily Words',
                        data: [650, 850, 1200],
                        backgroundColor: ['#FFC185', '#B4413C', '#1FB8CD']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(167, 169, 169, 0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
    }

    setupDragAndDrop() {
        const chapterItems = document.querySelectorAll('.chapter-item.draggable');
        chapterItems.forEach(item => {
            this.makeDraggable(item);
        });

        const folders = document.querySelectorAll('.chapter-folder .folder-content');
        folders.forEach(folder => {
            this.makeDropZone(folder);
        });
    }

    makeDraggable(element) {
        element.draggable = true;
        
        element.addEventListener('dragstart', (e) => {
            element.classList.add('dragging');
            e.dataTransfer.setData('text/plain', element.dataset.id || element.textContent);
            e.dataTransfer.effectAllowed = 'move';
            this.showNotification('Dragging chapter...', 'info');
        });

        element.addEventListener('dragend', () => {
            element.classList.remove('dragging');
        });
    }

    makeDropZone(element) {
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            element.classList.add('drag-over');
        });

        element.addEventListener('dragleave', (e) => {
            // Only remove class if we're not dragging over a child element
            if (!element.contains(e.relatedTarget)) {
                element.classList.remove('drag-over');
            }
        });

        element.addEventListener('drop', (e) => {
            e.preventDefault();
            element.classList.remove('drag-over');
            const data = e.dataTransfer.getData('text/plain');
            this.handleDrop(element, data);
        });
    }

    handleDrop(dropZone, data) {
        // Animate the successful drop
        this.showNotification('Chapter moved successfully! 📁', 'success');
        
        // Add visual feedback
        dropZone.style.transform = 'scale(1.02)';
        dropZone.style.backgroundColor = 'rgba(31, 184, 205, 0.1)';
        setTimeout(() => {
            dropZone.style.transform = 'scale(1)';
            dropZone.style.backgroundColor = '';
            dropZone.style.transition = 'all 0.2s ease';
        }, 300);
    }

    executeQuickAction(action) {
        switch (action) {
            case 'newChapter':
                this.createNewChapter();
                break;
            case 'runAudit':
                this.runProtocol('audit');
                break;
            case 'aiAssistant':
                this.showAIPanel();
                break;
            case 'uploadAsset':
                this.uploadAsset();
                break;
        }
    }

    executeChapterAction(action, chapterId) {
        const chapter = this.findChapter(chapterId);
        if (!chapter) return;

        switch (action) {
            case 'edit':
            case 'continue':
            case 'start':
                this.editChapter(chapter);
                break;
            case 'ai enhance':
            case 'ai expand':
            case 'ai research':
                this.enhanceChapterWithAI(chapter);
                break;
        }
    }

    executeMindMapAction(action) {
        switch (action) {
            case 'addNode':
                this.addMindMapNode();
                break;
            case 'autoLayout':
                this.autoLayoutMindMap();
                break;
            case 'exportMap':
                this.exportMindMap();
                break;
        }
    }

    executeExport(exportType) {
        this.showNotification(`Exporting as ${exportType}...`, 'info');
        
        // Simulate export process
        setTimeout(() => {
            this.showNotification(`${exportType} export completed! 📄`, 'success');
            this.hideModal();
        }, 2000);
    }

    createNewChapter() {
        const newChapter = {
            id: Date.now(),
            title: "New Chapter: Advanced Concepts",
            status: "outline",
            wordCount: 0,
            targetWords: 3000,
            lastEdited: new Date().toISOString()
        };

        this.showNotification('New chapter created! ✏️', 'success');
        
        // Switch to chapters view if not already there
        if (this.currentView !== 'chapters') {
            this.switchView('chapters');
        }
    }

    editChapter(chapter) {
        this.showNotification(`Opening editor for: ${chapter.title} ✏️`, 'info');
        // Simulate opening editor
        setTimeout(() => {
            this.showNotification('Rich text editor opened successfully', 'success');
        }, 1000);
    }

    enhanceChapterWithAI(chapter) {
        this.showAIPanel();
        this.showNotification(`AI assistant ready for: ${chapter.title} 🤖`, 'info');
    }

    findChapter(id) {
        for (const part of this.bookData.parts) {
            const chapter = part.chapters.find(ch => ch.id == id);
            if (chapter) return chapter;
        }
        return null;
    }

    runProtocol(protocolId) {
        if (this.protocolRunning) return;
        
        this.protocolRunning = true;
        const protocolBtn = document.querySelector(`[data-protocol="${protocolId}"]`);
        const protocolCard = protocolBtn ? protocolBtn.closest('.protocol-card') : null;
        
        if (protocolCard) {
            protocolCard.classList.add('loading');
        }
        
        if (protocolBtn) {
            protocolBtn.disabled = true;
            protocolBtn.textContent = 'Running...';
        }

        this.showNotification('🔄 Running MSOP protocol analysis...', 'info');

        // Simulate protocol execution with realistic timing
        setTimeout(() => {
            if (protocolCard) {
                protocolCard.classList.remove('loading');
            }
            
            if (protocolBtn) {
                protocolBtn.disabled = false;
                protocolBtn.textContent = 'Run Audit';
            }
            
            this.protocolRunning = false;
            this.showProtocolResults(protocolId);
        }, 3500);
    }

    showProtocolResults(protocolId) {
        let results = '';
        
        switch (protocolId) {
            case 'audit':
                results = this.generateAuditResults();
                break;
            case 'cluster':
                results = this.generateClusterResults();
                break;
            default:
                results = '<div class="protocol-result"><p>✅ Protocol completed successfully!</p></div>';
        }

        const protocolResultsContainer = document.querySelector('.protocol-results');
        if (protocolResultsContainer) {
            protocolResultsContainer.innerHTML = results;
        }
        
        this.showModal('protocol-modal');
        this.showNotification('✅ MSOP protocol completed successfully!', 'success');
    }

    generateAuditResults() {
        return `
            <div class="protocol-result">
                <h4>📊 Master Content Audit Results</h4>
                <div style="background: var(--color-bg-1); padding: var(--space-16); border-radius: var(--radius-base); margin: var(--space-16) 0;">
                    <strong>Analysis Date:</strong> ${new Date().toLocaleDateString()}<br>
                    <strong>Processing Time:</strong> 3.2 seconds<br>
                    <strong>Confidence Score:</strong> 94.7%
                </div>
                
                <h4>📈 Content Inventory</h4>
                <ul>
                    <li><strong>Total Sections:</strong> 47 identified</li>
                    <li><strong>Completed:</strong> 12 sections (25%)</li>
                    <li><strong>In Progress:</strong> 8 sections (17%)</li>
                    <li><strong>Planned:</strong> 27 sections (58%)</li>
                    <li><strong>Word Density:</strong> 265 words/section average</li>
                </ul>
                
                <h4>🎯 Critical Gap Analysis</h4>
                <div class="gap-item">
                    <strong>🔴 High Priority:</strong> Advanced planche progressions missing (5 sections needed)
                </div>
                <div class="gap-item">
                    <strong>🟡 Medium Priority:</strong> Multiple foundation sections creating redundancy
                </div>
                <div class="gap-item">
                    <strong>🟢 Opportunity:</strong> Philosophy integration points identified in 12 locations
                </div>
                
                <h4>📋 Actionable Recommendations</h4>
                <ol>
                    <li><strong>Consolidate</strong> foundation chapters for 23% better flow</li>
                    <li><strong>Add</strong> 3 intermediate skill progression sections</li>
                    <li><strong>Integrate</strong> unified philosophy thread throughout</li>
                    <li><strong>Develop</strong> case studies for each major technique</li>
                    <li><strong>Create</strong> visual progression matrices for complex skills</li>
                </ol>
                
                <div style="background: var(--color-bg-3); padding: var(--space-12); border-radius: var(--radius-base); margin-top: var(--space-16);">
                    <strong>🎯 Next Step:</strong> Execute Thematic Clustering protocol to organize identified content gaps
                </div>
            </div>
        `;
    }

    generateClusterResults() {
        return `
            <div class="protocol-result">
                <h4>🧩 Thematic Clustering Analysis</h4>
                <div class="cluster-grid">
                    <div class="cluster-item">
                        <h5>1. Movement Philosophy</h5>
                        <span class="cluster-count">8 sections</span>
                        <div style="font-size: var(--font-size-xs); margin-top: var(--space-4);">Core concepts, mindset</div>
                    </div>
                    <div class="cluster-item">
                        <h5>2. Foundation Skills</h5>
                        <span class="cluster-count">12 sections</span>
                        <div style="font-size: var(--font-size-xs); margin-top: var(--space-4);">Basic movements, strength</div>
                    </div>
                    <div class="cluster-item">
                        <h5>3. Progressive Training</h5>
                        <span class="cluster-count">15 sections</span>
                        <div style="font-size: var(--font-size-xs); margin-top: var(--space-4);">Skill development paths</div>
                    </div>
                    <div class="cluster-item">
                        <h5>4. Advanced Techniques</h5>
                        <span class="cluster-count">9 sections</span>
                        <div style="font-size: var(--font-size-xs); margin-top: var(--space-4);">Master-level skills</div>
                    </div>
                    <div class="cluster-item">
                        <h5>5. Integration Methods</h5>
                        <span class="cluster-count">6 sections</span>
                        <div style="font-size: var(--font-size-xs); margin-top: var(--space-4);">Combining techniques</div>
                    </div>
                    <div class="cluster-item">
                        <h5>6. Troubleshooting</h5>
                        <span class="cluster-count">4 sections</span>
                        <div style="font-size: var(--font-size-xs); margin-top: var(--space-4);">Common issues, fixes</div>
                    </div>
                </div>
            </div>
        `;
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            console.log(`Opening modal: ${modalId}`); // Debug log
            modal.classList.remove('hidden');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
            modal.classList.add('hidden');
        });
        document.body.style.overflow = 'auto';
    }

    showAIPanel() {
        const aiPanel = document.querySelector('.ai-panel');
        if (aiPanel) {
            aiPanel.classList.remove('hidden');
            aiPanel.classList.add('active');
            this.showNotification('🤖 AI Content Assistant activated', 'success');
        }
    }

    hideAIPanel() {
        const aiPanel = document.querySelector('.ai-panel');
        if (aiPanel) {
            aiPanel.classList.remove('active');
            aiPanel.classList.add('hidden');
        }
    }

    switchPromptCategory(category) {
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeTab = document.querySelector(`[data-category="${category}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Hide all prompt lists and show the selected one
        document.querySelectorAll('.prompt-list').forEach(list => {
            list.style.display = 'none';
        });
        
        const selectedList = document.querySelector(`.prompt-list[data-category="${category}"]`);
        if (selectedList) {
            selectedList.style.display = 'block';
        }
    }

    uploadAsset() {
        this.showNotification('📁 Asset uploader interface opened', 'info');
        // Simulate file upload
        setTimeout(() => {
            this.showNotification('✅ Exercise demonstration video uploaded!', 'success');
            this.updateAssetCount();
        }, 2000);
    }

    updateAssetCount() {
        const uploadedStat = document.querySelector('.asset-stat .stat-number');
        if (uploadedStat) {
            const current = parseInt(uploadedStat.textContent);
            uploadedStat.textContent = current + 1;
            uploadedStat.style.transform = 'scale(1.2)';
            uploadedStat.style.color = 'var(--color-primary)';
            setTimeout(() => {
                uploadedStat.style.transform = 'scale(1)';
                uploadedStat.style.color = '';
                uploadedStat.style.transition = 'all 0.3s ease';
            }, 300);
        }
    }

    addMindMapNode() {
        const canvas = document.querySelector('.mindmap-canvas');
        if (!canvas) return;

        const newNode = document.createElement('div');
        newNode.className = 'mindmap-node chapter';
        newNode.innerHTML = '<div class="node-content">New Movement Concept</div>';
        newNode.style.left = '60%';
        newNode.style.top = '70%';
        
        canvas.appendChild(newNode);
        this.makeDraggable(newNode);
        
        this.showNotification('🧠 New concept node added to mind map!', 'success');
        this.animateElementCreation('.mindmap-node:last-child');
    }

    autoLayoutMindMap() {
        const nodes = document.querySelectorAll('.mindmap-node');
        nodes.forEach((node, index) => {
            node.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            
            // Apply auto-layout positioning
            if (index === 0) return; // Skip root node
            
            const angle = (index - 1) * (360 / (nodes.length - 1));
            const radius = 200;
            const x = 50 + (radius * Math.cos(angle * Math.PI / 180)) / 10;
            const y = 40 + (radius * Math.sin(angle * Math.PI / 180)) / 10;
            
            node.style.left = `${Math.max(5, Math.min(95, x))}%`;
            node.style.top = `${Math.max(5, Math.min(95, y))}%`;
        });
        
        this.showNotification('🔄 Mind map reorganized with optimal layout!', 'success');
    }

    exportMindMap() {
        this.showNotification('📸 Mind map exported as high-resolution image!', 'success');
    }

    refreshMindMap() {
        // Add visual refresh for mind map
        const nodes = document.querySelectorAll('.mindmap-node');
        nodes.forEach(node => {
            node.style.opacity = '0';
            node.style.transform = 'scale(0.8)';
        });
        
        setTimeout(() => {
            nodes.forEach((node, index) => {
                setTimeout(() => {
                    node.style.opacity = '1';
                    node.style.transform = 'scale(1)';
                    node.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                }, index * 100);
            });
        }, 100);
    }

    selectMindMapNode(node) {
        document.querySelectorAll('.mindmap-node').forEach(n => {
            n.classList.remove('selected');
            n.style.boxShadow = '';
        });
        node.classList.add('selected');
        node.style.boxShadow = '0 0 0 3px rgba(31, 184, 205, 0.4)';
    }

    editMindMapNode(node) {
        const content = node.querySelector('.node-content');
        if (!content) return;

        const currentText = content.textContent;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.style.cssText = `
            background: transparent;
            border: none;
            color: inherit;
            font: inherit;
            width: 100%;
            outline: none;
            text-align: center;
        `;
        
        content.innerHTML = '';
        content.appendChild(input);
        input.focus();
        input.select();
        
        const finishEdit = () => {
            content.textContent = input.value || currentText;
            this.showNotification('Node updated!', 'success');
        };
        
        input.addEventListener('blur', finishEdit);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                finishEdit();
            }
        });
    }

    updateProgress() {
        const currentWords = this.bookData.currentWords;
        const targetWords = this.bookData.targetWords;
        const percentage = Math.round((currentWords / targetWords) * 100);
        
        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        // Update meter circle
        const meterFill = document.querySelector('.meter-fill');
        if (meterFill) {
            meterFill.style.setProperty('--percentage', percentage);
        }

        // Update progress text
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${percentage}% Complete • ${currentWords.toLocaleString()} / ${targetWords.toLocaleString()} words`;
        }
    }

    simulateRealTimeUpdates() {
        // Simulate collaborative editing
        const activities = [
            { title: 'Chapter 2: The Seven Disciplines - New content added', type: 'success' },
            { title: 'AI generated 3 exercise variations', type: 'info' },
            { title: 'Victory Belt editor left feedback', type: 'warning' },
            { title: 'Asset library updated with new videos', type: 'success' }
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        // Only show if we're not in the middle of something important
        if (!this.protocolRunning) {
            this.showNotification(randomActivity.title, randomActivity.type);
        }
        
        // Update word count randomly
        if (Math.random() > 0.7) {
            this.bookData.currentWords += Math.floor(Math.random() * 150) + 25;
            this.updateProgress();
            this.updateCharts();
        }
    }

    updateCharts() {
        if (this.charts.progress && this.charts.progress.data) {
            this.charts.progress.data.datasets[0].data.push(this.bookData.currentWords);
            this.charts.progress.data.labels.push('Now');
            
            if (this.charts.progress.data.labels.length > 10) {
                this.charts.progress.data.labels.shift();
                this.charts.progress.data.datasets[0].data.shift();
            }
            
            this.charts.progress.update();
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'var(--color-surface)',
            border: `1px solid var(--color-${type === 'error' ? 'error' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info'})`,
            borderRadius: 'var(--radius-base)',
            padding: 'var(--space-12) var(--space-16)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: '3000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            maxWidth: '350px',
            fontSize: 'var(--font-size-sm)'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, type === 'error' ? 5000 : 3500);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    animateElementCreation(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.transform = 'scale(0) rotate(180deg)';
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.style.transform = 'scale(1) rotate(0deg)';
                element.style.opacity = '1';
                element.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            }, 10);
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Book Backend App...');
    
    const app = new BookBackendApp();
    window.bookApp = app; // Make available globally for debugging
    
    // Add some initial loading animations
    setTimeout(() => {
        const elements = ['.main-header', '.main-nav', '.main-content'];
        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                }, index * 150);
            }
        });
    }, 200);
    
    // Welcome message
    setTimeout(() => {
        app.showNotification('🚀 Ultimate Book Backend loaded successfully!', 'success');
    }, 1500);
});

// Add dynamic CSS for enhanced styling
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: var(--space-8);
    }
    
    .notification-icon {
        font-size: var(--font-size-base);
        flex-shrink: 0;
    }
    
    .notification-message {
        font-size: var(--font-size-sm);
        color: var(--color-text);
        font-weight: var(--font-weight-medium);
        line-height: 1.4;
    }
    
    .mindmap-node.selected {
        z-index: 10;
        transform: scale(1.05) !important;
    }
    
    .protocol-result {
        font-size: var(--font-size-sm);
        line-height: var(--line-height-normal);
    }
    
    .protocol-result h4 {
        margin: var(--space-20) 0 var(--space-12) 0;
        color: var(--color-primary);
        font-size: var(--font-size-base);
        display: flex;
        align-items: center;
        gap: var(--space-8);
    }
    
    .protocol-result ul, .protocol-result ol {
        margin: var(--space-12) 0;
        padding-left: var(--space-20);
    }
    
    .protocol-result li {
        margin-bottom: var(--space-8);
        color: var(--color-text);
        line-height: 1.5;
    }
    
    .gap-item {
        background: var(--color-bg-1);
        padding: var(--space-12);
        margin-bottom: var(--space-8);
        border-radius: var(--radius-base);
        border-left: 3px solid var(--color-primary);
    }
    
    .cluster-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-12);
        margin-top: var(--space-16);
    }
    
    .cluster-item {
        background: var(--color-bg-2);
        padding: var(--space-16);
        border-radius: var(--radius-base);
        text-align: center;
        transition: transform 0.2s ease;
    }
    
    .cluster-item:hover {
        transform: translateY(-2px);
    }
    
    .cluster-item h5 {
        margin: 0 0 var(--space-8) 0;
        color: var(--color-text);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
    }
    
    .cluster-count {
        font-size: var(--font-size-xs);
        color: var(--color-primary);
        font-weight: var(--font-weight-bold);
        background: rgba(var(--color-primary-rgb, 31, 184, 205), 0.1);
        padding: var(--space-2) var(--space-8);
        border-radius: var(--radius-full);
        display: inline-block;
    }

    .drag-over {
        background: rgba(var(--color-primary-rgb, 31, 184, 205), 0.05) !important;
        border: 2px dashed var(--color-primary) !important;
        transform: scale(1.02);
    }

    .chapter-item.dragging {
        opacity: 0.7;
        transform: rotate(3deg) scale(0.95);
        z-index: 1000;
        cursor: grabbing;
    }

    .loading {
        position: relative;
        pointer-events: none;
    }

    .loading::after {
        content: '';
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 35px,
            rgba(var(--color-primary-rgb, 31, 184, 205), 0.1) 35px,
            rgba(var(--color-primary-rgb, 31, 184, 205), 0.1) 70px
        );
        animation: loading-shimmer 1.5s infinite linear;
        border-radius: inherit;
    }

    @keyframes loading-shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
`;
document.head.appendChild(enhancedStyles);