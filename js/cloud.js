import { StorageManager } from './storageManager.js';

// 1. 40 張模擬畫作數據
const cloudSimulationWorks = [
    { id: 1710310001000, src: 'images/IMG_0592.png', name: '鏡中的倒影', author: '旅人 A', storyId: 'snow_white', storyTitle: '公主的等待', level: 1 },
    { id: 1710310002000, src: 'images/IMG_0593.png', name: '禁忌的蘋果', author: '心碎者', storyId: 'snow_white', storyTitle: '公主的等待', level: 2 },
    { id: 1710310003000, src: 'images/IMG_0597.png', name: '沉重的后冠', author: '故事家', storyId: 'snow_white', storyTitle: '公主的等待', level: 3 },
    { id: 1710310004000, src: 'images/IMG_0598.png', name: '冰冷的長廊', author: '寂寞的靈魂', storyId: 'snow_white', storyTitle: '公主的等待', level: 4 },
    { id: 1710310005000, src: 'images/IMG_0599.png', name: '破碎的真實', author: 'Ariel', storyId: 'snow_white', storyTitle: '公主的等待', level: 1 },
    { id: 1710310006000, src: 'images/IMG_0600.png', name: '天鵝絨幕後', author: '藝術愛好者', storyId: 'snow_white', storyTitle: '公主的等待', level: 2 },
    { id: 1710310007000, src: 'images/IMG_0601.png', name: '隱藏的淚水', author: '路人甲', storyId: 'snow_white', storyTitle: '公主的等待', level: 3 },
    { id: 1710310008000, src: 'images/IMG_0602.png', name: '古老的手稿', author: '時光機', storyId: 'snow_white', storyTitle: '公主的等待', level: 4 },
    { id: 1710310009000, src: 'images/IMG_0605.png', name: '黑夜中的玫瑰', author: '午夜畫家', storyId: 'snow_white', storyTitle: '公主的等待', level: 1 },
    { id: 1710310010000, src: 'images/IMG_0606.png', name: '王座的階梯', author: '野心家', storyId: 'snow_white', storyTitle: '公主的等待', level: 2 },
    { id: 1710310011000, src: 'images/IMG_0607.png', name: '深淵的注視', author: '無名氏', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 1 },
    { id: 1710310012000, src: 'images/IMG_0609.png', name: '被遺忘的承諾', author: '灰燼', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 2 },
    { id: 1710310013000, src: 'images/IMG_0610.png', name: '毒藥的餘味', author: '影子', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 3 },
    { id: 1710310014000, src: 'images/IMG_0611.png', name: '月光下的詭計', author: '銀狐', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 4 },
    { id: 1710310015000, src: 'images/IMG_0612.png', name: '華麗的束縛', author: '織網者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 1 },
    { id: 1710310016000, src: 'images/IMG_0613.png', name: '寂靜的晚宴', author: '空杯', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 2 },
    { id: 1710310017000, src: 'images/IMG_0614.png', name: '權力的代價', author: '守門人', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 3 },
    { id: 1710310018000, src: 'images/IMG_0615.png', name: '冰封的心', author: '冬眠者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 4 },
    { id: 1710310019000, src: 'images/IMG_0616.png', name: '最後的告別', author: '行者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 1 },
    { id: 1710310020000, src: 'images/IMG_0617.png', name: '永恆的等待', author: '石像', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 2 },
    { id: 1710310021000, src: 'images/IMG_0618.png', name: '窗外的偽裝', author: '窺探者', storyId: 'snow_white', storyTitle: '公主的等待', level: 3 },
    { id: 1710310022000, src: 'images/IMG_0619.png', name: '絲絨禮服', author: '裁縫師', storyId: 'snow_white', storyTitle: '公主的等待', level: 4 },
    { id: 1710310023000, src: 'images/IMG_0620.png', name: '秘密花園', author: '園丁', storyId: 'snow_white', storyTitle: '公主的等待', level: 1 },
    { id: 1710310024000, src: 'images/IMG_0621.png', name: '黃昏的懺悔', author: '信徒', storyId: 'snow_white', storyTitle: '公主的等待', level: 2 },
    { id: 1710310025000, src: 'images/IMG_0622.png', name: '紅寶石的詛咒', author: '收藏家', storyId: 'snow_white', storyTitle: '公主的等待', level: 3 },
    { id: 1710310026000, src: 'images/IMG_0624.png', name: '偏見的重量', author: '審判長', storyId: 'snow_white', storyTitle: '公主的等待', level: 4 },
    { id: 1710310027000, src: 'images/IMG_0623.png', name: '孤獨的加冕', author: '皇后', storyId: 'snow_white', storyTitle: '公主的等待', level: 1 },
    { id: 1710310028000, src: 'images/IMG_0625.png', name: '記憶的餘溫', author: '拾荒者', storyId: 'snow_white', storyTitle: '公主的等待', level: 2 },
    { id: 1710310029000, src: 'images/IMG_0626.png', name: '破碎的童話', author: '說書人', storyId: 'snow_white', storyTitle: '公主的等待', level: 3 },
    { id: 1710310030000, src: 'images/IMG_0627.png', name: '不對稱的愛', author: '觀察員', storyId: 'snow_white', storyTitle: '公主的等待', level: 4 },
    { id: 1710310031000, src: 'images/IMG_0628.png', name: '迷霧森林', author: '嚮導', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 3 },
    { id: 1710310032000, src: 'images/IMG_0629.png', name: '刺痛的擁抱', author: '仙人掌', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 4 },
    { id: 1710310033000, src: 'images/IMG_0630.png', name: '被遮蓋的光', author: '螢火蟲', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 1 },
    { id: 1710310034000, src: 'images/IMG_0631.png', name: '假面的告白', author: '小丑', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 2 },
    { id: 1710310035000, src: 'images/IMG_0632.png', name: '鏽蝕的鑰匙', author: '鎖匠', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 3 },
    { id: 1710310036000, src: 'images/IMG_0633.png', name: '枯萎的親情', author: '落葉', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 4 },
    { id: 1710310037000, src: 'images/IMG_0634.png', name: '冷酷的教誨', author: '嚴師', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 1 },
    { id: 1710310038000, src: 'images/IMG_0635.png', name: '嫉妒的迴響', author: '聽眾', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 2 },
    { id: 1710310039000, src: 'images/IMG_0636.png', name: '沉重的腳步', author: '登山者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 3 },
    { id: 1710310040000, src: 'images/IMG_0637.png', name: '最終的救贖', author: '祈禱者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 4 },
    { id: 1710310038000, src: 'images/IMG_0638.png', name: '沉重的迴響', author: '聽者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 2 },
    { id: 1710310039000, src: 'images/IMG_0640.png', name: '沉重的告白', author: '登土者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 3 },
    { id: 1710310040000, src: 'images/IMG_0915.png', name: '冷酷的救贖', author: '祈還者', storyId: 'cinderella', storyTitle: '仙度瑞拉的眼淚', level: 4 }

];

const LIKE_STORAGE_KEY = "artEchoCloudLikes";
let currentAllWorks = [];

// 取得與儲存 Local按讚數
function getLikeData() {
    const raw = localStorage.getItem(LIKE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
}
function saveLikeData(data) {
    localStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify(data));
}

function handleLikeClick(btn, workId) {
    const likeData = getLikeData();
    const countDisplay = btn.querySelector('.like-count');

    if (!likeData[workId]) {
        likeData[workId] = { count: Math.floor(Math.random() * 50) + 10, isLiked: false };
    }

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

function buildTagBar(hasPersonal) {
    const tagBar = document.getElementById('cloudTags');
    if (!tagBar) return;
    tagBar.innerHTML = '';

    const tags = ['全部', '公主的等待', '仙度瑞拉的眼淚'];
    if (hasPersonal) tags.push('我的作品');

    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn' + (tag === '全部' ? ' active' : '');
        btn.textContent = tag;
        btn.onclick = () => {
            document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCloudGallery(tag);
        };
        tagBar.appendChild(btn);
    });
}

function renderCloudGallery(filterTag = '全部') {
    const cloudGrid = document.getElementById('cloudGrid');
    const likeData = getLikeData();

    // 取得個人作品
    let myWorks = [];
    try {
        myWorks = StorageManager.getAllWorks().map(w => ({
            id: w.id, src: w.dataUrl, name: w.name || "情緒筆觸", author: "我", storyTitle: w.storyTitle
        }));
    } catch(e) {}

    currentAllWorks = [...cloudSimulationWorks, ...myWorks];
    if (filterTag === '全部') currentAllWorks.sort(() => Math.random() - 0.5);

    let filtered = currentAllWorks;
    if (filterTag === '我的作品') filtered = currentAllWorks.filter(w => w.author === '我');
    else if (filterTag !== '全部') filtered = currentAllWorks.filter(w => w.storyTitle === filterTag);

    cloudGrid.innerHTML = '';
    filtered.forEach(work => {
        if (!likeData[work.id]) likeData[work.id] = { count: Math.floor(Math.random() * 40) + 5, isLiked: false };
        const card = document.createElement('div');
        card.className = 'cloud-item';
        card.innerHTML = `
            <img src="${work.src}" loading="lazy">
            <div class="cloud-info">
                <h4>${work.name}</h4>
                <p>by ${work.author}</p>
            </div>
            <button class="like-btn ${likeData[work.id].isLiked ? 'active' : ''}">
                <span class="heart-icon">♥</span>
                <span class="like-count">${likeData[work.id].count}</span>
            </button>
        `;
        card.querySelector('.like-btn').onclick = (e) => {
            e.stopPropagation();
            handleLikeClick(card.querySelector('.like-btn'), work.id);
        };
        cloudGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let hasPersonal = false;
    try { hasPersonal = StorageManager.getAllWorks().length > 0; } catch(e) {}
    buildTagBar(hasPersonal);
    renderCloudGallery('全部');
});