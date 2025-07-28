// 内置语言配置
const languages = {
    en: {
        headerTitle: "📧→📝 Notion Task Generator",
        languageSwitch: "中文",
        geminiApiSection: "🔑 Google Gemini API",
        geminiApiKeyPlaceholder: "Enter your Gemini API Key",
        geminiModel1: "Gemini 1.5 Flash (Recommended-Fast)",
        geminiModel2: "Gemini 1.5 Pro (Powerful-Slower)",
        geminiModel3: "Gemini 1.0 Pro (Classic Version)",
        geminiApiHelp: "Get at",
        geminiApiGetText: "get key",
        geminiApiTip: "💡 Flash is fastest, Pro most accurate, 1.0 most stable",
        notionSection: "📝 Notion Configuration",
        notionTokenPlaceholder: "Notion Integration Token",
        notionDatabasePlaceholder: "Database ID",
        notionHelp: "Create Integration in Notion and get Database ID",
        taskPromptSection: "⚙️ Task Generation Prompt",
        taskPromptPlaceholder: "Customize task generation prompt...",
        taskPromptDefault: "Based on the following email content, generate a concise task description and suggested due date. Email content:",
        generateButton: "🚀 Generate and Add Task to Notion",
        generateButtonProcessing: "Processing...",
        configRequired: "Please fill in all required configuration information",
        outlookPageRequired: "Please use this feature on Outlook email pages",
        cannotGetEmail: "Cannot get email content: ",
        taskAddedSuccess: "Task successfully added to Notion!",
        processingError: "Error occurred during processing: ",
        geminiApiFailed: "Gemini API call failed",
        geminiApiInvalidKey: "API key invalid or request format error",
        geminiApiPermission: "API key insufficient permissions or quota exhausted",
        geminiApiRateLimit: "Requests too frequent, please try again later",
        geminiApiServerError: "Server error, please try again later",
        geminiApiDetailInfo: "Details: ",
        geminiApiResponseError: "Gemini API returned abnormal data format",
        geminiApiParseError: "Unable to parse Gemini generated task content. Original reply: ",
        jsonParseError: "JSON parsing failed: ",
        originalContent: "Original content: ",
        networkError: "Network connection failed, please check network connection or try using VPN",
        notionApiError: "Notion API error: "
    },
    zh: {
        headerTitle: "📧→📝 Notion任务生成器",
        languageSwitch: "English",
        geminiApiSection: "🔑 Google Gemini API",
        geminiApiKeyPlaceholder: "输入你的Gemini API密钥",
        geminiModel1: "Gemini 1.5 Flash (推荐-快速)",
        geminiModel2: "Gemini 1.5 Pro (强大-较慢)",
        geminiModel3: "Gemini 1.0 Pro (经典版本)",
        geminiApiHelp: "在",
        geminiApiGetText: "获取密钥",
        geminiApiTip: "💡 Flash最快，Pro最准确，1.0最稳定",
        notionSection: "📝 Notion配置",
        notionTokenPlaceholder: "Notion集成令牌",
        notionDatabasePlaceholder: "数据库ID",
        notionHelp: "在Notion中创建集成并获取数据库ID",
        taskPromptSection: "⚙️ 任务生成提示",
        taskPromptPlaceholder: "自定义任务生成提示...",
        taskPromptDefault: "根据以下邮件内容，生成一个简洁的任务描述和截止日期建议。邮件内容：",
        generateButton: "🚀 生成并添加任务到Notion",
        generateButtonProcessing: "处理中...",
        configRequired: "请填写所有必需的配置信息",
        outlookPageRequired: "请在Outlook邮件页面使用此功能",
        cannotGetEmail: "无法获取邮件内容：",
        taskAddedSuccess: "任务已成功添加到Notion！",
        processingError: "处理过程中出现错误：",
        geminiApiFailed: "Gemini API调用失败",
        geminiApiInvalidKey: "API密钥无效或请求格式错误",
        geminiApiPermission: "API密钥权限不足或配额已用完",
        geminiApiRateLimit: "请求过于频繁，请稍后重试",
        geminiApiServerError: "服务器错误，请稍后重试",
        geminiApiDetailInfo: "详细信息：",
        geminiApiResponseError: "Gemini API返回的数据格式异常",
        geminiApiParseError: "无法解析Gemini生成的任务内容。原始回复：",
        jsonParseError: "JSON解析失败：",
        originalContent: "原始内容：",
        networkError: "网络连接失败，请检查网络连接或尝试使用VPN",
        notionApiError: "Notion API错误："
    }
};

// 语言管理
let currentLanguage = 'en';

