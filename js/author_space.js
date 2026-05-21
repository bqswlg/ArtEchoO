document.addEventListener('DOMContentLoaded', () => {
    // 為了確保創作者空間能獨立運作，我們將 Cloud.js 的資料庫引用過來
    // 這裡直接提供模擬資料陣列，確保不用依賴其他檔案的匯出狀態
    const cloudSimulationWorks = [
        { id: 1, src: 'images/cloud/IMG_0592.PNG', name: '鏡中的倒影', author: '王大明', storyTitle: '久違的家人', description: '一面被時間磨亮的鏡子，映出旅人內心的壓抑與渴望。' },
        { id: 2, src: 'images/cloud/IMG_0593.PNG', name: '禁忌的蘋果', author: '王大明', storyTitle: '久違的家人',  description: '表面光滑的果實下藏著無法言說的誘惑與後悔。' },
        { id: 3, src: 'images/cloud/IMG_0597.PNG', name: '沉重的后冠', author: '王大明', storyTitle: '久違的家人', description: '象徵責任與孤寂的王冠，每一步都是負擔與選擇。' },
        { id: 4, src: 'images/cloud/IMG_0598.PNG', name: '冰冷的長廊', author: 'Alex', storyTitle: '久違的家人',  description: '長廊回蕩著遺忘的腳步聲，光線薄如冰霜。' },
        { id: 5, src: 'images/cloud/IMG_0599.PNG', name: '破碎的真實', author: '王大明', storyTitle: '久違的家人',  description: '碎片拼湊出的世界，真實被剪裁成陌生的形狀。' },
        { id: 6, src: 'images/cloud/IMG_0600.PNG', name: '天鵝絨幕後', author: 'Alex', storyTitle: '久違的家人',  description: '舞台背後的靜謐與秘密，柔軟卻不可觸碰。' },
        { id: 7, src: 'images/cloud/IMG_0601.PNG', name: '隱藏的淚水', author: 'Alex', storyTitle: '久違的家人', description: '笑容底下的濕潤，是未曾宣洩的柔軟。' },
        { id: 8, src: 'images/cloud/IMG_0602.PNG', name: '古老的手稿', author: '心碎阿偉', storyTitle: '久違的家人',  description: '泛黃紙張記錄著被遺忘的約定與斷章。' },
        { id: 9, src: 'images/cloud/IMG_0605.PNG', name: '黑夜中的玫瑰', author: '心碎阿偉', storyTitle: '久違的家人',  description: '在黑暗裡綻放的美麗，既脆弱又致命。' },
        { id: 10, src: 'images/cloud/IMG_0606.PNG', name: '王座的階梯', author: '野心家', storyTitle: '久違的家人',  description: '通往權力的路上，每一級都蘊藏選擇的痕跡。' },
        { id: 11, src: 'images/cloud/IMG_0607.PNG', name: '深淵的注視', author: '無名氏', storyTitle: '森林裡的寶藏',  description: '凝望深淵，深淵也回望你，恐懼與好奇交織。' },
        { id: 12, src: 'images/cloud/IMG_0609.PNG', name: '被遺忘的承諾', author: '無名氏', storyTitle: '森林裡的寶藏',  description: '曾經溫暖的話語漸成煙灰，仍在心底燒灼。' },
        { id: 13, src: 'images/cloud/IMG_0610.PNG', name: '毒藥的餘味', author: '無名氏', storyTitle: '森林裡的寶藏',  description: '一小口的決定，改變了原本能延展的生命味道。' },
        { id: 14, src: 'images/cloud/IMG_0611.PNG', name: '月光下的詭計', author: '心碎阿偉', storyTitle: '森林裡的寶藏',  description: '柔和的月色掩飾不了暗潮洶湧的算計。' },
        { id: 15, src: 'images/cloud/IMG_0612.PNG', name: '華麗的束縛', author: '心碎阿偉', storyTitle: '森林裡的寶藏',  description: '繁複的華服下是不能自由伸展的雙手。' },
        { id: 16, src: 'images/cloud/IMG_0613.PNG', name: '寂靜的晚宴', author: '恐龍讓我', storyTitle: '森林裡的寶藏',  description: '滿桌的盛宴卻沒有歡笑，只有默契的沉默。' },
        { id: 17, src: 'images/cloud/IMG_0614.PNG', name: '權力的代價', author: '無名氏', storyTitle: '森林裡的寶藏',  description: '每一項決策都帶來收穫與不可避免的損失。' },
        { id: 18, src: 'images/cloud/IMG_0615.PNG', name: '冰封的心', author: '恐龍讓我', storyTitle: '森林裡的寶藏',  description: '曾熱的情感被凍結，時間刻成冷硬的表面。' },
        { id: 19, src: 'images/cloud/IMG_0616.PNG', name: '最後的告別', author: '無名氏', storyTitle: '森林裡的寶藏',  description: '在陌生的車站，和過去溫柔地揮手再見。' },
        { id: 20, src: 'images/cloud/IMG_0617.PNG', name: '永恆的等待', author: '恐龍讓我', storyTitle: '森林裡的寶藏',  description: '坐在時光邊緣，等待一個可能不會來的人。' },
        { id: 21, src: 'images/cloud/IMG_0618.PNG', name: '窗外的偽裝', author: '無名氏', storyTitle: '久違的家人',  description: '窗外世界的光影被修飾，真相躲在縫隙中。' },
        { id: 22, src: 'images/cloud/IMG_0619.PNG', name: '絲絨禮服', author: '無名氏', storyTitle: '久違的家人',  description: '柔順的布料覆蓋著不被看見的痕跡與歷史。' },
        { id: 23, src: 'images/cloud/IMG_0620.PNG', name: '秘密花園', author: '園丁', storyTitle: '久違的家人',  description: '一處只有記憶能通行的角落，花朵替代話語。' },
        { id: 24, src: 'images/cloud/IMG_0621.PNG', name: '黃昏的懺悔', author: '藝術信徒', storyTitle: '久違的家人',  description: '夕陽餘暉下的自省與遺憾，像影子一樣拉長。' },
        { id: 25, src: 'images/cloud/IMG_0622.PNG', name: '紅寶石的詛咒', author: '恐龍讓我', storyTitle: '久違的家人',  description: '閃爍的寶石吸引眼睛，也吞噬寧靜。' },
        { id: 26, src: 'images/cloud/IMG_0624.PNG', name: '偏見的重量', author: '審判長', storyTitle: '久違的家人',  description: '不公平的視線像鉛一樣壓在肩頭。' },
        { id: 27, src: 'images/cloud/IMG_0623.PNG', name: '孤獨的加冕', author: '藝術信徒', storyTitle: '久違的家人',  description: '戴上皇冠的那刻，歡呼消失，孤單開始。' },
        { id: 28, src: 'images/cloud/IMG_0625.PNG', name: '記憶的餘溫', author: '拾荒者', storyTitle: '久違的家人',  description: '拾起昔日片段，殘存的熱度還能回暖胸膛。' },
        { id: 29, src: 'images/cloud/IMG_0626.PNG', name: '破碎的童話', author: '許春天', storyTitle: '久違的家人',  description: '當故事被剪裁，結局不再如童年所想像。' },
        { id: 30, src: 'images/cloud/IMG_0627.PNG', name: '不對稱的愛', author: '許春天', storyTitle: '久違的家人',  description: '付出與回報不成比例，愛在天秤上傾斜。' },
        { id: 31, src: 'images/cloud/IMG_0628.PNG', name: '迷霧森林', author: '拾荒者', storyTitle: '森林裡的寶藏',  description: '迷失於濃霧中，方向和記憶模糊不清。' },
        { id: 32, src: 'images/cloud/IMG_0629.PNG', name: '刺痛的擁抱', author: '拾荒者', storyTitle: '森林裡的寶藏',  description: '看似溫暖的擁抱卻帶來傷痕與警惕。' },
        { id: 33, src: 'images/cloud/IMG_0630.PNG', name: '被遮蓋的光', author: '恐龍讓我', storyTitle: '森林裡的寶藏', description: '光存在，但被層層理解與誤解所遮蔽。' },
        { id: 34, src: 'images/cloud/IMG_0631.PNG', name: '假面的告白', author: '小丑', storyTitle: '森林裡的寶藏',  description: '在歡笑面具下，真實的聲音小心翼翼地吐露。' },
        { id: 35, src: 'images/cloud/IMG_0632.PNG', name: '鏽蝕的鑰匙', author: '拾荒者', storyTitle: '森林裡的寶藏',  description: '時間腐蝕了開啟舊門的能力，也改寫了意義。' },
        { id: 36, src: 'images/cloud/IMG_0633.PNG', name: '枯萎的親情', author: '落葉', storyTitle: '森林裡的寶藏',  description: '曾經茂盛的情感，如今只剩無聲的枝條。' },
        { id: 37, src: 'images/cloud/IMG_0634.PNG', name: '冷酷的教誨', author: '嚴師', storyTitle: '森林裡的寶藏',  description: '嚴厲的課程把溫度抽離，只留下規矩的輪廓。' },
        { id: 38, src: 'images/cloud/IMG_0635.PNG', name: '嫉妒的迴響', author: '聽眾', storyTitle: '森林裡的寶藏',  description: '他人的光芒在耳邊迴響，心中泛起酸澀。' },
        { id: 39, src: 'images/cloud/IMG_0636.PNG', name: '沉重的腳步', author: '許春天', storyTitle: '森林裡的寶藏',  description: '每一步都踩在回憶上，前行變得沉重。' },
        { id: 40, src: 'images/cloud/IMG_0637.PNG', name: '最終的救贖', author: '許春天', storyTitle: '森林裡的寶藏',  description: '在最後的祈禱中尋求和解，或是一種釋放。' },
        { id: 41, src: 'images/cloud/IMG_0638.PNG', name: '沉重的迴響', author: '許春天', storyTitle: '森林裡的寶藏',  description: '聲音在牆面反射，帶回更多未被說出的故事。' },
        { id: 42, src: 'images/cloud/IMG_0640.PNG', name: '沉重的告白', author: '恐龍讓我', storyTitle: '森林裡的寶藏', description: '直面過去的真相需要勇氣，也帶來解脫。' },
        { id: 43, src: 'images/cloud/IMG_0915.PNG', name: '冷酷的救贖', author: '恐龍讓我', storyTitle: '森林裡的寶藏',  description: '救贖並非溫柔，它可能是嚴苛的重建。' }
    ];

    // 1. 抓取網址列的作者名稱
    const urlParams = new URLSearchParams(window.location.search);
    const authorName = urlParams.get('author');

    if (!authorName) {
        document.getElementById('authorNameTitle').textContent = '找不到創作者';
        document.getElementById('authorQuote').textContent = '請從雲端畫廊重新選擇創作者。';
        return;
    }

    // 2. 過濾出該作者的所有作品
    const authorWorks = cloudSimulationWorks.filter(w => w.author === authorName);

    // 3. 更新作者基本資訊
    document.title = `ArtEcho | ${authorName} 的個人展覽`;
    document.getElementById('authorNameTitle').textContent = authorName;
    document.getElementById('authorAvatar').textContent = authorName.charAt(0);

    // 如果沒有作品
    if (authorWorks.length === 0) {
        document.getElementById('authorWorksGrid').innerHTML = '<p style="text-align:center; grid-column:1/-1; color:#888;">這位創作者尚未公開任何作品喔！</p>';
        return;
    }

    // 4. 計算數據與偏好 (找出最常畫的主題)
    const themeCounts = {};
    authorWorks.forEach(w => {
        themeCounts[w.storyTitle] = (themeCounts[w.storyTitle] || 0) + 1;
    });
    const favoriteTheme = Object.keys(themeCounts).reduce((a, b) => themeCounts[a] > themeCounts[b] ? a : b);

    document.getElementById('authorStats').innerHTML = `
        <span>🖼️ 展出 ${authorWorks.length} 幅作品</span>
        <span>|</span>
        <span>🎨 常駐主題：${favoriteTheme}</span>
    `;

    // 5. 將第一張作品設為毛玻璃背景封面
    document.getElementById('authorCover').style.backgroundImage = `url('${authorWorks[0].src}')`;
    document.getElementById('authorCover').style.filter = "blur(4px)"; // 增加一點模糊讓文字更清楚

    // 6. 渲染拍立得風格作品牆
    const grid = document.getElementById('authorWorksGrid');
    grid.innerHTML = '';

    authorWorks.forEach(work => {
        const card = document.createElement('div');
        card.className = 'polaroid-card';
        card.innerHTML = `
            <div class="polaroid-img-wrap">
                <img src="${work.src}" alt="${work.name}" loading="lazy">
            </div>
            <div class="polaroid-info">
                <h4>${work.name}</h4>
                <p>章節：${work.storyTitle} </p>
            </div>
        `;
        // 綁定點擊開啟 Modal
        card.onclick = () => openModal(work);
        grid.appendChild(card);
    });

    // 7. Modal 互動邏輯
    const modalBackdrop = document.getElementById('authorModalBackdrop');
    const modalCloseBtn = document.getElementById('authorModalClose');

    function openModal(work) {
        document.getElementById('modalImg').src = work.src;
        document.getElementById('modalTitle').textContent = work.name;
        document.getElementById('modalStoryTheme').textContent = `所屬劇情：${work.storyTitle}`;
        document.getElementById('modalDesc').textContent = work.description || '這個作品還沒有留下描述。';
        document.getElementById('modalLevel').textContent = `情緒等級 ${work.level}`;

        modalBackdrop.style.display = 'flex';
    }

    // 關閉 Modal 的三種方式：點按鈕、點背景、按 Esc
    modalCloseBtn.onclick = () => modalBackdrop.style.display = 'none';
    modalBackdrop.onclick = (e) => {
        if (e.target === modalBackdrop) modalBackdrop.style.display = 'none';
    };
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modalBackdrop.style.display = 'none';
    });
});