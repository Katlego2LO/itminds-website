import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page py-24">
      <p className="eyebrow mb-3">404</p>
      <h1 className="text-4xl">We could not find that page</h1>
      <p className="mt-4 max-w-md text-ink-muted">
        It may have moved. Try the navigation or return to the home page.
      </p>
      <ButtonLink href="/" className="mt-8">
        Back to home
      </ButtonLink>
    </div>
  );
}
