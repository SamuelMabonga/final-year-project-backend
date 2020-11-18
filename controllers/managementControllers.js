// Import express-validator
const { validationResult } = require('express-validator');

// import schema
const Users = require('../model/usermodel');
const Roles = require('../model/rolesModel')
const Farmers = require('../model/farmerModel')
const Farms = require('../model/farmModel')
const Facilities = require('../model/facilityModel');
const Activities = require('../model/activityModel')
const Tasks = require('../model/taskModel')

// FUNCTIONS FUNCTIONS FUNCTIONS
// Get a specific question
exports.setup = async (req, res) => {
  const user = await Users.findById(req.user.id).then((user) => user)

  let users = await Users.find()
    .then((items) => {
      const newItems = items.map(item => {
        return {
          id: item._id,
          username: item.username,
          name: `${item.firstName} ${item.lastName}`,
          lastName: item.lastName,
          firstName: item.firstName,
          isAdmin: item.isAdmin,
          isActive: item.isActive,
          isOwner: item.isOwner,
          gender: item.gender,
          age: item.age,
          email: item.email,
          phone: item.phoneNumber,
          village: item.village,
          role: item.role,
          interests: item.interests,
          image: item.image,
          tasks: item.tasks,
        }
      })
      return newItems
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ error: 'Failed to get users!', err: error })
    })

  let farms = await Farms.find()
    .then((items) => items)
    .catch(error => res.status(500).json({ error: 'Failed to get employees' }))

  let tasks = await Tasks.find()
    .then((items) => items)
    .catch(error => res.status(500).json({ error: 'Failed to get tasks'}))

  let facilities = await Facilities.find()
    .then((items) => items)
    .catch(error => res.status(500).json({ error: 'Failed to get tasks'}))

  let farmers = await Farmers.find()
    .then((items) => items)
    .catch(error => res.status(500).json({ error: 'Failed to get tasks'}))
  
  let roles = await Roles.find()
    .then((items) => items)
    .catch((error) => res.status(500).json({ error: 'Failed to get roles'}))
  
  let activities = await Activities.find()
    .then((items) => items)
    .catch((error) => res.status(500).json({ error: 'Failed to get actvities'}))

  if (user.isOwner) {
    res.status(200).json({ users, farms, tasks, facilities, farmers, roles, activities })
  } else if (user.isAdmin) {
    res.status(200).json({ users, farms, tasks, facilities, farmers, activities })
  } else if (user.isActive) {
    res.status(200).json({ users, farms, tasks })
  } else {
    res.status(401).json({ errorMsg: 'You are not registered to this application!'})
  }
  return null
};


// make a user active
exports.makeActive = async (req, res) => {
  const adminId = req.user.id 
  const { userId } = req.params

  try {
    const admin = await Users.findById(adminId).catch(error => {
      res.status(401).json({ errorMsg: 'You are not authorized for this action!', errorObj: error })
    })
    const user = await Users.findById(userId).catch(error => {
      res.status(400).json({ errorMsg: 'The user does not exist', errorObj: error })
    })

    if (admin.isAdmin) {
      await Users.findByIdAndUpdate(
        userId,
        {
          isActive: !user.isActive
        },
        {
          new: true
        }
      )
        .then((item) => {
          res.status(200).json(item)
        })
        .catch(error => res.status(500).json({ errorMsg: 'Failed to change active status!' }))
    } else {
      res.status(400).json({ errorMsg: 'You are not authorized for this action!'})
    }
    
  } catch (error) {
    res.status(500).json({ errorMsg: error })
  }
}

// make a user an admin
exports.makeAdmin = async (req, res) => {
  const ownerId = req.user.id 
  const { userId } = req.params

  try {
    const owner = await Users.findById(ownerId).catch(error => {
      res.status(401).json({ errorMsg: 'You are not authorized for this action!', errorObj: error })
    })
    const user = await Users.findById(userId).catch(error => {
      res.status(401).json({ errorMsg: 'The user does not exist', errorObj: error })
    })

    if (await owner.isOwner) {
      if (user.isActive) {
        await Users.findByIdAndUpdate(
          userId,
          {
            isAdmin: !user.isAdmin
          },
          {
            new: true
          }
        )
          .then((item) => {
            res.status(200).json(item)
          })
          .catch(error => res.status(500).json({ errorMsg: 'Failed to change active status!'}))
        } else {
          res.status(400).json({ errorMsg: 'Make the user active before granting admin priviledges!' })
        }
    } else {
      res.status(401).json({ errorMsg: 'You are not authorized to make an admin!' })
    }
    
  } catch (error) {
    res.status(500).json({ errorMsg: error })
  }
}

// create user a role
exports.createRole = async (req, res) => {
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const user = await Users.findById(req.user.id).then((user) => user)

  if (user.isOwner) {  
    const newRole = new Roles({
      title: req.body.title,
      initials: req.body.initials,
      admin: req.body.admin,
      creator: req.user.id
    })

    newRole.save((error, roleObj) => {
      if (error) {
        return res.status(500).json({ errorMsg: 'Failed to save new role!'})
      }

      return res.status(200).json(roleObj)
    })
  } else { 
    res.status(400).json({ errorMsg: 'You are not authorized to create a role!' })
  }
}

// delete a role
exports.deleteRole = async (req, res) => {
  const { roleId } = req.params;
  const userId = req.user.id;

  const user = await Users.findById(userId).then((user) => user)

  if (user.isOwner) {
    Roles.findOneAndDelete(
      {
        _id: roleId,
      },
    ).then(() => res.status(200).json({ message: 'Deleted!' }))
      .catch((err) =>
        // console.log(`ERROR >> ${err}`);
        res.status(400).json({ error: 'Failed to delete role!' }));
  } else {
    return res.status(400).json({ errorMsg: 'You are not authorized to delete a role!'})
  }
}

