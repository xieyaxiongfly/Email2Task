// 安装时的初始化
chrome.runtime.onInstalled.addListener(() => {
    console.log('Outlook to Notion Task Generator installed');
});

// 监听来自content script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openPopup') {
        // 打开弹窗（这个功能需要用户点击插件图标）
        chrome.action.openPopup();
    }
});

// 处理插件图标点击
chrome.action.onClicked.addListener((tab) => {
    // 检查是否在支持的网站上
    if (tab.url.includes('outlook.live.com') || tab.url.includes('outlook.office.com')) {
        // 如果在Outlook页面，可以执行特定操作
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: highlightEmailArea
        });
    }
});

// 高亮邮件区域的函数（注入到页面中执行）
function highlightEmailArea() {
    // 为邮件内容区域添加高亮效果
    const emailSelectors = [
        '[data-testid="message-body"]',
        '.rps_1919',
        '[class*="message-body"]',
        '[role="region"][aria-label*="Message body"]'
    ];

    for (const selector of emailSelectors) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.outline = '3px solid #4299e1';
            element.style.borderRadius = '4px';
            
            // 3秒后移除高亮
            setTimeout(() => {
                element.style.outline = '';
                element.style.borderRadius = '';
            }, 3000);
            break;
        }
    }
}

// 监听标签页更新，在Outlook页面确保content script被注入
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && 
        (tab.url.includes('outlook.live.com') || tab.url.includes('outlook.office.com'))) {
        
        try {
            // 检查content script是否已经注入
            const result = await chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: () => {
                    return typeof window.outlookToNotionContentScriptLoaded !== 'undefined';
                }
            });
            
            // 如果content script未加载，则注入
            if (!result[0].result) {
                await chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['content.js']
                });
                console.log('Content script injected into tab:', tabId);
            }
        } catch (error) {
            console.log('Failed to inject content script:', error);
        }
    }
});

// 处理存储配置的相关功能
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
        console.log('Configuration updated:', changes);
    }
});

// 提供一些实用的辅助功能
const utils = {
    // 验证API密钥格式
    validateApiKey: (key, type) => {
        if (type === 'gemini') {
            return key && key.startsWith('AIza') && key.length > 20;
        } else if (type === 'notion') {
            return key && key.startsWith('secret_') && key.length > 40;
        }
        return false;
    },

    // 格式化日期
    formatDate: (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // YYYY-MM-DD格式
    },

    // 清理文本内容
    cleanText: (text) => {
        if (!text) return '';
        return text
            .replace(/\s+/g, ' ') // 合并多个空格
            .replace(/\n\s*\n/g, '\n') // 合并多个换行
            .trim();
    }
};

// 导出实用函数供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = utils;
}