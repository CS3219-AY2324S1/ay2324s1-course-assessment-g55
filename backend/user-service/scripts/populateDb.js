const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

async function clearAndPopulateDatabase() {
  const prisma = new PrismaClient();

  try {
    // Clear the database
    console.log('Clearing the database...');
    await prisma.$executeRaw`DELETE FROM User;`;

    // Repopulate the database from a JSON file
    console.log('Populating the database...');

    const jsonData = fs.readFileSync('data.json', 'utf8');
    const data = JSON.parse(jsonData);

    for (const item of data) {
      await prisma.user.create({
        data: item,
      });
    }

    console.log('Database cleared and populated.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearAndPopulateDatabase();
