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
        // 先获取数据库结构来动态生成提示词
        let dynamicFields = {
            "title": "Task title (required)"
        };
        
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
                
                availableProperties.forEach(propName => {
                    const propConfig = dbData.properties[propName];
                    
                    // 获取属性描述（如果存在）
                    const description = propConfig.description || '';
                    const fieldKey = propName.toLowerCase().replace(/\s+/g, '_');
                    
                    // 根据属性类型自动添加到生成字段，并包含描述信息
                    if (propConfig.type === 'rich_text' && propName.toLowerCase() !== 'name') {
                        const hint = description ? `${description}` : `Content for ${propName} field`;
                        dynamicFields[fieldKey] = hint;
                    }
                    else if (propConfig.type === 'date') {
                        const hint = description ? `${description} (format: YYYY-MM-DD)` : `Date in YYYY-MM-DD format for ${propName}`;
                        dynamicFields[fieldKey] = hint;
                    }
                    else if (propConfig.type === 'select') {
                        const options = propConfig.select.options.map(opt => opt.name);
                        const hint = description ? `${description} (options: ${options.join(', ')})` : `Select one from: ${options.join(', ')}`;
                        dynamicFields[fieldKey] = hint;
                    }
                    else if (propConfig.type === 'multi_select') {
                        const options = propConfig.multi_select?.options?.map(opt => opt.name) || [];
                        const hint = description ? `${description} (options: ${options.join(', ')})` : `Array of values from: ${options.join(', ')}`;
                        dynamicFields[fieldKey] = hint;
                    }
                    else if (propConfig.type === 'number') {
                        const hint = description ? `${description} (numeric value)` : `Numeric value for ${propName}`;
                        dynamicFields[fieldKey] = hint;
                    }
                    else if (propConfig.type === 'checkbox') {
                        const hint = description ? `${description} (true/false)` : `Boolean value (true/false) for ${propName}`;
                        dynamicFields[fieldKey] = hint;
                    }
                    else if (propConfig.type === 'url') {
                        const hint = description ? `${description} (URL format)` : `URL for ${propName}`;
                        dynamicFields[fieldKey] = hint;
                    }
                    else if (propConfig.type === 'email') {
                        const hint = description ? `${description} (email format)` : `Email address for ${propName}`;
                        dynamicFields[fieldKey] = hint;
                    }
                    else if (propConfig.type === 'phone_number') {
                        const hint = description ? `${description} (phone format)` : `Phone number for ${propName}`;
                        dynamicFields[fieldKey] = hint;
                    }
                    else if (propConfig.type === 'people') {
                        const hint = description ? `${description} (person name)` : `Person name for ${propName}`;
                        dynamicFields[fieldKey] = hint;
                    }
                    
                    // 在控制台输出属性详情，方便调试
                    console.log(`Property: ${propName}, Type: ${propConfig.type}, Description: "${description}"`);
                });
            }
        } catch (error) {
            console.warn('Could not fetch database schema, using default fields:', error);
            // 使用默认字段
            dynamicFields = {
                "title": "Task title (required)",
                "description": "Detailed description", 
                "dueDate": "Due date in YYYY-MM-DD format (if any)",
                "priority": "High/Medium/Low"
            };
        }
        
        const fieldsExample = JSON.stringify(dynamicFields, null, 2);
        const prompt = `${taskPromptInput.value}\n\n${emailContent}\n\nPlease reply in JSON format with the following fields:\n${fieldsExample}\n\nImportant: Only include fields that are relevant to the email content. If a field is not applicable, omit it from the response.`;

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

                // 动态映射所有属性
                availableProperties.forEach(propName => {
                    const propConfig = dbData.properties[propName];
                    const normalizedPropName = propName.toLowerCase().replace(/\s+/g, '_');
                    
                    // 跳过Name字段（已处理）
                    if (propName === 'Name' || propConfig.type === 'title') {
                        return;
                    }
                    
                    // 检查taskData中是否有对应的字段
                    let fieldValue = null;
                    
                    // 直接匹配标准化的属性名
                    if (taskData[normalizedPropName] !== undefined) {
                        fieldValue = taskData[normalizedPropName];
                    }
                    // 匹配原始属性名（小写）
                    else if (taskData[propName.toLowerCase()] !== undefined) {
                        fieldValue = taskData[propName.toLowerCase()];
                    }
                    // 匹配原始属性名
                    else if (taskData[propName] !== undefined) {
                        fieldValue = taskData[propName];
                    }
                    
                    // 如果找到了对应的值，则根据类型进行格式化
                    if (fieldValue !== null && fieldValue !== undefined && fieldValue !== '') {
                        switch (propConfig.type) {
                            case 'rich_text':
                                pageData.properties[propName] = {
                                    rich_text: [{
                                        text: {
                                            content: String(fieldValue)
                                        }
                                    }]
                                };
                                break;
                                
                            case 'date':
                                // 验证日期格式
                                const dateValue = String(fieldValue);
                                if (dateValue.match(/^\d{4}-\d{2}-\d{2}/)) {
                                    pageData.properties[propName] = {
                                        date: {
                                            start: dateValue
                                        }
                                    };
                                }
                                break;
                                
                            case 'select':
                                const availableOptions = propConfig.select.options.map(opt => opt.name);
                                const selectValue = String(fieldValue);
                                
                                // 直接匹配或模糊匹配
                                let matchedOption = availableOptions.find(opt => 
                                    opt.toLowerCase() === selectValue.toLowerCase()
                                );
                                
                                if (!matchedOption) {
                                    matchedOption = availableOptions.find(opt => 
                                        opt.toLowerCase().includes(selectValue.toLowerCase()) ||
                                        selectValue.toLowerCase().includes(opt.toLowerCase())
                                    );
                                }
                                
                                if (matchedOption) {
                                    pageData.properties[propName] = {
                                        select: {
                                            name: matchedOption
                                        }
                                    };
                                } else {
                                    console.warn(`Could not match "${selectValue}" to any option in ${propName}:`, availableOptions);
                                }
                                break;
                                
                            case 'multi_select':
                                const multiSelectOptions = propConfig.multi_select?.options?.map(opt => opt.name) || [];
                                let values = [];
                                
                                if (Array.isArray(fieldValue)) {
                                    values = fieldValue.map(v => String(v));
                                } else {
                                    values = String(fieldValue).split(',').map(v => v.trim());
                                }
                                
                                const matchedValues = values.map(value => {
                                    return multiSelectOptions.find(opt => 
                                        opt.toLowerCase() === value.toLowerCase() ||
                                        opt.toLowerCase().includes(value.toLowerCase()) ||
                                        value.toLowerCase().includes(opt.toLowerCase())
                                    );
                                }).filter(Boolean);
                                
                                if (matchedValues.length > 0) {
                                    pageData.properties[propName] = {
                                        multi_select: matchedValues.map(name => ({ name }))
                                    };
                                }
                                break;
                                
                            case 'number':
                                const numValue = parseFloat(fieldValue);
                                if (!isNaN(numValue)) {
                                    pageData.properties[propName] = {
                                        number: numValue
                                    };
                                }
                                break;
                                
                            case 'checkbox':
                                const boolValue = String(fieldValue).toLowerCase();
                                pageData.properties[propName] = {
                                    checkbox: boolValue === 'true' || boolValue === '1' || boolValue === 'yes'
                                };
                                break;
                                
                            case 'url':
                                const urlValue = String(fieldValue);
                                if (urlValue.startsWith('http://') || urlValue.startsWith('https://') || urlValue.includes('.')) {
                                    pageData.properties[propName] = {
                                        url: urlValue
                                    };
                                }
                                break;
                                
                            case 'email':
                                const emailValue = String(fieldValue);
                                if (emailValue.includes('@')) {
                                    pageData.properties[propName] = {
                                        email: emailValue
                                    };
                                }
                                break;
                                
                            case 'phone_number':
                                pageData.properties[propName] = {
                                    phone_number: String(fieldValue)
                                };
                                break;
                                
                            case 'people':
                                // People类型需要用户ID，这里先简单处理为空
                                console.warn(`People property ${propName} requires user IDs, skipping`);
                                break;
                                
                            default:
                                console.warn(`Unsupported property type: ${propConfig.type} for ${propName}`);
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