import "./style.css";

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={`footer ${className}`}>
      <p className="footer-text">
        High resolution, low performances. Find out more:&nbsp;
        <a href="./assets/manifesto.jpg">manifesto</a>
        &nbsp;&nbsp;<a href="https://www.instagram.com/4khd__/">instagram</a>
        &nbsp;&nbsp;
        <a href="https://www.komoot.com/it-it/user/1958967536633">komoot</a>
        &nbsp;&nbsp;
        <a href="https://twitter.com/4khd__/">twitter</a>
      </p>
    </footer>
  );
}
