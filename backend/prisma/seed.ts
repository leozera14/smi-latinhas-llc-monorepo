import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Flush all existent data
  await prisma.demandaItem.deleteMany();
  await prisma.demanda.deleteMany();
  await prisma.item.deleteMany();

  console.log("✅ Cleared existing data");

  // Create some items
  const items = await Promise.all([
    prisma.item.create({
      data: {
        sku: "4298",
        descricao: "LATINHA VERMELHA COM AZUL",
      },
    }),
    prisma.item.create({
      data: {
        sku: "2323",
        descricao: "LATINHA ROSA",
      },
    }),
    prisma.item.create({
      data: {
        sku: "7890",
        descricao: "LATINHA PRETA COM DOURADO",
      },
    }),
    prisma.item.create({
      data: {
        sku: "5555",
        descricao: "LATINHA VERDE LIMÃO",
      },
    }),
  ]);

  console.log(`✅ Created ${items.length} items`);

  // Create some Demandas
  const demanda1 = await prisma.demanda.create({
    data: {
      dataInicial: new Date("2025-05-23T00:00:00Z"),
      dataFinal: new Date("2025-05-29T23:59:59Z"),
      status: "PLANEJAMENTO",
      itens: {
        create: [
          {
            itemId: items[0].id,
            totalPlanejado: 3000,
            totalProduzido: 0,
          },
          {
            itemId: items[1].id,
            totalPlanejado: 1500,
            totalProduzido: 0,
          },
        ],
      },
    },
    include: {
      itens: {
        include: {
          item: true,
        },
      },
    },
  });

  const demanda2 = await prisma.demanda.create({
    data: {
      dataInicial: new Date("2025-05-16T00:00:00Z"),
      dataFinal: new Date("2025-05-22T23:59:59Z"),
      status: "EM_ANDAMENTO",
      itens: {
        create: [
          {
            itemId: items[2].id,
            totalPlanejado: 5000,
            totalProduzido: 2500,
          },
        ],
      },
    },
    include: {
      itens: {
        include: {
          item: true,
        },
      },
    },
  });

  const demanda3 = await prisma.demanda.create({
    data: {
      dataInicial: new Date("2025-05-09T00:00:00Z"),
      dataFinal: new Date("2025-05-15T23:59:59Z"),
      status: "CONCLUIDO",
      itens: {
        create: [
          {
            itemId: items[3].id,
            totalPlanejado: 5000,
            totalProduzido: 5000,
          },
        ],
      },
    },
    include: {
      itens: {
        include: {
          item: true,
        },
      },
    },
  });

  console.log("✅ Created 3 demandas");
  console.log("\n📊 Seed Summary:");
  console.log(`- Items: ${items.length}`);
  console.log(`- Demandas: 3`);
  console.log(
    `- Demanda 1 (${demanda1.status}): ${demanda1.itens.length} itens`
  );
  console.log(
    `- Demanda 2 (${demanda2.status}): ${demanda2.itens.length} itens`
  );
  console.log(
    `- Demanda 3 (${demanda3.status}): ${demanda3.itens.length} itens`
  );
  console.log("\n🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
