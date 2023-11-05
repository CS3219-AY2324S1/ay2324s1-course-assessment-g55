const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fetchAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({})

  res.status(200).json(users)
}

const getUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    }
  })
  
  res.status(200).json(user)
}

const createUser = async (req, res) => {
  const { email, firstname, lastname } = req.body

  // validate request body
  if (!email || !firstname) {
      return res.status(400).json({ message: 'Please enter all required fields.' })
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        firstname,
        lastname: lastname || null
      }
    })
    res.json({
      _id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname
    })
  } catch (error) {
    res.status(400).json({ message: 'Invalid user data.' })
  }
}

const updateUser = async (req, res) => {
  const { email, firstname, lastname, bio } = req.body

  // validate request body
  if (!email & !firstname & !lastname & !bio) {
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
  
    const updatedData = {};

    if (email) {
      updatedData.email = email;
    }

    if (firstname) {
      updatedData.firstname = firstname;
    }

    if (lastname) {
      updatedData.lastname = lastname;
    }

    if (bio) {
      updatedData.bio = bio;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: updatedData,
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

module.exports = { fetchAllUsers, getUser, createUser, updateUser, deleteUser }