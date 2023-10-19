const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fetchAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({})

  res.status(200).json(users)
}

const createUser = async (req, res) => {
  const { email, name } = req.body

  // validate request body
  if (!email || !name) {
      return res.status(400).json({ message: 'Please enter all fields.' })
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name
      }
    })
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name
    })
  } catch (error) {
    res.status(400).json({ message: 'Invalid user data.' })
  }
}

const updateUser = async (req, res) => {
  const { email, name } = req.body

  // validate request body
  if (!email & !name) {
      return res.status(400).json({ message: 'Please enter a field.' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
  
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        email: email,
        name: name,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid user data.' });
  }
}

const deleteUser = async (req, res) => {
  try {
      const user = await prisma.user.delete({
          where: {
              id: parseInt(req.params.id),
          },
      });

      res.status(200).json({ message: 'User removed' });
  } catch (error) {
      res.status(404).json({ message: 'User not found' });
  }
}

module.exports = { fetchAllUsers, createUser, updateUser, deleteUser }