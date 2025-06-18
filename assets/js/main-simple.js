// 超简化版JavaScript - 无闪烁版本
document.addEventListener('DOMContentLoaded', function() {
    // 游戏卡片点击事件
    document.querySelectorAll('.play-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const gameName = btn.dataset.game;
            playGame(gameName);
        });
    });
    
    // 搜索功能
    const searchInput = document.getElementById('game-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchGames(e.target.value);
        });
    }
    
    // 分类筛选
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            filterGames(btn.dataset.category);
            updateFilterButtons(btn);
        });
    });
});

// 播放游戏
function playGame(gameName) {
    if (!gameName) return;
    
    try {
        const gameWindow = window.open(
            `game-frame.html?game=${gameName}`,
            `game_${gameName}_${Date.now()}`,
            'width=900,height=700,scrollbars=no,resizable=yes'
        );
        
        if (gameWindow) {
            gameWindow.focus();
        }
    } catch (error) {
        alert('无法打开游戏：' + error.message);
    }
}

// 搜索游戏
function searchGames(query) {
    const searchTerm = query.toLowerCase().trim();
    const gameCards = document.querySelectorAll('.game-card');
    let hasResults = false;
    
    gameCards.forEach(function(card) {
        const title = card.querySelector('.game-title').textContent.toLowerCase();
        const description = card.querySelector('.game-description').textContent.toLowerCase();
        
        if (!searchTerm || title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    const noResults = document.getElementById('no-results');
    if (noResults) {
        noResults.style.display = hasResults ? 'none' : 'block';
    }
}

// 筛选游戏
function filterGames(category) {
    const gameCards = document.querySelectorAll('.game-card');
    let hasResults = false;
    
    gameCards.forEach(function(card) {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    const noResults = document.getElementById('no-results');
    if (noResults) {
        noResults.style.display = hasResults ? 'none' : 'block';
    }
    
    const searchInput = document.getElementById('game-search');
    if (searchInput) {
        searchInput.value = '';
    }
}

// 更新筛选按钮状态
function updateFilterButtons(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

// 错误模态框控制
function closeErrorModal() {
    const modal = document.getElementById('error-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function retryGame() {
    closeErrorModal();
} 