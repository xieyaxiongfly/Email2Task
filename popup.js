document.addEventListener('DOMContentLoaded', function() {
    const geminiApiKeyInput = document.getElementById('geminiApiKey');
    const geminiModelSelect = document.getElementById('geminiModel');
    const notionTokenInput = document.getElementById('notionToken');
    const notionDatabaseIdInput = document.getElementById('notionDatabaseId');
    const taskPromptInput = document.getElementById('taskPrompt');
    const generateButton = document.getElementById('generateTask');
    const statusDiv = document.getElementById('status');

    // 加载保存的配置
    loadConfig();

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

    // 加载配置
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
            if (result.taskPrompt) taskPromptInput.value = result.taskPrompt;
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
            showStatus('请填写所有必需的配置信息', 'error');
            return;
        }

        generateButton.disabled = true;
        generateButton.textContent = '处理中...';

        try {
            // 获取活动标签页
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            // 检查是否在Outlook页面
            if (!tab.url.includes('outlook')) {
                showStatus('请在Outlook邮件页面使用此功能', 'error');
                return;
            }

            // 向content script发送消息获取邮件内容
            const response = await chrome.tabs.sendMessage(tab.id, { action: 'getEmailContent' });
            
            if (!response.success) {
                showStatus('无法获取邮件内容：' + response.error, 'error');
                return;
            }

            // 使用Gemini生成任务
            const taskData = await generateTaskWithGemini(response.emailContent);
            
            // 添加到Notion
            await addTaskToNotion(taskData);
            
            showStatus('任务已成功添加到Notion！', 'success');

        } catch (error) {
            console.error('Error:', error);
            showStatus('处理过程中出现错误：' + error.message, 'error');
        } finally {
            generateButton.disabled = false;
            generateButton.textContent = '🚀 生成并添加任务到Notion';
        }
    });

    // 使用Gemini生成任务
    async function generateTaskWithGemini(emailContent) {
        const prompt = `${taskPromptInput.value}\n\n${emailContent}\n\n请以JSON格式回复，包含以下字段：\n{\n  "title": "任务标题",\n  "description": "详细描述",\n  "dueDate": "YYYY-MM-DD格式的截止日期（如果有）",\n  "priority": "High/Medium/Low"\n}`;

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
                
                let errorMessage = `Gemini API调用失败 (${response.status})`;
                if (response.status === 400) {
                    errorMessage += ' - API密钥无效或请求格式错误';
                } else if (response.status === 403) {
                    errorMessage += ' - API密钥权限不足或配额已用完';
                } else if (response.status === 429) {
                    errorMessage += ' - 请求过于频繁，请稍后重试';
                } else if (response.status >= 500) {
                    errorMessage += ' - 服务器错误，请稍后重试';
                }
                
                if (errorData.error && errorData.error.message) {
                    errorMessage += `\n详细信息: ${errorData.error.message}`;
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('Gemini API Response:', data);
            
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error('Gemini API返回的数据格式异常');
            }
            
            const generatedText = data.candidates[0].content.parts[0].text;
            console.log('Generated text:', generatedText);
            
            // 提取JSON内容
            const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error(`无法解析Gemini生成的任务内容。原始回复: ${generatedText}`);
            }

            try {
                return JSON.parse(jsonMatch[0]);
            } catch (parseError) {
                throw new Error(`JSON解析失败: ${parseError.message}\n原始内容: ${jsonMatch[0]}`);
            }
            
        } catch (networkError) {
            if (networkError.name === 'TypeError' && networkError.message.includes('fetch')) {
                throw new Error('网络连接失败，请检查网络连接或尝试使用VPN');
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
                                name: "邮件任务"
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
            throw new Error(`Notion API错误: ${errorData.message}`);
        }

        return await response.json();
    }
});
