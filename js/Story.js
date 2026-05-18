/**
 * ArtEcho 劇情與章節整合資料庫
 * 針對國中小客群進行文字簡化，並支援「無圖片」的純文字卡片排版
 */
window.ArtEchoScenarios = [
  // --- 官方劇情 ---
  {
    id: "snow_white",
    category: "official",
    title: "好久不見的家人",
    description: "這是一個關於白雪公主與家人的故事，準備好去神秘的森林裡探險了嗎？",
    image: "images/family.png",
    clickable: true,
    intro: {
      videoSrc: "video/open.mp4",
      question: "好久不見的家人就在前面！你覺得他現在的心情是怎麼樣的呢？",
      options: ["開心地抱抱", "有點生氣", "覺得很難過", "超級期待"]
    },
    chapters: {
      "1": {
        title: "第一章：好久不見的家人",
        desc: "你終於見到好久不見的家人了！你現在的心情是怎麼樣的呢？把你的感覺畫下來吧！",
        img: "images/family.png"
      }
    }
  },
  {
    id: "locked-scenario-1",
    category: "official",
    title: "即將開放",
    description: "更多好玩的故事正在準備中，敬請期待喔！",
    image: "images/rat.png",
    clickable: false,
    chapters: {}
  },

  // --- 個人劇情 (模擬資料：這筆設定為沒有圖片，展示純文字卡片) ---
  {
    id: "my-dream-01",
    category: "personal",
    title: "昨晚的神祕夢境",
    description: "這是 AI 根據你的夢境變出來的深海探險故事，一起看看海底有什麼神秘生物吧！",
    image: null, // 設定為 null，畫面上就會變成純文字排版
    clickable: true,
    chapters: {
      "1": {
        title: "第一章：潛入深海",
        desc: "感覺水越來越深，光線也慢慢變暗了，請畫出你心中的那片深藍色。",
        img: "images/music.png" // 畫布內的參考圖可以保留
      }
    }
  },

  // --- 社群共享劇情 (模擬資料) ---
  {
    id: "shared-01",
    category: "shared",
    title: "星空下的散步 (小美分享)",
    description: "大家都很喜歡的星空故事，一起去看看滿天的星星，感受一下平靜的心情吧！",
    image: "images/grandandog.png",
    clickable: true,
    intro: {
      question: "走在看星星的路上，你現在心裡感覺怎麼樣？",
      options: ["超開心、很期待", "有點緊張", "覺得很平靜"]
    },
    chapters: {
      "1": {
        title: "第一章：看星星的路上",
        desc: "心跳好像變快了，周圍的風景感覺好特別...",
        img: "images/grandandog.png"
      }
    }
  }
];


/* ==========================================================================
   工具函式區
   ========================================================================== */
window.getChapterData = function(scenarioId, chapterLevel) {
  const scenario = window.ArtEchoScenarios.find(s => s.id === scenarioId);
  if (scenario && scenario.chapters) {
    return scenario.chapters[chapterLevel] || scenario.chapters["1"];
  }
  return null;
};

window.getScenarioById = function(id) {
  return window.ArtEchoScenarios.find(s => s.id === id);
};


/* ==========================================================================
   AI 劇情生成器 (支援圖片上傳與文字簡化)
   ========================================================================== */
