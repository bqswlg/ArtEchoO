import { StorageManager } from './storageManager.js';

// 1. 40 張模擬畫作數據
const cloudSimulationWorks = [
    { id: 1710310001000, src: 'images/cloud/IMG_0592.PNG', name: '鏡中的倒影', author: '旅人 A', storyId: 'snow_white', storyTitle: '公主的等待', level: 1 },
    { id: 1710310002000, src: 'images/cloud/IMG_0593.PNG', name: '禁忌的蘋果', author: '心碎者', storyId: 'snow_white', storyTitle: '公主的等待', level: 2 },
    { id: 1710310003000, src: 'images/cloud/IMG_0597.PNG', name: '沉重的后冠', author: '故事家', storyId: 'snow_white', storyTitle: '公主的等待', level: 3 },
    { id: 1710310004000, src: 'images/cloud/IMG_0598.PNG', name: '冰冷的長廊', author: '寂寞的靈魂', storyId: 'snow_white', storyTitle: '公主的等待', level: 4 },
    { id: 1710310005000, src: 'images/cloud/IMG_0599.PNG', name: '破碎的真實', author: 'Ariel', storyId: 'snow_white', storyTitle: '公主的等待', level: 1 },
    { id: 1710310006000, src: 'images/cloud/IMG_0600.PNG', name: '天鵝絨幕後', author: '藝術愛好者', storyId: 'snow_white', storyTitle: '公主的等待', level: 2 },
    { id: 1710310007000, src: 'images/cloud/IMG_0601.PNG', name: '隱藏的淚水', author: '路人甲', storyId: 'snow_white', storyTitle: '公主的等待', level: 3 },
    { id: 1710310008000, src: 'images/cloud/IMG_0602.PNG', name: '古老的手稿', author: '時光機', storyId: 'snow_white', storyTitle: '公主的等待', level: 4 },
    { id: 1710310009000, src: 'images/cloud/IMG_0605.PNG', name: '黑夜中的玫瑰', author: '午夜畫家', storyId: 'snow_white', storyTitle: '公主的等待', level: 1 },
    { id: 1710310010000, src: 'images/cloud/IMG_0606.PNG', name: '王座的階梯', author: '野心家', storyId: 'snow_white', storyTitle: '公主的等待', level: 2 },
    { id: 1710310011000, src: 'images/cloud/IMG_0607.PNG', name: '深淵的注視', author: '無名氏', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 1 },
    { id: 1710310012000, src: 'images/cloud/IMG_0609.PNG', name: '被遺忘的承諾', author: '灰燼', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 2 },
    { id: 1710310013000, src: 'images/cloud/IMG_0610.PNG', name: '毒藥的餘味', author: '影子', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 3 },
    { id: 1710310014000, src: 'images/cloud/IMG_0611.PNG', name: '月光下的詭計', author: '銀狐', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 4 },
    { id: 1710310015000, src: 'images/cloud/IMG_0612.PNG', name: '華麗的束縛', author: '織網者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 1 },
    { id: 1710310016000, src: 'images/cloud/IMG_0613.PNG', name: '寂靜的晚宴', author: '空杯', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 2 },
    { id: 1710310017000, src: 'images/cloud/IMG_0614.PNG', name: '權力的代價', author: '守門人', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 3 },
    { id: 1710310018000, src: 'images/cloud/IMG_0615.PNG', name: '冰封的心', author: '冬眠者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 4 },
    { id: 1710310019000, src: 'images/cloud/IMG_0616.PNG', name: '最後的告別', author: '行者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 1 },
    { id: 1710310020000, src: 'images/cloud/IMG_0617.PNG', name: '永恆的等待', author: '石像', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 2 },
    { id: 1710310021000, src: 'images/cloud/IMG_0618.PNG', name: '窗外的偽裝', author: '窺探者', storyId: 'snow_white', storyTitle: '公主的等待', level: 3 },
    { id: 1710310022000, src: 'images/cloud/IMG_0619.PNG', name: '絲絨禮服', author: '裁縫師', storyId: 'snow_white', storyTitle: '公主的等待', level: 4 },
    { id: 1710310023000, src: 'images/cloud/IMG_0620.PNG', name: '秘密花園', author: '園丁', storyId: 'snow_white', storyTitle: '公主的等待', level: 1 },
    { id: 1710310024000, src: 'images/cloud/IMG_0621.PNG', name: '黃昏的懺悔', author: '信徒', storyId: 'snow_white', storyTitle: '公主的等待', level: 2 },
    { id: 1710310025000, src: 'images/cloud/IMG_0622.PNG', name: '紅寶石的詛咒', author: '收藏家', storyId: 'snow_white', storyTitle: '公主的等待', level: 3 },
    { id: 1710310026000, src: 'images/cloud/IMG_0624.PNG', name: '偏見的重量', author: '審判長', storyId: 'snow_white', storyTitle: '公主的等待', level: 4 },
    { id: 1710310027000, src: 'images/cloud/IMG_0623.PNG', name: '孤獨的加冕', author: '皇后', storyId: 'snow_white', storyTitle: '公主的等待', level: 1 },
    { id: 1710310028000, src: 'images/cloud/IMG_0625.PNG', name: '記憶的餘溫', author: '拾荒者', storyId: 'snow_white', storyTitle: '公主的等待', level: 2 },
    { id: 1710310029000, src: 'images/cloud/IMG_0626.PNG', name: '破碎的童話', author: '說書人', storyId: 'snow_white', storyTitle: '公主的等待', level: 3 },
    { id: 1710310030000, src: 'images/cloud/IMG_0627.PNG', name: '不對稱的愛', author: '觀察員', storyId: 'snow_white', storyTitle: '公主的等待', level: 4 },
    { id: 1710310031000, src: 'images/cloud/IMG_0628.PNG', name: '迷霧森林', author: '嚮導', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 3 },
    { id: 1710310032000, src: 'images/cloud/IMG_0629.PNG', name: '刺痛的擁抱', author: '仙人掌', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 4 },
    { id: 1710310033000, src: 'images/cloud/IMG_0630.PNG', name: '被遮蓋的光', author: '螢火蟲', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 1 },
    { id: 1710310034000, src: 'images/cloud/IMG_0631.PNG', name: '假面的告白', author: '小丑', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 2 },
    { id: 1710310035000, src: 'images/cloud/IMG_0632.PNG', name: '鏽蝕的鑰匙', author: '鎖匠', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 3 },
    { id: 1710310036000, src: 'images/cloud/IMG_0633.PNG', name: '枯萎的親情', author: '落葉', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 4 },
    { id: 1710310037000, src: 'images/cloud/IMG_0634.PNG', name: '冷酷的教誨', author: '嚴師', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 1 },
    { id: 1710310038000, src: 'images/cloud/IMG_0635.PNG', name: '嫉妒的迴響', author: '聽眾', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 2 },
    { id: 1710310039000, src: 'images/cloud/IMG_0636.PNG', name: '沉重的腳步', author: '登山者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 3 },
    { id: 1710310040000, src: 'images/cloud/IMG_0637.PNG', name: '最終的救贖', author: '祈禱者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 4 },
    { id: 1710310040001, src: 'images/cloud/IMG_0638.PNG', name: '沉重的迴響', author: '聽者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 2 },
    { id: 1710310040002, src: 'images/cloud/IMG_0640.PNG', name: '沉重的告白', author: '登土者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 3 },
    { id: 1710310040003, src: 'images/cloud/IMG_0915.PNG', name: '冷酷的救贖', author: '祈還者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 4 }
];

const LIKE_STORAGE_KEY = "artEchoCloudLikes";
let currentFilterTag = '全部';

function injectCloudActionStyles() {
    if (document.getElementById('cloud-share-style')) return;

    const style = document.createElement('style');
    style.id = 'cloud-share-style';
    style.textContent = `
        .cloud-actions {
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:10px;
            margin-top:10px;
        }
        .share-btn {
            border:none;
            border-radius:999px;
            padding:8px 12px;
            font-size:0.85rem;
            cursor:pointer;
            background:#eef3f1;
            color:#2f5d4f;
            transition:.2s ease;
        }
        .share-btn:hover {
            transform:translateY(-1px);
        }
        .share-btn.active {
            background:#2f5d4f;
            color:#fff;
        }
        .share-status {
            font-size:0.82rem;
            color:#6f7c79;
        }
        .cloud-empty {
            grid-column:1 / -1;
            text-align:center;
            padding:48px 16px;
            color:#6f7c79;
            background:rgba(255,255,255,0.55);
            border-radius:20px;
        }
    `;
    document.head.appendChild(style);
}

function getLikeData() {
    const raw = localStorage.getItem(LIKE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
}

function saveLikeData(data) {
    localStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify(data));
}

function ensureLikeRecord(likeData, workId, min = 5, span = 40) {
    if (!likeData[workId]) {
        likeData[workId] = {
            count: Math.floor(Math.random() * span) + min,
            isLiked: false
        };
    }
}

function handleLikeClick(btn, workId) {
    const likeData = getLikeData();
    const countDisplay = btn.querySelector('.like-count');

    ensureLikeRecord(likeData, workId, 10, 50);

    if (likeData[workId].isLiked) {
        likeData[workId].count--;
        likeData[workId].isLiked = false;
        btn.classList.remove('active');
    } else {
        likeData[workId].count++;
        likeData[workId].isLiked = true;
        btn.classList.add('active');
    }

    countDisplay.textContent = likeData[workId].count;
    saveLikeData(likeData);
}

function getMyWorks() {
    try {
        return StorageManager.getAllWorks()
            .map(w => ({
                id: w.id,
                src: w.dataUrl,
                name: w.name || "情緒筆觸",
                author: "我",
                storyId: w.storyId || "",
                storyTitle: w.storyTitle || "",
                level: w.level,
                shared: !!w.shared,
                isMine: true
            }))
            .filter(w => w.src);
    } catch (e) {
        return [];
    }
}

function buildTagBar(hasPersonal) {
    const tagBar = document.getElementById('cloudTags');
    if (!tagBar) return;

    tagBar.innerHTML = '';
    const tags = ['全部', '公主的等待', '仙度瑞拉的眼淚'];
    if (hasPersonal) tags.push('我的作品');

    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn' + (tag === currentFilterTag ? ' active' : '');
        btn.textContent = tag;
        btn.onclick = () => {
            currentFilterTag = tag;
            document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCloudGallery(currentFilterTag);
        };
        tagBar.appendChild(btn);
    });
}

function getWorksForFilter(filterTag) {
    const myWorks = getMyWorks();
    const sharedMyWorks = myWorks.filter(w => w.shared);

    if (filterTag === '我的作品') {
        return myWorks.slice().sort((a, b) => String(b.id).localeCompare(String(a.id)));
    }

    let works = [...cloudSimulationWorks, ...sharedMyWorks];

    if (filterTag === '全部') {
        return works.sort(() => Math.random() - 0.5);
    }

    return works.filter(w => w.storyTitle === filterTag);
}

function toggleShare(workId, nextShared) {
    StorageManager.setWorkShared(workId, nextShared);
    renderCloudGallery(currentFilterTag);
}

function createCard(work, likeData, isMyWorksTab) {
    ensureLikeRecord(likeData, work.id, 5, 40);

    const card = document.createElement('div');
    card.className = 'cloud-item';

    const img = document.createElement('img');
    img.src = work.src;
    img.loading = 'lazy';
    img.alt = work.name || '作品';

    const info = document.createElement('div');
    info.className = 'cloud-info';
    info.innerHTML = `
        <h4>${work.name}</h4>
        <p>by ${work.author}</p>
    `;

    const likeBtn = document.createElement('button');
    likeBtn.className = `like-btn ${likeData[work.id].isLiked ? 'active' : ''}`;
    likeBtn.innerHTML = `
        <span class="heart-icon">♥</span>
        <span class="like-count">${likeData[work.id].count}</span>
    `;
    likeBtn.onclick = (e) => {
        e.stopPropagation();
        handleLikeClick(likeBtn, work.id);
    };

    if (isMyWorksTab && work.isMine) {
        const actions = document.createElement('div');
        actions.className = 'cloud-actions';

        const shareBtn = document.createElement('button');
        shareBtn.className = `share-btn ${work.shared ? 'active' : ''}`;
        shareBtn.textContent = work.shared ? '取消分享' : '分享作品';
        shareBtn.onclick = (e) => {
            e.stopPropagation();
            toggleShare(work.id, !work.shared);
        };

        const status = document.createElement('span');
        status.className = 'share-status';
        status.textContent = work.shared ? '目前狀態：已公開' : '目前狀態：未公開';

        actions.appendChild(shareBtn);
        actions.appendChild(status);

        card.appendChild(img);
        card.appendChild(info);
        card.appendChild(actions);
        card.appendChild(likeBtn);
        return card;
    }

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(likeBtn);
    return card;
}

function renderCloudGallery(filterTag = '全部') {
    const cloudGrid = document.getElementById('cloudGrid');
    const likeData = getLikeData();
    const works = getWorksForFilter(filterTag);

    cloudGrid.innerHTML = '';

    if (works.length === 0) {
        cloudGrid.innerHTML = `
            <div class="cloud-empty">
                <h3 style="margin-bottom:8px;">目前沒有可顯示的作品</h3>
                <p>${filterTag === '我的作品' ? '你還沒有儲存任何作品。' : '目前這個分類下還沒有已公開的作品。'}</p>
            </div>
        `;
        saveLikeData(likeData);
        return;
    }

    const isMyWorksTab = filterTag === '我的作品';

    works.forEach(work => {
        const card = createCard(work, likeData, isMyWorksTab);
        cloudGrid.appendChild(card);
    });

    saveLikeData(likeData);
}

document.addEventListener('DOMContentLoaded', () => {
    injectCloudActionStyles();

    let hasPersonal = false;
    try {
        hasPersonal = StorageManager.getAllWorks().length > 0;
    } catch (e) {}

    buildTagBar(hasPersonal);
    renderCloudGallery(currentFilterTag);
});