import { neon } from "@neondatabase/serverless";

const projects = [
  {
    id: "seed-kigali-hills-residence",
    name: "Kigali Hills Residence",
    images: [
      "/projects/featured-project-1.png",
      "/images/featured-house.png",
      "/images/project-1.png",
    ],
    category: "Residential",
    status: "published",
    tags: ["Kicukiro", "Client Representation", "Quality Control"],
    description:
      "Client represented from planning through execution, including contractor coordination, quality control, and progress reporting.",
    cost: "$420k",
    address: "Kicukiro, Kigali",
    isFeatured: true,
  },
  {
    id: "seed-rebero-family-villa",
    name: "Rebero Family Villa",
    images: ["/projects/featured-project-2.png", "/images/project-2.png"],
    category: "Private Villa",
    status: "published",
    tags: ["Rebero", "Budget Control", "Progress Reporting"],
    description:
      "A private villa engagement focused on cost discipline, contractor follow-up, and weekly owner reporting.",
    cost: "$310k",
    address: "Rebero, Kigali",
    isFeatured: false,
  },
  {
    id: "seed-nyarutarama-renovation",
    name: "Nyarutarama Renovation",
    images: ["/projects/featured-project-3.png", "/images/house-1.png"],
    category: "Renovation",
    status: "published",
    tags: ["Nyarutarama", "Renovation", "Finishing"],
    description:
      "Interior and exterior renovation supervision with emphasis on finish quality, procurement checks, and timeline control.",
    cost: "$180k",
    address: "Nyarutarama, Kigali",
    isFeatured: false,
  },
  {
    id: "seed-gacuriro-investor-townhomes",
    name: "Gacuriro Investor Townhomes",
    images: ["/projects/featured-project-4.png", "/images/house-2.png"],
    category: "Investment Property",
    status: "published",
    tags: ["Gacuriro", "Investor", "Multi-Unit"],
    description:
      "Multi-unit investor support covering contractor accountability, staged inspections, and transparent budget updates.",
    cost: "$760k",
    address: "Gacuriro, Kigali",
    isFeatured: false,
  },
  {
    id: "seed-kibagabaga-modern-home",
    name: "Kibagabaga Modern Home",
    images: ["/images/bamboo-tree-house.png", "/images/house-3.png"],
    category: "Residential",
    status: "published",
    tags: ["Kibagabaga", "Modern Build", "Site Supervision"],
    description:
      "Ground-up residential supervision for an owner abroad, with structured site visits and milestone reporting.",
    cost: "$295k",
    address: "Kibagabaga, Kigali",
    isFeatured: false,
  },
  {
    id: "seed-bugesera-country-retreat",
    name: "Bugesera Country Retreat",
    images: ["/images/main-bg-boraland.png", "/images/main-background.png"],
    category: "Retreat",
    status: "published",
    tags: ["Bugesera", "Owner Representation", "Procurement"],
    description:
      "A countryside retreat managed through design coordination, supplier verification, and construction progress controls.",
    cost: "$510k",
    address: "Bugesera, Rwanda",
    isFeatured: false,
  },
];

function toTextArray(values) {
  const escapedValues = values.map((value) => {
    const escaped = String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return `"${escaped}"`;
  });

  return `{${escapedValues.join(",")}}`;
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to seed projects.");
  }

  const sql = neon(process.env.DATABASE_URL);

  await sql`update projects set is_featured = false`;

  for (const project of projects) {
    await sql`
      insert into projects (
        id,
        name,
        images,
        category,
        status,
        tags,
        description,
        cost,
        address,
        is_featured
      )
      values (
        ${project.id},
        ${project.name},
        ${toTextArray(project.images)}::text[],
        ${project.category},
        ${project.status}::project_status,
        ${toTextArray(project.tags)}::text[],
        ${project.description},
        ${project.cost},
        ${project.address},
        ${project.isFeatured}
      )
      on conflict (id) do update set
        name = excluded.name,
        images = excluded.images,
        category = excluded.category,
        status = excluded.status,
        tags = excluded.tags,
        description = excluded.description,
        cost = excluded.cost,
        address = excluded.address,
        is_featured = excluded.is_featured
    `;
  }

  console.log(`Seeded ${projects.length} projects.`);
}

main().catch((error) => {
  console.error("Failed to seed projects:", error);
  process.exit(1);
});
