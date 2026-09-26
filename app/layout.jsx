import './globals.css';

export const metadata = {
  title: 'Vadapalli Rehan Sha — CSE Undergraduate & Builder',
  description:
    'Portfolio of Vadapalli Rehan Sha — CSE student at SRM University-AP building full-stack products, AI/ML apps, and RAG systems.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
