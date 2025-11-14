"use client";

import Link from "next/link";
import { Button } from "./_components/ui";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto text-center flex flex-col gap-y-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-gray-900 ">
          Sistema de Planejamento de Demandas
        </h1>
        <p className="text-lg text-gray-600 ">
          Gerencie a produção de latinhas com eficiência e controle total sobre
          suas demandas e itens.
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        <Link href="/demandas">
          <Button size="lg">Ver Demandas</Button>
        </Link>
        <Link href="/itens">
          <Button size="lg" variant="secondary">
            Gerenciar Itens
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Planejamento</h3>
          <p className="text-sm text-gray-600">
            Crie e gerencie demandas de produção com datas e itens específicos.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Acompanhamento</h3>
          <p className="text-sm text-gray-600">
            Monitore o status das demandas em tempo real: planejamento, em
            andamento ou concluído.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Controle Total</h3>
          <p className="text-sm text-gray-600">
            Gerencie o catálogo de itens e suas quantidades planejadas por
            demanda.
          </p>
        </div>
      </div>
    </div>
  );
}
