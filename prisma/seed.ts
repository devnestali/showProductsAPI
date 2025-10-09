import { prisma } from "../src/prisma.js"
import bcrypt from 'bcrypt'

async function seedDb() {
  console.log("Seeding database...")

  await prisma.order.deleteMany()
  
  await prisma.user.deleteMany()

  const adminPassword = 'admin'
  const hashedAdminPassword = bcrypt.hashSync(adminPassword, 8)
  
  await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@email.com",
      password: hashedAdminPassword,
      isAdmin: true
    }
  })

  const userPassword = 'user'
  const hashedUserPassword = bcrypt.hashSync(userPassword, 8)

  const user = await prisma.user.create({
    data: {
      username: "user",
      email: "user@email.com",
      password: hashedUserPassword,
      isAdmin: false
    }
  })

  await prisma.order.createMany({
    data: [
      {
        title: 'Computador Ergonómico e Material de Trabalho',
        description: 'Pedido de um kit completo de escritório para um novo colaborador ou substituição de equipamento.',
        orderDate: new Date('2025-10-08T08:52:29.440Z'),
        userId: user.id
      },
      {
        title: 'Compra Semanal de Supermercado',
        description: 'Pedido de 1 pão de forma integral, 1 litro de leite semidesnatado, 500g de café moído e 1 dúzia de ovos.',
        userId: user.id
      },
      {
        title: 'Entrega de Flores para Aniversário',
        description: 'Pedido de um arranjo de rosas vermelhas (12 unidades) com cartão de felicitações, a ser entregue no dia 15/11 em um endereço residencial.',
        userId: user.id
      },
      {
        title: 'Instalação de Novo Software',
        description: 'Pedido ao setor de TI para instalação da última versão do software de edição gráfica (Adobe Creative Cloud ou equivalente)',
        userId: user.id
      },
    ]
  })

  console.log('Database seeded !!')

  await prisma.$disconnect()
}

seedDb()
  .catch((error) => {
    console.error('Erro ao executar seed: ', error)
    process.exit(1)
  })