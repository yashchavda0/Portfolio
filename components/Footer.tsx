export default function Footer() {
  return (
    <footer className="py-8 text-center border-t border-cream-border">
      <p className="text-sm text-stone-400">
        Designed &amp; Built by <span className="text-ember-red">Yash Chavda</span> &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
