# Outlook to Notion Task Generator Chrome Extension

[English](#english) | [中文](#中文)

---

## English

A Chrome browser extension that automatically extracts content from Outlook emails, uses Google Gemini AI to generate task descriptions, and adds them to your Notion database.

### 🌟 Features

- 📧 **Automatic Email Content Extraction**: Intelligently identifies and extracts Outlook email subjects, senders, dates, and body content
- 🤖 **AI-Powered Task Generation**: Uses Google Gemini API to analyze email content and generate structured tasks
- 📝 **Seamless Notion Integration**: Directly adds generated tasks to your specified Notion database
- 🎯 **Custom Prompts**: Customize AI task generation prompts to meet personal needs
- 🌍 **Bilingual Support**: Full English and Chinese interface with easy language switching
- 🎨 **User-Friendly Interface**: Clean and intuitive popup interface, easy to configure and use
- 🔧 **Intelligent Property Mapping**: Automatically detects your Notion database structure and maps properties

### 📋 Prerequisites

Before getting started, you need to obtain the following API keys:

#### Google Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in to your Google account
3. Click "Create API Key" to create a new API key
4. Copy the generated API key (format: AIza...)

#### Notion Integration Token and Database ID
1. Visit [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "+ New integration" to create a new integration
3. Fill in basic information and submit
4. Copy the generated "Internal Integration Token" (format: secret_...)
5. Create a database in Notion with **at least** the following properties:
   - **Name** (Title) - Required
   
   **Optional properties** (extension will auto-detect and use):
   - **Description/Content/Details** (Text) - Task description
   - **Due Date/Deadline** (Date) - Due date
   - **Priority/Level/Importance** (Select: High/Medium/Low) - Priority
   - **Status/State** (Select) - Task status
   - **Tags/Category** (Multi-select) - Tags
   
6. In the database page, click "..." in the top right, select "Add connections", add your created integration
7. Copy the database ID from the database URL (32-character string)

### 🚀 Installation

1. Download all extension files to a folder
2. Open Chrome browser
3. Enter `chrome://extensions/` in the address bar
4. Enable "Developer mode" in the top right
5. Click "Load unpacked"
6. Select the folder containing the extension files
7. Extension installed!

### ⚙️ Configuration

1. Open Outlook web version (outlook.live.com or outlook.office.com)
2. Click the extension icon in Chrome toolbar
3. In the configuration popup, fill in:
   - **Google Gemini API Key**
   - **Gemini Model** (choose from Flash/Pro/1.0)
   - **Notion Integration Token**
   - **Notion Database ID**
   - **Task Generation Prompt** (use default or customize)

Configuration is automatically saved.

### 🎯 Usage

#### Method 1: Using Popup Interface
1. Open the email you want to process in Outlook
2. Click the extension icon in browser toolbar
3. Click "🚀 Generate and Add Task to Notion" button
4. Wait for processing to complete, task will be automatically added to Notion

#### Method 2: Using Floating Button
1. On Outlook email page, you'll see a blue floating button (📝) in the top right
2. Click the floating button to open extension popup
3. Click generate button

### 🔧 Intelligent Property Mapping

The extension **automatically detects** your database structure and intelligently maps properties. Supports both English and Chinese property names:

| Function | Supported Property Names | Type | Notes |
|----------|-------------------------|------|-------|
| Task Title | `Name` | Title | **Required** |
| Task Description | `Description`, `Content`, `Details` | Text/Rich Text | Optional |
| Due Date | `Due Date`, `Deadline`, `Date` | Date | Optional |
| Priority | `Priority`, `Level`, `Importance` | Select | Optional |
| Status | `Status`, `State` | Select | Optional |
| Tags | `Tags`, `Category` | Multi-select | Optional |

**Important**: Your database only needs a `Name` property to work, all other properties are optional!

### 🌍 Language Support

- **Default Language**: English
- **Supported Languages**: English, Chinese
- **Easy Switching**: Click the language button in the top right of the popup
- **Full Localization**: All UI elements, error messages, and documentation are bilingual

### 🔍 Troubleshooting

**Q: Extension shows "Cannot get email content"**
A: Please ensure:
- You're on Outlook email detail page (not email list page)
- Email has fully loaded
- Try refreshing the page

**Q: Gemini API call failed**
A: Please check:
- API key is correct
- Sufficient API quota available
- Network connection is stable

**Q: Cannot add to Notion**
A: Please confirm:
- Notion Integration Token is valid
- Database ID is correct
- Database is connected to your Integration
- Database property names match

### 📊 Supported Outlook Versions

- Outlook Web App (outlook.live.com)
- Outlook for Business (outlook.office.com)
- Both new and classic interfaces supported

---

## 中文

一个Chrome浏览器插件，可以自动从Outlook邮件中提取内容，使用Google Gemini AI生成任务描述，并将其添加到你的Notion数据库中。

### 🌟 功能特性

- 📧 **自动邮件内容提取**：智能识别并提取Outlook邮件的主题、发件人、日期和正文内容
- 🤖 **AI驱动的任务生成**：使用Google Gemini API分析邮件内容并生成结构化的任务
- 📝 **无缝Notion集成**：直接将生成的任务添加到你指定的Notion数据库
- 🎯 **自定义提示词**：可以自定义AI生成任务的提示词以满足个人需求
- 🌍 **双语支持**：完整的中英文界面，支持一键切换语言
- 🎨 **友好的用户界面**：简洁直观的弹窗界面，易于配置和使用
- 🔧 **智能属性映射**：自动检测你的Notion数据库结构并映射属性

### 📋 准备工作

在开始之前，你需要获取以下API密钥：

#### Google Gemini API密钥
1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 登录你的Google账号
3. 点击"Create API Key"创建新的API密钥
4. 复制生成的API密钥（格式：AIza...）

#### Notion集成令牌和数据库ID
1. 访问 [Notion Integrations](https://www.notion.so/my-integrations)
2. 点击"+ New integration"创建新的集成
3. 填写基本信息并提交
4. 复制生成的"Internal Integration Token"（格式：secret_...）
5. 在Notion中创建一个数据库，**至少包含**以下属性：
   - **Name** (标题) - 必需
   
   **可选属性**（插件会自动检测并使用）：
   - **Description/描述/Content/内容** (文本) - 任务描述
   - **Due Date/截止日期/Deadline** (日期) - 截止日期
   - **Priority/优先级/Level** (选择：High/Medium/Low 或 高/中/低) - 优先级
   - **Status/状态** (选择) - 任务状态
   - **Tags/标签** (多选) - 标签分类
   
6. 在数据库页面点击右上角的"..."，选择"Add connections"，添加你刚创建的integration
7. 复制数据库URL中的数据库ID（32位字符串）

### 🚀 安装步骤

1. 下载所有插件文件到一个文件夹中
2. 打开Chrome浏览器
3. 地址栏输入 `chrome://extensions/`
4. 开启右上角的"开发者模式"
5. 点击"加载已解压的扩展程序"
6. 选择包含插件文件的文件夹
7. 插件安装完成！

### ⚙️ 配置插件

1. 打开Outlook网页版（outlook.live.com 或 outlook.office.com）
2. 点击Chrome工具栏中的插件图标
3. 在弹出的配置窗口中填入：
   - **Google Gemini API密钥**
   - **Gemini模型**（从Flash/Pro/1.0中选择）
   - **Notion集成令牌**
   - **Notion数据库ID**
   - **任务生成提示词**（可使用默认值或自定义）

配置会自动保存，无需手动保存。

### 🎯 使用方法

#### 方法一：使用弹窗界面
1. 在Outlook中打开要处理的邮件
2. 点击浏览器工具栏中的插件图标
3. 点击"🚀 生成并添加任务到Notion"按钮
4. 等待处理完成，任务将自动添加到Notion

#### 方法二：使用浮动按钮
1. 在Outlook邮件页面，你会看到右上角有一个蓝色的浮动按钮（📝）
2. 点击浮动按钮打开插件弹窗
3. 点击生成按钮即可

### 🔧 智能属性映射

插件会**自动检测**你的数据库结构并智能映射属性。支持中英文属性名：

| 功能 | 支持的属性名 | 类型 | 说明 |
|------|-------------|------|------|
| 任务标题 | `Name` | 标题 | **必需** |
| 任务描述 | `Description`, `描述`, `Content`, `内容`, `Details` | 文本/富文本 | 可选 |
| 截止日期 | `Due Date`, `截止日期`, `Deadline`, `Date` | 日期 | 可选 |
| 优先级 | `Priority`, `优先级`, `Level`, `Importance` | 选择 | 可选 |
| 状态 | `Status`, `状态`, `State` | 选择 | 可选 |
| 标签 | `Tags`, `标签`, `Category`, `分类` | 多选 | 可选 |

**重要**：你