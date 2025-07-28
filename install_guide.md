# Quick Installation Guide | 快速安装指南

## 📁 File Structure | 文件结构

Create a folder with these files | 创建一个包含以下文件的文件夹：

```
outlook-to-notion-extension/
├── manifest.json
├── popup.html
├── popup.js
├── content.js
├── background.js
├── styles.css
└── icons/ (optional | 可选)
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

**注意**: 不再需要 `_locales` 文件夹，语言配置已内置到代码中。
**Note**: No longer need `_locales` folder, language configuration is built into the code.

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