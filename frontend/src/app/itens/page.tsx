import { ItemModal, ItensList } from "@/modules/itens/components";

export default function ItensPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ItensList />
      <ItemModal />
    </div>
  );
}
