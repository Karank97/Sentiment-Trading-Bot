import SubmitDealForm from '@/components/SubmitDealForm';

export default function SubmitPage() {
  return (
    <section>
      <h1 className="mb-2 text-2xl font-bold">Submit a Deal</h1>
      <p className="mb-4 text-sm text-nashbud-muted">
        Dispensaries and users can submit verified source links for review.
      </p>
      <SubmitDealForm />
    </section>
  );
}
