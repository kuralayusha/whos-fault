# Who's Fault? 🎯

A fun blame game! A web application that helps you resolve disputes with your friends in a humorous way.

## 🎮 Features

- **Wheel of Fate (50/50)**: Random selection based on classic coin flip logic
- **Number's Verdict**: Determine the guilty one through a number guessing game
- **AI Judge**: GPT-4 powered ruthless psychological analysis
- **Multi-language Support**: 🇺🇸 English and 🇹🇷 Turkish
- **Responsive Design**: Works seamlessly on all devices
- **Fun Interface**: UI with animations and emoji support

## 🛠️ Technologies

- [Next.js 14](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Supabase](https://supabase.com/) - Backend & Database
- [OpenAI GPT-4](https://openai.com/) - AI Integration

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/whos-fault.git
cd whos-fault
```

2. Install dependencies:

```bash
npm install
or
yarn install
```

3. Create `.env.local` file:

```env
Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

4. Create Supabase database tables:

- Run `migrations/001_create_blame_tables.sql` in your Supabase SQL editor

5. Start the development server:

```bash
npm run dev
or
yarn dev
```

6. Open in your browser: [http://localhost:3000](http://localhost:3000)

## 📝 Notes

- Make sure your OpenAI API key has sufficient credits
- Ensure Supabase tables are configured correctly
- AI judge uses GPT-4, you can downgrade to GPT-3.5 in `app/lib/actions.ts` if needed

## 🤝 Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI team for their amazing APIs
- Supabase team for excellent backend solutions
- Next.js team for the awesome framework
- And of course, all contributors!

---

⚠️ **Note**: This application is for entertainment purposes only. We recommend seeking professional help for resolving real disputes.
