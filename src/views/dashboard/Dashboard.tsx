import { useEffect, useState } from 'react';
import { FARMER_DASHBOARD_DEMO } from '../../constants/farmerDashboardDemo';

interface Transaction {
  id: string;
  seller: string;
  dairyOwner?: string;
  quantity: number;
  milkType: string;
  date: string;
}

interface UserContextLike {
  role: 'dairyOwner' | 'milkSeller';
  id: string;
}

/** Demo: farmer / supplier view (matches farmer web & app marketing copy). Toggle to dairyOwner to preview co-op table. */
const currentUser: UserContextLike = { role: 'milkSeller', id: 'farmer-demo-1' };

const DEMO_DATE = FARMER_DASHBOARD_DEMO.dateIso;

export default function Dashboard() {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((r) => setTimeout(r, 400));

        if (currentUser.role === 'dairyOwner') {
          setData([
            { id: 't1', seller: 'Ravi', quantity: 22, milkType: 'Cow', date: DEMO_DATE },
            { id: 't2', seller: 'Sita', quantity: 18, milkType: 'Buffalo', date: DEMO_DATE },
          ]);
        } else {
          setData([
            {
              id: 't3',
              seller: 'You',
              dairyOwner: FARMER_DASHBOARD_DEMO.dairyName,
              quantity: FARMER_DASHBOARD_DEMO.quantityLiters,
              milkType: FARMER_DASHBOARD_DEMO.milkType,
              date: DEMO_DATE,
            },
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const ownerView = currentUser.role === 'dairyOwner';
  const heading = ownerView ? 'Dashboard' : 'Farmer dashboard';
  const subheading = ownerView
    ? 'Demo dairy view — sample collections from two suppliers.'
    : 'Demo supplier view — same sample row as the Farmer web preview (quantity, milk type, linked dairy).';

  return (
    <div className="min-h-full bg-dk-cream pb-20 pt-[72px] md:pt-[76px]">
      <div className="dk-page-inner">
        <div className="relative mb-8 md:mb-10">
          <div
            className="pointer-events-none absolute -left-4 -top-6 h-32 w-32 rounded-full opacity-50 blur-2xl"
            style={{ background: 'radial-gradient(circle, rgba(67,196,126,.35), transparent 70%)' }}
            aria-hidden
          />
          <div className="relative">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-dk-green-900 sm:text-4xl md:text-[2.35rem]">
              {heading}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-dk-ink-2 md:text-base">{subheading}</p>
          </div>
        </div>

        {loading ? (
          <div className="overflow-hidden rounded-[22px] border border-dk-line/90 bg-white shadow-[0_20px_50px_rgba(15,58,46,0.08)] ring-1 ring-black/5">
            <div className="border-b border-dk-line/80 bg-gradient-to-r from-dk-green-50 to-dk-cream-2 px-6 py-4">
              <div className="h-4 w-40 animate-pulse rounded-md bg-dk-green-100" />
            </div>
            <div className="space-y-4 p-8">
              <div className="h-3 w-full max-w-xl animate-pulse rounded bg-dk-cream-2" />
              <div className="h-3 w-full max-w-lg animate-pulse rounded bg-dk-cream-2" />
              <div className="h-3 w-full max-w-md animate-pulse rounded bg-dk-cream-2" />
              <p className="pt-4 text-center text-sm font-medium text-dk-muted">Loading...</p>
            </div>
          </div>
        ) : null}

        {!loading && ownerView ? (
          <section aria-labelledby="dash-owner-heading">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <h2 id="dash-owner-heading" className="font-serif text-xl font-semibold text-dk-green-900 sm:text-2xl">
                All Transactions
              </h2>
            </div>
            <TransactionTable data={data} ownerView />
          </section>
        ) : null}

        {!loading && !ownerView ? (
          <section aria-labelledby="dash-seller-heading">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <h2 id="dash-seller-heading" className="font-serif text-xl font-semibold text-dk-green-900 sm:text-2xl">
                Your Transactions
              </h2>
            </div>
            <TransactionTable data={data} />
          </section>
        ) : null}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | number | undefined }) {
  if (value === undefined || value === '') return null;
  return (
    <div className="flex justify-between gap-4 border-b border-dk-line/60 py-2 last:border-0 last:pb-0 first:pt-0">
      <span className="text-xs font-semibold uppercase tracking-wide text-dk-muted">{label}</span>
      <span className="text-right text-sm font-medium text-dk-ink">{value}</span>
    </div>
  );
}

function TransactionTable({ data, ownerView }: { data: Transaction[]; ownerView?: boolean }) {
  if (!data.length) {
    return (
      <div className="rounded-[22px] border border-dashed border-dk-line bg-white/80 px-6 py-16 text-center shadow-sm">
        <p className="text-base font-medium text-dk-ink-2">No transactions yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {data.map((transaction) => (
          <div
            key={transaction.id}
            className="rounded-[20px] border border-dk-line/90 bg-white p-4 shadow-[0_12px_32px_rgba(15,58,46,0.06)] ring-1 ring-black/5"
          >
            <div className="mb-3 flex items-start justify-between gap-2 border-b border-dk-line/70 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-dk-muted">Quantity (L)</span>
              <span className="font-serif text-2xl font-semibold tabular-nums text-dk-green-900">{transaction.quantity}</span>
            </div>
            <Field label="Date" value={transaction.date} />
            <Field label="Seller" value={transaction.seller} />
            {!ownerView ? <Field label="Dairy Owner" value={transaction.dairyOwner} /> : null}
            <Field label="Milk Type" value={transaction.milkType} />
          </div>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-[22px] border border-dk-line/90 bg-white shadow-[0_20px_50px_rgba(15,58,46,0.08)] ring-1 ring-black/5 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="border-b border-dk-green-800/20 bg-gradient-to-r from-dk-green-900 to-dk-green-800 text-white">
                <th className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] sm:px-5">
                  Date
                </th>
                <th className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] sm:px-5">
                  Seller
                </th>
                {!ownerView ? (
                  <th className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] sm:px-5">
                    Dairy Owner
                  </th>
                ) : null}
                <th className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] sm:px-5">
                  Milk Type
                </th>
                <th className="whitespace-nowrap px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-[0.08em] sm:px-5">
                  Quantity (L)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dk-line/80">
              {data.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={`transition-colors hover:bg-dk-green-50/60 ${
                    index % 2 === 1 ? 'bg-dk-cream-2/35' : 'bg-white'
                  }`}
                >
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm font-medium text-dk-ink sm:px-5">{transaction.date}</td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm text-dk-ink sm:px-5">{transaction.seller}</td>
                  {!ownerView ? (
                    <td className="whitespace-nowrap px-4 py-3.5 text-sm text-dk-ink sm:px-5">{transaction.dairyOwner}</td>
                  ) : null}
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm text-dk-ink-2 sm:px-5">{transaction.milkType}</td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-right font-serif text-base font-semibold tabular-nums text-dk-green-900 sm:px-5">
                    {transaction.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