// 获取本地化消息
function getMessage(key) {
    return languages[currentLanguage][key] || key;
}

// 更新UI文本
function updateUITexts() {
    // 头部
    document.getElementById('headerTitle').textContent = getMessage('headerTitle');
    document.getElementById('languageSwitch').textContent = getMessage('languageSwitch');
    
    // Gemini API 部分
    document.getElementById('geminiApiSection').textContent = getMessage('geminiApiSection');
    document.getElementById('geminiApiKey').placeholder = getMessage('geminiApiKeyPlaceholder');
    document.getElementById('geminiModel1').textContent = getMessage('geminiModel1');
    document.getElementById('geminiModel2').textContent = getMessage('geminiModel2');
    document.getElementById('geminiModel3').textContent = getMessage('geminiModel3');
    document.getElementById('geminiApiHelp').textContent = getMessage('geminiApiHelp');
    document.getElementById('geminiApiGetText').textContent = getMessage('geminiApiGetText');
    document.getElementById('geminiApiTip').innerHTML = getMessage('geminiApiTip');
    
    // Notion 部分
    document.getElementById('notionSection').textContent = getMessage('notionSection');
    document.getElementById('notionToken').placeholder = getMessage('notionTokenPlaceholder');
    document.getElementById('notionDatabaseId').placeholder = getMessage('notionDatabasePlaceholder');
    document.getElementById('notionHelp').textContent = getMessage('notionHelp');
    
    // 任务提示部分
    document.getElementById('taskPromptSection').textContent = getMessage('taskPromptSection');
    document.getElementById('taskPrompt').placeholder = getMessage('taskPromptPlaceholder');
    
    // 生成按钮
    document.getElementById('generateTask').textContent = getMessage('generateButton');
}

