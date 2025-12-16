(function() {
    // 1. FPS 偵測
    let lastStamp = performance.now();
    let frames = 0;
    const fpsEl = document.getElementById('fps-val');

    function checkPerformance(now) {
        frames++;
        if (now >= lastStamp + 1000) {
            if (fpsEl) fpsEl.textContent = frames;
            frames = 0;
            lastStamp = now;
        }
        requestAnimationFrame(checkPerformance);
    }
    requestAnimationFrame(checkPerformance);

    // 2. 滾動追蹤
    const contentArea = document.querySelector('.content-view');
    const scrollEl = document.getElementById('scroll-percent');
    
    if (contentArea && scrollEl) {
        contentArea.addEventListener('scroll', () => {
            const height = contentArea.scrollHeight - contentArea.clientHeight;
            const scrolled = (contentArea.scrollTop / height) * 100;
            scrollEl.textContent = Math.round(scrolled);
        });
    }

    // 3. 背景控制
    const slider = document.getElementById('density-slider');
    const bar = document.getElementById('density-bar');
    if (slider) {
        slider.addEventListener('input', (e) => {
            const val = e.target.value;
            if (bar) bar.style.width = (val / 150 * 100) + "%";
            document.documentElement.style.setProperty('--blur-intensity', val + "px");
        });
    }

    // 4. 生成卡片
    const addBtn = document.getElementById('add-card');
    const stage = document.getElementById('card-stage');
    if (addBtn && stage) {
        addBtn.addEventListener('click', () => {
            const card = document.createElement('div');
            card.className = 'module-card float-anim';
            card.innerHTML = `
                <h4 style="margin:0; color:var(--primary);">Unit #${Math.floor(Math.random()*999)}</h4>
                <p style="font-size:0.9rem; color:var(--text-sub);">穩定度: ${(Math.random()*100).toFixed(1)}%</p>
            `;
            stage.prepend(card);
        });
    }
})();