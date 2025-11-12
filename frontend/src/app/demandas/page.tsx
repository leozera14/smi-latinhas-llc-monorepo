import { DemandaModal, DemandasList } from "@/modules/demandas/components";

export default function DemandasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <DemandasList />
      <DemandaModal />
    </div>
  );
}
