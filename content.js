// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getEmailContent') {
        try {
            const emailContent = extractEmailContent();
            sendResponse({ success: true, emailContent: emailContent });
        } catch (error) {
            sendResponse({ success: false, error: error.message });
        }
    }
    return true; // 保持消息通道开放以支持异步响应
});

// 提取邮件内容的函数
function extractEmailContent() {
    // 等待页面加载完成
    if (document.readyState !== 'complete') {
        throw new Error('页面仍在加载中，请稍后再试');
    }

    let emailData = {
        subject: '',
        sender: '',
        content: '',
        date: ''
    };

    // 尝试不同的选择器来适配不同版本的Outlook
    const selectors = {
        // Outlook Web App (新版)
        subject: [
            '[data-testid="message-subject"]',
            '.allowTextSelection[role="heading"]',
            '[role="heading"][aria-level="1"]',
            'h1[class*="subject"]'
        ],
        sender: [
            '[data-testid="message-from"]',
            '.PersonaCard-primaryText',
            '[class*="sender"]',
            '[data-automation-id="from-field"]'
        ],
        content: [
            '[data-testid="message-body"]',
            '.rps_1919',
            '[class*="message-body"]',
            '[role="region"][aria-label*="Message body"]',
            '.ms-font-m'
        ],
        date: [
            '[data-testid="message-date"]',
            '[class*="date"]',
            'time',
            '.ms-font-xs'
        ]
    };

    // 提取主题
    for (const selector of selectors.subject) {
        const element = document.querySelector(selector);
        if (element && element.textContent.trim()) {
            emailData.subject = element.textContent.trim();
            break;
        }
    }

    // 提取发件人
    for (const selector of selectors.sender) {
        const element = document.querySelector(selector);
        if (element && element.textContent.trim()) {
            emailData.sender = element.textContent.trim();
            break;
        }
    }

    // 提取邮件正文
    for (const selector of selectors.content) {
        const element = document.querySelector(selector);
        if (element && element.textContent.trim()) {
            emailData.content = element.textContent.trim();
            break;
        }
    }

    // 提取日期
    for (const selector of selectors.date) {
        const element = document.querySelector(selector);
        if (element && element.textContent.trim()) {
            emailData.date = element.textContent.trim();
            break;
        }
    }

    // 如果没有找到邮件内容，尝试通用方法
    if (!emailData.content) {
        // 查找可能包含邮件内容的区域
        const possibleContentAreas = [
            document.querySelector('[role="main"]'),
            document.querySelector('.ms-Fabric'),
            document.querySelector('#app'),
            document.body
        ].filter(el => el);

        for (const area of possibleContentAreas) {
            const textContent = area.textContent.trim();
            if (textContent.length > 100) { // 假设邮件内容至少有100个字符
                emailData.content = textContent.substring(0, 5000); // 限制长度
                break;
            }
        }
    }

    // 验证是否成功提取到邮件内容
    if (!emailData.subject && !emailData.content) {
        throw new Error('无法在此页面找到邮件内容。请确保您在查看邮件详情页面。');
    }

    // 格式化提取的内容
    const formattedContent = `
主题: ${emailData.subject || '未找到主题'}
发件人: ${emailData.sender || '未找到发件人'}
日期: ${emailData.date || '未找到日期'}

邮件内容:
${emailData.content || '未找到邮件内容'}
    `.trim();

    return formattedContent;
}

// 在页面上添加一个浮动按钮（可选功能）
function addFloatingButton() {
    // 检查按钮是否已存在
    if (document.getElementById('outlook-to-notion-btn')) {
        return;
    }

    const button = document.createElement('div');
    button.id = 'outlook-to-notion-btn';
    button.innerHTML = '📝';
    button.title = '生成Notion任务';
    button.style.cssText = `
        position: fixed;
        top: 20px;
        right: 80px;
        width: 50px;
        height: 50px;
        background: #4299e1;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    `;

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    });

    button.addEventListener('click', () => {
        // 触发弹窗打开
        chrome.runtime.sendMessage({ action: 'openPopup' });
    });

    document.body.appendChild(button);
}

// 页面加载完成后添加浮动按钮
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addFloatingButton);
} else {
    addFloatingButton();
}

// 监听页面变化（适配SPA）
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        setTimeout(addFloatingButton, 1000); // 延迟添加，等待页面内容加载
    }
}).observe(document, { subtree: true, childList: true });
