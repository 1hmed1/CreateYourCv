export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-foreground/60">
              &copy; {new Date().getFullYear()} QuickCv.pk. All rights reserved.
            </p>
            <p className="text-xs text-foreground/50">
              Made by Muhammad Ahmed
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground/80">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground/80">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
