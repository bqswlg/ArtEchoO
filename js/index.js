(function () {
  /**
   * 1. 元素選取
   */
  var tickerText = document.getElementById("careTickerText");
  var prevBtn = document.getElementById("tickerPrevBtn"); // 新增左箭頭
  var nextBtn = document.getElementById("tickerNextBtn"); // 新增右箭頭

  var resetLayoutBtn = document.getElementById("resetLayoutBtn");
  var worksPool = document.getElementById("worksPool");
  var layoutBoard = document.getElementById("layoutBoard");

  /**
   * 2. 溫柔提醒 (Ticker) 相關邏輯
   */
  if (tickerText) {
    var tickerMessages = [
      "今天畫畫了嗎？",
      "陰影的背面是陽光。",
      "你不需要完美，只需要慢慢前進。",
      "先好好呼吸，再讓線條流動。",
      "情緒不是負擔，是值得被看見的訊號。",
      "我知道這不容易，但你會看到你撐起的，我們會一起慢慢練習"
    ];

    var tickerIndex = 0;
    var tickerTimer = null;

    // 更新文字內容與淡入淡出動畫
    var updateTickerText = function(index) {
      tickerText.style.opacity = "0";
      window.setTimeout(function () {
        tickerText.textContent = tickerMessages[index];
        tickerText.style.opacity = "1";
      }, 300); // 配合 CSS 的 0.3s transition
    };

    // 啟動自動輪播
    var startTicker = function() {
      if (tickerTimer) window.clearInterval(tickerTimer);
      tickerTimer = window.setInterval(function () {
        tickerIndex = (tickerIndex + 1) % tickerMessages.length;
        updateTickerText(tickerIndex);
      }, 4000); // 每 4 秒自動跳下一則
    };

    // 綁定左箭頭點擊事件
    if (prevBtn) {
      prevBtn.addEventListener("click", function() {
        // 計算上一則的索引 (避免變成負數)
        tickerIndex = (tickerIndex - 1 + tickerMessages.length) % tickerMessages.length;
        updateTickerText(tickerIndex);
        startTicker(); // 點擊後重新計算自動輪播時間，避免馬上又跳下一則
      });
    }

    // 綁定右箭頭點擊事件
    if (nextBtn) {
      nextBtn.addEventListener("click", function() {
        tickerIndex = (tickerIndex + 1) % tickerMessages.length;
        updateTickerText(tickerIndex);
        startTicker();
      });
    }

    // 初始啟動
    updateTickerText(tickerIndex);
    startTicker();
  }

  /**
   * 3. 佈置模組 (HomeLayoutManager)
   */
  if (worksPool && layoutBoard && typeof HomeLayoutManager !== "undefined") {
    HomeLayoutManager.init({
      worksPool: worksPool,
      layoutBoard: layoutBoard,
      resetBtn: resetLayoutBtn
    });
  }

  /**
   * 4. 切換資源列表 (Resource Toggle)
   */
  function toggleResource(type) {
    const govList = document.getElementById('gov-list');
    const clinicList = document.getElementById('clinic-list');

    if (govList && clinicList) {
      if (type === 'gov') {
        govList.style.display = 'block';
        clinicList.style.display = 'none';
      } else {
        govList.style.display = 'none';
        clinicList.style.display = 'block';
      }
    }
  }

  window.toggleResource = toggleResource;
})();

/**
 * 5. 輪播圖 (Carousel) 邏輯
 */
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelector(".carousel-images");
  const dots = document.querySelectorAll(".dot");

  if (!images || dots.length === 0) return; // 保護機制，避免其他頁面報錯

  let currentIndex = 0;
  let startX = 0;
  let endX = 0;

  // 更新圖片和點的狀態
  const updateCarousel = (index) => {
    images.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  };

  // 綁定點擊事件到點
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      currentIndex = index;
      updateCarousel(currentIndex);
    });
  });

  // 監聽觸控開始
  images.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  // 監聽觸控結束
  images.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (diff > 50) {
      // 向右滑動
      currentIndex = Math.max(0, currentIndex - 1);
    } else if (diff < -50) {
      // 向左滑動
      currentIndex = Math.min(dots.length - 1, currentIndex + 1);
    }

    updateCarousel(currentIndex);
  });
});