import { Star } from "lucide-react";
import { PageHero } from "@/components/PageHero";

const reviews = Array.from({ length: 12 }).map((_, i) => ({
  name: ["Arjun S.", "Neha R.", "Rohit M.", "Kavya P.", "Vikram T.", "Priya K.", "Sahil D.", "Meera J.", "Aditya R.", "Tara N.", "Yash B.", "Ishita V."][i],
  product: ["Super Whey", "Lean Shot", "Plasma Mass", "BCAA Recover", "Pure Creatine", "Daily Multi"][i % 6],
  rating: [5, 5, 4, 5, 5, 4, 5, 5, 5, 4, 5, 5][i],
  text: [
    "Best whey I've used in years. Mixes effortlessly and tastes incredible.",
    "Lean Shot gave me clean energy without any crash. Highly recommend.",
    "Plasma Mass put on real, clean weight without bloating.",
    "BCAAs taste amazing and noticeably reduced my soreness.",
    "Strength is up across all my lifts since starting Pure Creatine.",
    "The transparency on the labels is what won me over.",
    "Daily Multi keeps my immunity strong through tough cycles.",
    "Customer support was great. Fast shipping, sealed product.",
    "Quality you can taste and feel. Switched and never looked back.",
    "Lab tested and dosed correctly. Exactly what athletes need.",
    "I love that there are no hidden blends. Just real ingredients.",
    "Recovery has improved noticeably. Worth every rupee.",
  ][i],
  img: `https://i.pravatar.cc/80?img=${i + 5}`,
}));

const Reviews = () => (
  <>
    <PageHero eyebrow="Reviews" title="What our athletes say" subtitle="Genuine reviews from verified Ergogenic customers." />
    <section className="py-16">
      <div className="container">
        <div className="flex items-center gap-6 mb-12 flex-wrap">
          <div className="text-center p-6 bg-card border border-white/10 rounded-xl">
            <p className="text-5xl font-bold text-gradient-red">4.9</p>
            <div className="flex justify-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
            </div>
            <p className="text-xs text-white/60 mt-1">Based on 8,400+ reviews</p>
          </div>
          <div className="flex-1 min-w-[200px] space-y-1">
            {[5, 4, 3, 2, 1].map((s, i) => (
              <div key={s} className="flex items-center gap-3 text-sm">
                <span className="w-4">{s}</span>
                <div className="flex-1 h-2 bg-white/10 rounded">
                  <div className="h-full bg-primary rounded" style={{ width: `${[88, 9, 2, 0.5, 0.5][i]}%` }} />
                </div>
                <span className="w-10 text-white/60 text-right">{[88, 9, 2, 0.5, 0.5][i]}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="bg-card border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <img src={r.img} alt="" className="h-10 w-10 rounded-full" />
                <div>
                  <p className="font-semibold text-sm">{r.name}</p>
                  <p className="text-xs text-primary">{r.product}</p>
                </div>
              </div>
              <div className="flex mt-3">
                {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />)}
              </div>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Reviews;