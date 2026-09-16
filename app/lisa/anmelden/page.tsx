import type { Metadata } from "next";
import { Anmeldeformular } from "@/components/concierge/Anmeldeformular";

export const metadata: Metadata = { title: "Anmelden" };

export default function AnmeldenSeite() {
  return (
    <div className="lisa-buehne">
      <h1 style={{ fontSize: "clamp(24px, 4vw, 30px)", textAlign: "center" }}>
        Bei Hi Lisa anmelden
      </h1>
      <Anmeldeformular />
    </div>
  );
}
