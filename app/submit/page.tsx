import SubmitDealForm from '@/components/SubmitDealForm';

export default function SubmitPage() {
  return (
    <section>
      <h1 className="mb-2 text-2xl font-bold">Submit a Deal</h1>
      <p className="mb-4 text-sm text-nashbud-muted">
        Submissions are sent to the review API and queued for admin approval before any public
        listing.
      </p>
      <SubmitDealForm />
    </section>
  );
}
