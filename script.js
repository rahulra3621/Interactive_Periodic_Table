import { elements } from './elements.js';

function createElementDiv(element) {
    const elementDiv = document.createElement('div');
    elementDiv.className = `element ${element.category}`;
    
    elementDiv.innerHTML = `
        <span class="atomic-number">${element.number}</span>
        <span class="symbol">${element.symbol}</span>
        <span class="name">${element.name}</span>
        <div class="element-info">
            <p>Mass: ${element.mass}</p>
            <p>Category: ${element.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            <p>Block: ${element.block}</p>
            <p>Configuration: ${element.electronConfig}</p>
            ${element.electronegativity ? `<p>Electronegativity: ${element.electronegativity}</p>` : ''}
        </div>
    `;

    // Add hover position detection
    elementDiv.addEventListener('mouseenter', (e) => {
        const info = elementDiv.querySelector('.element-info');
        const rect = elementDiv.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        // Reset any previous positioning
        info.style.left = '50%';
        info.style.right = 'auto';
        info.style.transform = 'translateX(-50%)';
        
        // Check if info box would overflow right edge
        if (rect.left + (rect.width / 2) + 100 > viewportWidth) {
            info.style.left = 'auto';
            info.style.right = '0';
            info.style.transform = 'translateX(0)';
        }
        // Check if info box would overflow left edge
        else if (rect.left + (rect.width / 2) - 100 < 0) {
            info.style.left = '0';
            info.style.transform = 'translateX(0)';
        }
    });

    // Add click event listener with animation
    elementDiv.addEventListener('click', (e) => {
        // Prevent multiple clicks during animation
        if (elementDiv.classList.contains('clicking')) return;
        
        // Add clicking class for animation
        elementDiv.classList.add('clicking');
        
        // Delay showing the modal until pop-out and flip animation is mostly done
        setTimeout(() => {
            showElementDetails(element);
        }, 500);

        // Remove the clicking class after animation completes
        setTimeout(() => {
            elementDiv.classList.remove('clicking');
        }, 800);
    });

    return elementDiv;
}

