import { useState } from "react";

const faqs = [
  {
    q: "Is the system secure?",
    a: "Yes, we use advanced encryption standards.",
  },
  {
    q: "Can I manage multiple doctors?",
    a: "Yes, multi-user management is supported.",
  },
  { q: "Is it mobile friendly?", a: "Absolutely, fully responsive design." },
];

export default function FAQ() {
  const [active, setActive] = useState(null);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-slate-800">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border rounded-xl p-4">
              <button
                className="w-full text-left font-semibold"
                onClick={() => setActive(active === i ? null : i)}
              >
                {faq.q}
              </button>
              {active === i && <p className="mt-2 text-slate-600">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
