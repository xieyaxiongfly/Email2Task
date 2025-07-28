# Outlook to Notion Task Generator Chrome插件

这是一个Chrome浏览器插件，可以自动从Outlook邮件中提取内容，使用Google Gemini AI生成任务描述，并将其添加到你的Notion数据库中。

## 功能特性

- 📧 **自动邮件内容提取**：智能识别并提取Outlook邮件的主题、发件人、日期和正文内容
- 🤖 **AI驱动的任务生成**：使用Google Gemini API分析邮件内容并生成结构化的任务
- 📝 **无缝Notion集成**：直接将生成的任务添加到你指定的Notion数据库
- 🎯 **自定义提示词**：可以自定义AI生成任务的提示词以满足个人需求
- 🎨 **友好的用户界面**：简洁直观的弹窗界面，易于配置和使用

## 安装步骤

### 1. 准备工作

在开始之前，你需要获取以下API密钥：

#### Google Gemini API Key
1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 登录你的Google账号
3. 点击"Create API Key"创建新的API密钥
4. 复制生成的API密钥（格式：AIza...）

#### Notion Integration Token 和 Database ID
1. 访问 [Notion Integrations](https://www.notion.so/my-integrations)
2. 点击"+ New integration"创建新的集成
3. 填写基本信息并提交
4. 复制生成的"Internal Integration Token"（格式：secret_...）
5. 在Notion中创建一个数据库，**至少包含**以下属性：
   - **Name** (Title) - 必需
   
   **可选属性**（插件会自动检测并使用）：
   - **Description/描述/Content/内容** (Text) - 任务描述
   - **Due Date/截止日期/Deadline** (Date) - 截止日期
   - **Priority/优先级/Level** (Select: High/Medium/Low 或 高/中/低) - 优先级
   - **Status/状态** (Select) - 任务状态
   - **Tags/标签** (Multi-select) - 标签分类
   
6. 在数据库页面点击右上角的"..."，选择"Add connections"，添加你刚创建的integration
7. 复制数据库URL中的数据库ID（32位字符串）

### 2. 插件安装

1. 下载所有插件文件到一个文件夹中
2. 打开Chrome浏览器
3. 地址栏输入 `chrome://extensions/`
4. 开启右上角的"开发者模式"
5. 点击"加载已解压的扩展程序"
6. 选择包含插件文件的文件夹
7. 插件安装完成！

### 3. 配置插件

1. 打开Outlook网页版（outlook.live.com 或 outlook.office.com）
2. 点击Chrome工具栏中的插件图标
3. 在弹出的配置窗口中填入：
   - **Google Gemini API Key**
   - **Notion Integration Token**
   - **Notion Database ID**
   - **任务生成提示词**（可使用默认值或自定义）

配置会自动保存，无需手动保存。

## 使用方法

### 方法一：使用弹窗界面
1. 在Outlook中打开要处理的邮件
2. 点击浏览器工具栏中的插件图标
3. 点击"🚀 生成并添加任务到Notion"按钮
4. 等待处理完成，任务将自动添加到Notion

### 方法二：使用浮动按钮
1. 在Outlook邮件页面，你会看到右上角有一个蓝色的浮动按钮（📝）
2. 点击浮动按钮打开插件弹窗
3. 点击生成按钮即可

## 自定义配置

### 自定义任务生成提示词

默认提示词：
```
根据以下邮件内容，生成一个简洁的任务描述和截止日期建议。邮件内容：
```

你可以根据需要修改为：
```
请分析以下邮件并生成任务：
1. 提取关键行动项
2. 设置合理的截止日期
3. 评估任务优先级
邮件内容：
```

### Notion数据库属性映射

插件会**自动检测**你的数据库结构并智能映射属性。支持中英文属性名：

| 功能 | 支持的属性名 | 类型 | 说明 |
|------|-------------|------|------|
| 任务标题 | `Name` | Title | **必需** |
| 任务描述 | `Description`, `描述`, `Content`, `内容`, `Details` | Text/Rich Text | 可选 |
| 截止日期 | `Due Date`, `截止日期`, `Deadline`, `Date` | Date | 可选 |
| 优先级 | `Priority`, `优先级`, `Level`, `Importance` | Select | 可选 |
| 状态 | `Status`, `状态`, `State` | Select | 可选 |
| 标签 | `Tags`, `标签`, `Category`, `分类` | Multi-select | 可选 |

**重要**：你的数据库只需要有 `Name` 属性即可使用，其他属性都是可选的！

## 故障排除

### 常见问题

**Q: 插件提示"无法获取邮件内容"**
A: 请确保：
- 你在Outlook的邮件详情页面（不是邮件列表页面）
- 邮件已完全加载
- 刷新页面后重试

**Q: Gemini API调用失败**
A: 请检查：
- API密钥是否正确
- 是否有足够的API配额
- 网络连接是否正常

**Q: 无法添加到Notion**
A: 请确认：
- Notion Integration Token是否有效
- Database ID是否正确
- 数据库是否已连接到你的Integration
- 数据库属性名称是否匹配

**Q: 浮动按钮不显示**
A: 尝试：
- 刷新Outlook页面
- 重新加载插件
- 检查是否在支持的Outlook域名上

### 支持的Outlook版本

- Outlook Web App (outlook.live.com)
- Outlook for Business (outlook.office.com)
- 新版和经典版界面都支持

## 隐私说明

- 插件仅在你主动触发时读取邮件内容
- 邮件内容仅用于生成任务，不会被存储
- API密钥保存在Chrome的本地存储中
- 不会收集或传输任何个人数据

## 技术架构

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Outlook Web   │    │  Chrome Extension │    │   Notion API    │
│                 │    │                  │    │                 │
│  ┌───────────┐  │    │  ┌─────────────┐ │    │  ┌───────────┐  │
│  │   Email   │──┼────┼─→│Content Script│ │    │  │ Database  │  │
│  │  Content  │  │    │  └─────────────┘ │    │  │           │  │
│  └───────────┘  │    │         │        │    │  └───────────┘  │
└─────────────────┘    │         ▼        │    └─────────────────┘
                       │  ┌─────────────┐ │             ▲
┌─────────────────┐    │  │   Popup     │ │             │
│  Google Gemini  │    │  │     UI      │ │             │
│      API        │    │  └─────────────┘ │             │
│                 │    │         │        │             │
│  ┌───────────┐  │    │         ▼        │             │
│  │    AI     │◄─┼────┼─ ┌─────────────┐ │             │
│  │ Analysis  │  │    │  │ Background  │─┼─────────────┘
│  └───────────┘  │    │  │   Script    │ │
└─────────────────┘    │  └─────────────┘ │
                       └──────────────────┘
```

## 许可证

本项目为开源项目，可自由使用和修改。

## 贡献

欢迎提交Issue和Pull Request来改善这个插件！

---

如需帮助，请查看故障排除部分或创建Issue。
