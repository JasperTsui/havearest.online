// Simplified JavaScript - remove all features that may cause flashing
class GamePortal {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupBasicEventListeners();
    }
    
    // Set up basic event listeners
    setupBasicEventListeners() {
        // Game card click events
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const gameName = btn.dataset.game;
                this.playGame(gameName);
            });
        });
        
                // Search functionality
        const searchInput = document.getElementById('game-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchGames(e.target.value);
            });
        }

        // Category filtering
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterGames(btn.dataset.category);
                this.updateFilterButtons(btn);
            });
        });
    }
    
    // Play game
    playGame(gameName) {
        if (!gameName) return;
        
        try {
            // Get screen dimensions
            const screenWidth = screen.width;
            const screenHeight = screen.height;
            
            // Open game window in fullscreen size
            const gameWindow = window.open(
                `game-frame.html?game=${gameName}`,
                `game_${gameName}_${Date.now()}`,
                `width=${screenWidth},height=${screenHeight},left=0,top=0,scrollbars=no,resizable=yes,toolbar=no,menubar=no,status=no`
            );
            
            if (gameWindow) {
                gameWindow.focus();
                // Try to maximize window
                setTimeout(() => {
                    gameWindow.moveTo(0, 0);
                    gameWindow.resizeTo(screenWidth, screenHeight);
                }, 100);
            }
        } catch (error) {
            alert('Unable to open game: ' + error.message);
        }
    }
    
    // Search games
    searchGames(query) {
        const searchTerm = query.toLowerCase().trim();
        const gameCards = document.querySelectorAll('.game-card');
        let hasResults = false;
        
        gameCards.forEach(card => {
            const title = card.querySelector('.game-title').textContent.toLowerCase();
            const description = card.querySelector('.game-description').textContent.toLowerCase();
            
            if (!searchTerm || title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                hasResults = true;
        } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        const noResults = document.getElementById('no-results');
        if (noResults) {
            noResults.style.display = hasResults ? 'none' : 'block';
        }
    }
    
    // Filter games
    filterGames(category) {
        const gameCards = document.querySelectorAll('.game-card');
        let hasResults = false;
        
        gameCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        const noResults = document.getElementById('no-results');
        if (noResults) {
            noResults.style.display = hasResults ? 'none' : 'block';
        }
        
        // Clear search input
        const searchInput = document.getElementById('game-search');
        if (searchInput) {
            searchInput.value = '';
        }
    }
    
    // Update filter button state
    updateFilterButtons(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
}

// Error modal control functions
window.closeErrorModal = function() {
    const modal = document.getElementById('error-modal');
    if (modal) {
        modal.style.display = 'none';
    }
};

window.retryGame = function() {
    closeErrorModal();
};

// Initialize after page load
document.addEventListener('DOMContentLoaded', () => {
    window.gamePortal = new GamePortal();
});