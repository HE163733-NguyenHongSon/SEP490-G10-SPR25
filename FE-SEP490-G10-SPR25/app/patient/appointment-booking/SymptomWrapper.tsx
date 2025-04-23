"use client";

import Providers from "../providers";
import SymptomPopup from "./SymptomPopup";

export default function SymptomWrapper() {
  return (
    <Providers>
      <SymptomPopup />
    </Providers>
  );
}