// 切换语言
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    chrome.storage.sync.set({ language: currentLanguage });
    updateUITexts();
    
    // 如果任务提示为默认值，则更新为新语言的默认值
    const taskPromptInput = document.getElementById('taskPrompt');
    if (taskPromptInput.value === languages[currentLanguage === 'en' ? 'zh' : 'en'].taskPromptDefault) {
        taskPromptInput.value = getMessage('taskPromptDefault');
        saveConfig();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const geminiApiKeyInput = document.getElementById('geminiApiKey');
    const geminiModelSelect = document.getElementById('geminiModel');
    const notionTokenInput = document.getElementById('notionToken');
    const notionDatabaseIdInput = document.getElementById('notionDatabaseId');
    const taskPromptInput = document.getElementById('taskPrompt');
    const generateButton = document.getElementById('generateTask');
    const statusDiv = document.getElementById('status');
    const languageSwitchButton = document.getElementById('languageSwitch');

    // 初始化语言
    chrome.storage.sync.get(['language'], function(result) {
        currentLanguage = result.language || 'en';
        updateUITexts();
        loadConfig();
    });

    // 语言切换按钮事件
    languageSwitchButton.addEventListener('click', toggleLanguage);

    // 加载保存的配置
    function loadConfig() {
        chrome.storage.sync.get([
            'geminiApiKey', 
            'geminiModel',
            'notionToken', 
            'notionDatabaseId', 
            'taskPrompt'
        ], function(result) {
            if (result.geminiApiKey) geminiApiKeyInput.value = result.geminiApiKey;
            if (result.geminiModel) geminiModelSelect.value = result.geminiModel;
            if (result.notionToken) notionTokenInput.value = result.notionToken;
            if (result.notionDatabaseId) notionDatabaseIdInput.value = result.notionDatabaseId;
            if (result.taskPrompt) {
                taskPromptInput.value = result.taskPrompt;
            } else {
                // 设置默认提示词
                taskPromptInput.value = getMessage('taskPromptDefault');
            }
        });
    }

    // 保存配置
    function saveConfig() {
        chrome.storage.sync.set({
            geminiApiKey: geminiApiKeyInput.value,
            geminiModel: geminiModelSelect.value,
            notionToken: notionTokenInput.value,
            notionDatabaseId: notionDatabaseIdInput.value,
            taskPrompt: taskPromptInput.value
        });
    }

    // 显示状态消息
    function showStatus(message, type = 'success') {
        statusDiv.textContent = message;
        statusDiv.className = `status ${type}`;
        setTimeout(() => {
            statusDiv.textContent = '';
            statusDiv.className = '';
        }, 3000);
    }

    // 监听输入变化并保存
    [geminiApiKeyInput, geminiModelSelect, notionTokenInput, notionDatabaseIdInput, taskPromptInput].forEach(input => {
        input.addEventListener('input', saveConfig);
        input.addEventListener('change', saveConfig); // 为select元素添加change事件
    });

    // 生成任务按钮点击事件
    generateButton.addEventListener('click', async function() {
        // 验证配置
        if (!geminiApiKeyInput.value || !notionTokenInput.value || !notionDatabaseIdInput.value) {
            showStatus(getMessage('configRequired'), 'error');
            return;
        }

        generateButton.disabled = true;
        generateButton.textContent = getMessage('generateButtonProcessing');

        try {
            // 获取活动标签页
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            // 检查是否在Outlook页面
            if (!tab.url.includes('outlook')) {
                showStatus(getMessage('outlookPageRequired'), 'error');
                return;
            }

            // 确保content script已注入
            try {
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['content.js']
                });
            } catch (injectError) {
                console.log('Content script may already be injected:', injectError);
            }

            // 等待一下确保脚本加载完成
            await new Promise(resolve => setTimeout(resolve, 500));

            // 向content script发送消息获取邮件内容
            let response;
            try {
                response = await chrome.tabs.sendMessage(tab.id, { action: 'getEmailContent' });
            } catch (messageError) {
                // 如果消息发送失败，再次尝试注入脚本
                console.log('Message failed, re-injecting script:', messageError);
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['content.js']
                });
                
                // 再次等待并重试
                await new Promise(resolve => setTimeout(resolve, 1000));
                response = await chrome.tabs.sendMessage(tab.id, { action: 'getEmailContent' });
            }
            
            if (!response || !response.success) {
                showStatus(getMessage('cannotGetEmail') + (response?.error || 'Unknown error'), 'error');
                return;
            }

            // 使用Gemini生成任务
            const taskData = await generateTaskWithGemini(response.emailContent);
            
            // 添加到Notion
            await addTaskToNotion(taskData);
            
            showStatus(getMessage('taskAddedSuccess'), 'success');

        } catch (error) {
            console.error('Error:', error);
            showStatus(getMessage('processingError') + error.message, 'error');
        } finally {
            generateButton.disabled = false;
            generateButton.textContent = getMessage('generateButton');
        }
    });

    // 使用Gemini生成任务
    async function generateTaskWithGemini(emailContent) {
        const prompt = `${taskPromptInput.value}\n\n${emailContent}\n\nPlease reply in JSON format with the following fields:\n{\n  "title": "Task title",\n  "description": "Detailed description",\n  "dueDate": "Due date in YYYY-MM-DD format (if any)",\n  "priority": "High/Medium/Low"\n}`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModelSelect.value}:generateContent?key=` + geminiApiKeyInput.value, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Gemini API Error:', response.status, errorData);
                
                let errorMessage = `${getMessage('geminiApiFailed')} (${response.status})`;
                if (response.status === 400) {
                    errorMessage += ' - ' + getMessage('geminiApiInvalidKey');
                } else if (response.status === 403) {
                    errorMessage += ' - ' + getMessage('geminiApiPermission');
                } else if (response.status === 429) {
                    errorMessage += ' - ' + getMessage('geminiApiRateLimit');
                } else if (response.status >= 500) {
                    errorMessage += ' - ' + getMessage('geminiApiServerError');
                }
                
                if (errorData.error && errorData.error.message) {
                    errorMessage += `\n${getMessage('geminiApiDetailInfo')} ${errorData.error.message}`;
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('Gemini API Response:', data);
            
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error(getMessage('geminiApiResponseError'));
            }
            
            const generatedText = data.candidates[0].content.parts[0].text;
            console.log('Generated text:', generatedText);
            
            // 提取JSON内容
            const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error(`${getMessage('geminiApiParseError')} ${generatedText}`);
            }

            try {
                return JSON.parse(jsonMatch[0]);
            } catch (parseError) {
                throw new Error(`${getMessage('jsonParseError')} ${parseError.message}\n${getMessage('originalContent')} ${jsonMatch[0]}`);
            }
            
        } catch (networkError) {
            if (networkError.name === 'TypeError' && networkError.message.includes('fetch')) {
                throw new Error(getMessage('networkError'));
            }
            throw networkError;
        }
    }

    // 添加任务到Notion
    async function addTaskToNotion(taskData) {
        const notionApiUrl = `https://api.notion.com/v1/pages`;
        
        // 基础页面数据，只包含必需的Name属性
        const pageData = {
            parent: {
                database_id: notionDatabaseIdInput.value
            },
            properties: {
                "Name": {
                    title: [{
                        text: {
                            content: taskData.title
                        }
                    }]
                }
            }
        };

        // 先获取数据库结构来检查可用属性
        try {
            const dbResponse = await fetch(`https://api.notion.com/v1/databases/${notionDatabaseIdInput.value}`, {
                headers: {
                    'Authorization': `Bearer ${notionTokenInput.value}`,
                    'Notion-Version': '2022-06-28'
                }
            });

            if (dbResponse.ok) {
                const dbData = await dbResponse.json();
                const availableProperties = Object.keys(dbData.properties);
                console.log('Available properties:', availableProperties);

                // 动态添加可用的属性
                availableProperties.forEach(propName => {
                    const propConfig = dbData.properties[propName];
                    
                    // 添加描述字段（支持多种可能的名称）
                    if (['Description', 'description', '描述', 'Content', 'content', '内容', 'Details', 'details'].includes(propName) && 
                        propConfig.type === 'rich_text' && taskData.description) {
                        pageData.properties[propName] = {
                            rich_text: [{
                                text: {
                                    content: taskData.description
                                }
                            }]
                        };
                    }
                    
                    // 添加截止日期字段（支持多种可能的名称）
                    else if (['Due Date', 'due_date', 'DueDate', '截止日期', 'Deadline', 'deadline', 'Date', 'date'].includes(propName) && 
                             propConfig.type === 'date' && taskData.dueDate) {
                        pageData.properties[propName] = {
                            date: {
                                start: taskData.dueDate
                            }
                        };
                    }
                    
                    // 添加优先级字段（支持多种可能的名称）
                    else if (['Priority', 'priority', '优先级', 'Level', 'level', 'Importance', 'importance'].includes(propName) && 
                             propConfig.type === 'select' && taskData.priority) {
                        
                        // 检查选项是否存在
                        const availableOptions = propConfig.select.options.map(opt => opt.name);
                        console.log(`Available options for ${propName}:`, availableOptions);
                        
                        // 尝试匹配优先级选项
                        let priorityOption = taskData.priority;
                        if (!availableOptions.includes(priorityOption)) {
                            // 尝试中英文映射
                            const priorityMap = {
                                'High': ['高', 'High', 'HIGH', '高优先级', 'P1', '紧急'],
                                'Medium': ['中', 'Medium', 'MEDIUM', '中优先级', 'P2', '一般'],
                                'Low': ['低', 'Low', 'LOW', '低优先级', 'P3', '不紧急']
                            };
                            
                            for (const [englishPriority, alternatives] of Object.entries(priorityMap)) {
                                if (alternatives.some(alt => availableOptions.includes(alt))) {
                                    priorityOption = alternatives.find(alt => availableOptions.includes(alt));
                                    break;
                                }
                            }
                        }
                        
                        if (availableOptions.includes(priorityOption)) {
                            pageData.properties[propName] = {
                                select: {
                                    name: priorityOption
                                }
                            };
                        }
                    }
                    
                    // 添加标签字段（如果存在）
                    else if (['Tags', 'tags', '标签', 'Category', 'category', '分类'].includes(propName) && 
                             propConfig.type === 'multi_select') {
                        pageData.properties[propName] = {
                            multi_select: [{
                                name: currentLanguage === 'zh' ? "邮件任务" : "Email Task"
                            }]
                        };
                    }
                    
                    // 添加状态字段（如果存在）
                    else if (['Status', 'status', '状态', 'State', 'state'].includes(propName) && 
                             propConfig.type === 'select') {
                        const statusOptions = propConfig.select.options.map(opt => opt.name);
                        
                        // 尝试找到表示"待办"或"新建"的选项
                        const todoOptions = ['Todo', 'TODO', 'To Do', '待办', '未开始', 'Not Started', 'New', '新建', 'Pending'];
                        const matchedStatus = todoOptions.find(opt => statusOptions.includes(opt));
                        
                        if (matchedStatus) {
                            pageData.properties[propName] = {
                                select: {
                                    name: matchedStatus
                                }
                            };
                        } else if (statusOptions.length > 0) {
                            // 如果没有匹配的，使用第一个选项
                            pageData.properties[propName] = {
                                select: {
                                    name: statusOptions[0]
                                }
                            };
                        }
                    }
                });
                
                console.log('Final pageData:', JSON.stringify(pageData, null, 2));
            }
        } catch (dbError) {
            console.warn('Failed to fetch database schema, using basic properties only:', dbError);
        }

        const response = await fetch(notionApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${notionTokenInput.value}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify(pageData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Notion API Error Response:', errorData);
            throw new Error(`${getMessage('notionApiError')} ${errorData.message}`);
        }

        return await response.json();
    }
});