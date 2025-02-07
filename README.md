# CoinFOMO 🚀

**Track Crypto, Seize Opportunities**

Stay ahead of the market with real-time cryptocurrency tracking and analytics.

![image](https://github.com/user-attachments/assets/81c63af0-14b4-4fab-ad1a-bc14a12dd5cd)

## 🌟 Features

- **Real-time Cryptocurrency Tracking**: Monitor live prices and market movements
- **Customizable Dashboard**: Personalize your crypto monitoring experience
- **Portfolio Management**: Track your crypto holdings and performance
- **Interactive Widgets**: Utilize various tools and charts for market analysis
- **Secure Authentication**: Protected routes with NextAuth.js integration
- **Responsive Design**: Seamless experience across all devices
- **Dark Mode**: Easy on the eyes, professional interface

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React Context + Hooks
- **API Integration**: REST APIs with Next.js Route Handlers

## 📁 Project Structure

```
app/
├── (auth)/               # Authentication related pages
│   ├── login/           # Login page
│   └── register/        # Registration page
├── (root)/              # Main application pages
│   ├── app-widgets/     # Widget components
│   ├── dashboard/       # Main dashboard
│   ├── portfolio/       # Portfolio tracking
│   └── settings/        # User settings
├── api/                 # API route handlers
│   ├── auth/           # Authentication endpoints
│   └── user/           # User-related endpoints
└── ...                 # Global configurations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/coinfomo.git
cd coinfomo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update the `.env.local` file with your credentials:
```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Authentication

CoinFOMO uses NextAuth.js for secure authentication. Features include:
- Email/Password authentication
- Protected API routes
- Secure session management
- Custom login/register pages

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices

## 🎯 Core Components

- **Dashboard**: Central hub for market overview
- **Portfolio Tracker**: Monitor your investments
- **Widget System**: Customizable analysis tools
- **Settings Panel**: User preferences and configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Cryptocurrency Data APIs]()

## 📞 Contact

For any queries or support, please reach out to:
- Project Link: https://github.com/iknowaditya/CoinFOMO

---

Made with ❤️ by Hanu.
