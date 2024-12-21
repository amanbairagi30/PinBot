# PinBot 🤖
[![Discord](https://img.shields.io/badge/Discord-Community-7289DA)](https://discord.gg/)
### Demo Video : https://www.youtube.com/watch?v=4TLyhzNAz5A

A smart Discord bot designed to streamline resource sharing in any discord communities. Never let valuable pinned resources go unnoticed again!

## 🌟 Features

- **Smart Resource Detection**: Automatically responds to queries about learning materials
- **Natural Language Understanding**: Comprehends questions asked in various ways
- **Pin Integration**: Syncs with Discord channel pins for up-to-date information
- **Easy Resource Access**: Simple commands to retrieve organized learning materials
- **Moderator Tools**: Special commands for content management like `export` 

## 🚀 Quick Start

## 💡 Usage Examples
1. **Invite the bot to your server**
   ```
   [Soon add the link ove here]
   ```

2. **Basic Commands**
   ```
   /ping [input]         - Check the availabilty of the BOT
   /export               - Export the vector embeddings of Pins to vector DB (in  this case Pinecone)
   /chat-with-pin        - Chat with the pins of the particular channel (prerequisite -> /export)
   /ask                  - Talk to Gemini 1.5 flash (without any context)

   ```

## 🛠️ Technical Architecture

- Built with Discord.js
- Used RAG model for context awareness
- VectorDB for embeddings storage

## 📊 Project Structure

```
resource-bot/
├── src/
│   ├── db/
│   └── utils/
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Discord.js team for the amazing library

## 📞 Support

Join our [Discord community](https://discord.gg/) for support, feature requests, and discussions.

---
Made with ❤️ by Aman Kumar Bairagi [https://x.com/AMANBAIRAGI_30]
