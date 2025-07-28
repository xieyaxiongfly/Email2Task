# Quick Installation Guide | 快速安装指南

## 📁 File Structure | 文件结构

Create a folder with these files | 创建一个包含以下文件的文件夹：

```
outlook-to-notion-extension/
├── manifest.json          (required | 必需)
├── popup.html             (required | 必需)
├── popup.js               (required | 必需)
├── content.js             (required | 必需)
├── background.js          (required | 必需)
├── styles.css             (required | 必需)
├── icon16.png             (required | 必需 - 你的自定义图标)
├── icon48.png             (required | 必需 - 你的自定义图标)
└── icon128.png            (required | 必需 - 你的自定义图标)
```

## 🎨 Your Custom Icons | 你的自定义图标

### Icon Requirements | 图标要求

Put your own custom PNG icon files in the extension folder:
将你自己设计的PNG图标文件放入插件文件夹：

- **icon16.png** - 16x16 pixels (toolbar icon | 工具栏图标)
- **icon48.png** - 48x48 pixels (extension management | 扩展管理)
- **icon128.png** - 128x128 pixels (Chrome Web Store | Chrome应用商店)

### Design Tips | 设计建议

- **Format**: PNG with transparent background | **格式**：PNG透明背景
- **Style**: Simple, clear design that works at small sizes | **风格**：简洁清晰，小尺寸下可识别
- **Colors**: High contrast for visibility | **颜色**：高对比度便于识别
- **Theme**: Email to task conversion concept | **主题**：邮件转任务转换概念

## 🔧 Chrome Installation | Chrome安装

### English
1. **Prepare your icons**: Create icon16.png, icon48.png, icon128.png
2. **Put all files** in one folder (9 files total)
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" (top right toggle)
5. Click "Load unpacked"
6. Select your extension folder
7. Done! Your custom icons will appear in Chrome toolbar

### 中文
1. **准备你的图标**：创建icon16.png、icon48.png、icon128.png
2. **将所有文件**放在一个文件夹中（共9个文件）
3. 打开Chrome浏览器，访问 `chrome://extensions/`
4. 开启"开发者模式"（右上角开关）
5. 点击"加载已解压的扩展程序"
6. 选择你的插件文件夹
7. 完成！你的自定义图标将出现在Chrome工具栏中

## 🎯 First Time Setup | 首次设置

### Required APIs | 必需的API

1. **Google Gemini API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Create new API key
   - Copy the key (starts with `AIza`)

2. **Notion Integration**
   - Visit: https://www.notion.so/my-integrations
   - Create new integration
   - Copy the token (starts with `secret_`)
   - Get your database ID from the URL

### Quick Config | 快速配置

1. Open Outlook web (outlook.live.com or outlook.office.com)
2. Click your custom extension icon in Chrome toolbar
3. Fill in your API keys and database ID
4. Click the language switcher (top) to change to Chinese if needed
5. Test with any email!

## 🌍 Language Features | 语言功能

- ✅ **Built-in Bilingual Support** | **内置双语支持**: English and Chinese
- ✅ **Easy Language Switching** | **轻松切换语言**: Click the button at top of popup
- ✅ **Auto Language Detection** | **自动语言检测**: Remembers your language preference
- ✅ **Full Localization** | **完整本地化**: All UI elements, error messages, and help text

## 🔍 Troubleshooting | 故障排除

### Extension not loading | 插件无法加载
- Check all files are in the correct structure | 检查所有文件结构是否正确
- Ensure all 9 files are present | 确保所有9个文件都存在
- Verify your icon files are valid PNG format | 验证图标文件是有效的PNG格式

### Icons not showing | 图标不显示
- Check file names exactly match: icon16.png, icon48.png, icon128.png | 检查文件名完全匹配
- Ensure PNG files are not corrupted | 确保PNG文件没有损坏
- Try reloading the extension after adding icons | 添加图标后重新加载插件

### API errors | API错误
- Verify your API keys are correct | 验证API密钥正确
- Check network connectivity | 检查网络连接
- Ensure Notion database is connected to your integration | 确保Notion数据库已连接到集成

## 🎉 You're Ready! | 准备就绪！

The extension will use your custom designed icons and work seamlessly with Outlook emails and Notion databases with full bilingual support.

插件将使用你自定义设计的图标，与Outlook邮件和Notion数据库无缝协作，并提供完整的双语支持。

## ✨ Features | 功能特点

- ✅ **Your Custom Professional Icons** | **你的自定义专业图标**
- ✅ **Instant Language Switching** | **即时语言切换**
- ✅ **Persistent Language Settings** | **持久化语言设置**
- ✅ **Complete Outlook Integration** | **完整Outlook集成**
- ✅ **Smart Notion Mapping** | **智能Notion映射**

## 🔧 Chrome Installation | Chrome安装

### English
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked"
4. Select your extension folder
5. Done! The extension should appear in your toolbar

### 中文
1. 打开Chrome浏览器，访问 `chrome://extensions/`
2. 开启"开发者模式"（右上角开关）
3. 点击"加载已解压的扩展程序"
4. 选择你的插件文件夹
5. 完成！插件应该会出现在工具栏中

## 🎯 First Time Setup | 首次设置

### Required APIs | 必需的API

1. **Google Gemini API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Create new API key
   - Copy the key (starts with `AIza`)

2. **Notion Integration**
   - Visit: https://www.notion.so/my-integrations
   - Create new integration
   - Copy the token (starts with `secret_`)
   - Get your database ID from the URL

### Quick Config | 快速配置

1. Open Outlook web (outlook.live.com or outlook.office.com)
2. Click the extension icon in Chrome toolbar
3. Fill in your API keys and database ID
4. Click the language switcher (top right) to change to Chinese if needed
5. Test with any email!

## 🌍 Language Features | 语言功能

- **Built-in Bilingual Support** | **内置双语支持**: English and Chinese
- **Easy Language Switching** | **轻松切换语言**: Click the button in top right of popup
- **Auto Language Detection** | **自动语言检测**: Remembers your language preference
- **Full Localization** | **完整本地化**: All UI elements, error messages, and help text

## 🔍 Troubleshooting | 故障排除

### Extension not loading | 插件无法加载
- Check all files are in the correct structure | 检查所有文件结构是否正确
- Ensure manifest.json is valid | 确保manifest.json格式正确
- Try reloading the extension | 尝试重新加载插件

### Language switching not working | 语言切换功能异常
- The language is now built-in, no external files needed | 语言现已内置，无需外部文件
- Settings are saved automatically | 设置会自动保存
- Refresh the popup if needed | 如需要可刷新弹窗

### API errors | API错误
- Verify your API keys are correct | 验证API密钥正确
- Check network connectivity | 检查网络连接
- Ensure Notion database is connected to your integration | 确保Notion数据库已连接到集成

## 🎉 You're Ready! | 准备就绪！

The extension should now work seamlessly with Outlook emails and Notion databases with full bilingual support.

插件现在应该可以与Outlook邮件和Notion数据库无缝协作，并提供完整的双语支持。

## ✨ New Features | 新功能

- ✅ **No External Language Files Required** | **无需外部语言文件**
- ✅ **Instant Language Switching** | **即时语言切换**
- ✅ **Persistent Language Settings** | **持久化语言设置**
- ✅ **Simplified Installation** | **简化安装过程**