function showElementDetails(element) {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'element-modal';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'element-modal-content';
    
    // Format element name for image path
    const elementImageName = element.name.toLowerCase().replace(/ /g, '-');
    
    // Add element details to modal
    modalContent.innerHTML = `
        <div class="modal-header ${element.category}">
            <h2>${element.name} (${element.symbol})</h2>
            <span class="close-button">&times;</span>
        </div>
        <div class="modal-body">
            <div class="modal-image-container">
                <img src="images/elements/${elementImageName}.jpg" 
                     alt="${element.name}"
                     onerror="this.onerror=null; this.src='images/elements/placeholder.jpg'">
            </div>
            <div class="element-details">
                <p><strong>Atomic Number:</strong> ${element.number}</p>
                <p><strong>Atomic Mass:</strong> ${element.mass}</p>
                <p><strong>Category:</strong> ${element.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                <p><strong>Block:</strong> ${element.block}</p>
                <p><strong>Electron Configuration:</strong> ${element.electronConfig}</p>
                ${element.electronegativity ? `<p><strong>Electronegativity:</strong> ${element.electronegativity}</p>` : ''}
                <p><strong>Period:</strong> ${element.period}</p>
                <p><strong>Group:</strong> ${element.group}</p>
            </div>
        </div>
    `;
    
    // Add modal to page
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close button functionality
    const closeButton = modalContent.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function calculatePosition(period, group) {
    const element = elements.find(e => e.period === period && e.group === group);
    if (!element) return { row: period, column: group };
    
    const number = element.number;
    
    // Lanthanides (57-71)
    if (number >= 57 && number <= 71) {
        return {
            row: 8,
            column: number - 54  // Places La at column 3 and Lu at column 17
        };
    }
    // Actinides (89-103)
    else if (number >= 89 && number <= 103) {
        return {
            row: 9,
            column: number - 86  // Places Ac at column 3 and Lr at column 17
        };
    }
    // All other elements
    else {
        // Adjust columns for elements after La and Ac
        if (period === 6 && group > 3 && number < 72) {
            return {
                row: period,
                column: group + 14
            };
        }
        if (period === 7 && group > 3 && number < 104) {
            return {
                row: period,
                column: group + 14
            };
        }
        return {
            row: period,
            column: group
        };
    }
}

function createPeriodicTable() {
    const table = document.getElementById('periodicTable');
    table.innerHTML = ''; // Clear existing content
    
    // Create main periodic table
    const mainElements = elements.filter(element => 
        !(element.number >= 57 && element.number <= 71) && 
        !(element.number >= 89 && element.number <= 103)
    );

    // Create lanthanide and actinide placeholders
    const lanthanidePlaceholder = {
        number: '57-71',
        symbol: 'La-Lu',
        name: 'Lanthanides',
        category: 'lanthanide',
        period: 6,
        group: 3,
        mass: '138.91-174.97',
        block: 'f',
        electronConfig: '[Xe] 4f¹⁴',
    };

    const actinidePlaceholder = {
        number: '89-103',
        symbol: 'Ac-Lr',
        name: 'Actinides',
        category: 'actinide',
        period: 7,
        group: 3,
        mass: '227-262',
        block: 'f',
        electronConfig: '[Rn] 5f¹⁴',
    };

    // Add placeholders to main elements
    mainElements.push(lanthanidePlaceholder);
    mainElements.push(actinidePlaceholder);

    mainElements.forEach(element => {
        if (element.period && element.group) {
            const elementDiv = createElementDiv(element);
            // Special handling for La and Ac placeholders
            if ((element === lanthanidePlaceholder) || (element === actinidePlaceholder)) {
                elementDiv.style.gridRow = element.period;
                elementDiv.style.gridColumn = element.group;
            } else {
                const position = calculatePosition(element.period, element.group);
                elementDiv.style.gridRow = position.row;
                elementDiv.style.gridColumn = position.column;
            }
            table.appendChild(elementDiv);
        }
    });

    // Create f-block container
    const fBlockContainer = document.createElement('div');
    fBlockContainer.className = 'f-block-container';

    // Create lanthanide series
    const lanthanides = elements.filter(element => element.number >= 57 && element.number <= 71);
    lanthanides.forEach((element, index) => {
        const elementDiv = createElementDiv(element);
        elementDiv.style.gridColumn = index + 4;
        elementDiv.style.gridRow = 1;
        fBlockContainer.appendChild(elementDiv);
    });

    // Create actinide series
    const actinides = elements.filter(element => element.number >= 89 && element.number <= 103);
    actinides.forEach((element, index) => {
        const elementDiv = createElementDiv(element);
        elementDiv.style.gridColumn = index + 4;
        elementDiv.style.gridRow = 2;
        fBlockContainer.appendChild(elementDiv);
    });

    // Add spacer elements
    const lanthanideSpacer = document.createElement('div');
    lanthanideSpacer.className = 'f-block-spacer';
    lanthanideSpacer.style.gridRow = 1;
    fBlockContainer.appendChild(lanthanideSpacer);

    const actinideSpacer = document.createElement('div');
    actinideSpacer.className = 'f-block-spacer';
    actinideSpacer.style.gridRow = 2;
    fBlockContainer.appendChild(actinideSpacer);

    // Add f-block container after the main periodic table
    document.querySelector('.container').insertBefore(fBlockContainer, table.nextSibling);
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Filter functionality
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Apply filter
            const filter = button.dataset.filter;
            const elements = document.querySelectorAll('.element');
            
            elements.forEach(element => {
                // Remove any existing animation classes
                element.classList.remove('filtered-in', 'filtered-out');
                
                let shouldShow = false;
                if (filter === 'all') {
                    shouldShow = true;
                } else if (filter === 'metal') {
                    shouldShow = element.classList.contains('alkali-metal') ||
                               element.classList.contains('alkaline-earth') ||
                               element.classList.contains('transition-metal') ||
                               element.classList.contains('post-transition');
                } else {
                    shouldShow = element.classList.contains(filter);
                }

                // Apply animation classes
                if (shouldShow) {
                    element.style.display = '';
                    element.classList.add('filtered-in');
                    // Remove the class after animation completes
                    setTimeout(() => {
                        element.classList.remove('filtered-in');
                    }, 400);
                } else {
                    element.classList.add('filtered-out');
                }
            });
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const elements = document.querySelectorAll('.element');
        
        elements.forEach(element => {
            const symbol = element.querySelector('.symbol').textContent.toLowerCase();
            const name = element.querySelector('.name').textContent.toLowerCase();
            const number = element.querySelector('.atomic-number').textContent;
            
            if (searchTerm === '') {
                element.classList.remove('highlight');
            } else if (symbol.includes(searchTerm) || 
                name.includes(searchTerm) || 
                number.includes(searchTerm)) {
                element.classList.add('highlight');
            } else {
                element.classList.remove('highlight');
            }
        });
    });

    // Initialize the periodic table
    createPeriodicTable();
}); 