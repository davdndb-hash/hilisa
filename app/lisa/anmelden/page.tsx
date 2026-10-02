import type { Metadata } from "next";
import { Anmeldeformular } from "@/components/concierge/Anmeldeformular";

export const metadata: Metadata = { title: "Anmelden" };

export default function AnmeldenSeite() {
  return (
    <div className="lisa-buehne">
      <Anmeldeformular />
    </div>
  );
}