window.createNewScenario = function() {
  const modalHtml = `
    <div class="video-modal" id="aiGeneratorModal" style="z-index: 1000; position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px);">
      <div class="panel" style="max-width: 520px; width: 92%; background: #fffdf8; position: relative; padding: 30px; border-radius: 24px; border: 1px solid var(--line); box-shadow: 0 20px 40px rgba(0,0,0,0.3); margin: 0; max-height: 90vh; overflow-y: auto;">
        <button class="close-btn" style="position: absolute; top: 18px; right: 18px; background: none; border: none; font-size: 24px; cursor: pointer; color: #888;">✖</button>
        
        <div id="ai-input-stage">
          <h2 style="color: var(--moss); margin-bottom: 6px; font-size: 1.4rem; font-family: 'Noto Serif TC', serif;">✨ AI 魔法故事機</h2>
          <p style="color: #666; font-size: 0.9rem; margin-bottom: 22px;">選一個你喜歡的風格和心情，讓 AI 幫你變出一個專屬的畫畫故事！</p>
          
          <div class="control-group" style="margin-bottom: 16px;">
            <label style="font-weight: bold; display: block; margin-bottom: 6px; font-size: 0.95rem;">🖼️ 幫故事挑一張封面照片 (沒有照片也沒關係喔！)</label>
            <input type="file" id="ai-image-upload" class="editable-input" accept="image/*" style="width: 100%; background: #fff;">
          </div>

          <div class="control-group" style="margin-bottom: 16px;">
            <label style="font-weight: bold; display: block; margin-bottom: 6px; font-size: 0.95rem;">🎨 故事風格</label>
            <select id="ai-style" class="editable-input" style="width: 100%; height: 40px; background: #fff;">
              <option value="太空科幻">🚀 太空科幻 (搭飛船去宇宙)</option>
              <option value="魔法奇幻">🔮 魔法奇幻 (哈利波特的魔法世界)</option>
              <option value="童話森林">🌳 童話森林 (遇見會說話的動物)</option>
              <option value="溫馨校園">🏫 溫馨校園 (和同學一起玩)</option>
            </select>
          </div>
          
          <div class="control-group" style="margin-bottom: 16px;">
            <label style="font-weight: bold; display: block; margin-bottom: 6px; font-size: 0.95rem;">🎭 你現在的心情</label>
            <select id="ai-feeling" class="editable-input" style="width: 100%; height: 40px; background: #fff;">
              <option value="有點害怕">👻 有點害怕 (像萬聖節一樣刺激)</option>
              <option value="溫暖開心">🏡 溫暖開心 (像回到家一樣舒服)</option>
              <option value="安靜一個人">🌌 安靜一個人 (享受自己的小天地)</option>
              <option value="充滿活力">🔥 充滿活力 (準備好去冒險！)</option>
            </select>
          </div>
          
          <div class="control-group" style="margin-bottom: 22px;">
            <label style="font-weight: bold; display: block; margin-bottom: 6px; font-size: 0.95rem;">✍️ 告訴 AI 你的想法或夢境</label>
            <textarea id="ai-prompt" class="editable-textarea" style="width: 100%; height: 80px; resize: none; background: #fff;" placeholder="（選填）比如說：我夢到在森林裡被大野狼追，或者我今天考試考很好..."></textarea>
          </div>
          
          <button id="ai-submit-btn" class="cta-btn primary" style="width: 100%; justify-content: center; padding: 12px; font-size: 1rem; cursor: pointer; border-radius: 12px; background: #c2693d; color: white; border: none;">產生我的魔法故事</button>
        </div>

        <div id="ai-loading-stage" style="display: none; text-align: center; padding: 45px 0;">
          <div style="font-size: 3.5rem; animation: float 1.2s ease-in-out infinite; margin-bottom: 15px;">✨🤖✨</div>
          <h3 style="color: var(--moss); margin-bottom: 8px;">AI 正在發揮魔法...</h3>
          <p style="color: #888; font-size: 0.88rem; margin: 0;">正在幫你寫故事，請等一下喔...</p>
        </div>

        <div id="ai-result-stage" style="display: none;">
          <h2 style="color: #c66b3d; margin-bottom: 14px; font-size: 1.3rem; font-family: 'Noto Serif TC', serif;">🎉 你的專屬故事完成囉！</h2>
          <div style="background: rgba(47,93,79,0.05); padding: 18px; border-radius: 14px; border-left: 4px solid var(--moss); margin-bottom: 24px;">
            <h3 id="res-title" style="font-size: 1.1rem; margin: 0 0 8px 0; color: var(--ink);"></h3>
            <p id="res-desc" style="font-size: 0.9rem; color: #5a6b6a; line-height: 1.6; margin: 0;"></p>
          </div>
          <div style="display: flex; gap: 12px;">
            <button id="save-personal-btn" class="btn" style="flex: 1; padding: 12px; border-radius: 12px; font-weight: bold;">🔒 存在我的專屬劇情</button>
            <button id="save-shared-btn" class="cta-btn primary" style="flex: 1; padding: 12px; border-radius: 12px; justify-content: center; background: #c2693d; color: white; border: none; font-weight: bold; cursor: pointer;">🌐 公開分享給大家</button>
          </div>
        </div>

      </div>
    </div>
  `;

  const modal = document.createElement("div");
  modal.innerHTML = modalHtml;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector(".close-btn");
  const submitBtn = modal.querySelector("#ai-submit-btn");
  const inputStage = modal.querySelector("#ai-input-stage");
  const loadingStage = modal.querySelector("#ai-loading-stage");
  const resultStage = modal.querySelector("#ai-result-stage");
  const imageUploadInput = modal.querySelector("#ai-image-upload");

  closeBtn.addEventListener("click", () => document.body.removeChild(modal));

  submitBtn.addEventListener("click", () => {
    const styleValue = modal.querySelector("#ai-style").value;
    const feelingValue = modal.querySelector("#ai-feeling").value;
    const promptValue = modal.querySelector("#ai-prompt").value.trim();

    // 處理圖片上傳
    let uploadedImageBase64 = null;
    if (imageUploadInput.files && imageUploadInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        uploadedImageBase64 = e.target.result;
        startProcessing();
      };
      reader.readAsDataURL(imageUploadInput.files[0]);
    } else {
      // 沒上傳圖片就直接執行
      startProcessing();
    }

    function startProcessing() {
      inputStage.style.display = "none";
      loadingStage.style.display = "block";

      setTimeout(() => {
        loadingStage.style.display = "none";
        resultStage.style.display = "block";

        // 童趣化的標題與內容
        const titleStyleName = styleValue.split(' ')[0]; // 只取前面四個字，如"太空科幻"
        const finalTitle = promptValue ? `小畫家的夢境：${promptValue.substring(0, 6)}...` : `屬於你的${titleStyleName}故事`;
        const finalDesc = `AI 用你選的「${feelingValue}」加上「${titleStyleName}」變出了這個故事！${promptValue ? `因為你寫了「${promptValue}」，故事變得更有趣囉！` : ''} 趕快進去畫畫看吧！`;

        modal.querySelector("#res-title").textContent = finalTitle;
        modal.querySelector("#res-desc").textContent = finalDesc;

        modal.querySelector("#save-personal-btn").onclick = function() {
          executeSave("personal", finalTitle, finalDesc, styleValue, feelingValue, uploadedImageBase64);
        };
        modal.querySelector("#save-shared-btn").onclick = function() {
          executeSave("shared", finalTitle, finalDesc, styleValue, feelingValue, uploadedImageBase64);
        };
      }, 1500);
    }
  });

  // 將新故事加入清單
  function executeSave(category, title, desc, style, feeling, imageUrl) {
    const isShared = (category === "shared");
    const newId = `ai-generated-${Date.now()}`;
    const cleanFeeling = feeling.split(' ')[0]; // 取前面幾個字

    const generatedScenario = {
      id: newId,
      category: category,
      title: isShared ? `${title} (匿名小畫家)` : title,
      description: desc,
      image: imageUrl, // 如果沒上傳，這裡就是 null
      clickable: true,
      intro: {
        question: `你準備好進入這個【${cleanFeeling}】的故事了嗎？出發前你現在覺得...`,
        options: ["已經準備好了！", "先想一下要畫什麼", "深呼吸一口氣"]
      },
      chapters: {
        "1": {
          title: `第一章：故事開始囉`,
          desc: `故事準備好了！想想剛剛選的「${cleanFeeling}」，在畫布上用你喜歡的顏色畫出來吧！`,
          img: imageUrl || "images/music.png" // 畫布內預設一張圖防呆
        }
      }
    };

    window.ArtEchoScenarios.push(generatedScenario);
    document.body.removeChild(modal);
    window.renderScenarios();
  }
};