// Post an activity
exports.createActivity = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array())
  }

  const user = await Users.findById(req.user.id).then((user) => user)
  console.log(user)

  if (user.isAdmin) {
    const newActivity = new Activities({
      name: req.body.name,
      form: req.body.form,
      isOpen: req.body.isOpen,
      description: req.body.description,
      creator: req.user.id
    })

    newActivity.save(error => {
      if (error) {
        return res.status(500).json({
          errorMsg: 'Failed to save new role!'
        })
      }

      return res.status(200)
    })
  } else {
    res.status(400).json({ errorMsg: 'You are not authorized to create a new role!'})
  }
}

// delete an activity
exports.deleteActivity = async (req, res) => {
  const { activityId } = req.params;
  const userId = req.user.id;

  const user = await Users.findById(userId).then((user) => user)

  if (user.isAdmin) {
    Activities.findOneAndDelete(
      {
        _id: activityId,
      },
    ).then(() => res.status(200).json({ message: 'Deleted!' }))
      .catch((err) =>
        // console.log(`ERROR >> ${err}`);
        res.status(400).json({ error: 'Failed to delete activity!' }));
  } else {
    return res.status(400).json({ errorMsg: 'You are not authorized to delete an activity!'})
  }
}

// create a farmer
exports.createFarmer = async (req, res) => {
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const user = await Users.findById(req.user.id).then((user) => user)

  if (user.isAdmin) {  
    const newFarmer = new Farmers({
      firstName: req.body.firstName,
      lastName: req.body.firstName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      age: req.body.age,
      village: req.body.village,
      creator: req.user.id
    })

    newFarmer.save(async (error) => {
      if (error) {
        // console.log(error)
        return res.status(500).json({ errorMsg: 'Failed to save new farmer!'})
      }

      let farmers = await Farmers.find()
        .then((items) => items)
        .catch(error => res.status(500).json({ error: 'Failed to get farmers'}))      

      return res.status(200).json(farmers)
    })
  } else { 
    res.status(400).json({ errorMsg: 'You are not authorized to create a farmer!' })
  }
}

// delete a farmer
exports.deleteFarmer = async (req, res) => {
  const { farmerId } = req.params;
  const userId = req.user.id;

  const user = await Users.findById(userId).then((user) => user)

  if (user.isAdmin) {
    Farmers.findOneAndDelete(
      {
        _id: farmerId,
      },
    ).then(() => res.status(200).json({ message: 'Deleted!' }))
      .catch((err) =>
        // console.log(`ERROR >> ${err}`);
        res.status(400).json({ error: 'Failed to delete farmer!' }));
  } else {
    return res.status(400).json({ errorMsg: 'You are not authorized to delete a farmer!'})
  }
}

// create a farm
exports.createFarm = async (req, res) => {
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const user = await Users.findById(req.user.id).then((user) => user)

  if (user.isAdmin) {  
    const newFarm = new Farms({
      name: req.body.name,
      animals: req.body.animals,
      permanentCrops: [...req.body.permanentCrops],
      annualCrops: [...req.body.annualCrops],
      history: req.body.history,
      village: req.body.village,
      location: req.body.location,
      generalComments: req.body.generalComments,
      creator: req.user.id
    })

    newFarm.save(async (error) => {
      if (error) {
        return res.status(500).json({ errorMsg: 'Failed to save new farm!'})
      }

      let farmers = await Farms.find()
        .then((items) => items)
        .catch(error => res.status(500).json({ error: 'Failed to get farms'})) 

      return res.status(200).json(farmers)
    })
  } else { 
    res.status(400).json({ errorMsg: 'You are not authorized to create a farm!' })
  }
}

// delete a farm
exports.deleteFarm = async (req, res) => {
  const { farmId } = req.params;
  const userId = req.user.id;

  const user = await Users.findById(userId).then((user) => user)

  if (user.isAdmin) {
    Farms.findOneAndDelete(
      {
        _id: farmId,
      },
    ).then(() => res.status(200).json({ message: 'Deleted!' }))
      .catch((err) =>
        // console.log(`ERROR >> ${err}`);
        res.status(400).json({ error: 'Failed to delete farm!' }));
  } else {
    return res.status(400).json({ errorMsg: 'You are not authorized to delete a farm!'})
  }
}

// create a facility
exports.createFacility = async (req, res) => {
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const user = await Users.findById(req.user.id).then((user) => user)

  if (user.isAdmin) {  
    const newFacility = new Facilities({
      name: req.body.name,
      animals: req.body.animals,
      permanentCrops: [...req.body.permanentCrops],
      annualCrops: [...req.body.annualCrops],
      history: req.body.history,
      village: req.body.village,
      location: req.body.location,
      generalComments: req.body.generalComments,
      creator: req.user.id
    })

    newFacility.save((error, facilityObj) => {
      if (error) {
        return res.status(500).json({ errorMsg: 'Failed to save new facility!'})
      }

      return res.status(200).json(facilityObj)
    })
  } else { 
    res.status(400).json({ errorMsg: 'You are not authorized to create a facility!' })
  }
}

// delete a facility
exports.deleteFacility = async (req, res) => {
  const { farmerId } = req.params;
  const userId = req.user.id;

  const user = await Users.findById(userId).then((user) => user)

  if (user.isAdmin) {
    Facilities.findOneAndDelete(
      {
        _id: facilityId,
      },
    ).then(() => res.status(200).json({ message: 'Deleted!' }))
      .catch((err) =>
        // console.log(`ERROR >> ${err}`);
        res.status(400).json({ error: 'Failed to delete farmer!' }));
  } else {
    return res.status(400).json({ errorMsg: 'You are not authorized to delete a farmer!'})
  }
}