/* ==========================================================================
   渲染畫面區 (支援動態切換：有圖片卡片 vs 純文字卡片)
   ========================================================================== */
window.renderScenarios = function() {
  const officialGrid = document.getElementById("officialGrid");
  const myGrid = document.getElementById("myGrid");
  const sharedGrid = document.getElementById("sharedGrid");

  if (!officialGrid || !myGrid || !sharedGrid) return;

  officialGrid.innerHTML = "";
  myGrid.innerHTML = "";
  sharedGrid.innerHTML = "";

  // [+] 新建按鈕卡片
  const addCardHtml = `
    <article class="scenario-card" style="display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer; background: rgba(255, 255, 255, 0.6); border: 2px dashed #cdb48a; min-height: 250px; transition: 0.3s; margin: 0;" onclick="createNewScenario()" onmouseover="this.style.background='#fff'; this.style.borderColor='var(--moss)';" onmouseout="this.style.background='rgba(255, 255, 255, 0.6)'; this.style.borderColor='#cdb48a';">
      <div style="font-size: 3.8rem; color: #c66b3d; line-height: 1; margin-bottom: 6px;">+</div>
      <h3 style="color: var(--moss); font-size: 1.1rem; margin: 0; font-family: 'Noto Serif TC', serif;">AI 魔法故事機</h3>
      <p style="color: #4f595f; font-size: 0.85rem; margin-top: 6px; margin-bottom: 0;">自己做一個畫畫故事</p>
    </article>
  `;
  myGrid.innerHTML += addCardHtml;


  // 派發資料庫中的卡片
  window.ArtEchoScenarios.forEach(function(scenario) {
    const card = document.createElement("article");
    card.className = "scenario-card";
    if (!scenario.clickable) card.classList.add("locked");

    // 判斷是否有圖片，決定渲染「有圖版」還是「無圖版純文字卡片」
    const hasImage = !!scenario.image;

    const imgHtml = hasImage ? `
      <div class="scenario-card-img">
        <img src="${scenario.image}" alt="${scenario.title}">
        ${!scenario.clickable ? '<div class="lock-icon">🔒</div>' : ''}
      </div>
    ` : '';

    // 如果沒有圖片但又被上鎖，要把鎖頭放在文字區域內
    const lockHtml = (!hasImage && !scenario.clickable) ? '<div style="font-size: 2rem; text-align: center; margin-bottom: 10px;">🔒</div>' : '';

    const contentHtml = `
      ${imgHtml}
      <div class="scenario-card-content" ${!hasImage ? 'style="padding: 24px; min-height: 250px; display: flex; flex-direction: column; justify-content: center;"' : ''}>
        ${lockHtml}
        <h3 ${!hasImage ? 'style="font-size: 1.3rem; margin-bottom: 12px; color: var(--terracotta);"' : ''}>${scenario.title}</h3>
        <p ${!hasImage ? 'style="font-size: 1rem; line-height: 1.7;"' : ''}>${scenario.description}</p>
      </div>
    `;

    if (scenario.clickable) {
      const link = document.createElement("a");
      link.href = `Studio.html?scenario=${encodeURIComponent(scenario.id)}&chapter=1`;
      link.className = "scenario-link";
      // 讓卡片整塊可點，但避免純文字卡片高度塌陷
      link.style.display = "block";
      link.style.height = "100%";
      link.innerHTML = contentHtml;

      link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetUrl = `Studio.html?scenario=${scenario.id}&chapter=1`;

        if (!scenario.intro) {
          window.location.href = targetUrl;
          return;
        }

        let buttonsHtml = "";
        scenario.intro.options.forEach(opt => {
          buttonsHtml += `<button class="option-btn" onclick="window.location.href='${targetUrl}'" style="font-size: 1rem; padding: 10px 20px; border-radius: 8px; background-color: #c57e21; color: #ffffff; border: none; cursor: pointer; transition: background-color 0.3s ease;">${opt}</button>`;
        });

        const hasVideo = !!scenario.intro.videoSrc;

        const modalHtml = `
          <div class="video-modal" id="videoModalOverlay" style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div class="video-container" style="position: relative; background: ${hasVideo ? 'transparent' : '#fffdf8'}; padding: ${hasVideo ? '0' : '35px'}; border-radius: 20px; max-width: ${hasVideo ? '800px' : '480px'}; width: 90%; border: ${hasVideo ? 'none' : '1px solid var(--line)'}; box-shadow: ${hasVideo ? 'none' : '0 20px 40px rgba(0,0,0,0.3)'};">
                <button class="close-btn" style="position: absolute; top: -15px; right: -15px; background: #fff; border: 2px solid #ccc; border-radius: 50%; width: 35px; height: 35px; font-size: 20px; cursor: pointer; z-index: 10;">✖</button>
                
                ${hasVideo ? `
                <video id="introVideo" autoplay playsinline style="width: 100%; border-radius: 8px; transition: filter 0.5s; display: block;">
                    <source src="${scenario.intro.videoSrc}" type="video/mp4">
                    您的瀏覽器不支援影片播放。
                </video>
                ` : ''}
                
                <div class="options-overlay" style="display: ${hasVideo ? 'none' : 'flex'}; position: ${hasVideo ? 'absolute' : 'relative'}; top: 0; left: 0; width: 100%; height: 100%; justify-content: center; align-items: center; background: ${hasVideo ? 'rgba(0,0,0,0.5)' : 'transparent'}; border-radius: 8px;">
                    <div class="options-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; width: 100%; text-align: center;">
                        <strong style="grid-column: 1 / -1; font-size: 1.25rem; color: ${hasVideo ? '#fff' : 'var(--ink)'}; margin-bottom: 12px; text-shadow: ${hasVideo ? '0 2px 4px rgba(0,0,0,0.8)' : 'none'}; font-family: 'Noto Serif TC', serif; line-height: 1.5;">${scenario.intro.question}</strong>
                        ${buttonsHtml}
                    </div>
                </div> 
            </div>
          </div>
        `;

        const modal = document.createElement("div");
        modal.innerHTML = modalHtml;
        document.body.appendChild(modal);

        modal.querySelector(".close-btn").addEventListener("click", () => document.body.removeChild(modal));

        if (hasVideo) {
          const video = modal.querySelector("#introVideo");
          const optionsOverlay = modal.querySelector(".options-overlay");
          video.oncontextmenu = (e) => e.preventDefault();

          video.addEventListener("ended", function () {
            video.style.filter = "brightness(0.3)";
            optionsOverlay.style.display = "flex";
          });
          video.addEventListener("error", function () {
            optionsOverlay.style.display = "flex";
          });
        }
      });

      card.appendChild(link);
    } else {
      card.innerHTML = contentHtml;
    }

    if (scenario.category === "official") {
      officialGrid.appendChild(card);
    } else if (scenario.category === "personal") {
      myGrid.appendChild(card);
    } else if (scenario.category === "shared") {
      sharedGrid.appendChild(card);
    } else {
      officialGrid.appendChild(card);
    }
  });
};

document.addEventListener("DOMContentLoaded", window.renderScenarios);